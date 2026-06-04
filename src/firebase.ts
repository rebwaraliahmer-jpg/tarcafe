import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  getDoc,
  getDocFromServer,
  writeBatch
} from 'firebase/firestore';
import { Category, MenuItem, RestaurantSettings } from './types';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Synchronize categories and automatically delete orphans
export async function dbSyncCategories(updatedCats: Category[]) {
  const path = 'categories';
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const existingIds = new Set<string>();
    querySnapshot.forEach((doc) => {
      existingIds.add(doc.id);
    });

    const updatedIds = new Set(updatedCats.map(c => c.id));
    const batch = writeBatch(db);

    updatedCats.forEach((cat) => {
      batch.set(doc(db, 'categories', cat.id), cat);
    });

    existingIds.forEach((id) => {
      if (!updatedIds.has(id)) {
        batch.delete(doc(db, 'categories', id));
      }
    });

    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Synchronize menu items and automatically delete orphans
export async function dbSyncMenuItems(updatedItems: MenuItem[]) {
  const path = 'menuItems';
  try {
    const querySnapshot = await getDocs(collection(db, 'menuItems'));
    const existingIds = new Set<string>();
    querySnapshot.forEach((doc) => {
      existingIds.add(doc.id);
    });

    const updatedIds = new Set(updatedItems.map(i => i.id));
    const batch = writeBatch(db);

    updatedItems.forEach((item) => {
      batch.set(doc(db, 'menuItems', item.id), item);
    });

    existingIds.forEach((id) => {
      if (!updatedIds.has(id)) {
        batch.delete(doc(db, 'menuItems', id));
      }
    });

    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Save Restaurant Settings
export async function dbSaveSettings(settings: RestaurantSettings) {
  const path = 'settings/restaurant_config';
  try {
    await setDoc(doc(db, 'settings', 'restaurant_config'), settings);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Helper block to upload everything (batch copy) if remote database is empty
export async function dbUploadAllIfEmpty(categories: Category[], menuItems: MenuItem[], settings: RestaurantSettings) {
  try {
    const catsSnap = await getDocs(collection(db, 'categories'));
    if (catsSnap.empty && categories.length > 0) {
      const batch = writeBatch(db);
      categories.forEach((cat) => {
        batch.set(doc(db, 'categories', cat.id), cat);
      });
      await batch.commit();
      console.log('Successfully bootstrapped categories collection in Firestore.');
    }

    const itemsSnap = await getDocs(collection(db, 'menuItems'));
    if (itemsSnap.empty && menuItems.length > 0) {
      const batch = writeBatch(db);
      menuItems.forEach((item) => {
        batch.set(doc(db, 'menuItems', item.id), item);
      });
      await batch.commit();
      console.log('Successfully bootstrapped menuItems collection in Firestore.');
    }

    const setRes = await getDoc(doc(db, 'settings', 'restaurant_config'));
    if (!setRes.exists()) {
      await setDoc(doc(db, 'settings', 'restaurant_config'), settings);
      console.log('Successfully bootstrapped restaurant_config in Firestore.');
    }
  } catch (err) {
    console.warn('Silent bootstrap bypass or error (possible first-run sync race/permissions):', err);
  }
}
