/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, LANGUAGES, LanguageCode, formatPrice } from "../types";
import { useTranslation } from "react-i18next";
import { X, MapPin, Tag, Globe, Sparkles, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DishDetailModalProps {
  item: MenuItem;
  categoryName: string;
  currentLang: LanguageCode;
  onClose: () => void;
}

export default function DishDetailModal({ item, categoryName, currentLang, onClose }: DishDetailModalProps) {
  const { t } = useTranslation();
  const selectedLang = LANGUAGES[currentLang] || LANGUAGES.ku;
  
  // Local state to toggle description languages within the modal detail pane
  const [activeLangTab, setActiveLangTab] = useState<LanguageCode>(currentLang);

  const getTitle = (lang: LanguageCode) => {
    if (lang === "ar") return item.title_ar || item.title_en;
    if (lang === "ku") return item.title_ku || item.title_en;
    return item.title_en;
  };

  const getDescription = (lang: LanguageCode) => {
    if (lang === "ar") return item.description_ar || item.description_en;
    if (lang === "ku") return item.description_ku || item.description_en;
    return item.description_en;
  };

  const selectedTitle = getTitle(activeLangTab);
  const selectedDesc = getDescription(activeLangTab) || t("no_results");

  return (
    <div
      id="dish-detail-overlay"
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 z-[99] animate-in fade-in duration-300"
    >
      <div
        id="dish-detail-card"
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row"
        style={{ direction: LANGUAGES[activeLangTab].dir }}
      >
        {/* Large Enlarged Photo Block */}
        <div className="md:w-1/2 h-64 md:h-auto relative bg-slate-100">
          <img
            id="dish-detail-large-img"
            src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"}
            alt={getTitle(currentLang)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Availability badge floating over the image */}
          <span
            className={`absolute top-4 ${
              LANGUAGES[activeLangTab].dir === "rtl" ? "right-4" : "left-4"
            } leading-none text-xs font-bold uppercase tracking-wider ${
              item.available ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            } px-3 py-1.5 rounded-full shadow-md`}
          >
            {item.available ? t("available") : t("sold_out")}
          </span>
          
          {/* Close button inside image layout on mobile / floating */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${
              LANGUAGES[activeLangTab].dir === "rtl" ? "left-4" : "right-4"
            } bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors backdrop-blur-xs cursor-pointer shadow-md`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            {/* Category tag */}
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-3xs uppercase tracking-wider font-extrabold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md">
                {categoryName}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-3xs font-semibold text-slate-400 capitalize">
                {LANGUAGES[activeLangTab].name} View
              </span>
            </div>

            {/* Title */}
            <h2
              id="dish-detail-title"
              className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug mb-3"
              style={{ fontFamily: LANGUAGES[activeLangTab].fontFamily }}
            >
              {selectedTitle}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-1.5 mb-5">
              <span className="text-slate-400 text-xs font-medium">{t("price")}:</span>
              <span className="text-2xl font-black text-emerald-700">
                {formatPrice(item.price, currentLang)}
              </span>
            </div>

            {/* Interactive Translation tabs inside Details Dialog for professional flair! */}
            <div className="bg-slate-50 p-1 rounded-xl flex border border-slate-100 mb-4 text-2xs font-bold gap-1">
              {Object.values(LANGUAGES).map((lang) => {
                const isSelected = activeLangTab === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLangTab(lang.code)}
                    className={`flex-1 py-2 px-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      isSelected
                        ? "bg-white text-slate-800 shadow-xs ring-1 ring-slate-205"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.nativeName}</span>
                  </button>
                );
              })}
            </div>

            {/* Paragraph Description */}
            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 max-h-40 overflow-y-auto mb-6">
              <p
                id="dish-detail-desc"
                className="text-slate-600 text-sm leading-relaxed"
                style={{ fontFamily: LANGUAGES[activeLangTab].fontFamily }}
              >
                {selectedDesc}
              </p>
            </div>
          </div>

          {/* Action button bar */}
          <div className="border-t border-slate-100 pt-4 flex gap-3">
            <button
              onClick={onClose}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer text-sm"
              style={{ fontFamily: selectedLang.fontFamily }}
            >
              {t("continue")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
