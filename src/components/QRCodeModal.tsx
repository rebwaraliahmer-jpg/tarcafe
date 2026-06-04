/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LANGUAGES, LanguageCode } from "../types";
import { useTranslation } from "react-i18next";
import { X, QrCode, Download, ExternalLink } from "lucide-react";

interface QRCodeModalProps {
  currentLang: LanguageCode;
  onClose: () => void;
}

export default function QRCodeModal({ currentLang, onClose }: QRCodeModalProps) {
  const { t } = useTranslation();
  const currentUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    currentUrl
  )}&color=059669`; // emerald-600 color

  const selectedLang = LANGUAGES[currentLang] || LANGUAGES.ku;

  return (
    <div
      id="qr-modal-overlay"
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-[99] animate-in fade-in duration-200"
    >
      <div
        id="qr-modal-card"
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden p-6 animate-in zoom-in-95 duration-150 relative text-center"
        style={{ direction: selectedLang.dir }}
      >
        <button
          id="qr-close-btn"
          onClick={onClose}
          className={`absolute top-4 ${
            selectedLang.dir === "rtl" ? "left-4" : "right-4"
          } p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center items-center gap-2 mb-4 mt-2">
          <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
            <QrCode className="w-5 h-5 text-emerald-600" />
          </div>
          <h3
            id="qr-title"
            className="text-lg font-bold text-slate-800"
            style={{ fontFamily: selectedLang.fontFamily }}
          >
            {t("qr_title")}
          </h3>
        </div>

        <p
          id="qr-desc"
          className="text-xs text-slate-500 leading-relaxed px-2 mb-6"
          style={{ fontFamily: selectedLang.fontFamily }}
        >
          {t("qr_desc")}
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 inline-block mx-auto mb-6">
          <img
            id="qr-image"
            src={qrCodeUrl}
            alt="Restaurant Menu QR Code"
            className="w-48 h-48 mx-auto rounded-lg shadow-xs"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="bg-slate-50/80 rounded-xl px-3.5 py-2.5 mb-6 text-left break-all text-2xs font-mono text-slate-500 border border-slate-100 flex items-center justify-between gap-2">
          <span className="truncate">{currentUrl}</span>
          <button
            onClick={() => window.open(currentUrl, "_blank")}
            className="text-emerald-600 hover:text-emerald-700 cursor-pointer p-1 rounded-md hover:bg-slate-200/50 flex-shrink-0"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            id="qr-dl-btn"
            onClick={() => window.open(qrCodeUrl, "_blank")}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            style={{ fontFamily: selectedLang.fontFamily }}
          >
            <Download className="w-4 h-4" />
            <span>{t("continue")}</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
            style={{ fontFamily: selectedLang.fontFamily }}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
