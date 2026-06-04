/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = "en" | "ar" | "ku";

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: "ltr" | "rtl";
  fontFamily: string;
}

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  ku: {
    code: "ku",
    name: "Kurdish Sorani",
    nativeName: "KU",
    flag: "🇹🇯", // Map to regional block or standard flag emoji
    dir: "rtl",
    fontFamily: "'Noto Sans Arabic', sans-serif"
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "AR",
    flag: "🇮🇶",
    dir: "rtl",
    fontFamily: "'Cairo', sans-serif"
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "EN",
    flag: "🇬🇧",
    dir: "ltr",
    fontFamily: "'Inter', sans-serif"
  }
};

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  title_en: string;
  title_ar: string;
  title_ku: string;
  description_en: string;
  description_ar: string;
  description_ku: string;
  price: number;
  image: string;
  available: boolean;
}

export interface RestaurantSettings {
  restaurant_name_en: string;
  restaurant_name_ar: string;
  restaurant_name_ku: string;
  description_en: string;
  description_ar: string;
  description_ku: string;
  address_en: string;
  address_ar: string;
  address_ku: string;
  admin_password?: string;
}

export function formatPrice(price: number, lang: LanguageCode): string {
  const formatted = price.toLocaleString(undefined, {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });
  if (lang === "ar" || lang === "ku") {
    return `${formatted} د.ع`;
  }
  return `${formatted} IQD`;
}
