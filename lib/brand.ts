// ==============================================================================
// 4 Muscle Drops - Master Configuration Object
// Everything is easily editable here without touching components
// ==============================================================================

export interface ReviewItem {
  id: string;
  author: string;
  text: string;
  rating: number;
  image?: string;
  badge?: string;
}

export interface BundleItem {
  id: string;
  bottles: number;
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice: number;
  freeShipping: boolean;
  extraGift?: string;
  isPopular?: boolean;
  badge?: string;
}

export const BRAND = {
  name: "4 Muscle",
  productName: "4 Muscle Drops",
  productShortName: "4 Muscle Drops",
  pointValue: "400 نقطة",
  volume: "20 ml",
  shelfLife: "سنتان من تاريخ الإنتاج",
  locale: "ar-EG",
  direction: "rtl",

  // Assets
  logo: "/images/brand-logo.jpg",
  productImage: "/images/product-packshot.png",
  heroImage: "/images/hero-banner.jpg",
  lifestyleImage: "/images/product-lifestyle.jpg",
  useCasesImage: "/images/use-cases-full.png",
  bundlesBanner: "/images/bundles-banner.jpg",

  // Pricing
  price: 240,
  compareAtPrice: 290,
  currency: "ج.م",
  standardShippingFee: 50,
  freeShippingThresholdBottles: 3,

  // Social & Contacts
  whatsappNumber: "201112677930",
  whatsappUrl: "https://wa.me/201112677930",
  instagramUrl: "https://instagram.com/4muscle",
  tiktokUrl: "https://tiktok.com/@4muscle",
  phone: "+20 11 1267 7930",
  email: "support@4muscle.com",

  // Ticker Announcements
  announcements: [
    "استخدم كود أحد شركاءنا واحصل على 15% خصم",
    "أكبر حجم عبوة داخل السوق — 20 مل",
    "400 ملعقة سكر داخل العبوة (400 نقطة تحلية مركزة)",
    "البديل الآمن ليك ولعائلتك — مستخرج من السكرالوز المصرح من وزارة الصحة",
    "شحن مجاني عند شراء 3 عبوات أو أكثر لجميع المحافظات",
  ],

  // Approved Copy Direction (as per brand prompt)
  copy: {
    heroTitle: "حلاوة أسهل في كل لحظة",
    heroSubtitle: "4 Muscle Drops — 400 نقطة في عبوة صغيرة تناسب يومك",
    supportingLine: "استمتع بمشروباتك وأكلاتك المفضلة بطريقة أبسط، مع جرعة واضحة وتصميم عملي.",
    primaryCta: "اطلب الآن",
    secondaryCta: "اكتشف المنتج",
    useCasesTitle: "أضفه إلى لحظاتك المفضلة",
    comparisonTitle: "اختيار عملي لروتينك اليومي",
    reviewsTitle: "ماذا يقول عملاؤنا؟",
    faqTitle: "الأسئلة الشائعة",
    disclaimer: "ملاحظة: هذا المنتج محلي بديل للسكر، ولا يهدف لتشخيص أو علاج أو الوقاية من أي مرض.",
  },

  // Bundles from client assets
  bundles: [
    {
      id: "bundle-1",
      bottles: 1,
      title: "عبوة واحدة",
      subtitle: "لتجربة المنتج في روتينك اليومي",
      price: 240,
      compareAtPrice: 290,
      freeShipping: false,
    },
    {
      id: "bundle-3",
      bottles: 3,
      title: "ثلاث قطع",
      subtitle: "تكفي احتياجك المنتظم وتوفر عليك",
      price: 660,
      compareAtPrice: 870,
      freeShipping: true,
      isPopular: true,
      badge: "الأكثر مبيعاً ⭐",
    },
    {
      id: "bundle-4",
      bottles: 4,
      title: "أربع قطع",
      subtitle: "توفير أكبر للمنزل والعمل",
      price: 880,
      compareAtPrice: 1160,
      freeShipping: true,
      badge: "توفير ممتاز",
    },
    {
      id: "bundle-5",
      bottles: 5,
      title: "خمس قطع",
      subtitle: "باقة متميزة للاستخدام العائلي",
      price: 1100,
      compareAtPrice: 1450,
      freeShipping: true,
      badge: "قيمة عالية",
    },
    {
      id: "bundle-6",
      bottles: 6,
      title: "ست قطع + عبوة مجانية",
      subtitle: "أعلى توفير: احصل على 7 عبوات بسعر 6",
      price: 1320,
      compareAtPrice: 1740,
      freeShipping: true,
      extraGift: "عبوة إضافية مجانية",
      badge: "أفضل قيمة 🎁",
    },
  ] as BundleItem[],

  // Approved Benefits
  benefits: [
    {
      icon: "droplets",
      title: "سهل الاستخدام",
      description: "تصميم قطارة عملي ودقيق للاستخدام اليومي بدون فوضى.",
    },
    {
      icon: "check-circle",
      title: "جرعة واضحة",
      description: "نقطة واحدة = معلقة سكر كاملة، لسهولة ضبط التحلية المناسبة.",
    },
    {
      icon: "activity",
      title: "مناسب لروتينك الرياضي",
      description: "أضفه لمشروبات البروتين والعصائر دون أي طعم مر أو أثر جانبي.",
    },
    {
      icon: "sparkles",
      title: "400 نقطة تحلية",
      description: "عبوة مركزة 20 مل تدوم طويلاً وتمنحك قيمة حقيقية في كل قطرة.",
    },
  ],

  // Daily Use Cases
  useCases: [
    {
      id: "coffee",
      title: "القهوة",
      image: "/images/usecase-coffee.webp",
      desc: "تحلية فورية للإسبريسو والقهوة الصباحية دون أي مرارة.",
    },
    {
      id: "tea",
      title: "الشاي",
      image: "/images/usecase-tea.webp",
      desc: "نقاء طعم الشاي الطبيعي بقطرة واحدة خفيفة وسريعة الذوبان.",
    },
    {
      id: "protein",
      title: "مشروبات البروتين",
      image: "/images/usecase-protein.webp",
      desc: "رفيقك المثالي في الجيم لشيك البروتين والسموذي الرياضي.",
    },
    {
      id: "smoothies",
      title: "العصائر الطازجة",
      image: "/images/usecase-smoothies.webp",
      desc: "يعزز حلاوة الفاكهة الطبيعية في العصائر والكوكتيلات الصيفية.",
    },
    {
      id: "oats",
      title: "الزبادي والشوفان",
      image: "/images/usecase-oats.webp",
      desc: "فطورك الصحي متكامل مع الشوفان والزبادي والفواكه المشكلة.",
    },
    {
      id: "desserts",
      title: "الحلويات والمخبوزات",
      image: "/images/usecase-desserts.webp",
      desc: "مثالي للوصفات والحلويات الصحية دون المساس بنكهة الطبق.",
    },
  ],

  // Authentic Customer Reviews from materials
  reviews: [
    {
      id: "rev-1",
      author: "عميل موثق",
      text: "صباح الخير حبيت أشكرك علي الاختراع العظيم ده حرفيا احسن سكر دايت جربتو في حياتي ❤️",
      rating: 5,
      image: "/images/reviews/review-1.png",
      badge: "تجربة ممتازة",
    },
    {
      id: "rev-2",
      author: "عميل موثق",
      text: "استلمت المنتج وجربتو امبارح ماشاء الله مفيش تغير طعم او افتر تيستي عجبني جدا الصراحه ❤️",
      rating: 5,
      image: "/images/reviews/review-2.png",
      badge: "طعم طبيعي",
    },
    {
      id: "rev-3",
      author: "عميلة موثقة",
      text: "لا مفهوش اي افتر تيست تماما وده ال عجبني فيه ❤️",
      rating: 5,
      image: "/images/reviews/review-3.png",
      badge: "بدون أي مرارة",
    },
    {
      id: "rev-4",
      author: "عميل موثق",
      text: "استلمت الحمدلله مشاء الله المنتج رائع ومفيش افتر تيست ❤️❤️❤️❤️❤️",
      rating: 5,
      image: "/images/reviews/review-4.png",
      badge: "جودة عالية",
    },
    {
      id: "rev-5",
      author: "عميل موثق",
      text: "حلو اوي احسن نوع سكر دايت جربته متعرفش تفرقه عن السكر العادي ❤️",
      rating: 5,
      image: "/images/reviews/review-5.png",
      badge: "نفس طعم السكر",
    },
    {
      id: "rev-6",
      author: "عميل موثق",
      text: "ياصباح الجمال اي المنتج الجميل ده حرفيا ولا غلطه العيله كلها هتقطع سكر بسببو ماشاءالله ❤️",
      rating: 5,
      image: "/images/reviews/review-6.png",
      badge: "اختيار العائلة",
    },
  ] as ReviewItem[],

  // FAQ Items
  faq: [
    {
      question: "كيف أستخدم 4 Muscle؟",
      answer: "بكل بساطة، افتح العبوة وضع قطرة أو قطرتين مباشرة في مشروبك المفضل أو طعامك وقم بالتقليب السريع. قطرة واحدة تعادل ملعقة سكر كاملة.",
    },
    {
      question: "ما كمية الاستخدام الموصى بها؟",
      answer: "العبوة تحتوي على 400 نقطة تحلية مركزة، ويمكنك استخدام القطرات حسب رغبتك الشخصية في درجة الحلاوة المناسبة لك.",
    },
    {
      question: "هل يمكن استخدامه مع المشروبات الساخنة والباردة؟",
      answer: "نعم، قطرات 4 Muscle سريعة الذوبان ومقاومة لدرجات الحرارة، وتعمل بامتياز مع المشروبات الساخنة كالقهوة والشاي والمشروبات الباردة والسموذي.",
    },
    {
      question: "ما المكونات وطبيعة التحلية؟",
      answer: "مستخرج من السكرالوز المصرح من وزارة الصحة، آمن لمرضى السكر والضغط والأطفال، بصفر سعرات وبدون أي طعم مر نهائياً (No Aftertaste).",
    },
    {
      question: "ما هي مدة صلاحية المنتج؟",
      answer: "صلاحية عبوة 4 Muscle Drops سنتان (24 شهراً) من تاريخ الإنتاج المدون على العبوة.",
    },
    {
      question: "ما مدة الشحن والاستبدال؟",
      answer: "يصلك الطلب خلال 24 إلى 48 ساعة داخل القاهرة والجيزة والإسكندرية، وخلال 2 إلى 4 أيام لباقي المحافظات. يحق لك معاينة الشحنة عند الاستلام.",
    },
    {
      question: "كيف أتواصل مع الدعم الفني أو خدمة العملاء؟",
      answer: "يمكنك التواصل معنا مباشرة عبر تطبيق واتساب أو عبر صفحتنا على انستغرام وتيك توك، وفريقنا متاح للرد على استفساراتك ومتابعة شحنتك طوال الأسبوع.",
    },
  ],

  // Egyptian Governorates for accurate checkout
  governorates: [
    { name: "القاهرة", fee: 50 },
    { name: "الجيزة", fee: 50 },
    { name: "الإسكندرية", fee: 55 },
    { name: "القليوبية", fee: 55 },
    { name: "الشرقية", fee: 60 },
    { name: "الدقهلية", fee: 60 },
    { name: "البحيرة", fee: 60 },
    { name: "الغربية", fee: 60 },
    { name: "المنوفية", fee: 60 },
    { name: "دمياط", fee: 65 },
    { name: "كفر الشيخ", fee: 65 },
    { name: "بورسعيد", fee: 65 },
    { name: "الإسماعيلية", fee: 65 },
    { name: "السويس", fee: 65 },
    { name: "بني سويف", fee: 70 },
    { name: "الفيوم", fee: 70 },
    { name: "المنيا", fee: 75 },
    { name: "أسيوط", fee: 75 },
    { name: "سوهاج", fee: 80 },
    { name: "قنا", fee: 85 },
    { name: "الأقصر", fee: 85 },
    { name: "أسوان", fee: 90 },
    { name: "البحر الأحمر", fee: 90 },
    { name: "جنوب سيناء", fee: 90 },
    { name: "شمال سيناء", fee: 90 },
    { name: "مطروح", fee: 90 },
    { name: "الوادي الجديد", fee: 95 },
  ],
};
