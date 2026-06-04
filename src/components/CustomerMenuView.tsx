/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LANGUAGES, LanguageCode, Category, MenuItem, RestaurantSettings, formatPrice } from "../types";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { MapPin, Eye, Settings, EyeOff, AlertTriangle, Sparkles, QrCode } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import DishDetailModal from "./DishDetailModal";

interface CustomerMenuViewProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  categories: Category[];
  menuItems: MenuItem[];
  settings: RestaurantSettings;
  onSwitchToAdmin: () => void;
  onShowQR: () => void;
}

export default function CustomerMenuView({
  currentLang,
  onLanguageChange,
  categories,
  menuItems,
  settings,
  onSwitchToAdmin,
  onShowQR
}: CustomerMenuViewProps) {
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);

  const selectedLang = LANGUAGES[currentLang] || LANGUAGES.ku;

  // Retrieve translation fields based on language helper
  const getCategoryName = (cat: Category) => {
    if (currentLang === "ar") return cat.name_ar || cat.name_en;
    if (currentLang === "ku") return cat.name_ku || cat.name_en;
    return cat.name_en;
  };

  const getItemTitle = (item: MenuItem) => {
    if (currentLang === "ar") return item.title_ar || item.title_en;
    if (currentLang === "ku") return item.title_ku || item.title_en;
    return item.title_en;
  };

  const getItemDescription = (item: MenuItem) => {
    if (currentLang === "ar") return item.description_ar || item.description_en;
    if (currentLang === "ku") return item.description_ku || item.description_en;
    return item.description_en;
  };

  const getRestName = () => {
    if (currentLang === "ar") return settings.restaurant_name_ar || settings.restaurant_name_en;
    if (currentLang === "ku") return settings.restaurant_name_ku || settings.restaurant_name_en;
    return settings.restaurant_name_en;
  };

  const getRestDescription = () => {
    if (currentLang === "ar") return settings.description_ar || settings.description_en;
    if (currentLang === "ku") return settings.description_ku || settings.description_en;
    return settings.description_en;
  };

  const getRestAddress = () => {
    if (currentLang === "ar") return settings.address_ar || settings.address_en;
    if (currentLang === "ku") return settings.address_ku || settings.address_en;
    return settings.address_en;
  };

  // Filter items
  const filteredItems = useMemo(() => {
    let result = menuItems;

    // Filter by Category
    if (selectedCategoryId !== "all") {
      result = result.filter(item => item.category_id === selectedCategoryId);
    }

    return result;
  }, [menuItems, selectedCategoryId]);

  return (
    <div
      id="customer-menu-view"
      className="min-h-screen bg-slate-50 text-slate-800 pb-20 transition-all duration-300"
      style={{ direction: selectedLang.dir, fontFamily: selectedLang.fontFamily }}
    >
      {/* Upper Utility Navbar */}
      <div id="customer-nav" className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥗</span>
            <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
              {getRestName()}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Live QR Button */}
            <button
              id="show-qr-nav-btn"
              onClick={onShowQR}
              className="p-2 bg-slate-100 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 rounded-full transition-colors cursor-pointer"
              title={t("qr_btn")}
            >
              <QrCode className="w-4 h-4" />
            </button>

            {/* Language Selection Dropdown */}
            <LanguageSelector currentLang={currentLang} onLanguageChange={onLanguageChange} />

            {/* Control Panel Switcher */}
            <button
              id="switch-admin-btn"
              onClick={onSwitchToAdmin}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("admin_panel")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Block */}
      <div id="customer-hero" className="relative overflow-hidden bg-slate-950 text-white py-2.5 px-4 text-center">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-950/45 to-slate-950 opacity-90 z-0"></div>
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-1.5 relative z-10 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-medium">{getRestAddress()}</span>
        </div>
      </div>

      {/* Search and Category Filter Container */}
      <div id="menu-browsing-area" className="max-w-5xl mx-auto px-4 mt-8 pb-12">
        {selectedCategoryId === "all" ? (
          <div>
            {/* Header section on Home/Categories Index page */}
            <div className="text-center mb-10 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {currentLang === "ar"
                  ? "تصفح قائمة الطعام"
                  : currentLang === "ku"
                  ? "پۆلێنەکانی مینیو تاقیکەرەوە"
                  : "Explore Our Menu Categories"}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                {currentLang === "ar"
                  ? "اختر قسماً رئيسياً لعرض أشهى المأكولات والمشروبات والحلويات المتاحة حالياً."
                  : currentLang === "ku"
                  ? "یەکێک لە پۆلێنە سەرەکییەکان هەڵبژێرە بۆ بینینی بەتامترین خۆراک و خواردنەوەی سەر بەو بابەتە."
                  : "Select a main category to explore delicious warm dishes, wood-fired pizzas, traditional grills, desserts, and cold beverages."}
              </p>
            </div>

            {/* Gorgeous Bento Category Cards Grid */}
            <div id="categories-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((cat) => {
                const count = menuItems.filter((i) => i.category_id === cat.id).length;
                const countText =
                  currentLang === "ar"
                    ? `${count} صنف`
                    : currentLang === "ku"
                    ? `${count} بابەت`
                    : `${count} Items`;

                return (
                  <div
                    id={`cat-card-mosaic-${cat.id}`}
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-350 cursor-pointer border border-slate-100/50 bg-slate-900"
                  >
                    {/* High-res category cover image with beautiful dynamic zoom */}
                    <img
                      src={cat.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"}
                      alt={getCategoryName(cat)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient overlay layout maintaining top contrast & premium dark-screen bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/10 transition-opacity duration-300 group-hover:via-slate-950/45"></div>

                    {/* Content bottom-anchored */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-white select-none">
                      {/* Sub-badge indicating length of items in database */}
                      <span className="inline-flex items-center self-start text-4xs font-black uppercase tracking-widest bg-emerald-550/20 text-emerald-450 border border-emerald-500/25 px-2.5 py-1 rounded-md mb-2 bg-emerald-600/20">
                        {countText}
                      </span>

                      {/* Title display header */}
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                        {getCategoryName(cat)}
                      </h3>

                      {/* Hover action banner hint */}
                      <span className="text-3xs text-slate-350 font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {currentLang === "ar"
                          ? "اضغط للاستكشاف ←"
                          : currentLang === "ku"
                          ? "کلیک بکە بۆ تاقیکردنەوە ←"
                          : "Click to Explore →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            {/* 1. Header with back button & current chosen category name */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
              <button
                onClick={() => setSelectedCategoryId("all")}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-black text-xs sm:text-sm transition-colors cursor-pointer group uppercase tracking-wider"
              >
                <span className="transition-transform group-hover:-translate-x-1 duration-200">
                  {selectedLang.dir === "rtl" ? "→" : "←"}
                </span>
                <span>
                  {currentLang === "ar"
                    ? "← العودة إلى الأقسام الرئيسية"
                    : currentLang === "ku"
                    ? "← بگەڕێوە بۆ پۆلێنە گشتییەکان"
                    : "← Back to Categories"}
                </span>
              </button>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {getCategoryName(categories.find((c) => c.id === selectedCategoryId) || categories[0])}
              </h2>
            </div>

            {/* 2. Dish Menu Cards Grid of the active Selected Category only */}
            <div id="menu-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.map((item) => {
                const hasDesc = getItemDescription(item).trim() !== "";
                return (
                  <div
                    id={`dish-card-${item.id}`}
                    key={item.id}
                    className={`bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col sm:flex-row h-full relative ${
                      !item.available ? "opacity-75" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div
                      onClick={() => setActiveDetailItem(item)}
                      className="w-full sm:w-44 h-48 sm:h-full relative overflow-hidden shrink-0 bg-slate-100 cursor-pointer group"
                      title="Click to view details"
                    >
                      <img
                        id={`dish-img-${item.id}`}
                        src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"}
                        alt={getItemTitle(item)}
                        className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      {/* Hover indicator overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-950/25 transition-all duration-300 flex items-center justify-center">
                        <Eye className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 drop-shadow-md" />
                      </div>
                      {/* Category overlay */}
                      <span className={`absolute top-3 leading-none text-2xs font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-full ${
                        selectedLang.dir === "rtl" ? "right-3" : "left-3"
                      }`}>
                        {getCategoryName(categories.find((c) => c.id === item.category_id) || categories[0])}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        {/* Title & Sold out badge */}
                        <div className="flex items-start justify-between gap-2.5 mb-1.5">
                          <h3
                            id={`dish-title-${item.id}`}
                            className="font-bold text-slate-900 text-base sm:text-lg leading-snug"
                          >
                            {getItemTitle(item)}
                          </h3>
                          {!item.available && (
                            <span className="shrink-0 text-3xs font-extrabold px-2 py-0.5 bg-red-100 text-red-700 border border-red-200/50 rounded-sm">
                              {t("sold_out")}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {hasDesc && (
                          <p
                            id={`dish-desc-${item.id}`}
                            className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3"
                          >
                            {getItemDescription(item)}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto">
                        {/* Price Tag */}
                        <div>
                          <span className="text-3xs text-slate-400 font-semibold block uppercase tracking-wider">{t("price")}</span>
                          <span className="font-extrabold text-slate-900 text-lg">
                            {formatPrice(item.price, currentLang)}
                          </span>
                        </div>

                        {/* Simple badge status icon */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <span className={`w-2 h-2 rounded-full ${item.available ? "bg-emerald-500" : "bg-red-400"}`}></span>
                          <span>{item.available ? t("available") : t("sold_out")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty is impossible unless deleted by owner, handle cleanly */}
            {filteredItems.length === 0 && (
              <div id="empty-results" className="text-center py-16 bg-white rounded-3xl border border-slate-100 max-w-md mx-auto p-6 mt-8">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100 text-amber-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <p className="text-slate-700 font-bold mb-1.5 text-base">{t("no_results")}</p>
                <button
                  onClick={() => { setSelectedCategoryId("all"); }}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-semibold hover:underline cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Styled Footer */}
      <footer id="customer-footer" className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className={selectedLang.dir === "rtl" ? "md:text-right" : "md:text-left"}>
            <p className="font-bold text-white text-base mb-1">{getRestName()}</p>
            <p className="text-xs text-slate-400 max-w-sm">{getRestDescription()}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-xs">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-white font-medium">{t("address")}</span>
            </div>
            <p className="text-slate-400 text-left md:text-right max-w-xs">{getRestAddress()}</p>
          </div>
        </div>

        <div className="border-t border-slate-800 max-w-5xl mx-auto mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-2xs">
          <p>© 2026 {getRestName()}. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={onSwitchToAdmin} className="hover:text-white transition-colors cursor-pointer font-medium">
              {t("admin_panel")}
            </button>
            <span>•</span>
            <button onClick={onShowQR} className="hover:text-white transition-colors cursor-pointer font-medium">
              {t("qr_btn")}
            </button>
          </div>
        </div>
      </footer>

      {/* Enlarged Photo and Translation Details Modal */}
      {activeDetailItem && (
        <DishDetailModal
          item={activeDetailItem}
          categoryName={getCategoryName(
            categories.find((c) => c.id === activeDetailItem.category_id) || categories[0]
          )}
          currentLang={currentLang}
          onClose={() => setActiveDetailItem(null)}
        />
      )}
    </div>
  );
}
