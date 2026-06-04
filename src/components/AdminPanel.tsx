/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Category, MenuItem, RestaurantSettings, LANGUAGES, LanguageCode, formatPrice } from "../types";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  ArrowLeft,
  Settings,
  Grid,
  Coffee,
  Globe,
  ToggleLeft,
  ToggleRight,
  Eye,
  Camera,
  AlertCircle,
  Download,
  Upload,
  Copy
} from "lucide-react";

interface AdminPanelProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  categories: Category[];
  menuItems: MenuItem[];
  settings: RestaurantSettings;
  onSaveCategories: (cats: Category[]) => void;
  onSaveMenuItems: (items: MenuItem[]) => void;
  onSaveSettings: (settings: RestaurantSettings) => void;
  onSwitchToCustomer: () => void;
}

type AdminTab = "restaurant" | "categories" | "items";

export default function AdminPanel({
  currentLang,
  onLanguageChange,
  categories,
  menuItems,
  settings,
  onSaveCategories,
  onSaveMenuItems,
  onSaveSettings,
  onSwitchToCustomer
}: AdminPanelProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AdminTab>("items");
  const [notification, setNotification] = useState<string | null>(null);

  const selectedLang = LANGUAGES[currentLang] || LANGUAGES.ku;

  // Notification helper
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // ==========================================
  // STATE & HANDLERS FOR RESTAURANT INFO
  // ==========================================
  const [restForm, setRestForm] = useState<RestaurantSettings>({ ...settings });

  const handleSaveRestInfo = (e: FormEvent) => {
    e.preventDefault();
    onSaveSettings(restForm);
    triggerNotification(t("save_success"));
  };

  // ==========================================
  // STATE & HANDLERS FOR BACKUP / EXPORT / IMPORT
  // ==========================================
  const [importJsonText, setImportJsonText] = useState("");
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const generateBackupData = () => {
    return JSON.stringify({
      categories,
      menuItems,
      settings
    }, null, 2);
  };

  const handleCopyBackup = () => {
    const backupStr = generateBackupData();
    navigator.clipboard.writeText(backupStr).then(() => {
      setCopiedBackup(true);
      triggerNotification(
        currentLang === "ar"
          ? "تم نسخ النسخة الاحتياطية إلى الحافظة! يمكنك لصقها وإرسالها لنا."
          : currentLang === "ku"
          ? "پاڵپشتی کۆپیکرا بۆ حافزە! دەتوانیت لێرە بینێریت بۆمان."
          : "Backup copied to clipboard! You can paste and send it to us."
      );
      setTimeout(() => setCopiedBackup(false), 3000);
    }).catch(() => {
      alert("Failed to copy automatically. Please select and copy the text below.");
    });
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(generateBackupData());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `restaurant-menu-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerNotification(
      currentLang === "ar"
        ? "تم تحميل ملف النسخة الاحتياطية بنجاح!"
        : currentLang === "ku"
        ? "فایلی کۆپی یەدەگ بە سەرکەوتوویی دابەزێنرا!"
        : "Backup JSON file downloaded successfully!"
    );
  };

  const handleImportBackup = () => {
    setImportError(null);
    if (!importJsonText.trim()) {
      setImportError(
        currentLang === "ar"
          ? "الرجاء لصق نص النسخة الاحتياطية أولاً"
          : currentLang === "ku"
          ? "تکایە سەرەتا دەقی کۆپی یەدەگ بنووسە"
          : "Please paste the backup text first"
      );
      return;
    }

    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed || (typeof parsed !== "object")) {
        throw new Error("Invalid format");
      }

      // Check for categories or menuItems
      if (!parsed.categories || !Array.isArray(parsed.categories)) {
        throw new Error("Missing 'categories' array");
      }
      if (!parsed.menuItems || !Array.isArray(parsed.menuItems)) {
        throw new Error("Missing 'menuItems' array");
      }

      const confirmMsg = currentLang === "ar"
        ? "⚠️ تنبيه: سيؤدي هذا إلى استبدال كافة قائمة الطعام والفئات والبيانات الحالية بالنسخة الاحتياطية الملصقة. هل تريد المتابعة؟"
        : currentLang === "ku"
        ? "⚠️ ئاگاداری: ئەمە دەبێتە هۆی گۆڕینی هەموو مینیو و پۆلێن و داتاکانی ئێستا بە داتای یەدەگی نوێ. ئایا دەتەوێت بەردەوام بیت؟"
        : "⚠️ Warning: This will overwrite all of your current menu items, categories, and settings with the pasted backup data. Do you want to continue?";

      if (window.confirm(confirmMsg)) {
        onSaveCategories(parsed.categories);
        onSaveMenuItems(parsed.menuItems);
        if (parsed.settings) {
          onSaveSettings(parsed.settings);
        }
        
        triggerNotification(
          currentLang === "ar"
            ? "تمت استعادة النسخة الاحتياطية ودمجها بنجاح! 🎉"
            : currentLang === "ku"
            ? "یادگارییەکان و مینیوی یەدەگ بە سەرکەوتوویی گەڕێندرایەوە! 🎉"
            : "Backup restored and applied successfully! 🎉"
        );
        setImportJsonText("");
      }
    } catch (err: any) {
      console.error(err);
      setImportError(
        currentLang === "ar"
          ? "فشل التحقق من النص المُلصق. يرجى التأكد من نسخ الكود بالكامل وبشكل صحيح."
          : currentLang === "ku"
          ? "هەڵەیەک لە خوێندنەوەی دەقەکەدا هەیە. تکایە دڵنیابەرەوە لە کۆپیکردنی تەواوی کۆدەکە."
          : `Invalid backup format: ${err.message || "Unknown error"}`
      );
    }
  };

  // ==========================================
  // STATE & HANDLERS FOR CATEGORIES
  // ==========================================
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState<Omit<Category, "id">>({
    name_en: "",
    name_ar: "",
    name_ku: "",
    image: ""
  });
  const [isAddingCat, setIsAddingCat] = useState(false);

  const startEditCategory = (cat: Category) => {
    setEditingCatId(cat.id);
    setCatForm({
      name_en: cat.name_en,
      name_ar: cat.name_ar,
      name_ku: cat.name_ku,
      image: cat.image || ""
    });
    setIsAddingCat(false);

    // Smooth scroll to form area for clarity (especially on mobile)
    setTimeout(() => {
      const scrollTarget = document.getElementById("section-categories");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const clearCatForm = () => {
    setEditingCatId(null);
    setIsAddingCat(false);
    setCatForm({ name_en: "", name_ar: "", name_ku: "", image: "" });
  };

  const handleSaveCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!catForm.name_en && !catForm.name_ar && !catForm.name_ku) {
      alert("Please fill in at least one version of the category name");
      return;
    }

    const defaultImg = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400";
    const finalForm = {
      ...catForm,
      image: catForm.image?.trim() || defaultImg
    };

    if (editingCatId) {
      // Edit
      const updated = categories.map((c) =>
        c.id === editingCatId ? { ...c, ...finalForm } : c
      );
      onSaveCategories(updated);
      triggerNotification("Category updated successfully!");
    } else {
      // Create new
      const newId = `cat_${Date.now()}`;
      const newCat: Category = {
        id: newId,
        ...finalForm
      };
      onSaveCategories([...categories, newCat]);
      triggerNotification("New category added!");
    }
    clearCatForm();
  };

  const handleDeleteCategory = (id: string) => {
    const associatedItems = menuItems.filter((i) => i.category_id === id);
    if (associatedItems.length > 0) {
      const confirmCascadeMsg = currentLang === "ar"
        ? `🚨 تنبيه: تحتوي هذه الفئة على ${associatedItems.length} من الأطباق. هل تريد حذف هذه الفئة بالكامل وجميع الأطباق والوجبات التابعة لها؟`
        : currentLang === "ku"
        ? `🚨 ئاگاداری: ئەم پۆلێنە ${associatedItems.length} خواردنی تێدایە. ئایا دەتەوێت پۆلێنەکە و هەموو خواردنەکانی بە یەکەوە بسڕیتەوە؟`
        : `🚨 Warning: This category has ${associatedItems.length} menu item(s) belonging to it. Do you want to delete this category and all of its items?`;
      
      if (confirm(confirmCascadeMsg)) {
        // Delete the category
        const filteredCats = categories.filter((c) => c.id !== id);
        onSaveCategories(filteredCats);
        
        // Delete all associated items
        const filteredItems = menuItems.filter((i) => i.category_id !== id);
        onSaveMenuItems(filteredItems);
        
        const successCascadeMsg = currentLang === "ar"
          ? "تم حذف الفئة وحذف جميع الأطباق بنجاح!"
          : currentLang === "ku"
          ? "پۆلێنەکە و تەواوی خواردنەکانی بە سەرکەوتوویی سڕانەوە!"
          : "Category and all associated items deleted successfully!";
        triggerNotification(successCascadeMsg);
      }
      return;
    }

    const confirmDefMsg = currentLang === "ar"
      ? "هل أنت متأكد من رغبتك في حذف هذه الفئة؟"
      : currentLang === "ku"
      ? "تۆ دڵنیایت لە سڕینەوەی ئەم پۆلێنە؟"
      : "Are you sure you want to delete this category?";

    if (confirm(confirmDefMsg)) {
      const filtered = categories.filter((c) => c.id !== id);
      onSaveCategories(filtered);
      
      const successDefMsg = currentLang === "ar"
        ? "تم حذف الفئة بنجاح"
        : currentLang === "ku"
        ? "پۆلێنەکە سڕدراوەوە"
        : "Category deleted";
      triggerNotification(successDefMsg);
    }
  };

  // ==========================================
  // STATE & HANDLERS FOR MENU ITEMS (DISHES)
  // ==========================================
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState<Omit<MenuItem, "id">>({
    category_id: categories[0]?.id || "",
    title_en: "",
    title_ar: "",
    title_ku: "",
    description_en: "",
    description_ar: "",
    description_ku: "",
    price: 0,
    image: "",
    available: true
  });
  const [isAddingItem, setIsAddingItem] = useState(false);

  const startEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemForm({
      category_id: item.category_id,
      title_en: item.title_en,
      title_ar: item.title_ar,
      title_ku: item.title_ku,
      description_en: item.description_en,
      description_ar: item.description_ar,
      description_ku: item.description_ku,
      price: item.price,
      image: item.image,
      available: item.available
    });
    setIsAddingItem(false);

    // Smooth scroll to form area for clarity (especially on mobile)
    setTimeout(() => {
      const scrollTarget = document.getElementById("dishes-edit-section");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const fallbackTarget = document.getElementById("admin-content-tabs");
        if (fallbackTarget) {
          fallbackTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }, 100);
  };

  const clearItemForm = () => {
    setEditingItemId(null);
    setIsAddingItem(false);
    setItemForm({
      category_id: categories[0]?.id || "",
      title_en: "",
      title_ar: "",
      title_ku: "",
      description_en: "",
      description_ar: "",
      description_ku: "",
      price: 0,
      image: "",
      available: true
    });
  };

  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();
    if (!itemForm.title_en && !itemForm.title_ar && !itemForm.title_ku) {
      alert("Please fill in at least one version of the item title.");
      return;
    }
    if (!itemForm.category_id) {
      alert("Please select a valid category.");
      return;
    }

    if (editingItemId) {
      // Edit
      const updated = menuItems.map((item) =>
        item.id === editingItemId ? { ...item, ...itemForm } : item
      );
      onSaveMenuItems(updated);
      triggerNotification("Menu item updated successfully!");
    } else {
      // Add
      const newId = `item_${Date.now()}`;
      const newItem: MenuItem = {
        id: newId,
        ...itemForm
      };
      onSaveMenuItems([...menuItems, newItem]);
      triggerNotification("New menu item added!");
    }
    clearItemForm();
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      const filtered = menuItems.filter((item) => item.id !== id);
      onSaveMenuItems(filtered);
      triggerNotification("Menu item deleted");
    }
  };

  const toggleItemAvailability = (item: MenuItem) => {
    const updated = menuItems.map((i) =>
      i.id === item.id ? { ...i, available: !i.available } : i
    );
    onSaveMenuItems(updated);
    triggerNotification(`Item state updated: ${item.available ? "Sold Out" : "Available"}`);
  };

  const [activeLangTab, setActiveLangTab] = useState<LanguageCode>("ku");

  return (
    <div
      id="admin-dashboard-container"
      className="min-h-screen bg-slate-50 text-slate-800 transition-all duration-300"
      style={{ direction: selectedLang.dir, fontFamily: selectedLang.fontFamily }}
    >
      {/* Upper Panel Banner */}
      <div id="admin-top-bar" className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="back-to-menu-btn"
              onClick={onSwitchToCustomer}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl transition-all cursor-pointer text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("customer_view")}</span>
            </button>
            <div className="h-5 w-px bg-slate-800 hidden sm:block"></div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                <span>{t("admin_panel")}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Quick Lang Selection */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-400" />
              <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange} />
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div
          id="admin-toast-notif"
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 font-semibold text-xs h-auto min-w-xs animate-bounce"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Admin Tabs */}
        <div
          id="admin-section-tabs"
          className="bg-white p-1 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap gap-1 mb-8"
        >
          <button
            id="tab-btn-items"
            onClick={() => {
              setActiveTab("items");
              clearItemForm();
              clearCatForm();
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "items"
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>{t("manage_menu")}</span>
          </button>

          <button
            id="tab-btn-categories"
            onClick={() => {
              setActiveTab("categories");
              clearItemForm();
              clearCatForm();
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "categories"
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>{t("manage_categories")}</span>
          </button>

          <button
            id="tab-btn-restaurant"
            onClick={() => {
              setActiveTab("restaurant");
              clearItemForm();
              clearCatForm();
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "restaurant"
                ? "bg-slate-950 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t("edit_restaurant_info")}</span>
          </button>
        </div>

        {/* ----------------- TAB: RESTAURANT SETTINGS ----------------- */}
        {activeTab === "restaurant" && (
          <div id="section-restaurant" className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 max-w-4xl mx-auto">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-950">{t("edit_restaurant_info")}</h2>
              <p className="text-xs text-slate-500 mt-1">{t("all_translations_subtitle")}</p>
            </div>

            <form onSubmit={handleSaveRestInfo} className="space-y-6">
              {/* Three Translation Columns Grouped Together */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kurdish Section */}
                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <span className="text-sm">🇹🇯</span>
                    <span className="font-extrabold text-emerald-800 text-xs">{t("tab_kurdish")}</span>
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("name_ku")}
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={restForm.restaurant_name_ku}
                      onChange={(e) =>
                        setRestForm({ ...restForm, restaurant_name_ku: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("desc_ku")}
                    </label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={restForm.description_ku}
                      onChange={(e) =>
                        setRestForm({ ...restForm, description_ku: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("addr_ku")}
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={restForm.address_ku}
                      onChange={(e) =>
                        setRestForm({ ...restForm, address_ku: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>
                </div>

                {/* Arabic Section */}
                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <span className="text-sm">🇮🇶</span>
                    <span className="font-extrabold text-emerald-800 text-xs">{t("tab_arabic")}</span>
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("name_ar")}
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={restForm.restaurant_name_ar}
                      onChange={(e) =>
                        setRestForm({ ...restForm, restaurant_name_ar: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("desc_ar")}
                    </label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={restForm.description_ar}
                      onChange={(e) =>
                        setRestForm({ ...restForm, description_ar: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("addr_ar")}
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={restForm.address_ar}
                      onChange={(e) =>
                        setRestForm({ ...restForm, address_ar: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>
                </div>

                {/* English Section */}
                <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-xl space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <span className="text-sm">🇬🇧</span>
                    <span className="font-extrabold text-emerald-800 text-xs">{t("tab_english")}</span>
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("name_en")}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={restForm.restaurant_name_en}
                      onChange={(e) =>
                        setRestForm({ ...restForm, restaurant_name_en: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("desc_en")}
                    </label>
                    <textarea
                      rows={3}
                      dir="ltr"
                      value={restForm.description_en}
                      onChange={(e) =>
                        setRestForm({ ...restForm, description_en: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("addr_en")}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={restForm.address_en}
                      onChange={(e) =>
                        setRestForm({ ...restForm, address_en: e.target.value })
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Admin Protection Password Section */}
              <div className="bg-amber-50/50 border border-amber-200/50 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">🔑</span>
                  <span className="font-extrabold text-slate-800 text-sm">
                    {currentLang === "ar"
                      ? "رمز حماية الأدمن (كلمة المرور)"
                      : currentLang === "ku"
                      ? "تێپەڕوشەی پاراستنی ئەدمین (Password)"
                      : "Admin Protection Password"}
                  </span>
                </div>
                <p className="text-3xs text-slate-500 max-w-xl">
                  {currentLang === "ar"
                    ? "هذه كلمة المرور المطلوبة للدخول إلى لوحة التحكم من واجهة العملاء. القيمة الافتراضية هي 1234."
                    : currentLang === "ku"
                    ? "ئەمە ئەو تێپەڕوشەیەیە کە پێویست دەبێت بۆ چوونە ئاراستەی پانێڵی ئەدمین. تێپەڕوشەی بنەڕەتی بریتییە لە 1234."
                    : "This is the password required to switch to the Admin dashboard from the customer menu. The default password is 1234."}
                </p>
                <div className="max-w-xs">
                  <input
                    type="text"
                    value={restForm.admin_password || ""}
                    onChange={(e) =>
                      setRestForm({ ...restForm, admin_password: e.target.value })
                    }
                    className="w-full bg-white border border-slate-250 rounded-xl px-4 py-2.5 text-xs font-black outline-emerald-600 tracking-widest text-slate-800"
                    placeholder="1234"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer flex items-center gap-2 text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("save")}</span>
                </button>
              </div>
            </form>

            {/* BACKUP & EXPORT/IMPORT SECTION */}
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">💾</span>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950">
                    {currentLang === "ar"
                      ? "النسخ الاحتياطي وتصدير البيانات"
                      : currentLang === "ku"
                      ? "پاشەکەوتکردن و ناردنی داتا (Backup)"
                      : "Cloud-Safe Backup & Export"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentLang === "ar"
                      ? "قم بتصدير مينيوي الخاص بك لحفظه بشكل آمن أو إرساله إلى المطور لتطبيقه كقاعدة ثابتة."
                      : currentLang === "ku"
                      ? "داتاکانت هەناردە یان پاشەکەوت بکە بۆ ئەوەی بۆ پەرەپێدەر بنێریت تا بە هەمیشەیی دایبنێت."
                      : "Export or restore your custom menu items, pricing, and images safely to avoid losing data."}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <p className="text-2xs font-bold text-slate-700 leading-relaxed uppercase tracking-wider">
                    {currentLang === "ar"
                      ? "💡 كيف تعمل عملية الحفظ؟"
                      : currentLang === "ku"
                      ? "💡 داتاکان لە کوێ پاشەکەوت دەبن؟"
                      : "💡 Where is your customized data stored?"}
                  </p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentLang === "ar"
                    ? "يتم حفظ كافة تعديلاتك (الأسعار، الأطباق الجديدة، الصور) في متصفحك الحالي فقط. لحمايتها من الضياع أو لمشاركتها معنا لحفظها لك بشكل دائم، انسخ كود النسخ الاحتياطي أدناه والصقه لنا في المحادثة مباشرة!"
                    : currentLang === "ku"
                    ? "هەموو گۆڕانکارییەکانت لەسەر وێبگەڕەکەت پاشەکەوت دەبن. بۆ پاراستنیان یان بۆ ناردنی بۆ ئێمە تا بە هەمیشەیی جێگیری بکەین، ئەم کۆدە کۆپی بکە و لە چاتی نێوانماندا بۆمان بنێرە!"
                    : "Currently, your custom prices, new categories, and images are stored in your browser's Local Storage. To avoid data loss or to send it to us so we can hardcode it into the system permanently, simply click the copy button below and paste the code directly in our chat!"}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyBackup}
                    className="bg-slate-900 hover:bg-slate-950 text-white font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-xs cursor-pointer shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>
                      {copiedBackup
                        ? (currentLang === "ar" ? "✓ تم النسخ!" : currentLang === "ku" ? "✓ کۆپی کرا!" : "✓ Copied!")
                        : (currentLang === "ar" ? "نسخ كود البيانات" : currentLang === "ku" ? "کۆپیکردنی دەقی داتا" : "Copy Backup Code")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-xs cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === "ar"
                        ? "تحميل ملف البيانات (JSON)"
                        : currentLang === "ku"
                        ? "دابەزاندنی فایلی داتا (JSON)"
                        : "Download Backup File (.json)"}
                    </span>
                  </button>
                </div>

                {/* Textarea representation of JSON for visual confirmation and manually copy */}
                <div className="space-y-1.5">
                  <label className="block text-2xs font-extrabold text-slate-500 uppercase tracking-widest">
                    {currentLang === "ar" ? "محتوى كود النسخة الاحتياطية (JSON):" : currentLang === "ku" ? "دەقی کۆدی پاشەکەوت (JSON):" : "Raw JSON Backup Code:"}
                  </label>
                  <textarea
                    readOnly
                    rows={4}
                    value={generateBackupData()}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    className="w-full bg-slate-950 text-emerald-400 font-mono text-3xs p-3 rounded-xl border border-slate-800 outline-none select-all resize-y"
                  />
                  <span className="text-3xs text-slate-400 block font-semibold">
                    {currentLang === "ar"
                      ? "💡 نصيحة: انقر داخل المربع الأسود لتحديد الكود بالكامل ونسخه يدوياً بمفردك."
                      : currentLang === "ku"
                      ? "💡 ڕێنمایی: کلیک لەسەر ناو سندوقە ڕەشەکە بکە بۆ دیاریکردنی هەموو کۆدەکە بەیەکەوە."
                      : "💡 Tip: Click inside the dark box to select all text for manual copy."}
                  </span>
                </div>
              </div>

              {/* RESTORE AREA */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-base">🔄</span>
                  <span className="font-extrabold text-slate-800 text-sm">
                    {currentLang === "ar"
                      ? "استيراد وتطبيق نسخة احتياطية سابقة"
                      : currentLang === "ku"
                      ? "هاوردەکردن و جێبەجێکردنی داتای یەدەگ"
                      : "Restore from an existing backup code"}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  {currentLang === "ar"
                    ? "إذا كان لديك كود نسخة احتياطية تم حفظها سابقاً، الصق الكود في المربع أدناه ثم انقر على تطبيق لاستعادتها فوراً."
                    : currentLang === "ku"
                    ? "ئەگەر دەقی کۆپی یەدەگی پێشووت هەیە، لە سندوقی خوارەوەدا بیلکێنە و کرتە لەسەر جێبەجێکردن بکە بۆ گەڕاندنەوەی مینیوەکەت."
                    : "If you have a previous backup code, paste it in the box below and click restore to load all of your menu items, categories, and settings."}
                </p>

                <div className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder='{"categories": [...], "menuItems": [...], ...}'
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    dir="ltr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono outline-emerald-600 focus:bg-white transition-all resize-y"
                  />

                  {importError && (
                    <div className="text-red-600 bg-red-50 px-3.5 py-2.5 rounded-lg text-xs flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{importError}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleImportBackup}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs text-xs cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === "ar"
                        ? "استيراد واستعادة البيانات"
                        : currentLang === "ku"
                        ? "هاوردەکردن و گەڕاندنەوەی مینیو"
                        : "Import & Restore Backup"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: MANAGE CATEGORIES ----------------- */}
        {activeTab === "categories" && (
          <div id="section-categories" className="max-w-4xl mx-auto space-y-6">
            {/* Split layout: Edit/Add form & categories list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Category creation / edit sidebar form */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-950 pb-2 border-b border-slate-50">
                  {editingCatId ? t("edit") : t("add_category")}
                </h3>

                <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("name_ku")} 🇹🇯
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={catForm.name_ku}
                      onChange={(e) => setCatForm({ ...catForm, name_ku: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-emerald-600 font-medium"
                      placeholder="ناوى پۆلێنکردنەکە بنووسە..."
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("name_ar")} 🇮🇶
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={catForm.name_ar}
                      onChange={(e) => setCatForm({ ...catForm, name_ar: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-emerald-600 font-medium"
                      placeholder="اسم الفئة بالعربية..."
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      {t("name_en")} 🇬🇧
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={catForm.name_en}
                      onChange={(e) => setCatForm({ ...catForm, name_en: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-emerald-600 font-medium font-sans text-xs"
                      placeholder="Category name in English..."
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                      <span>Category Image URL 🖼️</span>
                      <span className="text-emerald-600 text-[10px] lowercase font-semibold">Or upload below</span>
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={catForm.image || ""}
                      onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-emerald-600 font-mono text-xs mb-2"
                      placeholder="https://images.unsplash.com/... or leave blank"
                    />

                    {/* Device File Pick */}
                    <div className="flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        id="cat-device-file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 3.0 * 1024 * 1024) {
                              alert("File too large (max 3MB).");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCatForm({ ...catForm, image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label
                        htmlFor="cat-device-file"
                        className="w-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-2xs font-bold transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 text-slate-500" />
                        <span>Upload from Device (PC/Phone)</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl cursor-pointer text-center text-xs transition-colors"
                    >
                      {editingCatId ? t("save") : t("continue")}
                    </button>
                    {(editingCatId || isAddingCat) && (
                      <button
                        type="button"
                        onClick={clearCatForm}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3.5 rounded-xl cursor-pointer text-xs"
                      >
                        {t("cancel")}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Categories list table */}
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 md:col-span-2 overflow-hidden">
                <h3 className="font-extrabold text-base text-slate-950 pb-3 border-b border-slate-50 mb-4">
                  Existing Categories ({categories.length})
                </h3>

                <div className="divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-3xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <th className="pb-3 text-left">Preview</th>
                        <th className="pb-3 text-left">🇬🇧 EN</th>
                        <th className="pb-3 text-right">🇮🇶 AR</th>
                        <th className="pb-3 text-right">🇹🇯 KU</th>
                        <th className="pb-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {categories.map((cat) => (
                        <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 pl-1 pr-2 text-left">
                            <img
                              src={cat.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100"}
                              alt={cat.name_en}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                          </td>
                          <td className="py-3.5 px-2 text-left text-xs font-semibold text-slate-900">{cat.name_en}</td>
                          <td className="py-3.5 px-2 text-right text-xs" style={{ direction: "rtl" }}>{cat.name_ar}</td>
                          <td className="py-3.5 px-2 text-right text-xs" style={{ direction: "rtl" }}>{cat.name_ku}</td>
                          <td className="py-3.5 px-2 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => startEditCategory(cat)}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-emerald-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat.id)}
                                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: MANAGE MENU ITEMS (DISHES) ----------------- */}
        {activeTab === "items" && (
          <div id="section-menu-items" className="space-y-6">
            {/* Quick Action bar */}
            <div className="flex justify-between items-center bg-white border border-slate-200/60 p-4 rounded-xl">
              <span className="text-xs font-bold text-slate-500">
                Menu dishes counted: <strong className="text-slate-800">{menuItems.length}</strong>
              </span>
              {!isAddingItem && !editingItemId && (
                <button
                  id="add-item-trigger-btn"
                  onClick={() => {
                    setIsAddingItem(true);
                    setEditingItemId(null);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t("add_new")}</span>
                </button>
              )}
            </div>

            {/* Adding or Editing Dish Form Panel */}
            {(isAddingItem || editingItemId) && (
              <div id="item-form-container" className="bg-white border-2 border-emerald-500 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto animation-in slide-in-from-top-4 duration-300">
                <div className="mb-6 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-950">
                      {editingItemId ? "Edit Dish Translations" : "Create New Multilingual Dish"}
                    </h3>
                    <p className="text-2xs text-slate-500 mt-0.5">Please add information for all three languages below.</p>
                  </div>
                  <button
                    onClick={clearItemForm}
                    className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-bold text-slate-600 transition-colors"
                  >
                    {t("cancel")}
                  </button>
                </div>

                <form onSubmit={handleSaveItem} className="space-y-6">
                  {/* Common Properties fields (Category, Price, Image, Code) */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-bold">
                    <div className="sm:col-span-2">
                      <label className="block text-2xs text-slate-500 uppercase tracking-wider mb-1.5">
                        {t("category_select")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={itemForm.category_id}
                        onChange={(e) => setItemForm({ ...itemForm, category_id: e.target.value })}
                        className="w-full bg-white border border-slate-250 p-2.5 rounded-lg outline-emerald-600 text-slate-700 font-medium"
                        required
                      >
                        <option value="">-- Choose Category --</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name_en} / {c.name_ku}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-2xs text-slate-500 uppercase tracking-wider mb-1.5">
                        {t("item_price")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={itemForm.price || ""}
                        onChange={(e) =>
                          setItemForm({ ...itemForm, price: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full bg-white border border-slate-250 p-2.5 rounded-lg outline-emerald-600 font-medium"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-center p-3.5 bg-white border border-slate-150 rounded-lg">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={itemForm.available}
                          onChange={(e) =>
                            setItemForm({ ...itemForm, available: e.target.checked })
                          }
                          className="w-4.5 h-4.5 accent-emerald-600 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-slate-700">{t("item_available")}</span>
                      </label>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-2xs text-slate-500 uppercase tracking-wider mb-1.5 flex justify-between items-center">
                        <span>{t("item_image")} (Unsplash Image URL)</span>
                        <span className="text-emerald-600 text-[10px] lowercase font-semibold">Or upload from device below</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 flex gap-2">
                          <input
                            type="url"
                            value={itemForm.image}
                            onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                            className="flex-1 bg-white border border-slate-250 p-2.5 rounded-lg outline-emerald-600 font-medium font-mono text-slate-600 text-xs"
                            placeholder="https://images.unsplash.com/photo-..."
                          />
                          <button
                            type="button"
                            onClick={() => {
                              // Populate a lovely random high-quality food photo
                              const placeholders = [
                                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600",
                                "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600",
                                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600",
                                "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600",
                                "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600"
                              ];
                              const randIdx = Math.floor(Math.random() * placeholders.length);
                              setItemForm({ ...itemForm, image: placeholders[randIdx] });
                            }}
                            className="bg-slate-200 hover:bg-slate-300 px-3 rounded-lg flex items-center justify-center gap-1.5 text-slate-700 cursor-pointer text-xs font-bold shrink-0"
                            title="Generate high quality picture placeholder"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Auto Image</span>
                          </button>
                        </div>

                        {/* Device File Pick */}
                        <div className="flex items-center">
                          <input
                            type="file"
                            accept="image/*"
                            id="dish-device-file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 3.0 * 1024 * 1024) {
                                  alert("File too large (max 3MB). Phone/camera pictures can be compressed or chosen in a standard format.");
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setItemForm({ ...itemForm, image: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <label
                            htmlFor="dish-device-file"
                            className="w-full bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 border border-emerald-250 px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold transition-all shrink-0"
                          >
                            <Camera className="w-4 h-4 text-emerald-600" />
                            <span>Upload from Device (PC/Phone)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Languages translation input section side-by-side tabs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold">
                    {/* Kurdish Sorani fields */}
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex flex-col space-y-4">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200/60 font-bold text-emerald-800">
                        <span>🇹🇯</span>
                        <span>{t("tab_kurdish")}</span>
                      </div>

                      <div>
                        <label className="block text-3xs text-slate-400 uppercase tracking-wider mb-1">
                          {t("title_ku")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={itemForm.title_ku}
                          onChange={(e) => setItemForm({ ...itemForm, title_ku: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                          placeholder="ناوى خواردن یان خواردنەوەکە..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-3xs text-slate-400 uppercase tracking-wider mb-1">
                          {t("desc_ku")}
                        </label>
                        <textarea
                          rows={4}
                          dir="rtl"
                          value={itemForm.description_ku}
                          onChange={(e) =>
                            setItemForm({ ...itemForm, description_ku: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                          placeholder="باسی پێکهاتە یان تام و چێژەکەی بکە..."
                        />
                      </div>
                    </div>

                    {/* Arabic fields */}
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex flex-col space-y-4">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200/60 font-bold text-emerald-800">
                        <span>🇮🇶</span>
                        <span>{t("tab_arabic")}</span>
                      </div>

                      <div>
                        <label className="block text-3xs text-slate-400 uppercase tracking-wider mb-1">
                          {t("title_ar")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={itemForm.title_ar}
                          onChange={(e) => setItemForm({ ...itemForm, title_ar: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                          placeholder="عنوان الوجبة أو المشروب..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-3xs text-slate-400 uppercase tracking-wider mb-1">
                          {t("desc_ar")}
                        </label>
                        <textarea
                          rows={4}
                          dir="rtl"
                          value={itemForm.description_ar}
                          onChange={(e) =>
                            setItemForm({ ...itemForm, description_ar: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                          placeholder="اكتب وصفاً أو مكونات الطبق..."
                        />
                      </div>
                    </div>

                    {/* English fields */}
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 flex flex-col space-y-4">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200/60 font-bold text-emerald-800">
                        <span>🇬🇧</span>
                        <span>{t("tab_english")}</span>
                      </div>

                      <div>
                        <label className="block text-3xs text-slate-400 uppercase tracking-wider mb-1">
                          {t("title_en")} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          dir="ltr"
                          value={itemForm.title_en}
                          onChange={(e) => setItemForm({ ...itemForm, title_en: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                          placeholder="Plate or drink name..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-3xs text-slate-400 uppercase tracking-wider mb-1">
                          {t("desc_en")}
                        </label>
                        <textarea
                          rows={4}
                          dir="ltr"
                          value={itemForm.description_en}
                          onChange={(e) =>
                            setItemForm({ ...itemForm, description_en: e.target.value })
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                          placeholder="Explain materials, taste or style..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submission and abort block */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={clearItemForm}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-5 py-2.5 rounded-xl cursor-pointer text-xs"
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer text-xs shadow-md transition-colors"
                    >
                      {editingItemId ? "Save Dish Changes" : "Create Multilingual Dish"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List and table of current Dishes */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 overflow-hidden">
              <h3 className="font-extrabold text-base text-slate-950 pb-3 border-b border-slate-50 mb-4">
                Dishes Catalog
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item) => {
                  const itemCat = categories.find((c) => c.id === item.category_id);
                  return (
                    <div
                      key={item.id}
                      className="border border-slate-100 hover:border-slate-200 p-4 rounded-xl flex items-start gap-4 transition-all hover:bg-slate-50/30"
                    >
                      {/* Image Preview */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150"}
                          alt={item.title_en}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content column */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-3xs font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                            {itemCat?.name_en || "General"}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-slate-900 truncate mt-1">
                          {item.title_ku || item.title_en}
                        </h4>
                        <p className="font-mono text-2xs text-slate-500 font-semibold mt-0.5 mt-0.5">
                          {formatPrice(item.price, currentLang)}
                        </p>

                        {/* Translation status boxes */}
                        <div className="flex items-center gap-2.5 mt-2.5">
                          {/* EN Status badge */}
                          <span
                            className={`text-3xs font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 ${
                              item.title_en ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            }`}
                            title={item.title_en ? `EN title: ${item.title_en}` : "Missing English translations"}
                          >
                            <span>🇬🇧</span>
                            <span>{item.title_en ? "OK" : "Empty"}</span>
                          </span>

                          <span
                            className={`text-3xs font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 ${
                              item.title_ar ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            }`}
                            title={item.title_ar ? `AR title: ${item.title_ar}` : "Missing Arabic translations"}
                          >
                            <span>🇮🇶</span>
                            <span>{item.title_ar ? "OK" : "Empty"}</span>
                          </span>

                          <span
                            className={`text-3xs font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 ${
                              item.title_ku ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                            }`}
                            title={item.title_ku ? `KU title: ${item.title_ku}` : "Missing Kurdish translations"}
                          >
                            <span>🇹🇯</span>
                            <span>{item.title_ku ? "OK" : "Empty"}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Hand Side Actions for item */}
                      <div className="flex flex-col items-end gap-2.5 justify-between h-full shrink-0">
                        {/* Toggle state switch */}
                        <button
                          onClick={() => toggleItemAvailability(item)}
                          className={`p-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 text-2xs font-bold ${
                            item.available
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-slate-400 hover:bg-slate-100"
                          }`}
                          title={item.available ? "Mark sold out" : "Mark available"}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                          <span>{item.available ? t("available") : t("sold_out")}</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => startEditItem(item)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-red-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
