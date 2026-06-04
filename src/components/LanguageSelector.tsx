/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LANGUAGES, LanguageCode } from "../types";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LanguageSelectorProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export default function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = LANGUAGES[currentLang] || LANGUAGES.ku;

  return (
    <div id="lang-selector-container" className="relative z-50 text-sm" ref={dropdownRef}>
      <button
        id="lang-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs px-2.5 py-1.5 rounded-full transition-all text-slate-700 font-bold cursor-pointer text-xs uppercase"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <span>{selected.flag}</span>
        <span>{selected.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          id="lang-dropdown-menu"
          className={`absolute mt-2 w-32 bg-white border border-slate-200 rounded-2xl shadow-xl py-1 animate-in fade-in slide-in-from-top-1 duration-150 ${
            selected.dir === "rtl" ? "left-0" : "right-0"
          }`}
        >
          {Object.values(LANGUAGES).map((lang) => {
            const isActive = lang.code === currentLang;
            return (
              <button
                id={`lang-opt-${lang.code}`}
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-bold transition-colors cursor-pointer ${
                  lang.dir === "rtl" ? "text-right" : "text-left"
                } ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-extrabold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                style={{ direction: lang.dir }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
