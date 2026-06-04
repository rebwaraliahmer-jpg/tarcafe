/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      menu: "Menu",
      app_title: "QR Menu",
      customer_view: "Customer View",
      admin_panel: "Admin Panel",
      search_placeholder: "Search dishes by name or description...",
      all: "All",
      available: "Available",
      sold_out: "Sold Out",
      price: "Price",
      address: "Address",
      contact: "Contact & Info",
      currency: "IQD",
      welcome_title: "Select Your Preferred Language",
      welcome_subtitle: "Please choose a language to view the digital menu. You can switch anytime from the top bar.",
      continue: "Continue",
      change_language: "Change Language",
      qr_btn: "Get QR Code",
      qr_title: "QR Code Generator",
      qr_desc: "Download or print this QR code. Guests scanning it will open the interactive digital menu directly on their smartphones.",
      
      // Admin labels
      edit_restaurant_info: "Edit Restaurant Info",
      manage_categories: "Manage Categories",
      manage_menu: "Manage Menu Items",
      save_success: "Changes saved successfully!",
      field_required: "This field is required",
      cancel: "Cancel",
      save: "Save Changes",
      delete: "Delete",
      edit: "Edit",
      add_new: "Add New Item",
      add_category: "Add New Category",
      
      // Fields & Placeholders
      name_en: "Name (English)",
      name_ar: "Name (Arabic - الاسم بالعربية)",
      name_ku: "Name (Kurdish - ناو بە کوردی)",
      title_en: "Title (English)",
      title_ar: "Title (Arabic)",
      title_ku: "Title (Kurdish)",
      desc_en: "Description (English)",
      desc_ar: "Description (Arabic)",
      desc_ku: "Description (Kurdish)",
      addr_en: "Address (English)",
      addr_ar: "Address (Arabic)",
      addr_ku: "Address (Kurdish)",
      item_price: "Price (IQD)",
      item_image: "Image URL",
      item_available: "Available for Order",
      category_select: "Select Category",
      all_translations_screen: "All Translations Control Hub",
      all_translations_subtitle: "Update text for all three languages simultaneously, side-by-side.",
      
      // Tabs
      tab_english: "🇬🇧 EN",
      tab_arabic: "🇮🇶 AR",
      tab_kurdish: "🇹🇯 KU",
      
      no_results: "No menu items found matching your query."
    }
  },
  ar: {
    translation: {
      menu: "قائمة الطعام",
      app_title: "قائمة رمز QR",
      customer_view: "عرض الزبائن",
      admin_panel: "لوحة التحكم",
      search_placeholder: "ابحث عن الأطباق بالاسم أو الوصف...",
      all: "الكل",
      available: "متوفر",
      sold_out: "نفذت الكمية",
      price: "السعر",
      address: "العنوان",
      contact: "اتصل بنا والمعلومات",
      currency: "د.ع",
      welcome_title: "اختر لغتك المفضلة",
      welcome_subtitle: "يرجى اختيار اللغة المفضلة لتصفح القائمة الرقمية المباشرة. يمكنك تغييرها في أي وقت من شريط التنقل العلوي.",
      continue: "متابعة",
      change_language: "تغيير اللغة",
      qr_btn: "رمز QR للمطعم",
      qr_title: "توليد رمز الاستجابة السريعة (QR)",
      qr_desc: "قم بتنزيل أو طباعة هذا الرمز. يمكن للزبائن مسحه للانتقال فوراً لصفحة القائمة الرقمية التفاعلية على هواتفهم.",
      
      // Admin labels
      edit_restaurant_info: "تعديل معلومات المطعم",
      manage_categories: "إدارة الفئات والمجموعات",
      manage_menu: "إدارة أصناف القائمة",
      save_success: "تم حفظ التغييرات بنجاح!",
      field_required: "هذا الحقل مطلوب",
      cancel: "إلغاء",
      save: "حفظ التغييرات",
      delete: "حذف",
      edit: "تعديل",
      add_new: "إضافة صنف جديد",
      add_category: "إضافة فئة جديدة",
      
      // Fields & Placeholders
      name_en: "الاسم (بالإنكليزية)",
      name_ar: "الاسم (بالعربية)",
      name_ku: "الاسم (بالكردية)",
      title_en: "العنوان (بالإنكليزية)",
      title_ar: "العنوان (بالعربية)",
      title_ku: "العنوان (بالكردية)",
      desc_en: "الوصف (بالإنكليزية)",
      desc_ar: "الوصف (بالعربية)",
      desc_ku: "الوصف (بالكردية)",
      addr_en: "العنوان الجغرافي (بالإنكليزية)",
      addr_ar: "العنوان الجغرافي (بالعربية)",
      addr_ku: "العنوان الجغرافي (بالكردية)",
      item_price: "السعر (د.ع)",
      item_image: "رابط الصورة",
      item_available: "متاح للطلب المباشر",
      category_select: "اختر الفئة الرئيسية",
      all_translations_screen: "مركز التحكم الشامل بالترجمات ووصف الأطباق",
      all_translations_subtitle: "تحديث النصوص والترجمات للغات الثلاث في نفس الشاشة وبشكل متوازٍ.",
      
      // Tabs
      tab_english: "🇬🇧 EN",
      tab_arabic: "🇮🇶 AR",
      tab_kurdish: "🇹🇯 KU",
      
      no_results: "لا توجد أطباق مطابقة للبحث حالياً."
    }
  },
  ku: {
    translation: {
      menu: "مینیو",
      app_title: "مینیوی کۆدی QR",
      customer_view: "پیشاندانی کڕیار",
      admin_panel: "پانێڵی بەڕێوبەر",
      search_placeholder: "بگەڕێ بۆ خواردنەکان بە ناو یان وەسف...",
      all: "هەموو",
      available: "بەردەستە",
      sold_out: "تەواوبووە",
      price: "نرخ",
      address: "ناونیشان",
      contact: "پەیوەندی و زانیاری",
      currency: "د.ع",
      welcome_title: "زمانى دڵخوازت دیارى بكە",
      welcome_subtitle: "تکایە زمانێک هەڵبژێرە بۆ بینینی مینیوی دیجیتاڵی. دەتوانیت لە هەر کاتێکدا بێت لە ڕێگەی گۆڕەری سەرەوە زمانەکە بگۆڕیت.",
      continue: "بەردەوامبە",
      change_language: "گۆڕینی زمان",
      qr_btn: "کۆدی QR",
      qr_title: "دروستکەری کۆدی QR",
      qr_desc: "ئەم کۆدی QR کورت بکەرەوە یان پرینت بکە. کاتێک کڕیارەکان سکانی دەکەن، مینیوی دیجیتاڵ ڕاستەوخۆ دەبێتەوە.",
      
      // Admin labels
      edit_restaurant_info: "دەستکاری زانیاری چێشتخانە",
      manage_categories: "بەڕێوەبردنی پۆلێنەکان",
      manage_menu: "بەڕێوەبردنی خواردنەکان",
      save_success: "گۆڕانکارییەکان بە سەرکەوتوویی پارێزران!",
      field_required: "ئەم چوارچێوەیە داواکراوە",
      cancel: "پاشگەزبوونەوە",
      save: "پاراستنی گۆڕانکارییەکان",
      delete: "سڕینەوە",
      edit: "دەستکاری",
      add_new: "زیادکردنی بابەتی نوێ",
      add_category: "زیادکردنی پۆلێنی نوێ",
      
      // Fields & Placeholders
      name_en: "ناو (ئینگلیزی)",
      name_ar: "ناو (عەرەبی)",
      name_ku: "ناو (کوردی)",
      title_en: "ناو (ئینگلیزی)",
      title_ar: "ناو (عەرەبی)",
      title_ku: "ناو (کوردی)",
      desc_en: "وەسف (ئینگلیزی)",
      desc_ar: "وەسف (عەرەبی)",
      desc_ku: "وەسف (کوردی)",
      addr_en: "ناونیشان (ئینگلیزی)",
      addr_ar: "ناونیشان (عەرەبی)",
      addr_ku: "ناونیشان (کوردی)",
      item_price: "نرخ (د.ع)",
      item_image: "بەستەری وێنە",
      item_available: "بەردەستە بۆ کڕین",
      category_select: "پۆلێن دیاری بکە",
      all_translations_screen: "ناوەندی گشتی گۆڕینی زمان و وەسفی مینیو",
      all_translations_subtitle: "نوێکردنەوەی ناو و وەسف بۆ هەر سێ زمانەکە لە یەک کاتدا و دەستبەجێ.",
      
      // Tabs
      tab_english: "🇬🇧 EN",
      tab_arabic: "🇮🇶 AR",
      tab_kurdish: "🇹🇯 KU",
      
      no_results: "هیچ بابەتێک نەدۆزرایەوە کە لەگەڵ گەڕانەکەت بگونجێت."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("qr_menu_lang") || "ku", // Default to Kurdish Sorani
    fallbackLng: "ku",
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
