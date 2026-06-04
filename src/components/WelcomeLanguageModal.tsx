/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LANGUAGES, LanguageCode } from "../types";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { useState } from "react";

interface WelcomeLanguageModalProps {
  onSelect: (lang: LanguageCode) => void;
}

export default function WelcomeLanguageModal({ onSelect }: WelcomeLanguageModalProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<LanguageCode>("ku"); // Default to Kurdish Sorani as requested

  const list = Object.values(LANGUAGES);

  return (
    <div
      id="welcome-modal-overlay"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] animate-in fade-in duration-305"
    >
      <div
        id="welcome-card"
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden p-6 md:p-8 animate-in zoom-in-95 duration-200"
        style={{ direction: LANGUAGES[selected].dir }}
      >
        <div id="welcome-header" className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <span className="text-3xl">🍽️</span>
          </div>
          <h2
            id="welcome-title"
            className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight"
            style={{ fontFamily: LANGUAGES[selected].fontFamily }}
          >
            {t("welcome_title")}
          </h2>
          <p
            id="welcome-subtitle"
            className="text-sm text-slate-500 mt-2 leading-relaxed"
            style={{ fontFamily: LANGUAGES[selected].fontFamily }}
          >
            {t("welcome_subtitle")}
          </p>
        </div>

        <div id="language-options-list" className="space-y-3 mb-6">
          {list.map((lang) => {
            const isSelected = selected === lang.code;
            return (
              <button
                id={`welcome-lang-btn-${lang.code}`}
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                  lang.dir === "rtl" ? "flex-row-reverse text-right" : "flex-row text-left"
                } ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
                style={{ direction: lang.dir, fontFamily: lang.fontFamily }}
              >
                <div
                  className={`flex items-center gap-3 ${
                    lang.dir === "rtl" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className={lang.dir === "rtl" ? "text-right" : "text-left"}>
                    <p className="font-black text-slate-900 text-base">{lang.nativeName}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          id="welcome-submit-btn"
          onClick={() => onSelect(selected)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white py-3.5 rounded-2xl font-semibold tracking-wide transition-all shadow-md shadow-emerald-600/15 cursor-pointer flex justify-center items-center gap-2"
          style={{ fontFamily: LANGUAGES[selected].fontFamily }}
        >
          <span>{t("continue")}</span>
        </button>
      </div>
    </div>
  );
}
