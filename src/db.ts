/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, MenuItem, RestaurantSettings } from "./types";

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat_cold_drinks",
    name_en: "Cold Drinks",
    name_ar: "مشروبات باردة",
    name_ku: "خواردنەوە ساردەکان",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_cocktails",
    name_en: "Cocktails",
    name_ar: "كوكتيل",
    name_ku: "كۆكتێل",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_cakes",
    name_en: "Cakes",
    name_ar: "كيك",
    name_ku: "كێك",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_ice_creams",
    name_en: "Ice Cream",
    name_ar: "آيس كريم",
    name_ku: "ئایسكریم",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_hot_drinks",
    name_en: "Hot Drinks",
    name_ar: "مشروبات ساخنة",
    name_ku: "خواردنەوە گەرمەکان",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_milkshakes",
    name_en: "Milkshakes",
    name_ar: "ميلك شيك",
    name_ku: "شیکی شیر",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_ice_drinks",
    name_en: "Ice Drinks",
    name_ar: "مشروبات مثلجة",
    name_ku: "خواردنەوە سەرمانەکان",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_juices",
    name_en: "Juices",
    name_ar: "عصير",
    name_ku: "ئاوی میوە",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_fruits",
    name_en: "Fruits",
    name_ar: "فواكه",
    name_ku: "میوەکان",
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "cat_argilla",
    name_en: "Argilla (Hookah)",
    name_ar: "شيشة",
    name_ku: "شیشە",
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=400"
  }
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
  // 1. Cold Drinks
  {
    id: "cold_water",
    category_id: "cat_cold_drinks",
    title_en: "Water",
    title_ar: "ماء",
    title_ku: "ئاو",
    description_en: "Mineral pure water bottle",
    description_ar: "مياه معدنية نقية مبردة",
    description_ku: "ئاوی کانزایی پاکی ساردکەرەوە",
    price: 1000,
    image: "https://images.unsplash.com/photo-1608885898957-a599fb15ec3e?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cold_cola",
    category_id: "cat_cold_drinks",
    title_en: "Cola",
    title_ar: "كولا",
    title_ku: "کۆلا",
    description_en: "Chilled classic cola",
    description_ar: "مشروب كولا كلاسيكي بارد",
    description_ku: "گازی کۆلای کلاسیکی فێنک دڵگیر",
    price: 1000,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cold_soda",
    category_id: "cat_cold_drinks",
    title_en: "Soda",
    title_ar: "سودا",
    title_ku: "سۆدا",
    description_en: "Bubbly sparkling soda water",
    description_ar: "مياه غازية فوارة منعشة",
    description_ku: "ئاوی سۆدای گازداری چێژبەخش",
    price: 1000,
    image: "https://images.unsplash.com/photo-1551630592-85cd33b26cdd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cold_tiger",
    category_id: "cat_cold_drinks",
    title_en: "Tiger Energy",
    title_ar: "تايجر",
    title_ku: "تایگەر",
    description_en: "Tiger energy drink",
    description_ar: "مشروب الطاقة تايجر المنشط",
    description_ku: "خواردنەوەی وزەبەخشی تایگەر پڕ لە چالاکی",
    price: 2000,
    image: "https://images.unsplash.com/photo-1622543956322-a59074dfd535?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cold_frappe",
    category_id: "cat_cold_drinks",
    title_en: "Frappe",
    title_ar: "فرابى",
    title_ku: "فراپێ",
    description_en: "Fluffy and rich cold blended frothy coffee",
    description_ar: "قهوة مثلجة مع رغوة غنية منعشة",
    description_ku: "قاوەیەکی فرابێی کفدار و ساردی ناوازە",
    price: 2000,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cold_ice_coffee",
    category_id: "cat_cold_drinks",
    title_en: "Ice Coffee",
    title_ar: "ايس كوفى",
    title_ku: "ئایس کۆفی",
    description_en: "Delicious chilled espresso with smooth cold milk and ice",
    description_ar: "إسبريسو بارد لذيذ مع الحليب البارد والثلج",
    description_ku: "قاوەی ئێسپریسۆی تێکەڵکراو بە شیری فێنک و سەهۆڵ",
    price: 4000,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cold_ice_chocolate",
    category_id: "cat_cold_drinks",
    title_en: "Ice Chocolate",
    title_ar: "ایس شوکلت",
    title_ku: "ئایس چۆکلەت",
    description_en: "Chilled rich chocolate syrup blended with fresh milk and cream",
    description_ar: "شراب الشوكولاتة الغني المبرد مع الحليب الطازج والثلج",
    description_ku: "شۆکلاتی ساردی خەست تێکەڵ کراوە لەگەڵ شیری نوێ",
    price: 3000,
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 2. Cocktail
  {
    id: "cocktail_imperator",
    category_id: "cat_cocktails",
    title_en: "Imperator",
    title_ar: "إمبيراتور",
    title_ku: "ئیمپەراتۆر",
    description_en: "Royal signature cocktail blend with rich layers of fruit",
    description_ar: "كوكتيل إمبيراتور الفاخر الغني بالنكهات المتميزة",
    description_ku: "کۆکتێلی ئیمپەراتۆری ڕەسەن بە تامی میوەی شاهانە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cocktail_apache",
    category_id: "cat_cocktails",
    title_en: "Apache",
    title_ar: "اباتشي",
    title_ku: "ئاپاچی",
    description_en: "Exotic energizing special house cocktail",
    description_ar: "كوكتيل أباتشي الخاص والمنشط والمليء بالنكهات",
    description_ku: "کۆکتێلی ئاپاچی تایبەت بە جوانی و تامی بەهێزەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cocktail_tar",
    category_id: "cat_cocktails",
    title_en: "Tar Cocktail",
    title_ar: "تار",
    title_ku: "تار",
    description_en: "Delicious house special mixed cocktail",
    description_ar: "كوكتيل تار السري اللذيذ والخاص جداً بالصالة",
    description_ku: "کۆکتێلی تاری ناوازە و مۆدێرنی چێشتخانە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cocktail_banana_milk",
    category_id: "cat_cocktails",
    title_en: "Banana Milk",
    title_ar: "حليب الموز",
    title_ku: "شیر مۆز",
    description_en: "Creamy fresh blended banana milk",
    description_ar: "حليب منعش مغذي بالمرز الطبيعي الطازج",
    description_ku: "کۆکتێلی شیر و مۆزی نوێ و وزەبەخش",
    price: 3000,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cocktail_banana_strawberry",
    category_id: "cat_cocktails",
    title_en: "Banana Milk Strawberry",
    title_ar: "حليب الموز، الفراولة",
    title_ku: "شیر مۆز و سونە",
    description_en: "Perfect harmony of fresh banana milk and sweet strawberries",
    description_ar: "مزيج متناسق من حليب الموز والفراولة الحلوة",
    description_ku: "تێکەڵەیەکی شاهانە لە شیرمۆز و فرێزەی نوێ",
    price: 4000,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cocktail_banana_chocolate",
    category_id: "cat_cocktails",
    title_en: "Banana Milk Chocolate",
    title_ar: "حليب الموز، شوكولاتة",
    title_ku: "شیر مۆز و چۆکلەت",
    description_en: "Indulgent fresh banana milk swirled with chocolate sauce",
    description_ar: "حليب الموز الطبيعي المخفوق مع الشوكولاتة الغنية اللذيذة",
    description_ku: "شیرمۆز بە نەرمی چۆکلەتی خەستی بەلجیکی تێکەڵکراو",
    price: 4000,
    image: "https://images.unsplash.com/photo-1571006111581-f2e8c63c1d75?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cocktail_banana_special",
    category_id: "cat_cocktails",
    title_en: "Banana Milk Special",
    title_ar: "حليب الموز خاص",
    title_ku: "شیر مۆزی تایبەت",
    description_en: "House special luxury banana milk with nuts and delicious toppings",
    description_ar: "حليب كير موشن خاص بالموز الطبيعي والمكسرات الفاخرة",
    description_ku: "شیرمۆزی دەوڵەمەند بە هەنوین، گوێز، بادەم و کرێم",
    price: 4000,
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 3. Cake
  {
    id: "cake_chocolate",
    category_id: "cat_cakes",
    title_en: "Chocolate Cake",
    title_ar: "شوكولاتة",
    title_ku: "كێکی چۆکلەت",
    description_en: "Rich multi-layered delicious fudge chocolate cake",
    description_ar: "كيكة الشوكولاتة الفاخرة الغنية بالكاكاو والكريمة",
    description_ku: "کێکی چۆکلەتی خەست و تازە بۆ عاشقانی شیرینی",
    price: 3000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cake_caramel",
    category_id: "cat_cakes",
    title_en: "Caramel Cake",
    title_ar: "كراميل",
    title_ku: "كێکی کارامێل",
    description_en: "Sweet vanilla sponge cake layered with golden salted caramel",
    description_ar: "كيكة غنية بالكراميل الذهبي اللذيذ والكريمة المخفوقة",
    description_ku: "کێکی کارامێلی تەڕی زێڕین بە تامی سحری",
    price: 3000,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cake_pistachio",
    category_id: "cat_cakes",
    title_en: "Pistachio Cake",
    title_ar: "فستق",
    title_ku: "كێکی فستق",
    description_en: "Premium pistachio layered cake with creamy frosting",
    description_ar: "كيكة الفستق الأخضر الفريدة بالنكهة الطبيعية الممتزة",
    description_ku: "کێکی فستقی شاکار بە سووکی و تامی بێوێنە",
    price: 3000,
    image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cake_strawberry",
    category_id: "cat_cakes",
    title_en: "Strawberry Cake",
    title_ar: "فراولة",
    title_ku: "كێکی سونە",
    description_en: "Fruity delicious layer cake inside loaded with strawberry glaze",
    description_ar: "كيكة الفراولة المليئة بقطع الفراولة الطازجة والكريمة",
    description_ku: "کێکی فرێزەی سووری گەشاوە بۆ دروستکردنی بۆنەیەکی خۆش",
    price: 3000,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "cake_cheese",
    category_id: "cat_cakes",
    title_en: "Cheese Cake",
    title_ar: "جبن",
    title_ku: "كێکی پەنیر",
    description_en: "Smooth and velvety classic New York cheesecake style",
    description_ar: "تشيز كيك غني على الطريقة الكلاسيكية مع طبقة البسكويت المقرمشة",
    description_ku: "کێکی پەنیری نەرمی نیویۆرک کە بێوێنەیە لە بەتامیدا",
    price: 3000,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 4. Ice Cream
  {
    id: "ice_brazilia",
    category_id: "cat_ice_creams",
    title_en: "Brazilia",
    title_ar: "برازيليا",
    title_ku: "بەرازیلیا",
    description_en: "Sensationally rich specialty chocolate and coffee ice cream",
    description_ar: "آيس كريم برازيليا الفاخر بنكهات الشوكولاتة والقهوة المدهشة",
    description_ku: "ئایسکرێمی بەرازیلیای ناوازە بە تامی قاوە و چۆکلەت",
    price: 4000,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "ice_jamaica",
    category_id: "cat_ice_creams",
    title_en: "Jamaica",
    title_ar: "جامايكا",
    title_ku: "جامایکا",
    description_en: "Tropical exotic flavor splash ice cream cup",
    description_ar: "آيس كريم جامايكا الاستوائي المليء بالنسيم والبهجة",
    description_ku: "ئایسکرێمی جامایکا بە تامە کەم وێنە استوایییەکانەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "ice_tuttifrutti",
    category_id: "cat_ice_creams",
    title_en: "Tuttifrutti",
    title_ar: "توتي فروتي",
    title_ku: "توتی فروتی",
    description_en: "Colorful candied fruits and organic delicious ice cream cup",
    description_ar: "آيس كريم توتي فروتي المنعش الغني بقطع الفواكه المشكلة",
    description_ku: "ئایسکریمی توتی فروتی ڕەنگاوڕەنگ بە پارچە میوەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "ice_jellybean",
    category_id: "cat_ice_creams",
    title_en: "Jellybean",
    title_ar: "جيليبين",
    title_ku: "جێلیبین",
    description_en: "Playful sweet ice cream topped with colorful tasty jellybeans",
    description_ar: "آيس كريم جيليبين المحبوب المزين بحبات الجيلي اللذيذة",
    description_ku: "ئایسکریمی جێلیبین پڕ سوپرایز بە دەنکە شیرینەکانی جێلی",
    price: 4000,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "ice_cocktail",
    category_id: "cat_ice_creams",
    title_en: "Cocktail Ice Cream",
    title_ar: "مشكل",
    title_ku: "کۆكتێل",
    description_en: "Assorted scoops of our seasonal classic ice cream flavors",
    description_ar: "تشكيلة من كرات الآيس كريم الكلاسيكية الموسمية المنعشة",
    description_ku: "تۆپی هەمەجۆری ئایسکریمی وەرزی خواردنی بەتام",
    price: 3000,
    image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 5. Hot Drinks
  {
    id: "hot_tea",
    category_id: "cat_hot_drinks",
    title_en: "Tea",
    title_ar: "شاي",
    title_ku: "چای",
    description_en: "Premium slow-brewed black tea in a warm traditional glass cup",
    description_ar: "كوب شاي أحمر مُخمر بعناية ويقدم في استكان تقليدي",
    description_ku: "چای ڕەشی خەستی بەسەبر لێنراو بەرەنگ و خەستی دڵگیر",
    price: 1000,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_green_tea",
    category_id: "cat_hot_drinks",
    title_en: "Green Tea",
    title_ar: "شاي اخضر",
    title_ku: "چای سەوز",
    description_en: "Soothing hot organic green tea leaves infusion",
    description_ar: "شاي أخضر عضوي مهدئ غني بمضادات الأكسدة والفوائد المذهلة",
    description_ku: "چای سەوزی هێورکەرەوە و تەندروستی پڕ لە پێکهاتەی باش",
    price: 1000,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_milk",
    category_id: "cat_hot_drinks",
    title_en: "Hot Milk",
    title_ar: "حليب",
    title_ku: "شیر گەرم",
    description_en: "Steamed fresh whole milk sweet honey optionally",
    description_ar: "حليب كامل الدسم طازج ومبخر بعناية لتدفئة مثالية",
    description_ku: "شیرێکی تەواو سروشتی بە گەرمی دەستکرد بۆ پشووی ئێوارە",
    price: 2000,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_turkish_coffee",
    category_id: "cat_hot_drinks",
    title_en: "Turkish Coffee",
    title_ar: "قهوة تركية",
    title_ku: "قاوەی تورکی",
    description_en: "Traditional rich foam-creamed Turkish coffee cooked slowly on sand",
    description_ar: "قهوة تركية غنية برغوة تذوب بالفم ومعدّة بعناية فائقة",
    description_ku: "قاوەیەکی تورکی ڕەسەن بە کوڵانی گەرم و ڕووی کفداری جوان",
    price: 3000,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_arabic_coffee",
    category_id: "cat_hot_drinks",
    title_en: "Arabic Coffee",
    title_ar: "قهوة عربي",
    title_ku: "قاوەی عەرەبی",
    description_en: "Traditional aromatic cardamom-scented luxury Arab coffee",
    description_ar: "قهوة عربية أصيلة معطرة بالهيل الفاخر والزعفران",
    description_ku: "قاوەیەکی مێژوویی عەرەبی پڕ لە هێڵ و پێداویستی ڕەسەن",
    price: 3000,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80bc4e?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_qazwan_coffee",
    category_id: "cat_hot_drinks",
    title_en: "Qazwan Coffee",
    title_ar: "قهوة علك مافي",
    title_ku: "قاوەی قەزوان",
    description_en: "Authentic local Kurdish terebinth berry warm Qazwan coffee",
    description_ar: "قهوة القزوان الكوردية المشهورة المحضرة بالبطم الطبيعي والحليب",
    description_ku: "قاوەی ناوداری قەزوانی ڕەسەن کە بە شیری تەڕ ئامادە دەکریت",
    price: 3000,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_espresso",
    category_id: "cat_hot_drinks",
    title_en: "Espresso",
    title_ar: "اسبريسو",
    title_ku: "ئێسبریسۆ",
    description_en: "Bold and intense shot of pure single origin espresso",
    description_ar: "جرعة قوية ومركزة من قهوة الإسبريسو الطازجة الفوارة",
    description_ku: "شۆتێکی خەست و تیژ لە قاوەی ئێسپریسۆی خاوێن و پڕ تام",
    price: 3000,
    image: "https://images.unsplash.com/photo-1510701115815-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_double_espresso",
    category_id: "cat_hot_drinks",
    title_en: "Double Espresso",
    title_ar: "دبل اسبريسو",
    title_ku: "دەبڵ ئێسپریسۆ",
    description_en: "Double rich shot of bold espresso for maximum focus",
    description_ar: "جرعة مضاعفة من الإسبريسو القوي المليء بالتركيز والنعومة",
    description_ku: "دوو شۆتی ئێسپریسۆی چڕ بۆ دەستپپێکردنی ڕۆژێکی گرنگ",
    price: 5000,
    image: "https://images.unsplash.com/photo-1510701115815-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_americano",
    category_id: "cat_hot_drinks",
    title_en: "Americano",
    title_ar: "امريكانو",
    title_ku: "ئەمریکانۆ",
    description_en: "Hot espresso shot with rich hot water extension",
    description_ar: "إسبريسو ممدد بالماء الساخن بنكهة ممتازة ونظيفة",
    description_ku: "ئێسپریسۆی دابەشکراو بەسەر ئاوی گەرمی فلتەرکراودا",
    price: 4000,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_latte",
    category_id: "cat_hot_drinks",
    title_en: "Coffee Latte",
    title_ar: "كوفى لاتي",
    title_ku: "کۆفی لاتێ",
    description_en: "Freshly steamed silky milk combined beautifully with signature espresso",
    description_ar: "حليب مبخر حريري ممزوج بإتقان مع رغوة الإسبريسو",
    description_ku: "تێکەڵەیەکی ئاوێتەی نێوان شیری هەڵماوی و ئێسپریسۆ",
    price: 4000,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_cappuccino",
    category_id: "cat_hot_drinks",
    title_en: "Cappuccino",
    title_ar: "كابوتشينو",
    title_ku: "کاپوچینۆ",
    description_en: "Perfect third ratio: rich espresso, hot milk, and deep light milk foam",
    description_ar: "توازن رائع من الإسبريسو والحليب والرغوة الغنية الكثيفة",
    description_ku: "کاپوچینۆیەکی لێهاتوو بە پاشخانێکی جوانی پڕ لە کف",
    price: 4000,
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_macchiato",
    category_id: "cat_hot_drinks",
    title_en: "Macchiato",
    title_ar: "ماكيالتور",
    title_ku: "ماکیاتۆ",
    description_en: "Bold espresso stained slightly with velvety warm micro-foam",
    description_ar: "إسبريسو قوي مركز محلى بنقطة صغيرة من رغوة الحليب المبخر",
    description_ku: "شۆتی ئێسپریسۆ بە تۆزێک شیری حەریرکراوەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_nescafe",
    category_id: "cat_hot_drinks",
    title_en: "Nescafe",
    title_ar: "نيسكافي",
    title_ku: "نیسکافێ",
    description_en: "Warm rich instant Nescafe coffee mixed with creamy white milk",
    description_ar: "قهوة النيسكافيه الفورية الساخنة سريعة التحضير بالحليب اللذيذ",
    description_ku: "نیسکافێی خێرای چێژبەخش کە لەگەڵ شیری گەرم ئامادە کراوە",
    price: 3000,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_chocolate",
    category_id: "cat_hot_drinks",
    title_en: "Hot Chocolate",
    title_ar: "شكولاتة",
    title_ku: "چۆکلەتی گەرم",
    description_en: "Indulgent premium dark cocoa melted in raw warm fresh milk",
    description_ar: "كاكاو داكن طبيعي ذائب مع الحليب الساخن ومحلى بإبداع",
    description_ku: "چۆکلەتی تاڵ و شیری سادەی کۆنترۆڵکراو بە تام پێشکەش دەکرێت",
    price: 3000,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "hot_mhalabi",
    category_id: "cat_hot_drinks",
    title_en: "Mhalabi",
    title_ar: "محلي",
    title_ku: "مهەلەبی",
    description_en: "Delicious pudding topped with premium pistachio and rosewater notes",
    description_ar: "حلوى المحلبية التقليدية الحليبية الناعمة المزينة بالفستق والورد",
    description_ku: "مەهەلەبییەکی ساردی ڕەسەن کە بە گوڵاو و فستقی وردکراو پیاکراوە",
    price: 2000,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 6. Milkshakes
  {
    id: "shake_tar",
    category_id: "cat_milkshakes",
    title_en: "Tar Milkshake",
    title_ar: "تار ميلكشيك",
    title_ku: "شیکی شیری تار",
    description_en: "Velvety smooth signature luxurious Tar elements milkshake",
    description_ar: "ميلك شيك تار الرهيب الخاص بالمنزل بالكريمة والنكهات المبهجة",
    description_ku: "شیکی شیری تاری خۆش و تایبەت بە پاشخانی ناوازەوە",
    price: 5000,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "shake_oreo",
    category_id: "cat_milkshakes",
    title_en: "Oreo Shake",
    title_ar: "اوريو شيك",
    title_ku: "شیکی ئۆریۆ",
    description_en: "Iconic cookie crumble Oreo and vanilla rich shake blended with ice cream",
    description_ar: "ميلك شيك الأوريو الكلاسيكي بالبسكويت المفتت مع الكريمة المثلجة",
    description_ku: "شیکی ئەی ئۆریۆ پڕ کراوە لە بسکیتی نایاب و ئایسکریم",
    price: 4000,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "shake_nutella",
    category_id: "cat_milkshakes",
    title_en: "Nutella Shake",
    title_ar: "نوتيلا شيك",
    title_ku: "شیکی نوتێلا",
    description_en: "Smooth and creamy original Nutella hazelnut cocoa delicious milkshake",
    description_ar: "ميلك شيك شوكولاتة نوتيلا اللذيذ بزبادي الجوز المقرمش",
    description_ku: "شیکی نۆتێلای غەنی بە شیری فرێشکراو و کرێمی چۆکلەت",
    price: 4000,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "shake_strawberry",
    category_id: "cat_milkshakes",
    title_en: "Strawberry Milkshake",
    title_ar: "الفراولة ميلك شيك",
    title_ku: "شیکی شیری سونە",
    description_en: "Fruity sweet real strawberry pieces pure milkshake with whipping cream",
    description_ar: "ميلك شيك الفراولة الطبيعية الفواحة باللون الوردي المبهج والرائع",
    description_ku: "شیکی شیری بە دروستی فرێزەی نوێ بە تامی سووک",
    price: 4000,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "shake_caramel",
    category_id: "cat_milkshakes",
    title_en: "Caramel Milkshake",
    title_ar: "كراميل ميلك شيك",
    title_ku: "شیکی شیری کارامێل",
    description_en: "Delicious golden salted caramel syrup splash blended with cool vanilla cream",
    description_ar: "ميلك شيك كراميل لذيذ بطبقة ذهبية ومحلى بلمحات القرفة",
    description_ku: "شیکی شیری کارامێلی پێشکوتوو بە شێوازێکی بێزارنەکەر",
    price: 4000,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "shake_chocolate",
    category_id: "cat_milkshakes",
    title_en: "Chocolate Milkshake",
    title_ar: "شوكولاتة ميلك شيك",
    title_ku: "شیکی شیری چۆکلەت",
    description_en: "Classic creamy double dark chocolate decadent milkshake with swirl topping",
    description_ar: "ميلك شيك شوكولاتة كلاسيكي دبل كاكاو بالكريمة المخفوقة الفاخرة",
    description_ku: "شیکی شیری چۆکلەتی زۆر نوێ و کلاسیکی خەڵزکەر",
    price: 4000,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "shake_vanilla",
    category_id: "cat_milkshakes",
    title_en: "Vanilla Milkshake",
    title_ar: "فانيال ميلك شيك",
    title_ku: "شیکی شیری ڤانیلا",
    description_en: "Classic premium Madagascar vanilla bean pure tasty milkshake",
    description_ar: "ميلك شيك الفانيلا الأصيل برائحة عطرية هادئة وقوام رغوي لذيذ",
    description_ku: "شیکی شیری ڤانیلای ڕەسەنی ناسک پڕ تام و تام مێژوویی",
    price: 4000,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 7. Ice Drinks
  {
    id: "iced_paradise",
    category_id: "cat_ice_drinks",
    title_en: "Paradise",
    title_ar: "فردوس",
    title_ku: "فیردەوس",
    description_en: "Heavenly refreshing icy mocktail blend of fruits and herbs",
    description_ar: "شراب الفردوس المثلج بنسيج مذهل من الفواكه المنعشة",
    description_ku: "خواردنەوەی ساردی فیردەوسی سازگار بە تامێکی زۆر فێنککەر",
    price: 4000,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_galaxy",
    category_id: "cat_ice_drinks",
    title_en: "Galaxy",
    title_ar: "كالسكي",
    title_ku: "گالاکسی",
    description_en: "Deep vibrant purple starry galactic themed icy cold mocktail Drink",
    description_ar: "شراب غالاكسي المتميز بألوان النجوم وتأثيرات الانتعاش",
    description_ku: "خواردنەوەی گالاکسی سارد و دڵبەر کە تیشکی ڕەنگی ناوازەیە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_mojito",
    category_id: "cat_ice_drinks",
    title_en: "Mojito",
    title_ar: "موهينو",
    title_ku: "مۆجیتۆ",
    description_en: "Classic icy soda with mint leaves, lemon slices and cane sugar",
    description_ar: "موهيتو فوار منعش بقطع الليمون وتوليفة النعناع الرائعة",
    description_ku: "مۆجیتۆی تەڕ و فرێش بە وەرەقی پونگە و لیمۆی سەوزەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_blue_tea",
    category_id: "cat_ice_drinks",
    title_en: "Blue Ice Tea",
    title_ar: "شاي مثبخ الازرق",
    title_ku: "چای سەرمانی شین",
    description_en: "Vibrant blue butterfly pea herbal iced tea with lemon splash",
    description_ar: "شاي مثلج أزرق اللون منعش وفريد بمواصفات حيوية صحية",
    description_ku: "چای سەرمانی شینی ناوازە ئارامکەرەوە و شێوە جوان",
    price: 4000,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_coconut_ice",
    category_id: "cat_ice_drinks",
    title_en: "Coconut Ice",
    title_ar: "جوز هندي مثبخ",
    title_ku: "نارگیلی سەرمان",
    description_en: "Silky iced coconut milk drink served extremely cold",
    description_ar: "مشروب جوز الهند المثلج ذو القوام الحليبي الساحر",
    description_ku: "خواردنەوەی نارگیلی شەکراوی فێنک و سارد بۆ ڕۆژە پڕ گەرماکان",
    price: 4000,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_lovely_ice",
    category_id: "cat_ice_drinks",
    title_en: "Lovely Ice",
    title_ar: "لوفلي ايس",
    title_ku: "لەڤلی ئایس",
    description_en: "Our special romantic fruit layered ice house cold mocktail",
    description_ar: "شراب لوفلي ايس الساحر بطبقات الألوان الخلابة والانتعاش",
    description_ku: "خواردنەوەی لەڤلی ئایسی ڕەنگاوڕەنگی سەرنجڕاکێش",
    price: 4000,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_sunrise",
    category_id: "cat_ice_drinks",
    title_en: "Sunrise Ice",
    title_ar: "شروق شمس",
    title_ku: "ئایسی ھەڵاتنی خۆر",
    description_en: "Beautiful yellow orange sunrise themed refreshing iced drink",
    description_ar: "شراب شروق الشمس الجميل بنكهات البرتقال والتوت المثلجة",
    description_ku: "خواردنەوەی ئایسی دڵڕفێنی تام گونجاو بەشێوەی خۆرهەڵاتن",
    price: 4000,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_blue_lagoon",
    category_id: "cat_ice_drinks",
    title_en: "Blue Lagoon Ice",
    title_ar: "بحيرة زرقاء",
    title_ku: "لەگونی شین",
    description_en: "Exquisite blue curacao and iced lemonade refresher mocktail",
    description_ar: "شراب البحيرة الزرقاء الأسطوري المنعش بنكهة حمضية مبردة",
    description_ku: "خواردنەوەی لەگونی شینی بەهێز بۆ هەستی پاشاکان",
    price: 4000,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_jelly_drink",
    category_id: "cat_ice_drinks",
    title_en: "Jelly Drink",
    title_ar: "جيلي ايس",
    title_ku: "خواردنەوەی جێلی",
    description_en: "Fun bubbly sweet drink packed with soft delicious jelly cubes",
    description_ar: "مشروب الجيلي الممتع المزود بقطع الجيلي المرنة الحلوة",
    description_ku: "خواردنەوەی جێلی بۆ گەنجان بە پارچەی جێلی سووکەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "iced_mermaid",
    category_id: "cat_ice_drinks",
    title_en: "Mermaid Ice",
    title_ar: "مير ميد ايس",
    title_ku: "ئایسی پری دەریا",
    description_en: "Magical multi-toned sweet iced drink decorated wonderfully",
    description_ar: "شراب حورية البحر الأنيق بنكهات ساحلية باردة وطبيعية",
    description_ku: "ئایسی نایاب و سیحراوی پەری دەریا بەڕەنگی نایابەوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 8. Juice
  {
    id: "juice_orange",
    category_id: "cat_juices",
    title_en: "Orange Juice",
    title_ar: "برتقال",
    title_ku: "پڕتەقاڵ",
    description_en: "Freshly squeezed sweet orange citrus rich daily health juice",
    description_ar: "عصير برتقال طبيعي معصور طازج مليء بفيتامين سي الحيوى",
    description_ku: "ئاوی پڕتەقاڵی دەستکردی فرێش بەوزەی جوان بۆ تەندروستیت",
    price: 3000,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_lemon",
    category_id: "cat_juices",
    title_en: "Lemon Juice",
    title_ar: "ليمون",
    title_ku: "لیمۆ",
    description_en: "Tangy refreshing real squeezed lemon juice with light sweetness",
    description_ar: "عصير الليمون المنعش المعصور والمنقى بنكهة حيوية مذهلة",
    description_ku: "ئاوی لیمۆی نوێی ترش بۆ هێورکردنەوەی جەستە",
    price: 3000,
    image: "https://images.unsplash.com/photo-1510626176961-4b57d4fafd55?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_lemon_mint",
    category_id: "cat_juices",
    title_en: "Lemon Mint Juice",
    title_ar: "ليمون و نعناع",
    title_ku: "لیمۆ و پوونە",
    description_en: "Perfect blend of zesty lemon citrus juice and fresh aromatic mint leaves",
    description_ar: "عصير الليمون والنعناع المنعش البارد الكلاسيكي الممتاز",
    description_ku: "ئاوی تێکەڵاوی لیمۆ و پونگەی تازە بە تامێکی زۆر جیاواز",
    price: 3000,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_orange_lemon",
    category_id: "cat_juices",
    title_en: "Orange Lemon Juice",
    title_ar: "ليمون و برتقال",
    title_ku: "لیمۆ و پڕتەقاڵ",
    description_en: "Delicious dynamic duo citrus twist blend juice",
    description_ar: "مزيج منعش فريد يجمع بين فوائد وعصير البرتقال والليمون معاً",
    description_ku: "ئاوی پڕتەقاڵ فرێش کە ترشای لیمۆی تێکراوە بەتام",
    price: 3000,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_cindy",
    category_id: "cat_juices",
    title_en: "Cindy Juice",
    title_ar: "سندي",
    title_ku: "سیندی",
    description_en: "Exquisite sweet house tropical special Cindy recipe juice",
    description_ar: "عصير سندي الخاص والغامض ذو الطعم الاستوائي الرائع كلياً",
    description_ku: "ئاوی میوەی سیندی نایابی صالۆن بە تامی تایبەتەوە",
    price: 3000,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_pineapple",
    category_id: "cat_juices",
    title_en: "Pineapple Juice",
    title_ar: "اناناس",
    title_ku: "ئاناناس",
    description_en: "Sweet golden high-quality fresh pressed pineapple juice",
    description_ar: "عصير الأناناس الاستوائي الطبيعي الحلو والغني بأليافه الصحية",
    description_ku: "ئاوی ئەناناسی سروشتی و تێر تام بۆ تێرکردنی ئارەزووەکان",
    price: 3000,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_strawberry",
    category_id: "cat_juices",
    title_en: "Strawberry Juice",
    title_ar: "فراولة",
    title_ku: "سونە",
    description_en: "Delicious fresh sweet strawberry berries iced juice",
    description_ar: "عصير الفراولة الطبيعي الطازج الغني بلونه وتأثيره المنعش اللطيف",
    description_ku: "ئاوی ميوەی فرێزەی نوێ بە تامی سووک و دەکشێت",
    price: 3000,
    image: "https://images.unsplash.com/photo-1565921440618-20e36d8be302?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_apple",
    category_id: "cat_juices",
    title_en: "Apple Juice",
    title_ar: "تفاح",
    title_ku: "سێو",
    description_en: "Fresh cold organic pressed sweet crisp apple juice",
    description_ar: "عصير التفاح الطبيعي البارد المهدئ والصحي الخالي من الإضافات",
    description_ku: "ئاوی سێوی پڕ بەهای بەتام بە چاکی ئامادەکراوە",
    price: 3000,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "juice_mexican",
    category_id: "cat_juices",
    title_en: "Mexican Juice",
    title_ar: "مكسيكي",
    title_ku: "مەکسیکی",
    description_en: "Zesty Mexican style blended fruit juice with spice hints",
    description_ar: "عصير المكسيكي الخاص الحار والحلو بطعم فواكه استوائية مدهشة",
    description_ku: "ئاوی میوەی مەکسیکی بە تامێکی زۆر سەیر و پڕ چێژی گەرماک",
    price: 3000,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 9. Fruits
  {
    id: "fruit_bowl_small",
    category_id: "cat_fruits",
    title_en: "Fruit Bowl (Small)",
    title_ar: "ماعون فواكه صغيرة",
    title_ku: "قاپی میوەی بچووک",
    description_en: "Diced delicious seasonal fresh fruit small platter salad",
    description_ar: "طبق صغير من الفواكه الموسمية الطازجة المفيدة والمقطعة بعناية",
    description_ku: "مۆدێلی بچووکی مینیوی میوەی وەرزی دەوڵەمەند بۆ نێوان ڕۆژ",
    price: 5000,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "fruit_bowl_large",
    category_id: "cat_fruits",
    title_en: "Fruit Bowl (Large)",
    title_ar: "ماعون فواكه كبيرة",
    title_ku: "قاپی میوەی گەورە",
    description_en: "Grand premium sharing platter of colorful fresh seasonal sliced fruits",
    description_ar: "طبق عائلي كبير غني بتشكيلة واسعة من الفواكه الفاخرة والطازجة",
    description_ku: "قاپی گەورەی هاوبەشی میوەی وەرزی لەت کراو بە جوانی بۆ هاوڕێیان",
    price: 4000,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "fruit_nutella_salad",
    category_id: "cat_fruits",
    title_en: "Nutella Salad",
    title_ar: "سلطه نوتيلا",
    title_ku: "سەلەتی نوتێلا",
    description_en: "Assorted sliced fresh fruits luxury drizzled with Nutella chocolate sauce",
    description_ar: "سلطة فواكه طازجة مشكلة ومغمورة بشوكولاتة نوتيلا الغنية والدافئة",
    description_ku: "تێکەڵەی میوە هەمەجۆرەکان کە بە نەرمی چۆکلەتی نۆتێلای پیاکراوە",
    price: 4000,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // 10. Argilla (Hookah)
  // Regular
  {
    id: "arg_lemon_mint_reg",
    category_id: "cat_argilla",
    title_en: "Lemon Mint (Regular)",
    title_ar: "ليمون و نعناع (عادية)",
    title_ku: "لیمۆ و پوونە (ئاسایی)",
    description_en: "Perfect refreshing sour lemon and cold mint classic flavor",
    description_ar: "شيشة نكهة ليمون ونعناع كلاسيكية منعشة ذات طابع بارد وثقيل",
    description_ku: "شیشەی تام لیمۆ و پونگەی ئاسایی کلاسیک بۆ هەستی خۆش",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_gum_mint_reg",
    category_id: "cat_argilla",
    title_en: "Gum Mint (Regular)",
    title_ar: "علك و نعناع (عادية)",
    title_ku: "بنەوشە و پوونە (ئاسایی)",
    description_en: "Aromatic sweet mastic gum combined with icy herbal mint",
    description_ar: "شيشة نكهة علك مستكة طبيعي مع نعناع هادئ ممتاز جداً",
    description_ku: "شیشەی بنەوشە و پونگەی ئاسایی خۆش و تایبەت",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_cindy_reg",
    category_id: "cat_argilla",
    title_en: "Cindy Hookah (Regular)",
    title_ar: "سندي (عادية)",
    title_ku: "سیندی (ئاسایی)",
    description_en: "Exotic custom local Cindy special signature light sweet blend",
    description_ar: "شيشة نكهة سندي المميزة الحصرية الرائعة لزبائن الصالة",
    description_ku: "شیشەی تامی تایبەتی سیندی ئاسایی",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_baghdadi_reg",
    category_id: "cat_argilla",
    title_en: "Baghdadi (Regular)",
    title_ar: "بغدادي (عادية)",
    title_ku: "بەغدادی (ئاسایی)",
    description_en: "Traditional nostalgic strong Baghdadi ancient premium tobacco",
    description_ar: "شيشة نكهة بغدادي الأصيلة القوية لرحلة حنين دافئة ومتميزة",
    description_ku: "شیشەی ڕەسەنی بەتامی بەغدادی بەهێز بۆ ئێوارەیەکی تایبەت",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_tar_reg",
    category_id: "cat_argilla",
    title_en: "Tar Hookah (Regular)",
    title_ar: "تار (عادية)",
    title_ku: "تار (ئاسایی)",
    description_en: "House secret premium special strong smoke blend",
    description_ar: "شيشة تار الخاصة والسرية جداً التابعة لصالة كافيه تار",
    description_ku: "شیشەی تایبەتی تار ئاسایی بە تامی مۆدێرنی صالۆنی",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_blueberry_reg",
    category_id: "cat_argilla",
    title_en: "Blueberry (Regular)",
    title_ar: "بلوبيري (عادية)",
    title_ku: "بلوبێری (ئاسایی)",
    description_en: "Rich sweet mountain wild blueberry aromatic cool flavor",
    description_ar: "شيشة نكهة التوت الأزرق (البلوبيري) البري الحلو ذو الرغوة الكثيفة",
    description_ku: "شیشەی بلوبێری کێوی پڕ بە تامی شیرین و سازگار",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_cola_reg",
    category_id: "cat_argilla",
    title_en: "Cola (Regular)",
    title_ar: "كولا (عادية)",
    title_ku: "کۆلا (ئاسایی)",
    description_en: "Sweet vanilla soda cola classic cool tobacco scent",
    description_ar: "شيشة بنكهة الكولا الفوارة المنعشة والمشهورة جداً",
    description_ku: "شیشەی کۆلا بە تامێکی زۆر نوێ و چێژی ناسیاو",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_peach_mint_reg",
    category_id: "cat_argilla",
    title_en: "Peach Mint (Regular)",
    title_ar: "خوخ و نعناع (عادية)",
    title_ku: "خۆخ و پوونە (ئاسایی)",
    description_en: "Sweet fresh yellow peach combined with icy fresh mint",
    description_ar: "شيشة نكهة الخوخ الأحمر الطبيعي بلمسات النعناع الباردة العجيبة",
    description_ku: "شیشەی خۆخ و پونگەی تازە بە تامێکی زێڕینی سارد",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_apple_reg",
    category_id: "cat_argilla",
    title_en: "Double Apple (Regular)",
    title_ar: "تفاحتين (عادية)",
    title_ku: "دوو سێو (تفاحتین)",
    description_en: "The absolute classic double apple red and green anise-scented legendary smoke",
    description_ar: "شيشة تفاحتين فاخر الأساطير ريحة ونكهة كلاسيكية حادة بجودة عالية",
    description_ku: "شیشەی دوو سێوی هێمێلی حەق بە تامی کۆنی ڕەسەنی بەتام",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_qazwan_reg",
    category_id: "cat_argilla",
    title_en: "Qazwan - Gum Water (Regular)",
    title_ar: "علك ماي (عادية)",
    title_ku: "بنەوشە و ئاو (ئاسایی)",
    description_en: "Kurdish forest terebinth sweet resin wild gum water aroma",
    description_ar: "شيشة نكهة علك الماي الكوردية (علك البستج) الهادئة بنسيم ممتز",
    description_ku: "شیشەی بنەوشە و ئاوی فێنکی قەزوانی بە تامێکی زۆر خۆش",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_gum_melon_reg",
    category_id: "cat_argilla",
    title_en: "Gum Melon (Regular)",
    title_ar: "علك و بطيخ (عادية)",
    title_ku: "بنەوشە و گەرمەک",
    description_en: "Rich sweet local melon mixed smoothly with refreshing chewing gum notes",
    description_ar: "شيشة نكهة علك وبطيخ عسلي صيفي لراحة مذهلة غنية بالنفس",
    description_ku: "شیشەی ناوازەی بنەوشە و گەرمەکی شیرینی سازگار",
    price: 8000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  },

  // Natural Fresh
  {
    id: "arg_watermelon_nat",
    category_id: "cat_argilla",
    title_en: "Watermelon (Natural)",
    title_ar: "رجبي (طبيعي)",
    title_ku: "شوتی (سروشتی)",
    description_en: "Premium shisha inside a real carved fresh watermelon bowl",
    description_ar: "شيشة الوجبة الحقيقية داخل حبة رقي (بطيخ أحمر) طبيعي طازج رائع جداً",
    description_ku: "شیشەی فرێش بە جۆری سروشتی لەناو سنگی شوتی تەڵاقدراودا",
    price: 20000,
    image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_pineapple_nat",
    category_id: "cat_argilla",
    title_en: "Pineapple (Natural)",
    title_ar: "اناناس (طبيعي)",
    title_ku: "ئاناناس (سروشتی)",
    description_en: "Premium hookah styled naturally on a real fresh carved pineapple head",
    description_ar: "شيشة أناناس طبيعية محضرة ومزينة برأس أناناس طبيعي ومنعش بالكامل",
    description_ku: "شیشەی سروشتی باڵا بە سەری ئەناناسی نوێ و دابەشکەر",
    price: 15000,
    image: "https://images.unsplash.com/photo-1550258255-e1d829f2a2e1?auto=format&fit=crop&q=80&w=600",
    available: true
  },
  {
    id: "arg_cindy_nat",
    category_id: "cat_argilla",
    title_en: "Cindy Hookah (Natural)",
    title_ar: "سندي (طبيعي)",
    title_ku: "سیندی (سروشتی)",
    description_en: "Natural premium Cindy flavor shisha utilizing organic components",
    description_ar: "شيشة سندي طبيعي طازج محضرة بمكونات وفواكه عضوية فاخرة",
    description_ku: "شیشەی سروشتی نایاب بە تامی دەوڵەمەندی سیندی",
    price: 10000,
    image: "https://images.unsplash.com/photo-1527137341206-cef0fbedbf51?auto=format&fit=crop&q=80&w=600",
    available: true
  }
];

const INITIAL_REST_SETTINGS: RestaurantSettings = {
  restaurant_name_en: "Tar Café & Lounge",
  restaurant_name_ar: "تار كافيه وصالة",
  restaurant_name_ku: "تار کافێ و مەیخانە",
  description_en: "A premium modern café and luxury lounge offering wonderful cold refreshers, high-quality cakes, professional hot coffee, and natural organic hookahs.",
  description_ar: "مقهى وصالة متميزة تقدم أفضل المشروبات الباردة والحلويات الطازجة والقهوة المتخصصة بالإضافة لخدمة الشيشة الطبيعية الممتازة.",
  description_ku: "کافێ و مەیخانەیەکی مۆدێرنی بەناوبانگ کە بەتامترین خواردنەوە ساردەکان، کێکی بەتام، قاوەی گەرمی لێهاتوو و شیشەی سروشتی پێشکەش دەکات.",
  address_en: "Salim Street, near Grand Millennium Hotel, Sulaymaniyah",
  address_ar: "شارع سالم, قرب فندق جراند ميلينيوم، السليمانية",
  address_ku: "شەقامی سالم، نزیک هۆتێلی گراند میلینیۆم، سلێمانی",
  admin_password: "1234"
};

// Local storage key constants (v3 brings the fresh cafe menu immediately!)
const KEY_CATEGORIES = "qr_menu_categories_v3";
const KEY_MENU_ITEMS = "qr_menu_items_v3";
const KEY_SETTINGS = "qr_menu_settings_v3";

export function getCategories(): Category[] {
  const data = localStorage.getItem(KEY_CATEGORIES);
  if (!data) {
    localStorage.setItem(KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }
  
  try {
    const list = JSON.parse(data) as Category[];
    return list;
  } catch (e) {
    localStorage.setItem(KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    return INITIAL_CATEGORIES;
  }
}

export function saveCategories(categories: Category[]): void {
  localStorage.setItem(KEY_CATEGORIES, JSON.stringify(categories));
}

export function getMenuItems(): MenuItem[] {
  const data = localStorage.getItem(KEY_MENU_ITEMS);
  if (!data) {
    localStorage.setItem(KEY_MENU_ITEMS, JSON.stringify(INITIAL_MENU_ITEMS));
    return INITIAL_MENU_ITEMS;
  }
  try {
    const list = JSON.parse(data) as MenuItem[];
    return list;
  } catch (e) {
    localStorage.setItem(KEY_MENU_ITEMS, JSON.stringify(INITIAL_MENU_ITEMS));
    return INITIAL_MENU_ITEMS;
  }
}

export function saveMenuItems(items: MenuItem[]): void {
  localStorage.setItem(KEY_MENU_ITEMS, JSON.stringify(items));
}

export function getRestaurantSettings(): RestaurantSettings {
  const data = localStorage.getItem(KEY_SETTINGS);
  if (!data) {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(INITIAL_REST_SETTINGS));
    return INITIAL_REST_SETTINGS;
  }
  try {
    const loaded = JSON.parse(data);
    if (!loaded.admin_password) {
      loaded.admin_password = "1234";
    }
    return loaded;
  } catch (e) {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(INITIAL_REST_SETTINGS));
    return INITIAL_REST_SETTINGS;
  }
}

export function saveRestaurantSettings(settings: RestaurantSettings): void {
  localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
}
