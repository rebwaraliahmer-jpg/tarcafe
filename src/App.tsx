/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { LanguageCode, LANGUAGES, Category, MenuItem, RestaurantSettings } from "./types";
import {
  getCategories,
  getMenuItems,
  getRestaurantSettings,
  saveCategories,
  saveMenuItems,
  saveRestaurantSettings
} from "./db";
import i18n from "./i18n"; // Import i18n instance
import WelcomeLanguageModal from "./components/WelcomeLanguageModal";
import QRCodeModal from "./components/QRCodeModal";
import CustomerMenuView from "./components/CustomerMenuView";
import AdminPanel from "./components/AdminPanel";
import { Lock, AlertCircle } from "lucide-react";

export default function App() {
  // Check if first visit
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    return !localStorage.getItem("qr_menu_first_visit_completed");
  });

  // Load language preference
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem("qr_menu_lang") as LanguageCode;
    if (saved && (saved === "en" || saved === "ar" || saved === "ku")) {
      return saved;
    }
    // Browser language detection on first visit
    const browserLang = navigator.language || navigator.languages?.[0] || "";
    if (browserLang.toLowerCase().includes("ar")) {
      return "ar";
    }
    if (browserLang.toLowerCase().includes("en")) {
      return "en";
    }
    return "ku"; // Default to Kurdish Sorani as requested
  });

  // Track active screen mode ('customer' vs 'admin')
  const [viewMode, setViewMode] = useState<"customer" | "admin">("customer");

  // Track QR Code generator pop-up state
  const [showQR, setShowQR] = useState(false);

  // Track Admin Login validation states
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthenticatedSession, setIsAuthenticatedSession] = useState(false);

  // Load active DB lists representing requested fields
  const [categories, setCategories] = useState<Category[]>(() => getCategories());
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => getMenuItems());
  const [settings, setSettings] = useState<RestaurantSettings>(() => getRestaurantSettings());

  // Effect to switch i18next language, page attributes, and directions dynamically
  useEffect(() => {
    i18n.changeLanguage(currentLang);
    localStorage.setItem("qr_menu_lang", currentLang);

    const config = LANGUAGES[currentLang] || LANGUAGES.ku;
    document.documentElement.dir = config.dir;
    document.documentElement.lang = currentLang;
    document.body.style.fontFamily = config.fontFamily;
  }, [currentLang]);

  // Handle first-visit language confirmation
  const handleSelectFirstVisitLanguage = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem("qr_menu_first_visit_completed", "true");
    localStorage.setItem("qr_menu_lang", lang);
    setShowWelcome(false);
  };

  // Switch languages instantly from switcher
  const handleInstantLanguageChange = (lang: LanguageCode) => {
    setCurrentLang(lang);
  };

  // Category persist helpers
  const handleSaveCategories = (updatedCats: Category[]) => {
    setCategories(updatedCats);
    saveCategories(updatedCats);
  };

  // Menu item persist helpers
  const handleSaveMenuItems = (updatedItems: MenuItem[]) => {
    setMenuItems(updatedItems);
    saveMenuItems(updatedItems);
  };

  // Restaurant details persist helpers
  const handleSaveSettings = (updatedSettings: RestaurantSettings) => {
    setSettings(updatedSettings);
    saveRestaurantSettings(updatedSettings);
  };

  const handleSwitchToAdminAttempt = () => {
    if (isAuthenticatedSession) {
      setViewMode("admin");
    } else {
      setEnteredPassword("");
      setAuthError("");
      setShowAdminAuth(true);
    }
  };

  const handleVerifyPassword = (e: FormEvent) => {
    e.preventDefault();
    const correctPassword = settings.admin_password || "1234";
    if (enteredPassword.trim() === correctPassword.trim()) {
      setIsAuthenticatedSession(true);
      setShowAdminAuth(false);
      setViewMode("admin");
    } else {
      const invalidMsg = currentLang === "ar"
        ? "تنبيه: كلمة المرور المدخلة غير صحيحة!"
        : currentLang === "ku"
        ? "تێبینی: تێپەڕوشەکە نادروستە!"
        : "Alert: Invalid password, please try again!";
      setAuthError(invalidMsg);
    }
  };

  const selectedLang = LANGUAGES[currentLang] || LANGUAGES.ku;

  const tAuth = {
    en: {
      title: "Admin Portal Security",
      subtitle: "Enter the security code to access control panel and customize menu settings.",
      placeholder: "Enter password...",
      confirm: "Verify Password",
      cancel: "Cancel",
    },
    ar: {
      title: "أمن لوحة الإدارة",
      subtitle: "يرجى كتابة رمز المرور الخاص بك لإدارة وتعديل تفاصيل المنيّو.",
      placeholder: "كلمة المرور...",
      confirm: "تأكيد الدخول",
      cancel: "إلغاء",
    },
    ku: {
      title: "پاراستنی پانێڵی ئەدمین",
      subtitle: "تکایە تێپەڕوشەکە بنووسە بۆ چوونە ناو بەشی ڕێکخستنی مینیو.",
      placeholder: "تێپەڕوشە بنووسە...",
      confirm: "چوونەژوورەوە",
      cancel: "پاشگەزبوونەوە",
    }
  }[currentLang] || {
    en: {
      title: "Admin Portal Security",
      subtitle: "Enter the security code to access control panel and customize menu settings.",
      placeholder: "Enter password...",
      confirm: "Verify Password",
      cancel: "Cancel",
    }
  };

  return (
    <div
      id="app-root-container"
      style={{ direction: selectedLang.dir, fontFamily: selectedLang.fontFamily }}
      className="min-h-screen bg-slate-50 transition-all duration-300 antialiased"
    >
      {/* 1. Show customer view vs 2. Admin dashboard view */}
      {viewMode === "customer" ? (
        <CustomerMenuView
          currentLang={currentLang}
          onLanguageChange={handleInstantLanguageChange}
          categories={categories}
          menuItems={menuItems}
          settings={settings}
          onSwitchToAdmin={handleSwitchToAdminAttempt}
          onShowQR={() => setShowQR(true)}
        />
      ) : (
        <AdminPanel
          currentLang={currentLang}
          onLanguageChange={handleInstantLanguageChange}
          categories={categories}
          menuItems={menuItems}
          settings={settings}
          onSaveCategories={handleSaveCategories}
          onSaveMenuItems={handleSaveMenuItems}
          onSaveSettings={handleSaveSettings}
          onSwitchToCustomer={() => setViewMode("customer")}
        />
      )}

      {/* Popups & Dialogs overlays */}
      {showWelcome && (
        <WelcomeLanguageModal onSelect={handleSelectFirstVisitLanguage} />
      )}

      {showQR && (
        <QRCodeModal currentLang={currentLang} onClose={() => setShowQR(false)} />
      )}

      {/* Admin Authorization Security Dialog */}
      {showAdminAuth && (
        <div
          id="admin-auth-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm animate-pulse">
                <Lock className="w-6 h-6 animate-bounce duration-1000" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-950 text-base tracking-tight">
                  {tAuth.title}
                </h3>
                <p className="text-2xs text-slate-500 leading-relaxed px-1">
                  {tAuth.subtitle}
                </p>
              </div>

              <form onSubmit={handleVerifyPassword} className="w-full space-y-4 pt-1.5 text-xs font-semibold">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={enteredPassword}
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                      if (authError) setAuthError("");
                    }}
                    placeholder={tAuth.placeholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-3 outline-none transition-all text-center text-sm font-bold tracking-widest"
                    required
                  />
                  {authError && (
                    <div className="flex items-center gap-1.5 text-red-600 text-[11px] mt-2 justify-center font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{authError}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminAuth(false);
                      setEnteredPassword("");
                      setAuthError("");
                    }}
                    className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-205 py-3 rounded-xl cursor-pointer text-center font-extrabold transition-all"
                  >
                    {tAuth.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-3 rounded-xl cursor-pointer text-center font-extrabold transition-all shadow-md shadow-emerald-650/10"
                  >
                    {tAuth.confirm}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
