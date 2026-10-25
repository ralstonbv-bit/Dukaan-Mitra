import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.png";
import promoPoster from "../promo-poster.jpg";
import promoVideo from "../promo.mp4";
import {
  CloudRain, Droplets, TrendingUp, TrendingDown, Package, PackagePlus, PackageMinus,
  Sparkles, Home, ClipboardList, Bell, BarChart3, Check, X, Umbrella, Flame,
  CalendarDays, MapPin, ChevronRight, ChevronDown, ScanLine, Camera, Globe,
  ArrowUpRight, ArrowDownRight, AlertTriangle, Boxes, ShieldAlert, MapPinned,
  Zap, Wifi, BatteryFull, Keyboard, Info, HelpCircle, Sun, Moon, Store, Users,
  Handshake, HandHelping, ShoppingCart, ArrowRight, CircleCheck, Search, Send, Plus, MessageCircle, Tag, Navigation, RefreshCw,
  LogOut, Phone, Lock, User, Eye, EyeOff, ShieldCheck, Wallet, CircleDollarSign
} from "lucide-react";

// ---- Design tokens (shop-floor friendly, high-contrast analytics) ----
const DARK_C = {
  bgApp: "#0a100d",
  bezel1: "#18221c",
  bezel2: "#030705",
  screen: "#101813",
  card: "#19251e",
  cardAlt: "#202e26",
  border: "rgba(218,239,222,0.10)",
  borderStrong: "rgba(218,239,222,0.17)",
  text: "#edf4ec",
  sub: "#b0c2b4",
  faint: "#8a9b8d",
  accent: "#22c58a",
  accent2: "#f0a10a",
  gold: "#ffc247",
  danger: "#f0665d",
  warn: "#f19b38",
  onAccent: "#072018",
  hero: "linear-gradient(125deg, #064b38 0%, #087a50 56%, #096343 100%)",
  shadow: "0 12px 32px -20px rgba(0,0,0,0.72)",
};

const LIGHT_C = {
  bgApp: "#f6f2e9",
  bezel1: "#e8e2d6",
  bezel2: "#c7c1b5",
  screen: "#fbf7ef",
  card: "#fffdf9",
  cardAlt: "#f2ecdf",
  border: "rgba(40, 59, 47, 0.10)",
  borderStrong: "rgba(40, 59, 47, 0.18)",
  text: "#1b2a21",
  sub: "#5f7167",
  faint: "#7f8c82",
  accent: "#087f55",
  accent2: "#bd7900",
  gold: "#f4a619",
  danger: "#c93227",
  warn: "#d76b32",
  onAccent: "#ffffff",
  hero: "linear-gradient(125deg, #075a43 0%, #087a50 56%, #0b895a 100%)",
  shadow: "0 2px 5px rgba(24,54,37,0.04), 0 16px 36px -24px rgba(24,54,37,0.28)",
};

// Logged-in shopkeeper (filled in at login, read by every screen)
const USER = { owner: "", shop: "", area: "", type: "", phone: "", logout: () => {} };

const C = { ...LIGHT_C };

const fontHead = "'Sora', sans-serif";
const fontBody = "'Inter', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

const LANGS = [
  { id: "en", label: "EN", name: "English" },
  { id: "hi", label: "हि", name: "हिन्दी" },
  { id: "mr", label: "मर", name: "मराठी" },
];

let activeLanguage = "en";

const UI_TRANSLATIONS = {
  hi: {
    Open: "खुला है", Logout: "लॉग आउट", "Switch to dark mode": "डार्क मोड चालू करें", "Switch to light mode": "लाइट मोड चालू करें", "Dark mode": "डार्क मोड", "Light mode": "लाइट मोड",
    "Weekly sales": "साप्ताहिक बिक्री", "Your shop at a glance": "आपकी दुकान की एक झलक", "LAST 7 DAYS": "पिछले 7 दिन", "this week": "इस सप्ताह", "Daily sales": "दैनिक बिक्री", "Weekly sales trend chart": "साप्ताहिक बिक्री का चार्ट",
    "Offers for your shop": "आपकी दुकान के ऑफ़र", "Sponsored · sample": "प्रायोजित · नमूना", "See offer": "ऑफ़र देखें", "Choose an offer": "ऑफ़र चुनें", "Monsoon promo video": "मानसून का प्रचार वीडियो", "The promo video could not be loaded.": "प्रचार वीडियो लोड नहीं हो सका।",
    "Tell me what you sold, for example: \"umbrella 2\".": "बताएं कि आपने क्या बेचा, उदाहरण: \"छाता 2\"।", "Type the item name, for example: \"Soap 100g\".": "उत्पाद का नाम लिखें, उदाहरण: \"साबुन 100 ग्राम\"।", "e.g. umbrella 2": "जैसे: छाता 2", "e.g. Soap 100g": "जैसे: साबुन 100 ग्राम",
    "Shop report": "दुकान की रिपोर्ट", "A quick view of what is happening and what to do next.": "क्या हो रहा है और आगे क्या करना है, इसकी संक्षिप्त जानकारी।", "Items low": "कम स्टॉक वाले उत्पाद", "Selling more": "ज़्यादा बिक रहा है", "ANDHERI MARKET PULSE": "अंधेरी बाज़ार की हलचल", "Nearby pulse": "आस-पास की हलचल", "External signals affecting your shop": "आपकी दुकान को प्रभावित करने वाले बाहरी संकेत", UPDATED: "अपडेट किया गया",
    "Opportunity signal": "मौके का संकेत", "Use local events, weather and nearby-shop activity as an early signal for what customers may want next.": "स्थानीय कार्यक्रम, मौसम और आसपास की दुकानों की गतिविधि से पता लगाएं कि ग्राहक आगे क्या चाह सकते हैं।", "Financial performance": "वित्तीय प्रदर्शन", "Revenue, expenses and business result": "आय, खर्च और कारोबार का नतीजा", "Customer payments": "ग्राहक भुगतान", "Keep cash collection visible alongside sales": "बिक्री के साथ नकद वसूली भी देखें", Collected: "मिला हुआ", Pending: "बाकी", received: "प्राप्त", "to collect": "वसूलना है",
    "Simple answers about your shop — what to sell, buy and keep.": "आपकी दुकान के आसान सुझाव — क्या बेचें, खरीदें और रखें।", "No matching stock.": "मिलता-जुलता स्टॉक नहीं मिला।", "Demand line chart": "मांग का रेखा-चार्ट", "Illustration of a neighborhood shop": "आस-पड़ोस की दुकान का चित्र",
    "Message": "संदेश", Online: "ऑनलाइन", Offline: "ऑफ़लाइन", Owner: "मालिक", "Connected shop": "जुड़ी हुई दुकान", "Receive shop update": "दुकान का अपडेट प्राप्त करें", "Type your message": "अपना संदेश लिखें", "Send message": "संदेश भेजें", "Select shop": "दुकान चुनें", YOU: "आप",
    "Show password": "पासवर्ड दिखाएं", "Hide password": "पासवर्ड छिपाएं", "Toggle theme": "थीम बदलें", "Check alerts": "अलर्ट देखें", "Decide using sales trends": "बिक्री के रुझान से निर्णय लें",
    "What is left health": "बचे हुए स्टॉक की स्थिति", "Where to replenish first": "पहले कहां स्टॉक भरें", "Replenishment priority": "स्टॉक भरने की प्राथमिकता", "Start with products closest to their safety level": "सुरक्षा सीमा के सबसे करीब उत्पादों से शुरू करें",
    "Monsoon umbrella pack": "मानसून के छातों का पैक", "12 umbrellas · wholesale rate": "12 छाते · थोक भाव", "Rainy day essentials": "बारिश के ज़रूरी सामान", "Keep raincoats ready for the weekend": "सप्ताहांत के लिए रेनकोट तैयार रखें", "Stock up for the season": "मौसम के लिए स्टॉक रखें", "Popular monsoon items · better value": "लोकप्रिय मानसून उत्पाद · बेहतर कीमत",
    "Show offer": "ऑफ़र दिखाएं", "Sales today": "आज की बिक्री", "Money sold today": "आज की बिक्री", "Things worth checking today": "आज जांचने योग्य बातें", "What may sell more": "क्या अधिक बिक सकता है", "What is selling more or less": "क्या अधिक या कम बिक रहा है", "Is it selling more?": "क्या इसकी बिक्री बढ़ रही है?", "Last 7 days": "पिछले 7 दिन", "Sold today": "आज बिका", "Low stock": "कम स्टॉक", "Fast movers": "तेज़ी से बिकने वाले", "Money left": "बाकी रकम", "compared with yesterday": "कल की तुलना में", "items to buy soon": "जल्द खरीदने वाले उत्पाद", "selling faster": "तेज़ी से बिक रहा है",
    "Alert count": "अलर्ट की संख्या", "Receive shop update": "दुकान का अपडेट प्राप्त करें", "Request sent": "अनुरोध भेजा गया", "Connect to message": "संदेश भेजने के लिए जुड़ें", "Connect first to message": "संदेश भेजने के लिए पहले जुड़ें", "Your available stock is visible to nearby shops": "आपका उपलब्ध स्टॉक पास की दुकानों को दिख रहा है",
    Mon: "सोम", Tue: "मंगल", Wed: "बुध", Thu: "गुरु", Fri: "शुक्र", Sat: "शनि", Sun: "रवि",
    "Storefront illustration": "दुकान का चित्र", "Promotional video": "प्रचार वीडियो", "Message shop": "दुकान को संदेश भेजें",
    "OPTICAL_SCAN // 01": "ऑप्टिकल स्कैन // ०१", "● LIVE": "● लाइव", "EAN / UPC": "EAN / UPC", "FOCUS 98%": "फोकस ९८%", "ISO AUTO": "ISO ऑटो",
    "Items selling faster": "तेज़ी से बिकने वाले उत्पाद", "Which items are moving faster": "कौन-से उत्पाद तेज़ी से बिक रहे हैं", "What do you sell more?": "आप क्या अधिक बेचते हैं?", "Popular products": "लोकप्रिय उत्पाद", "Sales are changing": "बिक्री में बदलाव हो रहा है",
    "Join nearby shops": "आस-पास की दुकानों से जुड़ें", "No matching stock.": "मिलता-जुलता स्टॉक नहीं मिला।", "Message ·": "संदेश ·", "away": "दूर", "Request stock": "स्टॉक का अनुरोध करें", "Share stock": "स्टॉक साझा करें",
    "Monsoon shop promotion video": "मानसून का दुकान प्रचार वीडियो", "Could not save your password in this browser. Check browser storage settings and try again.": "इस ब्राउज़र में पासवर्ड सेव नहीं हो सका। ब्राउज़र स्टोरेज सेटिंग जांचें और फिर कोशिश करें।", "Could not save your account in this browser. Check browser storage settings and try again.": "इस ब्राउज़र में खाता सेव नहीं हो सका। ब्राउज़र स्टोरेज सेटिंग जांचें और फिर कोशिश करें।", "Secure sign-in is unavailable. Please use a supported browser and try again.": "सुरक्षित लॉगिन उपलब्ध नहीं है। समर्थित ब्राउज़र में फिर कोशिश करें।",
    "Please wait…": "कृपया प्रतीक्षा करें…", "umbrella": "छाता", "Soap 100g": "साबुन 100 ग्राम", "Received": "मिला", "No products yet": "अभी कोई उत्पाद नहीं",
    "Month": "महीना", LIVE: "लाइव", "Shop report": "दुकान की रिपोर्ट", "Items selling faster": "तेज़ी से बिकने वाले उत्पाद", "Which items are moving faster": "कौन-से उत्पाद तेज़ी से बिक रहे हैं",
    "Umbrellas": "छाते", "Cold drinks": "ठंडे पेय", "Mosquito repellents": "मच्छर भगाने वाले उत्पाद", "Winter wear": "सर्दियों के कपड़े", "What should you check?": "आपको क्या जांचना चाहिए?", "Things worth checking today": "आज जांचने योग्य बातें",
    "Usual day": "सामान्य दिन", "Last day": "पिछला दिन", Change: "बदलाव", items: "उत्पाद", "What is left health": "बचे हुए स्टॉक की स्थिति", "Safety": "सुरक्षा सीमा", Capacity: "क्षमता",
    "Urgent items": "ज़रूरी उत्पाद", "at / below safety": "सुरक्षा सीमा पर या नीचे", "Top priority": "सबसे ज़रूरी", "3 items remaining": "3 उत्पाद बाकी", "External signals affecting your shop": "आपकी दुकान को प्रभावित करने वाले बाहरी संकेत",
    "Your available stock is visible to nearby shops": "आपका उपलब्ध स्टॉक पास की दुकानों को दिख रहा है", "I have stock available. How many do you need?": "मेरे पास स्टॉक उपलब्ध है। आपको कितनी मात्रा चाहिए?", "Thanks. I will keep it ready for you.": "धन्यवाद। मैं इसे आपके लिए तैयार रखूंगा।",
  },
  mr: {
    Open: "उघडे", Logout: "लॉग आउट", "Switch to dark mode": "डार्क मोड सुरू करा", "Switch to light mode": "लाईट मोड सुरू करा", "Dark mode": "डार्क मोड", "Light mode": "लाईट मोड",
    "Weekly sales": "आठवड्याची विक्री", "Your shop at a glance": "तुमच्या दुकानाची झलक", "LAST 7 DAYS": "मागील ७ दिवस", "this week": "या आठवड्यात", "Daily sales": "दैनिक विक्री", "Weekly sales trend chart": "आठवड्याच्या विक्रीचा आलेख",
    "Offers for your shop": "तुमच्या दुकानासाठी ऑफर", "Sponsored · sample": "प्रायोजित · नमुना", "See offer": "ऑफर पाहा", "Choose an offer": "ऑफर निवडा", "Monsoon promo video": "पावसाळी प्रचार व्हिडिओ", "The promo video could not be loaded.": "प्रचार व्हिडिओ लोड होऊ शकला नाही.",
    "Tell me what you sold, for example: \"umbrella 2\".": "काय विकले ते सांगा, उदाहरण: \"छत्री २\".", "Type the item name, for example: \"Soap 100g\".": "वस्तूचे नाव लिहा, उदाहरण: \"साबण १०० ग्रॅम\".", "e.g. umbrella 2": "उदा. छत्री २", "e.g. Soap 100g": "उदा. साबण १०० ग्रॅम",
    "Shop report": "दुकानाचा अहवाल", "A quick view of what is happening and what to do next.": "काय घडत आहे आणि पुढे काय करायचे याची थोडक्यात माहिती.", "Items low": "कमी साठ्यातील वस्तू", "Selling more": "जास्त विक्री", "ANDHERI MARKET PULSE": "अंधेरी बाजारातील घडामोडी", "Nearby pulse": "जवळपासच्या घडामोडी", "External signals affecting your shop": "तुमच्या दुकानावर परिणाम करणारे बाह्य संकेत", UPDATED: "अपडेट केले",
    "Opportunity signal": "संधीचा संकेत", "Use local events, weather and nearby-shop activity as an early signal for what customers may want next.": "स्थानिक कार्यक्रम, हवामान आणि जवळच्या दुकानांच्या हालचालींवरून ग्राहकांना पुढे काय हवे असेल याचा अंदाज घ्या.", "Financial performance": "आर्थिक कामगिरी", "Revenue, expenses and business result": "उत्पन्न, खर्च आणि व्यवसायाचा निकाल", "Customer payments": "ग्राहकांची देयके", "Keep cash collection visible alongside sales": "विक्रीसोबत रोख वसुलीही पाहा", Collected: "मिळाले", Pending: "बाकी", received: "प्राप्त", "to collect": "वसूल करायचे",
    "Simple answers about your shop — what to sell, buy and keep.": "तुमच्या दुकानासाठी सोपे मार्गदर्शन — काय विकावे, खरेदी करावे आणि ठेवावे.", "No matching stock.": "जुळणारा साठा सापडला नाही.", "Demand line chart": "मागणीचा रेषा आलेख", "Illustration of a neighborhood shop": "शेजारच्या दुकानाचे चित्र",
    "Message": "संदेश", Online: "ऑनलाइन", Offline: "ऑफलाइन", Owner: "मालक", "Connected shop": "जोडलेले दुकान", "Receive shop update": "दुकानाची माहिती मिळवा", "Type your message": "तुमचा संदेश लिहा", "Send message": "संदेश पाठवा", "Select shop": "दुकान निवडा", YOU: "तुम्ही",
    "Show password": "पासवर्ड दाखवा", "Hide password": "पासवर्ड लपवा", "Toggle theme": "थीम बदला", "Check alerts": "सूचना तपासा", "Decide using sales trends": "विक्रीच्या कलावरून निर्णय घ्या",
    "What is left health": "उरलेल्या साठ्याची स्थिती", "Where to replenish first": "प्रथम कुठे साठा भरावा", "Replenishment priority": "साठा भरण्याचे प्राधान्य", "Start with products closest to their safety level": "सुरक्षा मर्यादेजवळ असलेल्या वस्तूंनी सुरुवात करा",
    "Monsoon umbrella pack": "पावसाळी छत्र्यांचा संच", "12 umbrellas · wholesale rate": "१२ छत्र्या · घाऊक दर", "Rainy day essentials": "पावसाळ्यासाठी आवश्यक वस्तू", "Keep raincoats ready for the weekend": "आठवड्याच्या शेवटीसाठी रेनकोट तयार ठेवा", "Stock up for the season": "हंगामासाठी साठा करा", "Popular monsoon items · better value": "लोकप्रिय पावसाळी वस्तू · चांगली किंमत",
    "Show offer": "ऑफर दाखवा", "Sales today": "आजची विक्री", "Money sold today": "आजची विक्री", "Things worth checking today": "आज तपासण्यासारख्या गोष्टी", "What may sell more": "काय जास्त विकले जाऊ शकते", "What is selling more or less": "कशाची विक्री वाढते किंवा घटते", "Is it selling more?": "याची विक्री वाढते आहे का?", "Last 7 days": "मागील ७ दिवस", "Sold today": "आज विकले", "Low stock": "कमी साठा", "Fast movers": "जलद विक्रीच्या वस्तू", "Money left": "उरलेली रक्कम", "compared with yesterday": "कालच्या तुलनेत", "items to buy soon": "लवकर खरेदी करायच्या वस्तू", "selling faster": "जलद विक्री होत आहे",
    "Alert count": "सूचनांची संख्या", "Request sent": "विनंती पाठवली", "Connect to message": "संदेशासाठी जोडा", "Connect first to message": "संदेशासाठी आधी जोडा", "Your available stock is visible to nearby shops": "तुमचा उपलब्ध साठा जवळच्या दुकानांना दिसत आहे",
    Mon: "सोम", Tue: "मंगळ", Wed: "बुध", Thu: "गुरु", Fri: "शुक्र", Sat: "शनि", Sun: "रवि",
    "Storefront illustration": "दुकानाचे चित्र", "Promotional video": "प्रचार व्हिडिओ", "Message shop": "दुकानाला संदेश पाठवा",
    "Items selling faster": "जलद विक्री होणाऱ्या वस्तू", "Which items are moving faster": "कोणत्या वस्तू जलद विकल्या जात आहेत", "What do you sell more?": "तुम्ही काय जास्त विकता?", "Popular products": "लोकप्रिय वस्तू", "Sales are changing": "विक्रीत बदल होत आहे",
    "Join nearby shops": "जवळच्या दुकानांशी जोडा", "Message ·": "संदेश ·", "away": "अंतरावर", "Request stock": "साठ्याची विनंती करा", "Share stock": "साठा शेअर करा",
    "Monsoon shop promotion video": "पावसाळी दुकान प्रचार व्हिडिओ", "Could not save your password in this browser. Check browser storage settings and try again.": "या ब्राउझरमध्ये पासवर्ड जतन होऊ शकला नाही. ब्राउझर स्टोरेज सेटिंग तपासून पुन्हा प्रयत्न करा.", "Could not save your account in this browser. Check browser storage settings and try again.": "या ब्राउझरमध्ये खाते जतन होऊ शकले नाही. ब्राउझर स्टोरेज सेटिंग तपासून पुन्हा प्रयत्न करा.", "Secure sign-in is unavailable. Please use a supported browser and try again.": "सुरक्षित लॉगिन उपलब्ध नाही. समर्थित ब्राउझरमध्ये पुन्हा प्रयत्न करा.",
    "Please wait…": "कृपया थांबा…", "umbrella": "छत्री", "Soap 100g": "साबण १०० ग्रॅम", "Received": "मिळाले", "No products yet": "अद्याप उत्पादने नाहीत",
    "Month": "महिना", LIVE: "थेट", "Shop report": "दुकानाचा अहवाल", "Items selling faster": "जलद विक्री होणाऱ्या वस्तू", "Which items are moving faster": "कोणत्या वस्तू जलद विकल्या जात आहेत",
    "Umbrellas": "छत्र्या", "Cold drinks": "थंड पेये", "Mosquito repellents": "डास प्रतिबंधक उत्पादने", "Winter wear": "हिवाळी कपडे", "What should you check?": "तुम्ही काय तपासावे?", "Things worth checking today": "आज तपासण्यासारख्या गोष्टी",
    "Usual day": "सामान्य दिवस", "Last day": "मागील दिवस", Change: "बदल", items: "वस्तू", "What is left health": "उरलेल्या साठ्याची स्थिती", "Safety": "सुरक्षा मर्यादा", Capacity: "क्षमता",
    "Urgent items": "तातडीच्या वस्तू", "at / below safety": "सुरक्षा मर्यादेवर किंवा खाली", "Top priority": "सर्वाधिक प्राधान्य", "3 items remaining": "३ वस्तू शिल्लक", "External signals affecting your shop": "तुमच्या दुकानावर परिणाम करणारे बाह्य संकेत",
    "Your available stock is visible to nearby shops": "तुमचा उपलब्ध साठा जवळच्या दुकानांना दिसत आहे", "I have stock available. How many do you need?": "माझ्याकडे साठा उपलब्ध आहे. तुम्हाला किती हवा आहे?", "Thanks. I will keep it ready for you.": "धन्यवाद. मी तो तुमच्यासाठी तयार ठेवतो.",
  },
};

Object.assign(UI_TRANSLATIONS.hi, {
  "One clear view of what is happening, what is changing and what to do next.": "क्या हो रहा है, क्या बदल रहा है और आगे क्या करना है—एक नज़र में।",
  "What may sell more": "क्या ज़्यादा बिक सकता है", "What is selling more or less": "क्या ज़्यादा या कम बिक रहा है",
  "What should you check?": "आपको क्या जांचना चाहिए?", "Usual day": "आम दिन", "Last day": "पिछला दिन",
  "What is left health": "बचे हुए स्टॉक की स्थिति", "Where to replenish first": "पहले कहां स्टॉक भरें",
  "Safety": "सुरक्षा सीमा", "Capacity": "क्षमता", "Urgent items": "ज़रूरी उत्पाद", "at / below safety": "सुरक्षा सीमा पर या नीचे",
  "Top priority": "सबसे ज़रूरी", "3 items remaining": "3 उत्पाद बाकी", "Nearby pulse": "आस-पास की हलचल",
  "Opportunity signal": "मौके का संकेत", "Financial performance": "वित्तीय प्रदर्शन",
  "Use local events, weather and nearby-shop activity as an early signal for what customers may want next.": "स्थानीय कार्यक्रम, मौसम और आस-पास की दुकानों की गतिविधि से जानें कि ग्राहक आगे क्या चाह सकते हैं।",
  "Revenue, expenses and business result": "आय, खर्च और कारोबार का नतीजा", "Keep cash collection visible alongside sales": "बिक्री के साथ नकद वसूली भी देखें",
  "Close window": "विंडो बंद करें", "Live market data": "बाज़ार का लाइव डेटा",
  "What do you sell more?": "आप क्या अधिक बेचते हैं?", "Popular products": "लोकप्रिय उत्पाद", "Sales are changing": "बिक्री में बदलाव हो रहा है",
  "What may sell more": "क्या ज़्यादा बिक सकता है", "What is selling more or less": "क्या ज़्यादा या कम बिक रहा है",
  "I have stock available. How many do you need?": "मेरे पास स्टॉक उपलब्ध है। आपको कितनी मात्रा चाहिए?",
  "Thanks. I will keep it ready for you.": "धन्यवाद। मैं इसे आपके लिए तैयार रखूंगा।",
  "Message shop": "दुकान को संदेश भेजें", "Connect to message": "संदेश भेजने के लिए जुड़ें",
  "Connect first to message": "संदेश भेजने के लिए पहले जुड़ें", "away": "दूर",
  Apr: "अप्रैल", May: "मई", Jun: "जून", Jul: "जुलाई", Aug: "अगस्त", Sep: "सितंबर",
  "Sales by month": "महीने के अनुसार बिक्री", "Payment status": "भुगतान की स्थिति",
  "Milk, rice & household items": "दूध, चावल और घरेलू सामान", "Monthly grocery credit": "मासिक किराना उधार",
  "Cold drinks & snacks": "ठंडे पेय और नाश्ता", "Milk and biscuits": "दूध और बिस्कुट",
  UPI: "यूपीआई", Cash: "नकद", Udhaar: "उधार", Today: "आज", Tomorrow: "कल",
  New: "नया", "Shelf A1": "शेल्फ A1", "Shelf B2": "शेल्फ B2", "Shelf B3": "शेल्फ B3",
  "Rack C1": "रैक C1", "Rack C2": "रैक C2", "Fridge D1": "फ्रिज D1", "Floor E1": "फर्श E1",
  "Winter clothing": "सर्दियों के कपड़े",
});

Object.assign(UI_TRANSLATIONS.mr, {
  "One clear view of what is happening, what is changing and what to do next.": "काय घडत आहे, काय बदलत आहे आणि पुढे काय करायचे—एका नजरेत.",
  "What may sell more": "काय जास्त विकले जाऊ शकते", "What is selling more or less": "कशाची विक्री वाढते किंवा घटते",
  "What should you check?": "तुम्ही काय तपासावे?", "Usual day": "सामान्य दिवस", "Last day": "मागील दिवस",
  "What is left health": "उरलेल्या साठ्याची स्थिती", "Where to replenish first": "प्रथम कुठे साठा भरावा",
  "Safety": "सुरक्षा मर्यादा", "Capacity": "क्षमता", "Urgent items": "तातडीच्या वस्तू", "at / below safety": "सुरक्षा मर्यादेवर किंवा खाली",
  "Top priority": "सर्वाधिक प्राधान्य", "3 items remaining": "३ वस्तू शिल्लक", "Nearby pulse": "जवळपासच्या घडामोडी",
  "Use local events, weather and nearby-shop activity as an early signal for what customers may want next.": "स्थानिक कार्यक्रम, हवामान आणि जवळच्या दुकानांच्या हालचालींवरून ग्राहकांना पुढे काय हवे असेल याचा अंदाज घ्या.",
  "Revenue, expenses and business result": "उत्पन्न, खर्च आणि व्यवसायाचा निकाल", "Keep cash collection visible alongside sales": "विक्रीसोबत रोख वसुलीही पाहा",
  "Close window": "विंडो बंद करा", "Live market data": "बाजारातील थेट माहिती",
  "Message shop": "दुकानाला संदेश पाठवा", "Connect to message": "संदेशासाठी जोडा",
  "Connect first to message": "संदेशासाठी आधी जोडा", "away": "अंतरावर",
  Apr: "एप्रिल", May: "मे", Jun: "जून", Jul: "जुलै", Aug: "ऑगस्ट", Sep: "सप्टेंबर",
  "Sales by month": "महिन्यानुसार विक्री", "Payment status": "पेमेंटची स्थिती",
  "Milk, rice & household items": "दूध, तांदूळ आणि घरगुती वस्तू", "Monthly grocery credit": "मासिक किराणा उधार",
  "Cold drinks & snacks": "थंड पेये आणि नाश्ता", "Milk and biscuits": "दूध आणि बिस्किटे",
  UPI: "यूपीआय", Cash: "रोख", Udhaar: "उधार", Today: "आज", Tomorrow: "उद्या",
  New: "नवीन", "Shelf A1": "शेल्फ A1", "Shelf B2": "शेल्फ B2", "Shelf B3": "शेल्फ B3",
  "Rack C1": "रॅक C1", "Rack C2": "रॅक C2", "Fridge D1": "फ्रिज D1", "Floor E1": "जमिनीवर",
  "Winter clothing": "हिवाळी कपडे",
});

export function uiText(text, language = activeLanguage) {
  return UI_TRANSLATIONS[language]?.[text] || text;
}

function weekdayLabels() {
  if (activeLanguage === "hi") return ["सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि", "रवि"];
  if (activeLanguage === "mr") return ["सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि", "रवि"];
  return ["M", "T", "W", "T", "F", "S", "S"];
}

const ACCOUNT_STORAGE_KEY = "dukaan-mitra.accounts";
const DEMO_ACCOUNT_SETUP_KEY = "dukaan-mitra.demo-account-v1";
const STOCK_STORAGE_KEY = "dukaan-mitra.stock";
const LANGUAGE_STORAGE_KEY = "dukaan-mitra.language";

export function loadSavedLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGS.some(({ id }) => id === savedLanguage) ? savedLanguage : "en";
  } catch (error) {
    console.error("Unable to load the saved language preference.", error);
    return "en";
  }
}
const DEMO_PHONE = "7045643088";
const DEMO_ACCOUNT = {
  owner: "Sharma Jii",
  shop: "Laxmi Super Market",
  phone: DEMO_PHONE,
  type: "kirana",
  area: "Andheri East",
  passwordSalt: "nJjyfv7Nyo+4fl3/AGf9Eg==",
  passwordHash: "sLHXOo2Apodl6TlFliepGmdJx+aPI0KbkHAgpQt2dVM=",
};

function encodeBytes(bytes) {
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""));
}

function decodeBytes(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export async function createPasswordHash(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, key, 256);
  return { passwordSalt: encodeBytes(salt), passwordHash: encodeBytes(new Uint8Array(bits)) };
}

export async function verifyPassword(password, saltValue, expectedHash) {
  const salt = decodeBytes(saltValue);
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, key, 256);
  const actualHash = new Uint8Array(bits);
  const savedHash = decodeBytes(expectedHash);
  return actualHash.length === savedHash.length && actualHash.every((byte, index) => byte === savedHash[index]);
}

function createRecoveryCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0").toUpperCase()).join("").match(/.{1,4}/g).join("-");
}

function loadSavedAccounts() {
  try {
    const saved = localStorage.getItem(ACCOUNT_STORAGE_KEY);
    const accounts = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(accounts)) throw new Error("Saved account data is not a list.");
    const validAccounts = accounts.filter((account) =>
      account &&
      typeof account.owner === "string" &&
      typeof account.shop === "string" &&
      typeof account.phone === "string" &&
      typeof account.passwordSalt === "string" &&
      typeof account.passwordHash === "string"
    );
    const demoIndex = validAccounts.findIndex((account) => account.phone === DEMO_PHONE);
    if (demoIndex === -1) {
      validAccounts.push(DEMO_ACCOUNT);
    } else {
      const existingDemo = validAccounts[demoIndex];
      validAccounts[demoIndex] = {
        ...existingDemo,
        ...(!localStorage.getItem(DEMO_ACCOUNT_SETUP_KEY) ? DEMO_ACCOUNT : {}),
        owner: DEMO_ACCOUNT.owner,
        shop: DEMO_ACCOUNT.shop,
        recoverySalt: existingDemo.recoverySalt,
        recoveryHash: existingDemo.recoveryHash,
      };
    }
    if (!localStorage.getItem(DEMO_ACCOUNT_SETUP_KEY)) {
      try {
        localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(validAccounts));
        localStorage.setItem(DEMO_ACCOUNT_SETUP_KEY, "true");
      } catch (error) {
        console.error("Unable to save the demo shop account.", error);
      }
    }
    return validAccounts;
  } catch (error) {
    console.error("Unable to load saved shop accounts.", error);
    return [DEMO_ACCOUNT];
  }
}

export function loadSavedStock(phone) {
  try {
    const saved = localStorage.getItem(`${STOCK_STORAGE_KEY}.${phone}`);
    if (!saved) return phone === DEMO_PHONE ? initialStock : [];
    const stock = JSON.parse(saved);
    if (!Array.isArray(stock)) throw new Error("Saved stock data is not a list.");
    return phone === DEMO_PHONE && stock.length === 0 ? initialStock : stock;
  } catch (error) {
    console.error("Unable to load saved shop stock.", error);
    return phone === DEMO_PHONE ? initialStock : [];
  }
}

const T = {
  en: {
    appTitle: "Dukaan Mitra", greeting: "Welcome back",
    tabHome: "Today", tabStock: "My stock", tabAlerts: "Check", tabTrends: "Help me decide", tabNetwork: "Nearby",
    weatherLine1: "Rain is coming", weatherLine2: "Keep umbrellas and raincoats ready — they may sell more",
    statSales: "Money sold today", statLow: "Items running low", statAlerts: "Things to check", items: "items", newAlerts: "new",
    yesterdayChange: "+12% vs yesterday", heroLowLabel: "low",
    aiRec: "What you should do", recTitle: "Buy 12 more umbrellas", rainNotificationTitle: "Rain is coming", rainNotification: "Keep umbrellas ready before the weekend",
    recBody: "Only 3 are left. More people may buy them because of the rain.",
    confidence: "82% sure", why: "Why this?",
    reasonTitle: "Why should I do this?",
    r1: "Rain is expected for the next 3 days",
    r2: "Umbrellas sold much faster during the last rain",
    r3: "Only 3 umbrellas are left — they may finish before the weekend",
    orderNow: "Buy now", notNow: "Later",
    surgeTitle: "Cold drinks are selling faster", surgeBody: "The nearby school is open again — keep extra cold drinks",
    stockHeader: "My stock", stockSub: "See what is left. Add or remove items easily.",
    scan: "Scan item",
    lowStockTag: "Buy soon",
    stockGood: "Good", stockOver: "Too much", stockSummary: "Stock at a glance",
    alertsCount: "things need you", alertsDone: "Mark as done", alertActionBuy: "Save restock reminder",
    alertUrgent: "Urgent", alertRising: "Rising", alertSoon: "Soon", alertsAllClear: "All clear!",
    alertsAllClearBody: "Nothing needs your attention right now.",
    alertWatchTitle: "Today I will watch", alertWatchBody: "Rain, school timings and festival dates near your shop — and tell you what to do.",
    forecastTitle: "Umbrella sales", forecastSubtitle: "Past 7 days and what may happen",
    forecastPast: "Past 7 days", forecastNow: "Now", forecastMay: "May happen",
    marketDemandTitle: "What is selling more?", adviceTitle: "My advice",
    adviceBuyUmbrellas: "Buy 12 umbrellas", adviceKeepDrinks: "Keep cold drinks", adviceWinterOffer: "Offer on slower items",
    adviceUmbrellaBody: "Rain is expected and only 3 umbrellas are left.",
    adviceDrinksBody: "The nearby school is open again.",
    adviceSlowBody: "Consider a small offer to free up shelf space.",
    adviceDoIt: "Do it", adviceGotIt: "Got it", adviceCreateOffer: "Create offer",
    alertsHeader: "Things to check", alertsSub: "I will tell you what needs attention.",
    a1t: "Umbrellas are almost finished", a1b: "Only 3 left and rain is coming",
    a2t: "Cold drinks are selling fast", a2b: "The nearby school is open again",
    a3t: "Festival is coming", a3b: "Keep sweets and festival items ready",
    trendsHeader: "Help me decide", trendsSub: "Simple answers about what to sell, buy and keep",
    segDemand: "What is selling?", segNearby: "Nearby", segStock: "What is left?",
    demandTitle: "What is selling more?", historical: "Past", current: "Now", prediction: "What may happen", rising: "Selling more", falling: "Selling less", stable: "About the same",
    marketTitle: "What is happening nearby?",
    marketFestival: "Ganesh Chaturthi in 9 days", marketFestivalBody: "Modak moulds, sweets & decoration demand typically rises 3x",
    marketEvent: "School reopened nearby", marketEventBody: "Stationery & snacks footfall up in your area",
    marketWeather: "Monsoon active", marketWeatherBody: "Rain-gear category trending across nearby shops",
    stockLevelsTitle: "What is left in the shop?",
    safety: "Keep this much", reorder: "Buy more now", overstock: "Too much on shelf",
    scanModalScanning: "Scanning", scanModalHold: "Hold barcode steady in frame",
    scanFoundTitle: "Product found", scanAdd: "Add to stock", scanUnit: "items",
    footer: "Tap the AI card on Today for reasoning. Tap Scan Barcode on Stock to try it live.",
    prototypeTag: "Prototype",
    manualEntry: "Type code manually instead",
    manualWhy: "Sometimes the camera can't read a torn, dirty or blurry barcode. If scanning doesn't work, just type the number printed under the barcode lines — it works the same way.",
    manualPlaceholder: "e.g. 8901030575681",
    manualSubmit: "Find product",
    manualBack: "Back to camera",
    scanFailTitle: "Couldn't read this barcode",
    scanFailBody: "It may be torn, dirty, or too blurry for the camera to read clearly.",
    tryAgain: "Try scanning again",
    legendTitle: "What do these words mean?",
    legendSub: "Tap any word to understand it in simple terms",
    safetyExplain: "This is the lowest amount of an item you should always keep. Think of it like keeping a little extra rice at home — enough so you never fully run out before your next trip to the market.",
    reorderExplain: "Your stock has fallen to the point where you must order more right now. If you wait longer, you could run out before the new stock reaches your shop.",
    overstockExplain: "You are holding more of this item than you actually need. Your money is stuck sitting on the shelf, and it's taking up space that faster-selling items could use instead.",
    networkHeader: "Nearby shops", networkSub: "See shops around you and help each other",
    pulseTitle: "What are people buying nearby?", pulseUpdated: "Updated recently", trending: "Selling more", slowing: "Selling less",
    pulseInsight: "Rain is expected this weekend and umbrella demand is rising across nearby participating shops. Consider increasing your stock.",
    networkTitle: "Dukaan Network", networkBody: "Nearby shops are sharing stock and helping each other stay open.",
    nearby: "Shops near you", available: "available", connect: "Connect", connected: "Connected",
    shareStock: "Give stock", requestStock: "Ask for stock",
    saleRecorded: "Sale saved", recordSale: "I sold something", addProduct: "Add new item", searchStock: "Find an item", lowOnly: "Buy soon", allStock: "Show everything",
    finance: "My money", financeTitle: "Money in and money out", revenue: "Money sold", expenses: "Money spent", profit: "Money left", loss: "Money short", netResult: "Money left", financeNote: "Money sold minus money spent", paymentHistoryTitle: "Customer credit (Udhaar)", paymentHistorySub: "See who has paid and who still has to pay", collected: "Received", pending: "Still to receive", customers: "People", paymentReceived: "Payment received", paymentDue: "Payment due", paymentMode: "How", paymentCustomer: "Customer", paymentToday: "Today",
    aiBriefTitle: "Your 30-second dukaan brief", aiBriefBody: "2 actions can protect sales today.", viewBrief: "View brief", brief1: "Move 5 cold drinks to the front — demand is rising.", brief2: "Ask Patel Mart for 4 umbrellas before ordering wholesale.",
  },
  hi: {
    appTitle: "दुकान मित्र", greeting: "नमस्ते",
    tabHome: "आज", tabStock: "स्टॉक", tabAlerts: "अलर्ट", tabTrends: "विश्लेषण", tabNetwork: "बाज़ार",
    weatherLine1: "बारिश आने वाली है, अगले 3 दिन", weatherLine2: "छाता और रेनकोट की मांग ~40% बढ़ सकती है",
    statSales: "आज की बिक्री", statLow: "कम स्टॉक", statAlerts: "नए अलर्ट", items: "आइटम", newAlerts: "नए",
    yesterdayChange: "कल से +12%", heroLowLabel: "कम",
    aiRec: "AI सुझाव", recTitle: "12 और छाते मंगवाओ", rainNotificationTitle: "बारिश की सलाह", rainNotification: "बारिश अलर्ट: वीकेंड से पहले रेनवेयर का स्टॉक तैयार रखें",
    recBody: "सिर्फ 3 बचे हैं। बारिश + वीकेंड से मांग दोगुनी हो सकती है।",
    confidence: "82% भरोसा", why: "क्यों?",
    reasonTitle: "यह सुझाव क्यों?",
    r1: "अगले 3 दिन बारिश का अनुमान (मौसम डेटा)",
    r2: "पिछली बारिश में छाते की बिक्री 2.3 गुना बढ़ी थी",
    r3: "सिर्फ 3 स्टॉक में — वीकेंड तक खत्म हो जाएगा",
    orderNow: "ऑर्डर करें", notNow: "अभी नहीं",
    surgeTitle: "मार्केट सर्ज: कोल्ड ड्रिंक", surgeBody: "पास का स्कूल खुला — 2 दिन में मांग 60% बढ़ी",
    stockHeader: "स्टॉक", stockSub: "बारकोड स्कैन करें या मैन्युअल बदलें",
    scan: "बारकोड स्कैन करें",
    lowStockTag: "कम स्टॉक",
    stockGood: "ठीक", stockOver: "ज़्यादा स्टॉक", stockSummary: "स्टॉक की एक झलक",
    alertsCount: "बातों पर ध्यान दें", alertsDone: "पूरा हुआ", alertActionBuy: "स्टॉक रिमाइंडर सेव करें",
    alertUrgent: "ज़रूरी", alertRising: "बढ़ रहा है", alertSoon: "जल्द", alertsAllClear: "सब ठीक है!",
    alertsAllClearBody: "अभी किसी बात पर ध्यान देने की ज़रूरत नहीं है।",
    alertWatchTitle: "आज मैं ध्यान रखूंगा", alertWatchBody: "आपकी दुकान के पास बारिश, स्कूल के समय और त्योहार की तारीखों पर नज़र रखूंगा — और बताऊंगा कि क्या करना है।",
    forecastTitle: "छाते की बिक्री", forecastSubtitle: "पिछले 7 दिन और आगे क्या हो सकता है",
    forecastPast: "पिछले 7 दिन", forecastNow: "अभी", forecastMay: "हो सकता है",
    marketDemandTitle: "क्या ज़्यादा बिक रहा है?", adviceTitle: "मेरी सलाह",
    adviceBuyUmbrellas: "12 छाते खरीदें", adviceKeepDrinks: "कोल्ड ड्रिंक रखें", adviceWinterOffer: "धीमे बिकने वाले सामान पर ऑफर",
    adviceUmbrellaBody: "बारिश का अनुमान है और सिर्फ 3 छाते बचे हैं।",
    adviceDrinksBody: "पास का स्कूल फिर से खुल गया है।",
    adviceSlowBody: "शेल्फ की जगह खाली करने के लिए छोटा ऑफर दें।",
    adviceDoIt: "करें", adviceGotIt: "समझ गया", adviceCreateOffer: "ऑफर बनाएं",
    alertsHeader: "अलर्ट", alertsSub: "ज़रूरी बात जानें। सही कदम उठाएं।",
    a1t: "छाता स्टॉक कम है", a1b: "सिर्फ 3 बचे हैं, बारिश आ रही है",
    a2t: "कोल्ड ड्रिंक सर्ज", a2b: "पास का स्कूल खुला — मांग +60%",
    a3t: "गणेश चतुर्थी आ रही है", a3b: "मोदक सांचे और मिठाई का स्टॉक बढ़ाओ",
    trendsHeader: "विश्लेषण", trendsSub: "आपकी दुकान के डेटा के तीन नज़रिए",
    segDemand: "मांग", segNearby: "मार्केट", segStock: "स्टॉक",
    demandTitle: "इस हफ्ते ट्रेंड कर रहे प्रोडक्ट", historical: "पिछला डेटा", current: "अभी / भविष्य", prediction: "अनुमान", rising: "बढ़ती मांग", falling: "घटती मांग", stable: "स्थिर मांग",
    marketTitle: "स्थानीय बाज़ार संकेत",
    marketFestival: "गणेश चतुर्थी 9 दिन में", marketFestivalBody: "मोदक सांचे, मिठाई और सजावट की मांग आमतौर पर 3x बढ़ती है",
    marketEvent: "पास का स्कूल खुला", marketEventBody: "स्टेशनरी और स्नैक्स की मांग बढ़ी है",
    marketWeather: "मानसून सक्रिय", marketWeatherBody: "आसपास की दुकानों में रेन-गियर ट्रेंड कर रहा है",
    stockLevelsTitle: "रीयल-टाइम स्टॉक और सीमाएं",
    safety: "सुरक्षा सीमा", reorder: "रीऑर्डर पॉइंट पहुंचा", overstock: "ज़्यादा स्टॉक",
    scanModalScanning: "स्कैन हो रहा है", scanModalHold: "बारकोड को फ्रेम में स्थिर रखें",
    scanFoundTitle: "प्रोडक्ट मिला", scanAdd: "स्टॉक में जोड़ें", scanUnit: "यूनिट",
    footer: "कारण जानने के लिए 'आज' पेज पर AI कार्ड टैप करें। स्टॉक पर स्कैन बटन आज़माएं।",
    prototypeTag: "प्रोटोटाइप",
    manualEntry: "इसके बजाय नंबर खुद टाइप करें",
    manualWhy: "कभी-कभी कैमरा फटा, गंदा या धुंधला बारकोड नहीं पढ़ पाता। अगर स्कैन नहीं हो रहा, तो बारकोड की लाइनों के नीचे लिखा नंबर टाइप कर दें — यह वैसे ही काम करता है।",
    manualPlaceholder: "जैसे 8901030575681",
    manualSubmit: "प्रोडक्ट खोजें",
    manualBack: "कैमरे पर वापस जाएं",
    scanFailTitle: "यह बारकोड नहीं पढ़ा जा सका",
    scanFailBody: "हो सकता है यह फटा, गंदा या धुंधला हो जिसे कैमरा साफ़ नहीं पढ़ पाया।",
    tryAgain: "दोबारा स्कैन करें",
    legendTitle: "इन शब्दों का मतलब क्या है?",
    legendSub: "आसान भाषा में समझने के लिए किसी भी शब्द पर टैप करें",
    safetyExplain: "यह किसी सामान की वह सबसे कम मात्रा है जो आपको हमेशा रखनी चाहिए। जैसे घर में हमेशा थोड़ा ज़्यादा चावल रखते हैं — ताकि अगली बार बाज़ार जाने से पहले पूरी तरह खत्म न हो।",
    reorderExplain: "आपका स्टॉक उस स्तर तक गिर गया है जहां अभी और मंगवाना ज़रूरी है। अगर देर की, तो नया माल आने से पहले ही सामान खत्म हो सकता है।",
    overstockExplain: "आपके पास इस सामान की ज़रूरत से ज़्यादा मात्रा है। आपका पैसा दुकान में बिना बिके पड़ा है, और यह जगह उन चीज़ों के काम आ सकती थी जो तेज़ी से बिकती हैं।",
    networkHeader: "मार्केट पल्स", networkSub: "आपके इलाके में क्या चल रहा है",
    pulseTitle: "आपके पास क्या चल रहा है?", pulseUpdated: "12 मिनट पहले अपडेट", trending: "बढ़ रहा है", slowing: "घट रहा है",
    pulseInsight: "इस वीकेंड बारिश की उम्मीद है और आसपास की दुकानों में छातों की मांग बढ़ रही है। अपना स्टॉक बढ़ाने पर विचार करें।",
    networkTitle: "दुकान नेटवर्क", networkBody: "आसपास की दुकानें स्टॉक साझा करके एक-दूसरे की मदद कर रही हैं।",
    nearby: "आसपास की दुकानें", available: "उपलब्ध", connect: "जुड़ें", connected: "जुड़ गए",
    shareStock: "स्टॉक साझा करें", requestStock: "स्टॉक मांगें",
    saleRecorded: "बिक्री दर्ज", recordSale: "बिक्री दर्ज करें", addProduct: "प्रोडक्ट जोड़ें", searchStock: "स्टॉक खोजें", lowOnly: "कम स्टॉक", allStock: "सारा स्टॉक",
    finance: "वित्त", financeTitle: "मासिक आय और लाभ", revenue: "आय", expenses: "खर्च", profit: "लाभ", loss: "नुकसान", netResult: "शुद्ध परिणाम", financeNote: "आय में से संचालन खर्च घटाकर", paymentHistoryTitle: "ग्राहक भुगतान इतिहास", paymentHistorySub: "उधार की वसूली और बाकी रकम देखें", collected: "वसूली", pending: "बाकी", customers: "ग्राहक", paymentReceived: "भुगतान मिला", paymentDue: "भुगतान बाकी", paymentMode: "तरीका", paymentCustomer: "ग्राहक", paymentToday: "आज",
    aiBriefTitle: "आपकी 30-सेकंड दुकान जानकारी", aiBriefBody: "आज 2 काम बिक्री बचा सकते हैं।", viewBrief: "जानकारी देखें", brief1: "5 कोल्ड ड्रिंक आगे रखें — मांग बढ़ रही है।", brief2: "ऑर्डर से पहले पटेल मार्ट से 4 छाते मांगें।",
  },
  mr: {
    appTitle: "दुकान मित्र", greeting: "नमस्कार",
    tabHome: "आज", tabStock: "स्टॉक", tabAlerts: "अलर्ट", tabTrends: "विश्लेषण", tabNetwork: "बाजार",
    weatherLine1: "पुढील 3 दिवस पाऊस अपेक्षित", weatherLine2: "छत्री व रेनकोटची मागणी ~40% वाढू शकते",
    statSales: "आजची विक्री", statLow: "कमी स्टॉक", statAlerts: "नवीन अलर्ट", items: "वस्तू", newAlerts: "नवीन",
    yesterdayChange: "कालपेक्षा +12%", heroLowLabel: "कमी",
    aiRec: "AI शिफारस", recTitle: "आणखी 12 छत्र्या मागवा", rainNotificationTitle: "पावसाची शिफारस", rainNotification: "पाऊस अलर्ट: वीकेंडपूर्वी रेनवेअरचा स्टॉक तयार ठेवा",
    recBody: "फक्त 3 शिल्लक आहेत. पाऊस + वीकेंडमुळे मागणी दुप्पट होऊ शकते.",
    confidence: "82% विश्वास", why: "का?",
    reasonTitle: "ही शिफारस का?",
    r1: "पुढील 3 दिवस पावसाचा अंदाज (हवामान डेटा)",
    r2: "मागील पावसात छत्रीची विक्री 2.3 पट वाढली होती",
    r3: "फक्त 3 स्टॉकमध्ये — वीकेंडपर्यंत संपेल",
    orderNow: "ऑर्डर करा", notNow: "आत्ता नको",
    surgeTitle: "मार्केट सर्ज: कोल्ड ड्रिंक", surgeBody: "जवळची शाळा सुरू झाली — 2 दिवसांत मागणी 60% वाढली",
    stockHeader: "स्टॉक", stockSub: "बारकोड स्कॅन करा किंवा मॅन्युअली बदला",
    scan: "बारकोड स्कॅन करा",
    lowStockTag: "कमी स्टॉक",
    stockGood: "ठीक", stockOver: "जास्त स्टॉक", stockSummary: "स्टॉकची झलक",
    alertsCount: "गोष्टींकडे लक्ष द्या", alertsDone: "पूर्ण झाले", alertActionBuy: "स्टॉक स्मरणपत्र जतन करा",
    alertUrgent: "तातडीचे", alertRising: "वाढत आहे", alertSoon: "लवकरच", alertsAllClear: "सर्व ठीक!",
    alertsAllClearBody: "आत्ता लक्ष देण्यासारखे काही नाही.",
    alertWatchTitle: "आज मी लक्ष ठेवेन", alertWatchBody: "तुमच्या दुकानाजवळील पाऊस, शाळेच्या वेळा आणि सणांच्या तारखांवर लक्ष ठेवून काय करावे ते सांगेन.",
    forecastTitle: "छत्रीची विक्री", forecastSubtitle: "मागील 7 दिवस आणि पुढे काय होऊ शकते",
    forecastPast: "मागील 7 दिवस", forecastNow: "आत्ता", forecastMay: "होऊ शकते",
    marketDemandTitle: "काय जास्त विकले जात आहे?", adviceTitle: "माझा सल्ला",
    adviceBuyUmbrellas: "12 छत्र्या घ्या", adviceKeepDrinks: "कोल्ड ड्रिंक्स ठेवा", adviceWinterOffer: "कमी विकल्या जाणाऱ्या वस्तूंवर ऑफर",
    adviceUmbrellaBody: "पावसाचा अंदाज आहे आणि फक्त 3 छत्र्या शिल्लक आहेत.",
    adviceDrinksBody: "जवळची शाळा पुन्हा सुरू झाली आहे.",
    adviceSlowBody: "शेल्फची जागा मोकळी करण्यासाठी छोटी ऑफर द्या.",
    adviceDoIt: "करा", adviceGotIt: "समजले", adviceCreateOffer: "ऑफर तयार करा",
    alertsHeader: "अलर्ट", alertsSub: "महत्त्वाचे जाणून घ्या. आत्मविश्वासाने कृती करा.",
    a1t: "छत्री स्टॉक कमी", a1b: "फक्त 3 शिल्लक, पाऊस येतो आहे",
    a2t: "कोल्ड ड्रिंक सर्ज", a2b: "जवळची शाळा सुरू — मागणी +60%",
    a3t: "गणेश चतुर्थी जवळ आली", a3b: "मोदक साचे व मिठाईचा स्टॉक वाढवा",
    trendsHeader: "विश्लेषण", trendsSub: "तुमच्या दुकानाच्या डेटाचे तीन दृष्टिकोन",
    segDemand: "मागणी", segNearby: "मार्केट", segStock: "स्टॉक",
    demandTitle: "या आठवड्यातील ट्रेंडिंग उत्पादने", historical: "मागील डेटा", current: "सध्याचा / भविष्य", prediction: "अंदाज", rising: "वाढती मागणी", falling: "घटती मागणी", stable: "स्थिर मागणी",
    marketTitle: "स्थानिक बाजार संकेत",
    marketFestival: "गणेश चतुर्थी 9 दिवसांत", marketFestivalBody: "मोदक साचे, मिठाई व सजावटीची मागणी साधारण 3x वाढते",
    marketEvent: "जवळची शाळा सुरू झाली", marketEventBody: "स्टेशनरी व स्नॅक्सची मागणी वाढली",
    marketWeather: "मान्सून सक्रिय", marketWeatherBody: "आसपासच्या दुकानांत रेन-गिअर ट्रेंड करत आहे",
    stockLevelsTitle: "रिअल-टाइम स्टॉक व मर्यादा",
    safety: "सुरक्षा मर्यादा", reorder: "रीऑर्डर पॉइंट गाठला", overstock: "जास्त स्टॉक",
    scanModalScanning: "स्कॅन होत आहे", scanModalHold: "बारकोड फ्रेममध्ये स्थिर धरा",
    scanFoundTitle: "उत्पादन सापडले", scanAdd: "स्टॉकमध्ये जोडा", scanUnit: "युनिट",
    footer: "कारण पाहण्यासाठी 'आज' पानावरील AI कार्ड टॅप करा. स्टॉकवरील स्कॅन बटण वापरून पहा.",
    prototypeTag: "प्रोटोटाइप",
    manualEntry: "त्याऐवजी नंबर स्वतः टाइप करा",
    manualWhy: "कधी कधी कॅमेरा फाटलेला, घाणेरडा किंवा अस्पष्ट बारकोड वाचू शकत नाही. स्कॅन होत नसेल तर बारकोडच्या रेषांखाली लिहिलेला नंबर टाइप करा — तो तसाच काम करतो.",
    manualPlaceholder: "उदा. 8901030575681",
    manualSubmit: "उत्पादन शोधा",
    manualBack: "कॅमेऱ्यावर परत जा",
    scanFailTitle: "हा बारकोड वाचता आला नाही",
    scanFailBody: "तो फाटलेला, घाणेरडा किंवा अस्पष्ट असू शकतो ज्यामुळे कॅमेरा तो नीट वाचू शकला नाही.",
    tryAgain: "पुन्हा स्कॅन करा",
    legendTitle: "या शब्दांचा अर्थ काय?",
    legendSub: "सोप्या भाषेत समजून घेण्यासाठी कोणत्याही शब्दावर टॅप करा",
    safetyExplain: "ही एखाद्या वस्तूची सर्वात कमी मात्रा आहे जी तुम्ही नेहमी ठेवावी. जसं घरात नेहमी थोडा जास्त तांदूळ ठेवतो — जेणेकरून पुढच्या बाजारहेटीपूर्वी पूर्ण संपू नये.",
    reorderExplain: "तुमचा स्टॉक अशा पातळीवर आला आहे जिथे आत्ताच अधिक मागवणे गरजेचे आहे. उशीर केल्यास नवीन माल येण्यापूर्वीच सामान संपू शकते.",
    overstockExplain: "तुमच्याकडे या वस्तूची गरजेपेक्षा जास्त मात्रा आहे. तुमचे पैसे न विकल्या गेलेल्या मालामध्ये अडकले आहेत, आणि ही जागा वेगाने विकल्या जाणाऱ्या वस्तूंसाठी वापरता आली असती.",
    networkHeader: "मार्केट पल्स", networkSub: "तुमच्या परिसरात काय चालले आहे",
    pulseTitle: "तुमच्या जवळ काय चालले आहे?", pulseUpdated: "12 मिनिटांपूर्वी अपडेट", trending: "वाढत आहे", slowing: "घटत आहे",
    pulseInsight: "या वीकेंडला पावसाची शक्यता आहे आणि जवळच्या दुकानांमध्ये छत्रीची मागणी वाढत आहे. तुमचा स्टॉक वाढवण्याचा विचार करा.",
    networkTitle: "दुकान नेटवर्क", networkBody: "जवळची दुकाने स्टॉक शेअर करून एकमेकांना मदत करत आहेत.",
    nearby: "जवळची दुकाने", available: "उपलब्ध", connect: "जोडा", connected: "जोडले",
    shareStock: "स्टॉक शेअर करा", requestStock: "स्टॉक मागवा",
    saleRecorded: "विक्री नोंदली", recordSale: "विक्री नोंदवा", addProduct: "उत्पादन जोडा", searchStock: "स्टॉक शोधा", lowOnly: "कमी स्टॉक", allStock: "सर्व स्टॉक",
    finance: "वित्त", financeTitle: "मासिक उत्पन्न व नफा", revenue: "उत्पन्न", expenses: "खर्च", profit: "नफा", loss: "तोटा", netResult: "निव्वळ निकाल", financeNote: "उत्पन्नातून व्यवसायाचा खर्च वजा करून", paymentHistoryTitle: "ग्राहक पेमेंट इतिहास", paymentHistorySub: "उधारीची वसुली आणि बाकी रक्कम पाहा", collected: "वसूल", pending: "बाकी", customers: "ग्राहक", paymentReceived: "पेमेंट मिळाले", paymentDue: "पेमेंट बाकी", paymentMode: "पद्धत", paymentCustomer: "ग्राहक", paymentToday: "आज",
    aiBriefTitle: "तुमचा 30-सेकंद दुकान ब्रीफ", aiBriefBody: "आज 2 कृती विक्री वाचवू शकतात.", viewBrief: "ब्रीफ पहा", brief1: "5 कोल्ड ड्रिंक्स पुढे ठेवा — मागणी वाढत आहे.", brief2: "ऑर्डरपूर्वी पटेल मार्टकडून 4 छत्र्या मागवा.",
  },
};

const initialStock = [
  { id: 1, key: "milk", name: "Amul Milk 500ml", qty: 34, min: 15, max: 60, unit: "pkt", trend: 8, loc: "Shelf A1" },
  { id: 2, key: "biscuit", name: "Parle-G Biscuit", qty: 8, min: 15, max: 50, unit: "pkt", trend: -12, loc: "Shelf B2" },
  { id: 3, key: "umbrella", name: "Umbrella (Small)", qty: 3, min: 10, max: 40, unit: "pc", trend: 34, loc: "Rack C1" },
  { id: 4, key: "colddrink", name: "Cold Drink 750ml", qty: 21, min: 12, max: 45, unit: "btl", trend: 60, loc: "Fridge D1" },
  { id: 5, key: "rice", name: "Rice 5kg", qty: 58, min: 10, max: 40, unit: "bag", trend: 2, loc: "Floor E1" },
  { id: 6, key: "raincoat", name: "Raincoat", qty: 5, min: 8, max: 25, unit: "pc", trend: 18, loc: "Rack C2" },
  { id: 7, key: "notebook", name: "School Notebook", qty: 18, min: 10, max: 35, unit: "pc", trend: 12, loc: "Shelf B3" },
];

const monthlyFinancials = [
  { month: "Apr", revenue: 118400, expenses: 103200 },
  { month: "May", revenue: 126800, expenses: 111500 },
  { month: "Jun", revenue: 139600, expenses: 121900 },
  { month: "Jul", revenue: 132200, expenses: 136400 },
  { month: "Aug", revenue: 151800, expenses: 128700 },
  { month: "Sep", revenue: 164500, expenses: 139800 },
];

const customerPayments = [
  { customer: "Meena Aunty", detail: "Milk, rice & household items", amount: 860, status: "paid", mode: "UPI", due: "Today" },
  { customer: "Patel Family", detail: "Monthly grocery credit", amount: 1240, status: "pending", mode: "Udhaar", due: "Tomorrow" },
  { customer: "Arjun Auto", detail: "Cold drinks & snacks", amount: 540, status: "paid", mode: "Cash", due: "Today" },
  { customer: "Sharma Tea Stall", detail: "Milk and biscuits", amount: 680, status: "pending", mode: "Udhaar", due: "Sep 12" },
];

const scanCatalog = [
  { name: "Colgate Toothpaste 100g", unit: "pc", price: "₹58" },
  { name: "Tata Salt 1kg", unit: "pkt", price: "₹28" },
  { name: "Maggi Noodles", unit: "pkt", price: "₹14" },
  { name: "Britannia Bread", unit: "pc", price: "₹45" },
];

// Product & unit names translated per language (brand names in scanCatalog stay as-is, like real life)
const PRODUCT_NAMES = {
  milk: { en: "Amul Milk 500ml", hi: "अमूल दूध 500मिली", mr: "अमूल दूध 500मिली" },
  biscuit: { en: "Parle-G Biscuit", hi: "पारले-जी बिस्कुट", mr: "पार्ले-जी बिस्कीट" },
  umbrella: { en: "Umbrella (Small)", hi: "छाता (छोटा)", mr: "छत्री (लहान)" },
  colddrink: { en: "Cold Drink 750ml", hi: "कोल्ड ड्रिंक 750मिली", mr: "कोल्ड ड्रिंक 750मिली" },
  rice: { en: "Rice 5kg", hi: "चावल 5 किलो", mr: "तांदूळ 5 किलो" },
  raincoat: { en: "Raincoat", hi: "रेनकोट", mr: "रेनकोट" },
  notebook: { en: "School Notebook", hi: "स्कूल की कॉपी", mr: "शाळेची वही" },
};

const UNIT_NAMES = {
  pkt: { en: "pkt", hi: "पैकेट", mr: "पॅकेट" },
  pc: { en: "pc", hi: "नग", mr: "नग" },
  btl: { en: "btl", hi: "बोतल", mr: "बाटली" },
  bag: { en: "bag", hi: "बैग", mr: "पोते" },
};

function pname(item, lang) {
  return item.key && PRODUCT_NAMES[item.key] ? PRODUCT_NAMES[item.key][lang] : item.name;
}
function uname(unit, lang) {
  return UNIT_NAMES[unit] ? UNIT_NAMES[unit][lang] : unit;
}

// ---------- shared premium UI atoms ----------

function GlassCard({ children, style = {}, className = "", ...rest }) {
  return (
    <div className={`rounded-[20px] ${className}`} style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow, ...style }} {...rest}>
      {children}
    </div>
  );
}

function IconBadge({ icon: Icon, tone = C.accent, size = 34 }) {
  return (
    <div
      className="rounded-xl flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: `linear-gradient(145deg, ${tone}26, ${tone}0d)`, border: `1px solid ${tone}33` }}
    >
      <Icon size={size * 0.46} color={tone} />
    </div>
  );
}

function ConfidenceBadge({ text }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
      style={{ background: `linear-gradient(90deg, ${C.accent}1f, ${C.accent2}1f)`, border: `1px solid ${C.accent}55`, color: C.accent, fontFamily: fontMono }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.accent, animation: "pulseDot 1.8s infinite" }} />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: C.accent }} />
      </span>
      {text}
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="device-frame relative w-full min-h-screen p-0" style={{ background: C.screen, boxShadow: "none" }}>
      <div className="app-screen w-full min-h-screen overflow-hidden flex flex-col relative" style={{ background: C.screen, boxShadow: "none", color: C.text }}>
        {children}
      </div>
    </div>
  );
}

function StatusBar({ lang, setLang, lightMode, setLightMode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1" style={{ color: C.text }}>
      <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: C.sub }}>
        <MapPin size={11} /> <span>{USER.area}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5 rounded-full px-1 py-1" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
          <Globe size={10} className="ml-1" color={C.faint} />
          {LANGS.map((l) => (
            <button key={l.id} aria-label={l.name} title={l.name} onClick={() => setLang(l.id)} className="pill-btn px-2 py-1 rounded-full text-[9.5px] font-bold transition-colors" style={{ background: lang === l.id ? `linear-gradient(90deg, ${C.accent}, ${C.accent2})` : "transparent", color: lang === l.id ? C.onAccent : C.faint }}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1" style={{ color: C.faint }}>
                    <button
            type="button"
            aria-label={uiText(lightMode ? "Switch to dark mode" : "Switch to light mode")}
            title={uiText(lightMode ? "Dark mode" : "Light mode")}
            onClick={() => setLightMode((value) => !value)}
            className="theme-toggle pill-btn flex items-center justify-center rounded-full"
            style={{ color: C.text, background: C.cardAlt, border: `1px solid ${C.border}`, width: 26, height: 26 }}
          >
            {lightMode ? <Moon size={13} /> : <Sun size={13} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({ title, subtitle }) {
  const initials = (USER.shop || "DM").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const typeLabel = (AUTH[activeLanguage].types[USER.type] || "");
  return (
    <header className="app-header">
      <div className="shop-banner" style={{ background: C.hero, boxShadow: `0 18px 42px -30px ${C.accent}aa` }}>
        <Awning h={14} n={18} />
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-5 pb-4 pt-3">
          <div className="shop-avatar flex items-center justify-center rounded-2xl text-[16px] font-extrabold" style={{ width: 48, height: 48, background: `linear-gradient(145deg, ${C.gold}, ${C.warn})`, color: "#1B233A", fontFamily: fontHead }}>{initials}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[17px] font-extrabold leading-tight text-white" style={{ fontFamily: fontHead }}>{USER.shop}</p>
            <p className="truncate text-[12px]" style={{ color: "rgba(235,246,255,.78)" }}>{typeLabel}{typeLabel && " · "}{USER.owner}</p>
          </div>
          <span className="shop-live-pill"><i /> {uiText("Open")}</span>
          <button type="button" aria-label={uiText("Logout")} title={uiText("Logout")} onClick={() => USER.logout()} className="pill-btn flex items-center justify-center rounded-xl" style={{ width: 40, height: 40, background: "rgba(255,255,255,0.16)", color: "#fff" }}>
            <LogOut size={17} />
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-[1280px] px-5 pb-3 pt-5">
        <h1 className="text-[24px] font-extrabold leading-tight" style={{ fontFamily: fontHead, color: C.text }}>{title}</h1>
        {subtitle && <p className="app-subtitle mt-1 text-[13px] font-medium" style={{ color: C.sub }}>{subtitle}</p>}
      </div>
    </header>
  );
}

function SectionLabel({ children }) {
  return <p className="mx-5 mt-5 mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color: C.faint }}>{children}</p>;
}

// ---------- screens ----------

function WeatherCard({ t }) {
  return (
    <div className="mx-5 mt-1">
      <GlassCard className="p-4 flex items-center gap-3 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.accent2}22, ${C.card})` }}>
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: C.accent2 }} />
        <ProductIllustration kind="cloud" size={48} label={t.weatherLine1} />
        <div className="flex-1 relative z-10">
          <p className="text-[13px] font-semibold" style={{ color: C.text, fontFamily: fontHead }}>{t.weatherLine1}</p>
          <p className="text-[11px] mt-0.5 leading-snug" style={{ color: C.sub }}>{t.weatherLine2}</p>
        </div>
        <ChevronRight size={16} color={C.faint} />
      </GlassCard>
    </div>
  );
}

function KhataSummary({ t }) {
  const stats = [
    { label: t.statSales, value: "₹4,280", tone: C.accent },
    { label: t.statLow, value: `2 ${t.items}`, tone: C.danger },
    { label: t.statAlerts, value: `3 ${t.newAlerts}`, tone: C.warn },
  ];
  return (
    <div className="mx-5 mt-3 grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <GlassCard key={s.label} className="p-3">
          <p className="text-[15px] font-bold" style={{ color: s.tone, fontFamily: fontMono }}>{s.value}</p>
          <p className="text-[9.5px] mt-1" style={{ color: C.sub }}>{s.label}</p>
        </GlassCard>
      ))}
    </div>
  );
}

function SuggestionCard({ t, onOpen, onLater }) {
  return (
    <div className="mx-5">
      <button onClick={onOpen} className="w-full text-left rounded-2xl p-4 relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${C.card}, ${C.cardAlt})`, border: `1px solid ${C.accent}40` }}>
        <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10 blur-2xl" style={{ background: C.accent }} />
        <div className="flex items-start gap-3 relative z-10">
          <ProductIllustration kind="umbrella" size={48} label={t.recTitle} />
          <div>
            <p className="text-[13.5px] font-semibold" style={{ color: C.text, fontFamily: fontHead }}>{t.recTitle}</p>
            <p className="text-[11px] mt-1 leading-snug" style={{ color: C.sub }}>{t.recBody}</p>
          </div>
        </div>
        <div className="mt-3.5 flex items-center justify-between relative z-10">
          <ConfidenceBadge text={t.confidence} />
          <span className="text-[10.5px] font-semibold flex items-center gap-0.5" style={{ color: C.accent }}>
            {t.why} <ChevronRight size={12} />
          </span>
        </div>
      </button>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={onOpen} className="flex-1 rounded-xl py-2.5 text-[11px] font-bold" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>{t.orderNow}</button>
        <button type="button" onClick={onLater} className="rounded-xl px-4 py-2.5 text-[11px] font-bold" style={{ background: C.cardAlt, color: C.sub, border: `1px solid ${C.border}` }}>{t.notNow}</button>
      </div>
    </div>
  );
}

function ReasonSheet({ t, onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl p-5 pb-8" style={{ background: C.screen, borderTop: `1px solid ${C.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: C.border }} />
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} color={C.accent} />
          <h3 className="text-[14px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.reasonTitle}</h3>
        </div>
        <ul className="space-y-2.5 text-[12.5px]" style={{ color: C.sub }}>
          <li className="flex gap-2.5"><CloudRain size={15} className="shrink-0 mt-0.5" color={C.accent2} />{t.r1}</li>
          <li className="flex gap-2.5"><TrendingUp size={15} className="shrink-0 mt-0.5" color={C.accent} />{t.r2}</li>
          <li className="flex gap-2.5"><Package size={15} className="shrink-0 mt-0.5" color={C.danger} />{t.r3}</li>
        </ul>
        <div className="mt-5 flex gap-2">
          <button className="flex-1 rounded-xl py-3 text-[13px] font-bold flex items-center justify-center gap-1.5" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }} onClick={onClose}>
            <Check size={15} /> {t.orderNow}
          </button>
          <button className="flex-1 rounded-xl py-3 text-[13px] font-bold flex items-center justify-center gap-1.5" style={{ background: C.cardAlt, color: C.sub, border: `1px solid ${C.border}` }} onClick={onClose}>
            <X size={15} /> {t.notNow}
          </button>
        </div>
      </div>
    </div>
  );
}

function TopNav({ tabs, tab, setTab, alertCount, alertCountLabel }) {
  return (
    <nav className="bottom-nav sticky bottom-0 z-20 mt-auto">
      <div className="mx-auto max-w-[720px] px-3 pb-3 pt-2">
        <div className="flex items-stretch justify-around gap-1 rounded-[24px] p-1.5" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 16px 36px -10px rgba(20,40,30,0.38)" }}>
          {tabs.map((tb) => {
            const active = tab === tb.id;
            return (
              <button key={tb.id} onClick={() => setTab(tb.id)} aria-current={active ? "page" : undefined} aria-label={tb.id === "alerts" && alertCount ? `${tb.label}, ${alertCount} ${alertCountLabel}` : tb.label} className={`top-nav-button flex flex-1 flex-col items-center gap-1 rounded-[18px] px-1 py-2.5${active ? " is-active" : ""}`} style={{ background: active ? `linear-gradient(160deg, ${C.accent}, ${C.accent2})` : "transparent" }}>
                {tb.id === "alerts" && alertCount > 0 && <span className="alert-count-badge" style={{ background: C.danger, color: "#fff", borderColor: C.card }}>{alertCount}</span>}
                {active && (tb.id === "alerts" || tb.id === "trends")
                  ? <ActiveTabIllustration id={tb.id} />
                  : <tb.icon className="top-nav-icon" size={22} color={active ? C.onAccent : C.faint} strokeWidth={active ? 2.5 : 2} />}
                <span className="text-[11px] font-bold" style={{ color: active ? C.onAccent : C.faint }}>{tb.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function ActiveTabIllustration({ id }) {
  if (id === "alerts") {
    return (
      <svg className="top-nav-icon active-tab-illustration" width="23" height="23" viewBox="0 0 24 24" role="img" aria-label={uiText("Check alerts")}>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" fill="#ffd84d" stroke="#fff4bd" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9.5 21h5" stroke="#ffd84d" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 5v2" stroke="#a76b08" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className="top-nav-icon active-tab-illustration" width="23" height="23" viewBox="0 0 24 24" role="img" aria-label={uiText("Decide using sales trends")}>
      <rect x="3" y="12" width="4" height="8" rx="1" fill="#f6d04d" />
      <rect x="10" y="7" width="4" height="13" rx="1" fill="#f7f3e8" />
      <rect x="17" y="3" width="4" height="17" rx="1" fill="#75d7a5" />
      <path d="M2 21h20" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function QuickAction({ icon: Icon, label, onClick, tone }) {
  return (
    <button onClick={onClick} className="quick-action flex flex-col items-center justify-center gap-2.5 rounded-[20px] px-2 py-4 text-center" style={{ "--action-tone": tone, background: C.card, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
      <span className="action-icon flex items-center justify-center rounded-2xl" style={{ width: 50, height: 50, background: `linear-gradient(145deg, ${tone}, ${C.accent2})`, boxShadow: `0 10px 22px -10px ${tone}` }}>
        <Icon size={24} color={C.onAccent} />
      </span>
      <span className="text-[12.5px] font-extrabold leading-tight" style={{ color: C.text }}>{label}</span>
    </button>
  );
}

function WeeklySalesCard() {
  const values = [15, 21, 17, 29, 25, 37, 32];
  const labels = weekdayLabels();
  const points = values.map((value, index) => `${18 + index * 53},${108 - value * 2.1}`).join(" ");
  const area = `${points} 336,112 18,112`;

  return (
    <div className="mx-5 mt-4">
      <GlassCard className="weekly-sales-card overflow-hidden p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <IconBadge icon={BarChart3} tone={C.accent2} size={38} />
            <div>
              <p className="text-[14px] font-extrabold" style={{ color: C.text, fontFamily: fontHead }}>{uiText("Weekly sales")}</p>
              <p className="mt-0.5 text-[11px]" style={{ color: C.faint }}>{uiText("Your shop at a glance")}</p>
            </div>
          </div>
          <span className="chart-period">{uiText("LAST 7 DAYS")}</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[26px] font-extrabold leading-none tracking-tight" style={{ color: C.text, fontFamily: fontHead }}>₹28,420</p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold" style={{ color: C.accent, background: `${C.accent}17` }}>
              <TrendingUp size={12} /> 8.2% <span style={{ color: C.faint }}>{uiText("this week")}</span>
            </p>
          </div>
          <div className="chart-legend"><i /> {uiText("Daily sales")}</div>
        </div>
        <svg className="weekly-chart mt-3 w-full" viewBox="0 0 354 132" role="img" aria-label={uiText("Weekly sales trend chart")}>
          {[24, 52, 80, 108].map((y) => <line key={y} x1="18" x2="336" y1={y} y2={y} stroke={C.border} strokeDasharray="3 6" />)}
          <polygon className="weekly-chart-area" points={area} fill="url(#weekly-fill)" />
          <polyline className="weekly-chart-line" points={points} fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {values.map((value, index) => <circle className="weekly-chart-point" key={labels[index] + index} cx={18 + index * 53} cy={108 - value * 2.1} r="3.5" fill={C.accent} style={{ "--point-index": index }} />)}
          {labels.map((label, index) => <text key={label + index} x={18 + index * 53} y="128" textAnchor="middle" fill={C.faint} fontSize="10">{label}</text>)}
          <defs><linearGradient id="weekly-fill" x1="177" y1="14" x2="177" y2="112" gradientUnits="userSpaceOnUse"><stop stopColor={C.accent} stopOpacity=".28" /><stop offset="1" stopColor={C.accent} stopOpacity="0" /></linearGradient></defs>
        </svg>
      </GlassCard>
    </div>
  );
}

function HeroMarketIllustration() {
  return (
    <svg className="hero-market-art" viewBox="0 0 360 130" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g className="hero-cloud hero-cloud-left" fill="#d9fff0" opacity=".28">
        <ellipse cx="57" cy="23" rx="28" ry="9" />
        <ellipse cx="75" cy="18" rx="20" ry="8" />
      </g>
      <g className="hero-cloud hero-cloud-right" fill="#d9fff0" opacity=".23">
        <ellipse cx="287" cy="29" rx="34" ry="10" />
        <ellipse cx="306" cy="25" rx="21" ry="8" />
      </g>
      <g className="hero-rain" stroke="#d7f8e8" strokeWidth="2" strokeLinecap="round" opacity=".52">
        <path d="M24 2v9M115 0v8M260 1v9M333 0v8" />
      </g>
      <path d="M0 117h360v13H0z" fill="#06412f" />
      <path d="M91 49h171v68H91z" fill="#f7f0df" />
      <path className="hero-awning" d="M83 49h188l-13-25H96z" fill="#f2a516" />
      <g className="hero-awning-stripes">
        <path d="M98 24h28l-4 25H84zm56 0h28l-2 25h-28zm56 0h28l7 25h-28z" fill="#fff3d6" />
      </g>
      <path d="M169 25V9l23 6-23 6" fill="#e94b43" />
      <path d="M168 7h3v22h-3z" fill="#553e25" />
      <rect x="108" y="68" width="54" height="32" rx="5" fill="#0b8a57" />
      <path d="M179 76h67v41h-67z" fill="#075d42" />
      <g className="hero-shopkeeper">
        <circle cx="210" cy="75" r="10" fill="#e9b58d" />
        <rect x="201" y="84" width="19" height="31" rx="8" fill="#f2a516" />
      </g>
      <g className="hero-walker">
        <circle cx="57" cy="89" r="7" fill="#e9b58d" />
        <rect x="50" y="96" width="14" height="21" rx="6" fill="#fff" />
        <path d="M47 82q10-19 20 0M57 72v11" fill="none" stroke="#9b58bd" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="hero-floating-coins" fill="#ffc247" stroke="#ffe199" strokeWidth="2">
        <circle className="hero-coin hero-coin-one" cx="302" cy="62" r="11" />
        <circle className="hero-coin hero-coin-two" cx="331" cy="99" r="8" />
        <circle className="hero-coin hero-coin-three" cx="279" cy="120" r="6" />
      </g>
      <g fill="none" stroke="#c17e17" strokeWidth="2" opacity=".8">
        <path d="M298 57h8v10h-8zM300 55v14m4-14v14" />
        <path d="M328 96h6v7h-6zM330 95v9m3-9v9" />
      </g>
      <path d="M108 76q9-17 18 0m-9-11v15m48-2q8-15 16 0m-8-11v13" fill="none" stroke="#8f55b1" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeScreen({ t, stock, onOpenReason, onRecordSale, onAddProduct, onOpenBrief, onScan, onLater, showPromotionalImages }) {
  const locale = activeLanguage === "hi" ? "hi-IN" : activeLanguage === "mr" ? "mr-IN" : "en-IN";
  const today = new Date().toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
  const lowStockCount = stock.filter((item) => item.qty < item.min).length;
  return (
    <main className="offers-screen flex-1 overflow-y-auto pb-6">
      <Header title={`${t.greeting}, ${USER.owner}`} subtitle={today} />
      {stock.length === 0 ? <>
        <div className="mx-5 mt-3">
          <GlassCard className="p-5 text-center">
            <IconBadge icon={PackagePlus} tone={C.accent} size={42} />
            <p className="mt-3 text-[15px] font-extrabold" style={{ color: C.text, fontFamily: fontHead }}>{t.emptyStockTitle}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: C.sub }}>{t.emptyStockBody}</p>
          </GlassCard>
        </div>
        <div className="mx-5 mt-3 grid grid-cols-2 gap-2">
          <QuickAction icon={PackagePlus} label={t.addProduct} onClick={onAddProduct} tone={C.warn} />
          <QuickAction icon={ScanLine} label={t.scan} onClick={onScan} tone={C.accent2} />
        </div>
        <OfferVideoContent onOpenReason={onOpenReason} showPromotionalImages={showPromotionalImages} />
      </> : <>
        <div className="mx-5 mt-1">
          <div className="sales-hero relative overflow-hidden rounded-[28px] p-5" style={{ background: C.hero, boxShadow: `0 24px 55px -28px ${C.accent}88`, color: "#fff" }}>
            <div className="hero-grid absolute inset-0" aria-hidden="true" />
            <div className="hero-orb hero-orb-one" aria-hidden="true" />
            <div className="hero-orb hero-orb-two" aria-hidden="true" />
            <HeroMarketIllustration />
            <div className="relative z-10 flex items-center justify-between gap-3">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: "rgba(226,246,255,.8)" }}>{t.statSales}</p>
            </div>
            <div className="relative z-10 mt-2">
              <p className="text-[44px] font-extrabold leading-none tracking-[-0.05em]" style={{ fontFamily: fontHead }}>₹4,280</p>
            </div>
            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              <span className="hero-metric">{t.yesterdayChange}</span>
              <span className="hero-metric hero-metric-warm">{lowStockCount} {t.items} {t.heroLowLabel}</span>
            </div>
          </div>
        </div>
        <div className="mx-5 mt-3 grid grid-cols-3 gap-2">
          <QuickAction icon={ShoppingCart} label={t.recordSale} onClick={onRecordSale} tone={C.accent} />
          <QuickAction icon={PackagePlus} label={t.addProduct} onClick={onAddProduct} tone={C.warn} />
          <QuickAction icon={ScanLine} label={t.scan} onClick={onScan} tone={C.accent2} />
        </div>
        <SectionLabel>{t.aiRec}</SectionLabel>
        {showPromotionalImages && <SuggestionCard t={t} onOpen={onOpenReason} onLater={onLater} />}
        <WeeklySalesCard />
        <WeatherCard t={t} />
        <div className="mx-5 mt-3">
          <GlassCard className="flex items-center justify-between gap-3 p-4" style={{ background: `linear-gradient(135deg, ${C.gold}1c, ${C.card})`, borderColor: `${C.gold}55` }}>
            <div className="flex items-start gap-3">
              <IconBadge icon={Sparkles} tone={C.gold} size={38} />
              <div>
                <p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.aiBriefTitle}</p>
                <p className="mt-1 text-[11px] leading-snug" style={{ color: C.sub }}>{t.aiBriefBody}</p>
              </div>
            </div>
            <button onClick={onOpenBrief} className="shrink-0 rounded-xl px-3 py-2 text-[11px] font-bold" style={{ background: C.card, color: C.accent, border: `1px solid ${C.accent}55` }}>{t.viewBrief}</button>
          </GlassCard>
        </div>
        <OfferVideoContent onOpenReason={onOpenReason} showPromotionalImages={showPromotionalImages} />
        <SectionLabel>{t.tabAlerts}</SectionLabel>
        <div className="mx-5 mt-3 notification-card flex items-start gap-3" role="status">
          <IconBadge icon={Bell} tone={C.accent2} size={36} />
          <div>
            <p className="text-[12.5px] font-semibold" style={{ color: C.text, fontFamily: fontHead }}>{t.rainNotificationTitle}</p>
            <p className="mt-1 text-[11px] leading-snug" style={{ color: C.sub }}>{t.rainNotification}</p>
          </div>
        </div>
      </>}
    </main>
  );
}

function OfferVideoContent({ onOpenReason, showPromotionalImages }) {
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [videoError, setVideoError] = useState("");
  const videoRef = useRef(null);
  const offers = [
    { title: "Monsoon umbrella pack", detail: "12 umbrellas · wholesale rate", color: "#c92f24", end: "#e84c38" },
    { title: "Rainy day essentials", detail: "Keep raincoats ready for the weekend", color: "#a52e24", end: "#df4937" },
    { title: "Stock up for the season", detail: "Popular monsoon items · better value", color: "#b33325", end: "#ed5a3d" },
  ];
  const offer = offers[selectedOffer];

  return (
    <div className="offer-video-content">
      {showPromotionalImages && <section className="mx-5 mt-1" aria-labelledby="offers-heading">
        <div className="offers-section-heading">
          <h2 id="offers-heading">{uiText("Offers for your shop")}</h2>
          <span>{uiText("Sponsored · sample")}</span>
        </div>
        <article className="offer-card" style={{ "--offer-start": offer.color, "--offer-end": offer.end }}>
          <div className="offer-card-copy">
            <h3>{uiText(offer.title)}</h3>
            <p>{uiText(offer.detail)}</p>
            <button type="button" onClick={onOpenReason} className="offer-cta">
              {uiText("See offer")} <ArrowRight size={17} />
            </button>
          </div>
          <div className="offer-art">
            <ProductIllustration kind={selectedOffer === 1 ? "cloud" : "umbrella"} size={104} label={uiText(offer.title)} />
          </div>
        </article>
        <div className="offer-pagination" aria-label={uiText("Choose an offer")}>
          {offers.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`${uiText("Show offer")} ${index + 1}: ${uiText(item.title)}`}
              aria-current={selectedOffer === index ? "true" : undefined}
              className={selectedOffer === index ? "active" : ""}
              onClick={() => setSelectedOffer(index)}
            />
          ))}
        </div>
      </section>}

      <section className="mx-5 mt-4" aria-label={uiText("Monsoon promo video")}>
        <div className="promo-video-card">
          <video
            ref={videoRef}
            className="promo-video"
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="auto"
            poster={showPromotionalImages && activeLanguage === "en" ? promoPoster : undefined}
            onError={() => setVideoError(uiText("The promo video could not be loaded."))}
            aria-label={uiText("Monsoon shop promotion video")}
          >
            <source src={promoVideo} type="video/mp4" />
          </video>
        </div>
        {videoError && <p className="promo-video-error" role="alert">{videoError}</p>}
      </section>
    </div>
  );
}

function BriefSheet({ t, onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl p-5 pb-8" style={{ background: C.screen, borderTop: `1px solid ${C.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: C.border }} />
        <div className="flex items-center gap-2 mb-3"><Sparkles size={16} color={C.accent} /><h3 className="text-[14px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.aiBriefTitle}</h3></div>
        <div className="space-y-2.5">
          {[t.brief1, t.brief2].map((item, i) => (
            <div key={i} className="p-3 rounded-xl flex gap-2" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
              <CircleCheck size={15} color={C.accent} className="shrink-0 mt-0.5" />
              <p className="text-[11.5px] leading-relaxed" style={{ color: C.sub }}>{item}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 w-full rounded-xl py-3 text-[12px] font-bold" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>{t.notNow}</button>
      </div>
    </div>
  );
}

function ActionSheet({ t, mode, onClose, onSaved }) {
  const [value, setValue] = useState("");
  const isSale = mode === "sale";
  const submit = () => {
    if (!value.trim()) return;
    onSaved(value.trim(), mode);
    setValue("");
  };
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.62)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl p-5 pb-8" style={{ background: C.screen, borderTop: `1px solid ${C.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: C.border }} />
        <p className="text-[14px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{isSale ? t.recordSale : t.addProduct}</p>
        <p className="text-[11px] mt-1 mb-4" style={{ color: C.sub }}>{uiText(isSale ? 'Tell me what you sold, for example: "umbrella 2".' : 'Type the item name, for example: "Soap 100g".')}</p>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder={uiText(isSale ? "e.g. umbrella 2" : "e.g. Soap 100g")} className="w-full rounded-xl px-4 py-3 text-[12px] outline-none mb-3" style={{ background: C.cardAlt, border: `1px solid ${C.borderStrong}`, color: C.text }} />
        <button onClick={submit} className="w-full rounded-xl py-3 text-[12px] font-bold" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>{isSale ? t.saleRecorded : t.addProduct}</button>
      </div>
    </div>
  );
}

function ScanModal({ t, onClose, onFound }) {
  const [phase, setPhase] = useState("scanning"); // scanning | retry | found | manual
  const [product, setProduct] = useState(null);
  const [code, setCode] = useState("");
  const [attempt, setAttempt] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (attempt === 1) {
        // First attempt deliberately doesn't auto-succeed, so the manual
        // fallback is reached on purpose — not in a race with a timer.
        setPhase("retry");
      } else {
        const p = scanCatalog[Math.floor(Math.random() * scanCatalog.length)];
        setProduct(p);
        setPhase("found");
      }
    }, 2200);
    return () => clearTimeout(timerRef.current);
  }, [attempt]);

  const goManual = () => {
    clearTimeout(timerRef.current);
    setPhase("manual");
  };

  const retryScan = () => {
    setAttempt((a) => a + 1);
    setPhase("scanning");
  };

  const submitManual = () => {
    if (!code.trim()) return;
    const idx = code.trim().length % scanCatalog.length;
    setProduct(scanCatalog[idx]);
    setPhase("found");
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col" style={{ background: "#000000f2" }}>
      {phase === "scanning" && (
        <div className="flex-1 relative flex items-center justify-center">
          <div className="scanner-viewport absolute inset-0" aria-hidden="true" />
          <div className="scanner-reticle relative w-56 h-56">
            {["tl", "tr", "bl", "br"].map((corner) => (
              <div
                key={corner}
                className={`scanner-corner absolute w-8 h-8 ${corner}`}
                style={{
                  borderColor: C.accent,
                  top: corner.includes("t") ? -2 : "auto",
                  bottom: corner.includes("b") ? -2 : "auto",
                  left: corner.includes("l") ? -2 : "auto",
                  right: corner.includes("r") ? -2 : "auto",
                  borderTopWidth: corner.includes("t") ? 3 : 0,
                  borderBottomWidth: corner.includes("b") ? 3 : 0,
                  borderLeftWidth: corner.includes("l") ? 3 : 0,
                  borderRightWidth: corner.includes("r") ? 3 : 0,
                  borderTopLeftRadius: corner === "tl" ? 12 : 0,
                  borderTopRightRadius: corner === "tr" ? 12 : 0,
                  borderBottomLeftRadius: corner === "bl" ? 12 : 0,
                  borderBottomRightRadius: corner === "br" ? 12 : 0,
                }}
              />
            ))}
            <div className="absolute left-2 right-2 h-[2px] rounded" style={{ background: C.accent, top: "50%", boxShadow: `0 0 12px 2px ${C.accent}aa`, animation: "scanmove 1.4s ease-in-out infinite" }} />
            <Camera size={26} color="#ffffff33" className="absolute inset-0 m-auto" />
            <span className="scanner-crosshair scanner-crosshair-x" />
            <span className="scanner-crosshair scanner-crosshair-y" />
          </div>
          <div className="scanner-readout absolute left-5 right-5 flex items-center justify-between text-[10px]" style={{ color: C.faint, fontFamily: fontMono }}>
            <span>{uiText("OPTICAL_SCAN // 01")}</span>
            <span style={{ color: C.accent }}>{uiText("● LIVE")}</span>
          </div>
          <div className="scanner-metrics absolute left-5 right-5 flex items-center justify-between text-[9px]" style={{ color: C.faint, fontFamily: fontMono }}>
            <span>{uiText("EAN / UPC")}</span><span>{uiText("FOCUS 98%")}</span><span>{uiText("ISO AUTO")}</span>
          </div>
          <div className="scanner-status absolute flex flex-col items-center gap-2" role="status" aria-live="polite">
            <p className="text-[12px] font-semibold tracking-wide" style={{ color: C.accent, fontFamily: fontMono }}>
              {t.scanModalScanning}…
            </p>
            <span className="scanner-dots" aria-hidden="true"><i /><i /><i /></span>
          </div>
          <p className="scanner-hint absolute text-[11px]" style={{ color: C.faint }}>{t.scanModalHold}</p>
          <button onClick={goManual} className="scanner-manual absolute flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full" style={{ color: C.text, background: C.cardAlt, border: `1px solid ${C.border}` }}>
            <Keyboard size={13} color={C.accent} /> {t.manualEntry}
          </button>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#ffffff14" }}>
            <X size={16} color="#fff" />
          </button>
        </div>
      )}

      {phase === "retry" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: `${C.danger}1f`, border: `1px solid ${C.danger}44` }}>
            <ScanLine size={24} color={C.danger} />
          </div>
          <p className="text-[14px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.scanFailTitle}</p>
          <p className="text-[11.5px] mt-2 leading-relaxed" style={{ color: C.sub }}>{t.scanFailBody}</p>
          <button onClick={retryScan} className="mt-6 w-full rounded-xl py-3.5 text-[13px] font-bold" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>
            {t.tryAgain}
          </button>
          <button onClick={goManual} className="mt-3 w-full rounded-xl py-3.5 text-[13px] font-bold flex items-center justify-center gap-1.5" style={{ background: C.cardAlt, color: C.text, border: `1px solid ${C.border}` }}>
            <Keyboard size={15} color={C.accent} /> {t.manualEntry}
          </button>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#ffffff14" }}>
            <X size={16} color="#fff" />
          </button>
        </div>
      )}

      {phase === "manual" && (
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="mb-5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: `${C.accent}1f`, border: `1px solid ${C.accent}44` }}>
              <Keyboard size={20} color={C.accent} />
            </div>
            <p className="text-[13.5px] font-semibold" style={{ color: C.text, fontFamily: fontHead }}>{t.manualEntry}</p>
            <p className="text-[11.5px] mt-2 leading-relaxed" style={{ color: C.sub }}>{t.manualWhy}</p>
          </div>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder={t.manualPlaceholder}
            inputMode="numeric"
            className="w-full rounded-xl px-4 py-3.5 text-[15px] outline-none mb-3"
            style={{ background: C.cardAlt, border: `1px solid ${C.borderStrong}`, color: C.text, fontFamily: fontMono }}
          />
          <button onClick={submitManual} className="w-full rounded-xl py-3.5 text-[13px] font-bold" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>
            {t.manualSubmit}
          </button>
          <button onClick={() => setPhase("scanning")} className="mt-3 text-[12px] font-semibold text-center" style={{ color: C.sub }}>
            {t.manualBack}
          </button>
        </div>
      )}

      {phase === "found" && product && (
        <>
          <div className="flex-1" />
          <div className="p-5 pb-8 rounded-t-3xl" style={{ background: C.screen, borderTop: `1px solid ${C.borderStrong}` }}>
            <div className="flex items-center gap-2 mb-1">
              <ScanLine size={15} color={C.accent} />
              <p className="text-[12px] font-bold" style={{ color: C.accent }}>{t.scanFoundTitle}</p>
            </div>
            <p className="text-[15px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{product.name}</p>
            <p className="text-[11px] mt-0.5" style={{ color: C.sub }}>{product.price} / {product.unit}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-xl py-3 text-[13px] font-bold flex items-center justify-center gap-1.5" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }} onClick={() => onFound(product)}>
                <PackagePlus size={15} /> {t.scanAdd} +10 {t.scanUnit}
              </button>
              <button className="w-12 rounded-xl flex items-center justify-center" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }} onClick={onClose}>
                <X size={16} color={C.sub} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StockScreen({ t, lang, stock, onChange, onScanClick, onAddProduct, onRecordSale }) {
  const [query, setQuery] = useState("");
  const [lowOnly, setLowOnly] = useState(false);
  const visible = stock.filter((item) => {
    const matches = pname(item, lang).toLowerCase().includes(query.toLowerCase());
    return matches && (!lowOnly || item.qty < item.min);
  });
  const stockCounts = stock.reduce((counts, item) => {
    if (item.qty < item.min) counts.low += 1;
    else if (item.qty > item.max) counts.over += 1;
    else counts.good += 1;
    return counts;
  }, { good: 0, low: 0, over: 0 });
  const totalProducts = stock.length;
  const goodEnd = totalProducts ? stockCounts.good / totalProducts * 100 : 0;
  const lowEnd = goodEnd + (totalProducts ? stockCounts.low / totalProducts * 100 : 0);
  const stockRing = totalProducts
    ? `conic-gradient(${C.accent} 0% ${goodEnd}%, ${C.danger} ${goodEnd}% ${lowEnd}%, ${C.warn} ${lowEnd}% 100%)`
    : C.cardAlt;
  return (
    <div className="flex-1 overflow-y-auto pb-4 relative">
      <Header title={t.stockHeader} subtitle={t.stockSub} />
      <div className="mx-5">
        <button onClick={onScanClick} className="w-full rounded-xl py-3.5 flex items-center justify-center gap-2 text-[13px] font-bold" style={{ background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>
          <ScanLine size={16} /> {t.scan}
        </button>
      </div>
      <div className="mx-5 mt-2 grid grid-cols-2 gap-2">
        <button onClick={onAddProduct} className="rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-[10.5px] font-bold" style={{ background: C.card, color: C.text, border: `1px solid ${C.border}` }}><Plus size={13} color={C.accent} /> {t.addProduct}</button>
        <button onClick={onRecordSale} className="rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-[10.5px] font-bold" style={{ background: C.card, color: C.text, border: `1px solid ${C.border}` }}><TrendingDown size={13} color={C.warn} /> {t.recordSale}</button>
      </div>
      <div className="mx-5 mt-3">
        <GlassCard className="flex items-center gap-4 p-3.5">
          <div className="relative grid h-[92px] w-[92px] shrink-0 place-items-center rounded-full" role="img" aria-label={`${totalProducts} ${t.items}: ${stockCounts.good} ${t.stockGood}, ${stockCounts.low} ${t.lowStockTag}, ${stockCounts.over} ${t.stockOver}`} style={{ background: stockRing }}>
            <div className="grid h-[68px] w-[68px] place-items-center rounded-full" style={{ background: C.card }}>
              <span className="text-[22px] font-extrabold" style={{ color: C.text, fontFamily: fontMono }}>{totalProducts}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide" style={{ color: C.faint }}>{t.stockSummary}</p>
            {[
              { label: t.stockGood, count: stockCounts.good, tone: C.accent },
              { label: t.lowStockTag, count: stockCounts.low, tone: C.danger },
              { label: t.stockOver, count: stockCounts.over, tone: C.warn },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 py-0.5 text-[10px]" style={{ color: C.sub }}>
                <span className="h-2 w-2 rounded-full" style={{ background: item.tone }} />
                <span className="flex-1">{item.label}</span>
                <strong style={{ color: item.tone }}>{item.count}</strong>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="mx-5 mt-3 flex gap-2">
        <div className="stock-search-box flex-1 flex items-center gap-2 rounded-xl px-3" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
          <Search size={13} color={C.faint} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchStock} className="stock-search-input w-full py-2.5 text-[11px] outline-none bg-transparent" style={{ color: C.text }} />
        </div>
        <button onClick={() => setLowOnly((v) => !v)} className="rounded-xl px-3 text-[10px] font-bold" style={{ background: lowOnly ? `${C.danger}18` : C.card, color: lowOnly ? C.danger : C.sub, border: `1px solid ${lowOnly ? C.danger : C.border}` }}>{lowOnly ? t.lowOnly : t.allStock}</button>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {visible.map((item, index) => {
          const low = item.qty < item.min;
          const over = item.qty > item.max;
          const status = low ? t.lowStockTag : over ? t.stockOver : t.stockGood;
          const statusTone = low ? C.danger : over ? C.warn : C.accent;
          const illustration = item.key === "umbrella" ? "umbrella" : item.key === "milk" ? "milk" : item.key === "biscuit" ? "biscuit" : item.key === "colddrink" ? "bottle" : item.key === "rice" ? "rice" : "box";
          const stockLevel = Math.min(100, Math.max(4, (item.qty / Math.max(item.max, 1)) * 100));
          return (
            <GlassCard key={item.id} className="stock-item-card p-3" style={{ borderColor: low ? `${C.danger}55` : C.border, "--stagger-index": index }}>
              <div className="flex items-center justify-between gap-2.5">
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  <ProductIllustration kind={illustration} size={46} label={pname(item, lang)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold" style={{ color: C.text }}>{pname(item, lang)}</p>
                    <p className="mt-0.5 text-[9.5px]" style={{ color: C.faint }}>{uiText(item.loc)}</p>
                    <p className="mt-0.5 text-[10px] font-semibold" style={{ color: statusTone }}>{status}</p>
                    <div className="stock-level-track mt-2" aria-label={`${Math.round(stockLevel)}% of stock capacity`}>
                      <span style={{ width: `${stockLevel}%`, background: low ? C.danger : stockLevel > 75 ? C.warn : C.accent }} />
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button aria-label={`Decrease ${pname(item, lang)}`} onClick={() => onChange(item.id, -1)} className="stock-qty-button flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: C.cardAlt }}><PackageMinus size={13} color={C.sub} /></button>
                  <span className="w-7 text-center text-[13px] font-bold" style={{ color: C.text, fontFamily: fontMono }}>{item.qty}</span>
                  <button aria-label={`Increase ${pname(item, lang)}`} onClick={() => onChange(item.id, 1)} className="stock-qty-button flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${C.accent}18` }}><PackagePlus size={14} color={C.accent} /></button>
                </div>
              </div>
            </GlassCard>
          );
        })}
        {visible.length === 0 && <GlassCard className="p-5 text-center"><Search size={20} color={C.faint} className="mx-auto mb-2" /><p className="text-[11px]" style={{ color: C.sub }}>{uiText("No matching stock.")}</p></GlassCard>}
      </div>
    </div>
  );
}

function EmptyDataCard({ t }) {
  return (
    <div className="mx-5 mt-4">
      <GlassCard className="p-5 text-center">
        <IconBadge icon={ClipboardList} tone={C.accent} size={42} />
        <p className="mt-3 text-[14px] font-extrabold" style={{ color: C.text, fontFamily: fontHead }}>{t.emptyDataTitle}</p>
        <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: C.sub }}>{t.emptyDataBody}</p>
      </GlassCard>
    </div>
  );
}

function AlertsScreen({ t, dismissedIds, onDismiss, onAction, hasSampleData }) {
  if (!hasSampleData) {
    return (
      <div className="flex-1 overflow-y-auto pb-4">
        <Header title={t.alertsHeader} subtitle={t.alertsSub} />
        <EmptyDataCard t={t} />
      </div>
    );
  }
  const alerts = [
    { id: "umbrella", title: t.a1t, body: t.a1b, tone: C.danger, kind: "umbrella", tag: t.alertUrgent, progress: 30, action: t.alertActionBuy },
    { id: "drinks", title: t.a2t, body: t.a2b, tone: C.warn, kind: "bottle", tag: t.alertRising, progress: 45 },
    { id: "festival", title: t.a3t, body: t.a3b, tone: C.accent, kind: "festival", tag: t.alertSoon, progress: 70 },
  ];
  const activeAlerts = alerts.filter((alert) => !dismissedIds.includes(alert.id));
  const remaining = activeAlerts.length;
  const ringOffset = 182.2 * (1 - remaining / alerts.length);
  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <Header title={t.alertsHeader} subtitle={t.alertsSub} />
      <div className="mx-5 space-y-2.5">
        <GlassCard className="flex items-center gap-3 p-3.5" style={{ background: `linear-gradient(135deg, ${C.danger}12, ${C.card})` }}>
          <svg width="60" height="60" viewBox="0 0 70 70" role="img" aria-label={`${remaining} ${t.alertsCount}`}>
            <circle cx="35" cy="35" r="29" fill="none" stroke={C.cardAlt} strokeWidth="8" />
            <circle cx="35" cy="35" r="29" fill="none" stroke={remaining ? C.danger : C.accent} strokeWidth="8" strokeLinecap="round" strokeDasharray="182.2" strokeDashoffset={ringOffset} transform="rotate(-90 35 35)" />
            <text x="35" y="41" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily={fontHead} fill={C.text}>{remaining}</text>
          </svg>
          <div className="min-w-0">
            <p className="text-[12.5px] font-bold" style={{ color: C.text }}>{remaining ? `${remaining} ${t.alertsCount}` : t.alertsAllClear}</p>
            <p className="mt-1 text-[10.5px]" style={{ color: C.sub }}>{remaining ? t.alertsSub : t.alertsAllClearBody}</p>
          </div>
        </GlassCard>
        {activeAlerts.map((a, i) => (
        <GlassCard key={a.id} className="alert-card p-3" style={{ "--stagger-index": i, borderLeft: `4px solid ${a.tone}` }}>
          <div className="flex items-center gap-3">
            <ProductIllustration kind={a.kind} size={46} label={a.title} />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold leading-tight" style={{ color: C.text }}>{a.title}</p>
              <p className="mt-1 text-[11px] leading-snug" style={{ color: C.sub }}>{a.body}</p>
            </div>
            <span className="alert-tag shrink-0" style={{ color: a.tone, background: `${a.tone}18` }}>{a.tag}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: C.cardAlt }}>
            <span className="block h-full rounded-full" style={{ width: `${a.progress}%`, background: a.tone, transition: "width .8s ease" }} />
          </div>
          <button
            type="button"
            onClick={() => {
              onAction(a.id === "umbrella" ? `${t.alertActionBuy}: ${t.adviceBuyUmbrellas}` : `${a.title} — ${t.alertsDone}`);
              onDismiss(a.id);
            }}
            className="mt-3 w-full rounded-xl py-2.5 text-[10.5px] font-bold"
            style={{ background: a.id === "umbrella" ? `${C.accent}18` : C.cardAlt, color: a.id === "umbrella" ? C.accent : C.sub, border: `1px solid ${a.id === "umbrella" ? `${C.accent}55` : C.border}` }}
          >
            {a.action || t.alertsDone}
          </button>
        </GlassCard>
      ))}
      <GlassCard className="today-watch-card mt-3 flex items-start gap-3 p-3.5" style={{ background: `linear-gradient(135deg, ${C.accent}12, ${C.card})` }}>
        <IconBadge icon={Eye} tone={C.accent} size={36} />
        <div className="min-w-0">
          <p className="text-[12px] font-bold" style={{ color: C.text }}>{t.alertWatchTitle}</p>
          <p className="mt-1 text-[11px] leading-relaxed" style={{ color: C.sub }}>{t.alertWatchBody}</p>
        </div>
      </GlassCard>
      </div>
    </div>
  );
}

function DemandShiftPage({ t, lang, stock, onAction }) {
  const sorted = [...stock].sort((a, b) => Math.abs(b.trend) - Math.abs(a.trend));
  const trendColor = (trend) => trend > 5 ? C.accent : trend < -5 ? C.danger : C.gold;
  const lowCount = stock.filter((item) => item.qty < item.min).length;
  const risingCount = stock.filter((item) => item.trend > 5).length;
  const latestMonth = monthlyFinancials[monthlyFinancials.length - 1];
  const netResult = latestMonth.revenue - latestMonth.expenses;
  return (
    <div className="mx-5 mt-4 space-y-2">
      <GlassCard className="shop-report-card p-3.5">
        <div className="flex items-center gap-2.5">
          <IconBadge icon={Sparkles} tone={C.accent} size={34} />
          <div className="min-w-0">
            <p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{uiText("Shop report")}</p>
            <p className="mt-0.5 text-[10.5px]" style={{ color: C.sub }}>{uiText("A quick view of what is happening and what to do next.")}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { icon: Package, value: lowCount, label: uiText("Items low"), tone: lowCount ? C.danger : C.accent },
            { icon: TrendingUp, value: risingCount, label: uiText("Selling more"), tone: C.accent },
            { icon: CircleDollarSign, value: `₹${(netResult / 1000).toFixed(1)}k`, label: t.netResult, tone: C.warn },
          ].map((metric) => (
            <div key={metric.label} className="report-stat">
              <metric.icon size={14} color={metric.tone} />
              <strong style={{ color: metric.tone }}>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div>
            <p className="text-[12px] font-bold" style={{ color: C.text }}>{t.forecastTitle}</p>
            <p className="mt-0.5 text-[10px]" style={{ color: C.faint }}>{t.forecastSubtitle}</p>
          </div>
          <span className="rounded-full px-2 py-1 text-[9px] font-bold" style={{ color: C.accent, background: `${C.accent}14` }}>+{Math.round(pctChange(umbrellaSeries))}%</span>
        </div>
        <MiniLineChart values={umbrellaSeries} labels={weekdayLabels()} forecast={Math.max(0, Math.round(umbrellaRegression.next))} height={132} />
        <div className="flex justify-between text-[9px]" style={{ color: C.faint }}>
          <span>{t.forecastPast}</span><span>{t.forecastNow}</span><span>{t.forecastMay}</span>
        </div>
      </GlassCard>
      <GlassCard className="p-4">
        <p className="text-[12px] font-bold" style={{ color: C.text }}>{t.marketDemandTitle}</p>
        <div className="mt-3 space-y-3">
          {[
            { name: "Umbrellas", value: 140, kind: "umbrella", tone: C.accent },
            { name: "Cold drinks", value: 32, kind: "bottle", tone: C.warn },
            { name: "Mosquito repellents", value: 27, kind: "box", tone: C.accent },
            { name: "Winter wear", value: -18, kind: "box", tone: C.danger },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <ProductIllustration kind={item.kind} size={30} label={uiText(item.name)} />
              <span className="min-w-0 flex-1 truncate text-[10px]" style={{ color: C.sub }}>{uiText(item.name)}</span>
              <div className="h-2 w-[30%] overflow-hidden rounded-full" style={{ background: C.cardAlt }}>
                <span className="block h-full rounded-full" style={{ width: `${Math.min(100, Math.abs(item.value) / 1.4)}%`, background: item.tone }} />
              </div>
              <span className="w-12 text-right text-[10px] font-bold" style={{ color: item.tone, fontFamily: fontMono }}>{item.value > 0 ? "+" : ""}{item.value}%</span>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="forecast-chart p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[12px] font-bold" style={{ color: C.text }}>{uiText("Items selling faster")}</p>
            <p className="mt-0.5 text-[10px]" style={{ color: C.faint }}>{uiText("Which items are moving faster")}</p>
          </div>
          <span className="text-[10px]" style={{ color: C.faint }}>0 - 100</span>
        </div>
        <div className="forecast-meaning flex flex-wrap gap-2 mb-3 text-[10px]">
          <span className="rising-meaning">● {t.rising}</span>
          <span className="falling-meaning">● {t.falling}</span>
          <span className="stable-meaning">● {t.stable}</span>
        </div>
        <div className="simple-demand-list">
          {sorted.map((item, index) => {
            const demand = Math.min(100, Math.max(8, Math.abs(item.trend) + 20));
            const illustration = item.key === "umbrella" ? "umbrella" : item.key === "milk" ? "milk" : item.key === "biscuit" ? "biscuit" : item.key === "colddrink" ? "bottle" : item.key === "rice" ? "rice" : "box";
            return <div key={item.id} className="simple-demand-row" style={{ "--stagger-index": index }}>
              <div className="flex items-center justify-between gap-2">
                <span className="simple-demand-name flex min-w-0 items-center gap-2" style={{ color: C.text }}>
                  <ProductIllustration kind={illustration} size={30} label={pname(item, lang)} />
                  <span className="truncate">{pname(item, lang)}</span>
                </span>
                <span className="simple-demand-status flex items-center gap-1" style={{ color: trendColor(item.trend) }}>
                  {item.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(item.trend)}%
                </span>
              </div>
              <div className="simple-demand-track"><div className="simple-demand-fill" style={{ width: `${demand}%`, background: trendColor(item.trend) }} /></div>
            </div>;
          })}
        </div>
      </GlassCard>
      <GlassCard className="p-4">
        <p className="mb-3 text-[12px] font-bold" style={{ color: C.text }}>{t.adviceTitle}</p>
        {[
          { icon: Umbrella, tone: C.accent, title: t.adviceBuyUmbrellas, body: t.adviceUmbrellaBody, action: t.adviceDoIt, message: t.alertActionBuy },
          { icon: Flame, tone: C.warn, title: t.adviceKeepDrinks, body: t.adviceDrinksBody, action: t.adviceGotIt, message: t.adviceGotIt },
          { icon: Tag, tone: C.danger, title: t.adviceWinterOffer, body: t.adviceSlowBody, action: t.adviceCreateOffer, message: t.adviceCreateOffer },
        ].map((item) => (
          <div key={item.title} className="mt-2 flex items-center gap-2.5 rounded-xl p-2.5" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
            <IconBadge icon={item.icon} tone={item.tone} size={32} />
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-bold" style={{ color: C.text }}>{item.title}</p>
              <p className="mt-0.5 text-[9px] leading-snug" style={{ color: C.faint }}>{item.body}</p>
            </div>
            <button type="button" onClick={() => onAction(item.message)} className="shrink-0 rounded-lg px-2.5 py-2 text-[9px] font-bold" style={{ background: item.tone, color: C.onAccent }}>{item.action}</button>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

function NearbyTrendsPage({ t }) {
  const rows = [
    { icon: CalendarDays, title: t.marketFestival, body: t.marketFestivalBody, tone: C.accent },
    { icon: MapPinned, title: t.marketEvent, body: t.marketEventBody, tone: C.warn },
    { icon: CloudRain, title: t.marketWeather, body: t.marketWeatherBody, tone: C.accent2 },
  ];
  return (
    <div className="mx-5 mt-4 space-y-2">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: C.faint }}>{t.marketTitle}</p>
      {rows.map((r, i) => (
        <GlassCard key={i} className="p-3.5 flex gap-3">
          <IconBadge icon={r.icon} tone={r.tone} size={32} />
          <div>
            <p className="text-[12.5px] font-semibold" style={{ color: C.text }}>{r.title}</p>
            <p className="text-[11px] mt-0.5 leading-snug" style={{ color: C.sub }}>{r.body}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function TermLegend({ t }) {
  const [open, setOpen] = useState(null);
  const rows = [
    { id: "safety", icon: ShieldAlert, tone: C.accent2, title: t.safety, body: t.safetyExplain },
    { id: "reorder", icon: AlertTriangle, tone: C.danger, title: t.reorder, body: t.reorderExplain },
    { id: "overstock", icon: Boxes, tone: C.warn, title: t.overstock, body: t.overstockExplain },
  ];
  return (
    <GlassCard className="p-3.5 mb-3" style={{ background: `linear-gradient(135deg, ${C.accent}10, ${C.card})` }}>
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle size={15} color={C.accent} />
        <p className="text-[12.5px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.legendTitle}</p>
      </div>
      <p className="text-[10.5px] mb-2.5" style={{ color: C.faint }}>{t.legendSub}</p>
      <div className="space-y-1.5">
        {rows.map((r) => {
          const isOpen = open === r.id;
          return (
            <div key={r.id} className="rounded-xl overflow-hidden" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
              <button onClick={() => setOpen(isOpen ? null : r.id)} className="w-full flex items-center justify-between px-3 py-2.5" style={{ color: C.text, background: "transparent" }}>
                <span className="term-row-label flex items-center gap-2 text-[12px] font-semibold" style={{ color: C.text }}>
                  <r.icon size={13} color={r.tone} /> {r.title}
                </span>
                <ChevronDown size={14} color={C.faint} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {isOpen && (
                <div className="px-3 pb-3 text-[11px] leading-relaxed" style={{ color: C.sub }}>
                  {r.body}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function StockLevelsPage({ t, lang, stock }) {
  return (
    <div className="mx-5 mt-4">
      <TermLegend t={t} />
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: C.faint }}>{t.stockLevelsTitle}</p>
      <div className="space-y-2">
        {stock.map((item) => {
          const pct = Math.min(100, Math.round((item.qty / item.max) * 100));
          const low = item.qty < item.min;
          const over = item.qty > item.max * 0.85;
          const barColor = low ? C.danger : over ? C.warn : C.accent;
          return (
            <GlassCard key={item.id} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12.5px] font-semibold flex items-center gap-1.5" style={{ color: C.text }}>
                  <Boxes size={13} color={C.sub} /> {pname(item, lang)}
                </p>
                <span className="text-[11px] font-bold" style={{ color: C.text, fontFamily: fontMono }}>{item.qty} {uname(item.unit, lang)}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.cardAlt }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor, boxShadow: `0 0 8px ${barColor}88` }} />
              </div>
              <div className="flex items-center gap-3 mt-2">
                {low && <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: C.danger }}><ShieldAlert size={11} /> {t.reorder}</span>}
                {over && !low && <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: C.warn }}><AlertTriangle size={11} /> {t.overstock}</span>}
                <span className="text-[10px]" style={{ color: C.faint }}>{t.safety}: {item.min}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function NetworkWindow({ title, children, onClose }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.68)" }} onClick={onClose}>
      <div className="w-full max-h-[88%] overflow-y-auto rounded-t-3xl p-5 pb-8" style={{ background: C.screen, borderTop: `1px solid ${C.borderStrong}` }} onClick={(event) => event.stopPropagation()}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: C.border }} />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: C.cardAlt }} aria-label={uiText("Close window")}><X size={15} color={C.sub} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MessageWindow({ shop, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ from: shop.name, text: uiText("I have stock available. How many do you need?"), incoming: true }]);
  const [online, setOnline] = useState(true);
  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((current) => [...current, { from: "You", text: message.trim(), incoming: false }]);
    setMessage("");
  };
  const receiveMessage = () => setMessages((current) => [...current, { from: shop.name, text: uiText("Thanks. I will keep it ready for you."), incoming: true }]);
  return (
    <NetworkWindow title={`${uiText("Message")} · ${shop.name}`} onClose={onClose}>
      <div className="p-3 rounded-xl mb-3" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between"><p className="text-[11.5px] font-bold" style={{ color: C.text }}>{shop.name}</p><button onClick={() => setOnline((value) => !value)} className="flex items-center gap-1 text-[9px] font-bold" style={{ color: online ? C.accent : C.faint }}><ActivityDot /> {uiText(online ? "Online" : "Offline")}</button></div>
        <p className="text-[10px] mt-1" style={{ color: C.sub }}>{uiText("Owner")}: {shop.owner} · {shop.phone}</p>
        <p className="text-[10px] mt-1" style={{ color: C.faint }}>{shop.address} · {uiText("Connected shop")}</p>
      </div>
      <div className="space-y-2 mb-3">
        {messages.map((item, index) => <div key={`${item.from}-${index}`} className="p-3 rounded-xl" style={{ background: item.incoming ? C.cardAlt : `${C.accent}15`, border: `1px solid ${C.border}` }}><p className="text-[9px] font-bold uppercase" style={{ color: item.incoming ? C.accent2 : C.accent }}>{item.from}</p><p className="text-[11.5px] mt-1" style={{ color: C.text }}>{item.text}</p></div>)}
      </div>
      <button onClick={receiveMessage} className="mb-3 flex items-center gap-1.5 text-[10px] font-bold" style={{ color: C.accent2 }}><RefreshCw size={12} /> {uiText("Receive shop update")}</button>
      <div className="flex gap-2">
        <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} placeholder={uiText("Type your message")} className="flex-1 rounded-xl px-3 py-3 text-[11px] outline-none" style={{ background: C.cardAlt, border: `1px solid ${C.borderStrong}`, color: C.text }} />
        <button type="button" onClick={sendMessage} className="w-12 rounded-xl flex items-center justify-center" style={{ background: C.accent, color: C.onAccent }} aria-label={uiText("Send message")} title={uiText("Send message")}><Send size={15} /></button>
      </div>
    </NetworkWindow>
  );
}

function ShopRadar({ shops, selectedShop, onSelect, label }) {
  const positions = [[68, 30], [30, 62], [76, 74]];

  return (
    <div
      className="relative mx-auto mb-3 aspect-square overflow-hidden rounded-full"
      role="group"
      aria-label={label}
      style={{ width: "min(82%, 240px)", background: `radial-gradient(circle, ${C.cardAlt}, ${C.card})`, border: `1px solid ${C.border}` }}
    >
      <div className="shop-radar-sweep" aria-hidden="true" />
      <div className="absolute rounded-full" style={{ inset: "3%", border: `1px dashed ${C.border}` }} aria-hidden="true" />
      <div className="absolute rounded-full" style={{ inset: "27%", border: `1px dashed ${C.border}` }} aria-hidden="true" />
      <div className="absolute rounded-full" style={{ left: "50%", top: "50%", width: 16, height: 16, margin: -8, background: C.gold, boxShadow: `0 0 0 4px ${C.gold}44` }} aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-3 text-[9px] font-bold" style={{ color: C.faint }}>{uiText("YOU")}</span>
      {shops.map((shop, index) => (
        <button
          key={shop.name}
          type="button"
          onClick={() => onSelect(shop.name)}
          aria-label={`${uiText("Select shop")}: ${shop.name}`}
          aria-pressed={selectedShop === shop.name}
          className="radar-pin absolute flex items-center justify-center rounded-full"
          style={{
            left: `${positions[index % positions.length][0]}%`,
            top: `${positions[index % positions.length][1]}%`,
            width: 34,
            height: 34,
            margin: -17,
            background: selectedShop === shop.name ? C.gold : C.accent,
            border: `2px solid ${C.card}`,
            color: "#fff",
            boxShadow: `0 4px 14px ${C.bgApp}55`,
          }}
        >
          <Store size={15} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

function NetworkScreen({ t, hasSampleData }) {
  const [connectedShop, setConnectedShop] = useState(null);
  const [shared, setShared] = useState(false);
  const [requested, setRequested] = useState(null);
  const [window, setWindow] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const pulseRows = [
    { name: "Umbrellas", value: "+140%", tone: C.accent, icon: Umbrella },
    { name: "Cold drinks", value: "+32%", tone: C.warn, icon: Flame },
    { name: "Mosquito repellents", value: "+27%", tone: C.accent, icon: TrendingUp },
    { name: "Winter clothing", value: "-18%", tone: C.danger, icon: TrendingDown },
  ];
  const shops = [
    { name: "Sharma General Store", owner: "Amit Sharma", distance: "0.8 km", stock: "8 umbrellas", price: "₹45", address: "MG Road, Andheri East", phone: "+91 98765 41021" },
    { name: "Patel Mart", owner: "Neha Patel", distance: "1.2 km", stock: "1 water carton", price: "₹44", address: "JB Nagar, Andheri East", phone: "+91 98201 77214" },
    { name: "Sai Daily Needs", owner: "Ravi Deshmukh", distance: "1.5 km", stock: "6 raincoats", price: "₹48", address: "Chakala Nearby", phone: "+91 98920 33418" },
  ];
  if (!hasSampleData) {
    return (
      <div className="flex-1 overflow-y-auto pb-6">
        <Header title={t.networkHeader} subtitle={t.networkSub} />
        <EmptyDataCard t={t} />
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <Header title={t.networkHeader} subtitle={t.networkSub} />
      <div className="mx-5 space-y-3">

        <GlassCard className="p-4" style={{ background: `linear-gradient(145deg, ${C.accent2}25, ${C.card})`, borderColor: `${C.accent2}55` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><IconBadge icon={MapPin} tone={C.accent2} size={34} /><div><p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{uiText("ANDHERI MARKET PULSE")}</p><p className="text-[10px] mt-0.5" style={{ color: C.faint }}>{t.pulseUpdated}</p></div></div>
            <ActivityDot />
          </div>
          <p className="text-[12.5px] font-semibold mb-3" style={{ color: C.text }}>{t.pulseTitle}</p>
          <div className="grid grid-cols-2 gap-2">
            {pulseRows.map((row) => { const kind = row.name === "Umbrellas" ? "umbrella" : row.name === "Cold drinks" ? "bottle" : "box"; return <div key={row.name} className="market-pulse-tile" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}><ProductIllustration kind={kind} size={38} label={uiText(row.name)} /><div><span className="text-[10px]" style={{ color: C.sub }}>{uiText(row.name)}</span><p className="text-[15px] font-bold mt-1" style={{ color: row.tone, fontFamily: fontMono }}>{row.value}</p></div></div>; })}
          </div>
          <div className="mt-3 p-3 rounded-xl" style={{ background: `${C.accent}12`, borderLeft: `3px solid ${C.accent}` }}><div className="flex gap-2"><Sparkles size={14} color={C.accent} className="shrink-0 mt-0.5" /><p className="text-[11px] leading-relaxed" style={{ color: C.sub }}>{t.pulseInsight}</p></div></div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="flex items-start gap-3 mb-3"><IconBadge icon={Users} tone={C.accent} size={34} /><div><p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.networkTitle}</p><p className="text-[11px] mt-1 leading-snug" style={{ color: C.sub }}>{t.networkBody}</p></div></div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: C.faint }}>{t.nearby}</p>
          <ShopRadar shops={shops} selectedShop={selectedShop} onSelect={setSelectedShop} label={t.nearby} />
          <div className="space-y-2">
            {shops.map((shop, index) => {
              const isConnected = connectedShop === shop.name;
              const isRequested = requested === shop.name;
              const isSelected = selectedShop === shop.name;
              return <div key={shop.name} className="nearby-shop-card p-2.5 rounded-xl" style={{ background: C.cardAlt, border: `1px solid ${isSelected ? C.accent : C.border}`, "--stagger-index": index }}>
                <div className="flex items-center gap-2.5">
                  <div className="shop-initials-avatar" role="img" aria-label={`${shop.name} shop`}>{shop.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</div>
                  <div className="flex-1 min-w-0"><p className="text-[11.5px] font-semibold truncate" style={{ color: C.text }}>{shop.name}</p><p className="mt-1 flex items-center gap-1 text-[9.5px]" style={{ color: C.faint }}><MapPin size={10} color={C.accent2} /> {shop.distance} {uiText("away")}</p></div>
                  <button onClick={() => setConnectedShop(isConnected ? null : shop.name)} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold" style={{ color: isConnected ? C.accent : C.text, background: isConnected ? `${C.accent}18` : C.card, border: `1px solid ${isConnected ? C.accent : C.border}` }}>{isConnected ? <><CircleCheck size={12} /> {t.connected}</> : t.connect}</button>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setRequested(isRequested ? null : shop.name)} className="flex-1 py-1.5 rounded-lg text-[9.5px] font-bold" style={{ background: isRequested ? `${C.accent2}18` : C.card, color: isRequested ? C.accent2 : C.sub, border: `1px solid ${isRequested ? C.accent2 : C.border}` }}>{isRequested ? <><CircleCheck size={11} /> {uiText("Request sent")}</> : <><Send size={11} /> {t.requestStock}</>}</button>
                  <button type="button" onClick={() => isConnected && setWindow({ type: "message", shop })} disabled={!isConnected} className="px-3 py-1.5 rounded-lg text-[9.5px] font-bold" style={{ background: isConnected ? C.card : `${C.card}88`, color: isConnected ? C.sub : C.faint, border: `1px solid ${C.border}`, cursor: isConnected ? "pointer" : "not-allowed" }} aria-label={isConnected ? `${uiText("Message shop")} ${shop.name}` : uiText("Connect to message")} title={isConnected ? `${uiText("Message shop")} ${shop.name}` : uiText("Connect first to message")}><MessageCircle size={11} /></button>
                </div>
              </div>;
            })}
          </div>
        </GlassCard>

        <button onClick={() => setShared(!shared)} className="w-full rounded-xl py-3 flex items-center justify-center gap-2 text-[10.5px] font-bold" style={{ background: shared ? `${C.accent}18` : C.card, color: shared ? C.accent : C.sub, border: `1px solid ${shared ? C.accent : C.border}` }}><Send size={13} /> {shared ? uiText("Your available stock is visible to nearby shops") : t.shareStock}</button>
      </div>
      {window?.type === "message" && <MessageWindow shop={window.shop} onClose={() => setWindow(null)} />}
    </div>
  );
}

function MyMoneyPage({ t }) {
  const totals = monthlyFinancials.reduce((summary, month) => ({
    revenue: summary.revenue + month.revenue,
    expenses: summary.expenses + month.expenses,
  }), { revenue: 0, expenses: 0 });
  const latest = monthlyFinancials[monthlyFinancials.length - 1];
  const latestResult = latest.revenue - latest.expenses;
  const totalResult = totals.revenue - totals.expenses;
  const formatCurrency = (value) => `₹${Math.abs(value).toLocaleString("en-IN")}`;
  const collected = customerPayments.filter((payment) => payment.status === "paid").reduce((sum, payment) => sum + payment.amount, 0);
  const pending = customerPayments.filter((payment) => payment.status === "pending").reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="mx-5 mt-4 space-y-2.5">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color: C.faint }}>{t.financeTitle}</p>
      <GlassCard className="p-4" style={{ background: `linear-gradient(145deg, ${latestResult >= 0 ? C.accent : C.danger}18, ${C.card})`, borderColor: `${latestResult >= 0 ? C.accent : C.danger}55` }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: C.faint }}>{latest.month} · {t.netResult}</p>
            <p className="text-[24px] font-bold mt-1" style={{ color: latestResult >= 0 ? C.accent : C.danger, fontFamily: fontMono }}>{latestResult >= 0 ? "+" : "-"}{formatCurrency(latestResult)}</p>
            <p className="text-[11px] mt-1" style={{ color: latestResult >= 0 ? C.accent : C.danger }}>{latestResult >= 0 ? t.profit : t.loss}</p>
          </div>
          {latestResult >= 0 ? <TrendingUp size={24} color={C.accent} /> : <TrendingDown size={24} color={C.danger} />}
        </div>
        <p className="text-[10.5px] mt-3" style={{ color: C.sub }}>{t.financeNote}: {formatCurrency(latest.revenue)} - {formatCurrency(latest.expenses)}.</p>
      </GlassCard>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: t.revenue, value: totals.revenue, tone: C.accent },
          { label: t.expenses, value: totals.expenses, tone: C.warn },
          { label: t.netResult, value: totalResult, tone: totalResult >= 0 ? C.accent : C.danger },
        ].map((item) => (
          <GlassCard key={item.label} className="p-2.5">
            <p className="text-[13px] font-bold" style={{ color: item.tone, fontFamily: fontMono }}>{formatCurrency(item.value)}</p>
            <p className="text-[9.5px] mt-1" style={{ color: C.sub }}>{item.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-3">
        <div className="grid grid-cols-[42px_1fr_1fr_1fr] gap-2 px-1 pb-2 text-[9px] font-bold uppercase tracking-wide" style={{ color: C.faint }}>
          <span>{uiText("Month")}</span><span>{t.revenue}</span><span>{t.expenses}</span><span>{t.netResult}</span>
        </div>
        <div className="space-y-1.5">
          {monthlyFinancials.map((month) => {
            const result = month.revenue - month.expenses;
            return (
              <div key={month.month} className="grid grid-cols-[42px_1fr_1fr_1fr] gap-2 items-center rounded-xl px-1 py-2.5" style={{ background: C.cardAlt }}>
                <span className="text-[11px] font-bold" style={{ color: C.text }}>{uiText(month.month)}</span>
                <span className="text-[10px]" style={{ color: C.accent, fontFamily: fontMono }}>{formatCurrency(month.revenue)}</span>
                <span className="text-[10px]" style={{ color: C.warn, fontFamily: fontMono }}>{formatCurrency(month.expenses)}</span>
                <span className="text-[10px] font-bold" style={{ color: result >= 0 ? C.accent : C.danger, fontFamily: fontMono }}>{result >= 0 ? "+" : "-"}{formatCurrency(result)}</span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-3.5" style={{ borderColor: `${C.accent2}55`, background: `linear-gradient(145deg, ${C.accent2}12, ${C.card})` }}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <IconBadge icon={Users} tone={C.accent2} size={34} />
            <div>
              <p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>{t.paymentHistoryTitle}</p>
              <p className="text-[10px] mt-0.5" style={{ color: C.faint }}>{t.paymentHistorySub}</p>
            </div>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: C.accent }}>{uiText("LIVE")}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="rounded-xl p-2" style={{ background: `${C.accent}12` }}><p className="text-[13px] font-bold" style={{ color: C.accent, fontFamily: fontMono }}>{formatCurrency(collected)}</p><p className="text-[9px] mt-1" style={{ color: C.sub }}>{t.collected}</p></div>
          <div className="rounded-xl p-2" style={{ background: `${C.warn}12` }}><p className="text-[13px] font-bold" style={{ color: C.warn, fontFamily: fontMono }}>{formatCurrency(pending)}</p><p className="text-[9px] mt-1" style={{ color: C.sub }}>{t.pending}</p></div>
          <div className="rounded-xl p-2" style={{ background: C.cardAlt }}><p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: fontMono }}>{customerPayments.length}</p><p className="text-[9px] mt-1" style={{ color: C.sub }}>{t.customers}</p></div>
        </div>
        <div className="space-y-2">
          {customerPayments.map((payment) => {
            const isPaid = payment.status === "paid";
            return <div key={payment.customer} className="flex items-center gap-2.5 rounded-xl p-2.5" style={{ background: C.cardAlt, border: `1px solid ${isPaid ? `${C.accent}30` : `${C.warn}35`}` }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: isPaid ? `${C.accent}18` : `${C.warn}18` }}>
                {isPaid ? <CircleCheck size={14} color={C.accent} /> : <AlertTriangle size={14} color={C.warn} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] font-semibold truncate" style={{ color: C.text }}>{payment.customer}</p>
                <p className="text-[9px] mt-0.5 truncate" style={{ color: C.faint }}>{uiText(payment.detail)} · {uiText(payment.mode)} · {uiText(payment.due)}</p>
              </div>
              <div className="text-right shrink-0"><p className="text-[11px] font-bold" style={{ color: isPaid ? C.accent : C.warn, fontFamily: fontMono }}>{formatCurrency(payment.amount)}</p><p className="text-[8px] mt-0.5" style={{ color: isPaid ? C.accent : C.warn }}>{isPaid ? t.paymentReceived : t.paymentDue}</p></div>
            </div>;
          })}
        </div>
      </GlassCard>
    </div>
  );
}

function ActivityDot() {
  return <span className="w-2 h-2 rounded-full" style={{ background: C.accent, boxShadow: `0 0 8px ${C.accent}` }} aria-label={uiText("Live market data")} />;
}


// ---------- Business intelligence helpers ----------
const demandHistory = {
  umbrella: [4, 5, 4, 7, 9, 11, 10],
  colddrink: [18, 20, 21, 24, 27, 31, 29],
  biscuit: [16, 15, 14, 13, 12, 11, 10],
  milk: [28, 30, 29, 31, 33, 34, 32],
  rice: [12, 13, 12, 14, 13, 14, 15],
};

function mean(a) { return a.reduce((s, v) => s + v, 0) / a.length; }
function median(a) {
  const x = [...a].sort((m, n) => m - n);
  const k = Math.floor(x.length / 2);
  return x.length % 2 ? x[k] : (x[k - 1] + x[k]) / 2;
}
function variance(a) {
  const m = mean(a);
  return mean(a.map(v => (v - m) ** 2));
}
function stdDev(a) { return Math.sqrt(variance(a)); }
function pctChange(a) { return a.length > 1 ? ((a[a.length - 1] - a[0]) / a[0]) * 100 : 0; }
function movingAverage(a, n = 3) { return mean(a.slice(-n)); }
function regression(a) {
  const n = a.length, xs = a.map((_, i) => i + 1), xBar = mean(xs), yBar = mean(a);
  const slope = xs.reduce((s, x, i) => s + (x - xBar) * (a[i] - yBar), 0) /
    xs.reduce((s, x) => s + (x - xBar) ** 2, 0);
  const intercept = yBar - slope * xBar;
  return { slope, intercept, next: intercept + slope * (n + 1) };
}
function correlation(a, b) {
  const am = mean(a), bm = mean(b);
  const num = a.reduce((s, v, i) => s + (v - am) * (b[i] - bm), 0);
  const den = Math.sqrt(
    a.reduce((s, v) => s + (v - am) ** 2, 0) *
    b.reduce((s, v) => s + (v - bm) ** 2, 0)
  );
  return den ? num / den : 0;
}

const rainDays = [1, 1, 0, 1, 0, 1, 0];
const umbrellaRainSales = [4, 5, 7, 9];
const umbrellaDrySales = [4, 11, 10];
const umbrellaSeries = demandHistory.umbrella;
const umbrellaRegression = regression(umbrellaSeries);
const umbrellaMA = movingAverage(umbrellaSeries, 3);
const umbrellaMean = mean(umbrellaSeries);
const umbrellaMedian = median(umbrellaSeries);
const umbrellaStd = stdDev(umbrellaSeries);
const umbrellaRainAvg = mean(umbrellaRainSales);
const umbrellaDryAvg = mean(umbrellaDrySales);
const umbrellaRainProbability = mean(rainDays) * 100;
const highDemandDays = umbrellaSeries.filter(v => v >= 8).length;
const highDemandProbability = highDemandDays / umbrellaSeries.length * 100;
const stockOutProbability = 70; // illustrative prototype risk score
const rainHighDemandCorrelation = correlation(rainDays, umbrellaSeries);

function MiniLineChart({ values, labels = ["D1","D2","D3","D4","D5","D6","D7"], forecast = null, height = 150 }) {
  const all = forecast == null ? values : [...values, forecast];
  const max = Math.max(...all, 1), min = Math.min(...all, 0);
  const w = 620, h = 210, pad = 26;
  const x = i => pad + (i * (w - pad * 2)) / Math.max(all.length - 1, 1);
  const y = v => h - pad - ((v - min) / Math.max(max - min, 1)) * (h - pad * 2);
  const points = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img" aria-label={uiText("Demand line chart")}>
      {[0, .25, .5, .75, 1].map((r) => {
        const yy = pad + r * (h - pad * 2);
        return <line key={r} x1={pad} x2={w-pad} y1={yy} y2={yy} stroke={C.border} strokeWidth="1" />;
      })}
      <polyline points={points} fill="none" stroke={C.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="4.5" fill={C.accent} />)}
      {forecast != null && <>
        <line x1={x(values.length-1)} y1={y(values[values.length-1])} x2={x(all.length-1)} y2={y(forecast)}
          stroke={C.gold} strokeWidth="3" strokeDasharray="8 7" />
        <circle cx={x(all.length-1)} cy={y(forecast)} r="5" fill={C.gold} />
      </>}
      {labels.slice(0, all.length).map((label, i) =>
        <text key={i} x={x(i)} y={h-7} textAnchor="middle" fontSize="11" fill={C.faint}>{label}</text>
      )}
    </svg>
  );
}

function MiniBarChart({ items, maxValue }) {
  const max = maxValue || Math.max(...items.map(x => x.value), 1);
  return <div className="space-y-3">
    {items.map((item) => (
      <div key={item.label}>
        <div className="flex justify-between text-[10.5px] mb-1">
          <span style={{ color: C.text }}>{uiText(item.label)}</span>
          <span style={{ color: item.tone || C.accent, fontFamily: fontMono }}>{item.value}</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: C.cardAlt }}>
          <div className="h-full rounded-full" style={{ width: `${Math.max(4, item.value / max * 100)}%`, background: item.tone || C.accent }} />
        </div>
      </div>
    ))}
  </div>;
}

function StatTile({ label, value, sub, tone = C.accent }) {
  return <GlassCard className="p-3">
    <p className="text-[18px] font-bold" style={{ color: tone, fontFamily: fontMono }}>{value}</p>
    <p className="text-[10px] font-semibold mt-1" style={{ color: C.text }}>{uiText(label)}</p>
    {sub && <p className="text-[9px] mt-0.5" style={{ color: C.faint }}>{uiText(sub)}</p>}
  </GlassCard>;
}

function BusinessInsights({ t, lang, stock, onAction }) {
  const [view, setView] = useState("overview");
  const labels = weekdayLabels();
  const views = [
    ["overview", "Overview"],
    ["demand", "Demand"],
    ["inventory", "What is left"],
    ["market", "Nearby"],
    ["finance", "My money"],
  ];

  const forecast = Math.max(0, Math.round(umbrellaRegression.next));
  const r2 = Math.max(0, Math.min(1, 1 - (
    umbrellaSeries.reduce((sum, value, i) => sum + (value - (umbrellaRegression.intercept + umbrellaRegression.slope * (i + 1))) ** 2, 0) /
    Math.max(umbrellaSeries.reduce((sum, value) => sum + (value - umbrellaMean) ** 2, 0), 1)
  )));
  const reorderPoint = Math.ceil(umbrellaMean * 2 + 2);
  const latestMonth = monthlyFinancials[monthlyFinancials.length - 1];
  const financialNet = monthlyFinancials.map(m => m.revenue - m.expenses);
  const latestNet = financialNet[financialNet.length - 1];
  const totalLow = stock.filter(item => item.qty <= item.min).length;
  const risingItems = stock.filter(item => item.trend > 10).length;

  const insightCards = [
    {
      icon: Umbrella,
      tone: C.accent,
      title: "Umbrella demand is accelerating",
      body: "Recent sales are trending upward while rain is expected. Protect availability before the weekend.",
      tag: "Action recommended",
    },
    {
      icon: Flame,
      tone: C.warn,
      title: "Cold drinks are gaining momentum",
      body: "Local footfall signals suggest stronger demand around the nearby school area.",
      tag: "+60% signal",
    },
    {
      icon: Package,
      tone: C.danger,
      title: "What is left needs attention",
      body: `${totalLow} items are at or below their safety level. Prioritize fast-moving products first.`,
      tag: "Priority",
    },
  ];

  return <div className="mx-5 mt-4 space-y-3 pb-5">
    <GlassCard className="p-4" style={{ background: `linear-gradient(145deg, ${C.accent2}18, ${C.card})`, borderColor: `${C.accent2}45` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconBadge icon={BarChart3} tone={C.accent2} size={38} />
          <div>
            <p className="text-[15px] font-bold" style={{ color: C.text, fontFamily: fontHead }}>Shop report</p>
            <p className="text-[10.5px] mt-0.5" style={{ color: C.sub }}>One clear view of what is happening, what is changing and what to do next.</p>
          </div>
        </div>
        
      </div>
      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
        {views.map(([id, label]) => <button key={id} onClick={() => setView(id)}
          className="shrink-0 rounded-lg px-3 py-1.5 text-[9.5px] font-bold transition-all"
          style={{ background: view === id ? `linear-gradient(90deg, ${C.accent}, ${C.accent2})` : C.cardAlt, color: view === id ? C.onAccent : C.sub, border: `1px solid ${view === id ? C.accent : C.border}` }}>
          {label}
        </button>)}
      </div>
    </GlassCard>

    {view === "overview" && <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatTile label="Sold today" value="₹4,280" sub="compared with yesterday" />
        <StatTile label="Low stock" value={`${totalLow}`} sub="items to buy soon" tone={C.danger} />
        <StatTile label="Fast movers" value={`${risingItems}`} sub="selling faster" tone={C.warn} />
        <StatTile label="Money left" value={`₹${(latestNet / 1000).toFixed(1)}k`} sub={`${latestMonth.month} result`} tone={C.accent2} />
      </div>

      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[13px] font-bold" style={{ color: C.text }}>What may sell more</p>
            <p className="text-[9.5px]" style={{ color: C.faint }}>What is selling more or less</p>
          </div>
          <span className="text-[10px] font-bold rounded-full px-2 py-1" style={{ color: C.accent, background: `${C.accent}12` }}>Selling more</span>
        </div>
        <MiniLineChart values={umbrellaSeries} labels={labels} height={160} />
      </GlassCard>

      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-bold" style={{ color: C.text }}>What should you check?</p>
            <p className="text-[9.5px]" style={{ color: C.faint }}>Things worth checking today</p>
          </div>
          <Zap size={16} color={C.gold} />
        </div>
        <div className="space-y-2">
          {insightCards.map((item, i) => {
            const Icon = item.icon;
            return <div key={i} className="p-3 rounded-xl flex items-start gap-3" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
              <IconBadge icon={Icon} tone={item.tone} size={32} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11.5px] font-bold" style={{ color: C.text }}>{item.title}</p>
                  <span className="shrink-0 text-[8px] font-bold rounded-full px-2 py-1" style={{ color: item.tone, background: `${item.tone}14` }}>{item.tag}</span>
                </div>
                <p className="text-[10px] mt-1 leading-relaxed" style={{ color: C.sub }}>{item.body}</p>
              </div>
            </div>;
          })}
        </div>
      </GlassCard>
    </>}

    {view === "demand" && <>
      <GlassCard className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div><p className="text-[13px] font-bold" style={{ color: C.text }}>Is it selling more?</p><p className="text-[9.5px]" style={{ color: C.faint }}>Last 7 days</p></div>
          <span className="text-[11px] font-bold" style={{ color: C.accent }}>+{Math.round(pctChange(umbrellaSeries))}%</span>
        </div>
        <MiniLineChart values={umbrellaSeries} labels={labels} height={175} />
        <div className="grid grid-cols-3 gap-2 mt-2">
          <StatTile label="Usual day" value={umbrellaMean.toFixed(1)} sub="items" />
          <StatTile label="Last day" value={umbrellaSeries[umbrellaSeries.length - 1]} sub="items" tone={C.accent2} />
          <StatTile label="Change" value={umbrellaStd.toFixed(1)} sub="items" tone={C.gold} />
        </div>
      </GlassCard>
      <GlassCard className="p-4">
        <p className="text-[12px] font-bold" style={{ color: C.text }}>Items selling faster</p>
        <p className="text-[9.5px] mt-1 mb-3" style={{ color: C.faint }}>Which items are moving faster</p>
        <MiniBarChart items={[
          {label:"Cold drinks",value:32,tone:C.warn},{label:"Umbrella",value:34,tone:C.accent},
          {label:"Milk",value:8,tone:C.accent2},{label:"Rice",value:2,tone:C.gold},{label:"Biscuits",value:12,tone:C.danger}
        ]} maxValue={40}/>
      </GlassCard>
    </>}

    {view === "inventory" && <>
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div><p className="text-[13px] font-bold" style={{color:C.text}}>What is left health</p><p className="text-[9.5px]" style={{color:C.faint}}>Where to replenish first</p></div>
          <Boxes size={17} color={C.accent2}/>
        </div>
        <div className="space-y-2.5">
          {stock.map(item => {
            const ratio = Math.min(100, Math.max(4, item.qty / Math.max(item.max, 1) * 100));
            const critical = item.qty <= item.min;
            return <div key={item.id} className="p-3 rounded-xl" style={{background:C.cardAlt,border:`1px solid ${C.border}`}}>
              <div className="flex justify-between items-center gap-2"><div><p className="text-[11px] font-bold" style={{color:C.text}}>{pname(item,lang)}</p><p className="text-[8.5px]" style={{color:C.faint}}>{uiText(item.loc)}</p></div><span className="text-[9px] font-bold" style={{color:critical?C.danger:C.accent}}>{item.qty} {uname(item.unit,lang)}</span></div>
              <div className="mt-2 h-2 rounded-full overflow-hidden" style={{background:C.screen}}><div className="h-full rounded-full" style={{width:`${ratio}%`,background:critical?C.danger:C.accent}}/></div>
              <div className="mt-1.5 flex justify-between text-[8.5px]" style={{color:C.faint}}><span>Safety {item.min}</span><span>Capacity {item.max}</span></div>
            </div>;
          })}
        </div>
      </GlassCard>
      <GlassCard className="p-4" style={{borderColor:`${C.danger}44`}}>
        <div className="flex items-center gap-2"><IconBadge icon={ShieldAlert} tone={C.danger}/><div><p className="text-[12px] font-bold" style={{color:C.text}}>Replenishment priority</p><p className="text-[10px]" style={{color:C.faint}}>Start with products closest to their safety level</p></div></div>
        <div className="mt-3 grid grid-cols-2 gap-2"><StatTile label="Urgent items" value={totalLow} sub="at / below safety" tone={C.danger}/><StatTile label="Top priority" value="Umbrella" sub="3 items remaining" tone={C.accent}/></div>
      </GlassCard>
    </>}

    {view === "market" && <>
      <GlassCard className="p-4">
        <div className="flex items-center justify-between"><div><p className="text-[13px] font-bold" style={{color:C.text}}>Nearby pulse</p><p className="text-[9.5px]" style={{color:C.faint}}>External signals affecting your shop</p></div><span className="text-[8px] font-bold rounded-full px-2 py-1" style={{color:C.accent,background:`${C.accent}14`}}>UPDATED</span></div>
        <div className="mt-3 space-y-2">
          {[{icon:CalendarDays,tone:C.accent2,title:"Ganesh Chaturthi in 9 days",body:"Modak moulds, sweets and decoration demand can rise sharply."},{icon:Users,tone:C.warn,title:"School reopened nearby",body:"Stationery and snack footfall is showing stronger activity."},{icon:CloudRain,tone:C.accent,title:"Monsoon remains active",body:"Rain-gear categories are gaining attention across nearby shops."}].map((item,i)=>{const Icon=item.icon;return <div key={i} className="p-3 rounded-xl flex gap-3" style={{background:C.cardAlt,border:`1px solid ${C.border}`}}><IconBadge icon={Icon} tone={item.tone} size={32}/><div><p className="text-[11.5px] font-bold" style={{color:C.text}}>{item.title}</p><p className="text-[10px] mt-1 leading-relaxed" style={{color:C.sub}}>{item.body}</p></div></div>})}
        </div>
      </GlassCard>
      <GlassCard className="p-4" style={{background:`linear-gradient(145deg, ${C.warn}12, ${C.card})`}}><div className="flex gap-3"><IconBadge icon={Zap} tone={C.warn}/><div><p className="text-[12px] font-bold" style={{color:C.text}}>Opportunity signal</p><p className="text-[10.5px] mt-1 leading-relaxed" style={{color:C.sub}}>Use local events, weather and nearby-shop activity as an early signal for what customers may want next.</p></div></div></GlassCard>
    </>}

    {view === "finance" && <>
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3"><div><p className="text-[13px] font-bold" style={{color:C.text}}>Financial performance</p><p className="text-[9.5px]" style={{color:C.faint}}>Revenue, expenses and business result</p></div><TrendingUp size={17} color={C.accent}/></div>
        <div className="space-y-3">
          {monthlyFinancials.map(m => { const max=Math.max(m.revenue,m.expenses); return <div key={m.month}><div className="flex justify-between text-[9.5px] mb-1"><span style={{color:C.text}}>{m.month}</span><span style={{color:C.accent,fontFamily:fontMono}}>₹{(m.revenue/1000).toFixed(1)}k</span></div><div className="flex gap-1 h-2"><div className="rounded-full" style={{width:`${m.revenue/max*70}%`,background:C.accent}}/><div className="rounded-full" style={{width:`${m.expenses/max*30}%`,background:C.warn}}/></div></div>; })}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2"><StatTile label="Revenue" value={`₹${(latestMonth.revenue/1000).toFixed(1)}k`} sub="latest month"/><StatTile label="Expenses" value={`₹${(latestMonth.expenses/1000).toFixed(1)}k`} sub="latest month" tone={C.warn}/><StatTile label="Net result" value={`₹${(latestNet/1000).toFixed(1)}k`} sub="latest month" tone={C.accent2}/></div>
      </GlassCard>
      <GlassCard className="p-4"><p className="text-[12px] font-bold" style={{color:C.text}}>Customer payments</p><p className="text-[9.5px] mt-1 mb-3" style={{color:C.faint}}>Keep cash collection visible alongside sales</p><div className="grid grid-cols-2 gap-2"><StatTile label="Collected" value={`₹${customerPayments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0).toLocaleString("en-IN")}`} sub="received"/><StatTile label="Pending" value={`₹${customerPayments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0).toLocaleString("en-IN")}`} sub="to collect" tone={C.warn}/></div></GlassCard>
    </>}
  </div>;
}

function TrendsScreen({ t, lang, stock, onAction, hasSampleData }) {
  const [seg, setSeg] = useState("demand");
  if (!hasSampleData) {
    return (
      <div className="flex-1 overflow-y-auto pb-6">
        <Header title={t.tabTrends} subtitle={uiText("Simple answers about your shop — what to sell, buy and keep.")} />
        <EmptyDataCard t={t} />
      </div>
    );
  }
  const segs = [
    { id: "demand", label: t.segDemand, icon: Sparkles },
    { id: "market", label: t.segNearby, icon: MapPinned },
    { id: "stock", label: t.segStock, icon: Boxes },
    { id: "finance", label: t.finance, icon: Wallet },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <Header title={t.tabTrends} subtitle={uiText("Simple answers about your shop — what to sell, buy and keep.")} />
      <div className="mx-5 flex rounded-xl p-1 gap-1 overflow-x-auto" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
        {segs.map((s) => (
          <button key={s.id} onClick={() => setSeg(s.id)} className="trend-segment shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
            style={{ background: seg === s.id ? `linear-gradient(90deg, ${C.accent}, ${C.accent2})` : "transparent", color: seg === s.id ? C.onAccent : C.sub }}>
            <s.icon size={13} /> {s.label}
          </button>
        ))}
      </div>
      {seg === "demand" && <DemandShiftPage t={t} lang={lang} stock={stock} onAction={onAction} />}
      {seg === "market" && <NearbyTrendsPage t={t} />}
      {seg === "stock" && <StockLevelsPage t={t} lang={lang} stock={stock} />}
      {seg === "finance" && <MyMoneyPage t={t} />}
    </div>
  );
}


// ---------- browser-local prototype accounts; production authentication needs a backend ----------

const AUTH = {
  en: {
    tagline: "Your shop's daily helper — stock, sales & udhaar in one place",
    login: "Login", signup: "Create account",
    loginTitle: "Welcome back!", loginSub: "Login to open your shop",
    signupTitle: "Register your shop", signupSub: "For shop owners only — takes a minute",
    owner: "Your name", shop: "Shop name", mobile: "Mobile number", type: "What kind of shop?", area: "Area / city", password: "Password",
    loginBtn: "Login to my shop", signupBtn: "Create my account", forgot: "Forgot password?",
    resetTitle: "Reset your password", resetSub: "Enter your mobile number and recovery code",
    recoveryCode: "Recovery code", resetPassword: "New password", resetBtn: "Reset password", backToLogin: "Back to login",
    recoveryInstructions: "Save this recovery code somewhere safe. It is shown only once and works in this browser.",
    recoverySaved: "I saved my code — continue", recoveryUnavailable: "This account has no recovery code. Contact support to regain access.",
    recoveryInvalid: "That recovery code is not correct", resetSuccess: "Password reset. Log in with your new password.",
    emptyStockTitle: "Your stock is ready to get started",
    emptyStockBody: "Your account starts with an empty inventory. Add or scan products when you are ready.",
    emptyDataTitle: "Nothing here yet",
    emptyDataBody: "This section will show information after you add products and record activity for your shop.",
    noAcct: "New here?", haveAcct: "Already have an account?",
    errOwner: "Please enter your name", errShop: "Please enter your shop name", errMobile: "Enter a valid 10-digit mobile number",
    errArea: "Please enter your area", errPass: "Password must be at least 6 characters",
    errNone: "No account found for this number", errWrong: "Wrong password", errExists: "This number is already registered — please login",
    types: { kirana: "Kirana", dairy: "Dairy", medical: "Medical", veg: "Fruits & Veg", stationery: "Stationery", other: "Other" },
    chips: ["Stock", "Udhaar", "Profit"], forShops: "Made for local shopkeepers", logout: "Logout",
  },
  hi: {
    tagline: "आपकी दुकान का रोज़ का साथी — स्टॉक, बिक्री और उधार एक जगह",
    login: "लॉगिन", signup: "खाता बनाएं",
    loginTitle: "वापसी पर स्वागत है!", loginSub: "अपनी दुकान खोलने के लिए लॉगिन करें",
    signupTitle: "अपनी दुकान का खाता बनाएं", signupSub: "एक मिनट से कम लगेगा",
    owner: "आपका नाम", shop: "दुकान का नाम", mobile: "मोबाइल नंबर", type: "कैसी दुकान है?", area: "इलाका / शहर", password: "पासवर्ड",
    loginBtn: "दुकान में लॉगिन करें", signupBtn: "मेरा खाता बनाएं", forgot: "पासवर्ड भूल गए?",
    resetTitle: "पासवर्ड रीसेट करें", resetSub: "मोबाइल नंबर और रिकवरी कोड दर्ज करें",
    recoveryCode: "रिकवरी कोड", resetPassword: "नया पासवर्ड", resetBtn: "पासवर्ड रीसेट करें", backToLogin: "लॉगिन पर वापस जाएं",
    recoveryInstructions: "रिकवरी कोड को सुरक्षित जगह पर रखें। यह केवल एक बार दिखेगा और इसी ब्राउज़र में काम करेगा।",
    recoverySaved: "कोड सेव कर लिया — आगे बढ़ें", recoveryUnavailable: "इस खाते के लिए रिकवरी कोड नहीं है। सहायता के लिए सपोर्ट से संपर्क करें।",
    recoveryInvalid: "रिकवरी कोड सही नहीं है", resetSuccess: "पासवर्ड रीसेट हो गया। नए पासवर्ड से लॉगिन करें।",
    emptyStockTitle: "आपकी इन्वेंट्री शुरू करने के लिए तैयार है",
    emptyStockBody: "आपका खाता खाली इन्वेंट्री से शुरू होता है। तैयार होने पर उत्पाद जोड़ें या स्कैन करें।",
    emptyDataTitle: "अभी यहां कुछ नहीं है",
    emptyDataBody: "उत्पाद जोड़ने और दुकान की गतिविधि दर्ज करने के बाद यहां जानकारी दिखेगी।",
    noAcct: "नए हैं?", haveAcct: "पहले से खाता है?",
    errOwner: "अपना नाम लिखें", errShop: "दुकान का नाम लिखें", errMobile: "सही 10 अंकों का मोबाइल नंबर डालें",
    errArea: "अपना इलाका लिखें", errPass: "पासवर्ड कम से कम 6 अक्षर का हो",
    errNone: "इस नंबर से कोई खाता नहीं मिला", errWrong: "पासवर्ड गलत है", errExists: "यह नंबर पहले से जुड़ा है — लॉगिन करें",
    types: { kirana: "किराना", dairy: "डेयरी", medical: "मेडिकल", veg: "फल-सब्ज़ी", stationery: "स्टेशनरी", other: "अन्य" },
    chips: ["स्टॉक", "उधार", "मुनाफ़ा"], forShops: "स्थानीय दुकानदारों के लिए बना", logout: "लॉगआउट",
  },
  mr: {
    tagline: "तुमच्या दुकानाचा रोजचा साथी — स्टॉक, विक्री आणि उधारी एकाच ठिकाणी",
    login: "लॉगिन", signup: "खाते तयार करा",
    loginTitle: "पुन्हा स्वागत आहे!", loginSub: "दुकान उघडण्यासाठी लॉगिन करा",
    signupTitle: "तुमच्या दुकानाचे खाते तयार करा", signupSub: "एका मिनिटापेक्षा कमी वेळ",
    owner: "तुमचे नाव", shop: "दुकानाचे नाव", mobile: "मोबाइल नंबर", type: "कोणते दुकान?", area: "परिसर / शहर", password: "पासवर्ड",
    loginBtn: "दुकानात लॉगिन करा", signupBtn: "माझे खाते तयार करा", forgot: "पासवर्ड विसरलात?",
    resetTitle: "पासवर्ड रीसेट करा", resetSub: "मोबाइल नंबर आणि रिकव्हरी कोड टाका",
    recoveryCode: "रिकव्हरी कोड", resetPassword: "नवीन पासवर्ड", resetBtn: "पासवर्ड रीसेट करा", backToLogin: "लॉगिनवर परत जा",
    recoveryInstructions: "रिकव्हरी कोड सुरक्षित ठेवा. तो फक्त एकदाच दिसेल आणि याच ब्राउझरमध्ये काम करेल.",
    recoverySaved: "कोड जतन केला — पुढे जा", recoveryUnavailable: "या खात्यासाठी रिकव्हरी कोड नाही. मदतीसाठी सपोर्टशी संपर्क साधा.",
    recoveryInvalid: "रिकव्हरी कोड चुकीचा आहे", resetSuccess: "पासवर्ड रीसेट झाला. नवीन पासवर्डने लॉगिन करा.",
    emptyStockTitle: "तुमची इन्व्हेंटरी सुरू करण्यासाठी तयार आहे",
    emptyStockBody: "तुमचे खाते रिकाम्या इन्व्हेंटरीने सुरू होते. तयार झाल्यावर उत्पादने जोडा किंवा स्कॅन करा.",
    emptyDataTitle: "इथे अजून काही नाही",
    emptyDataBody: "उत्पादने जोडल्यानंतर आणि दुकानातील व्यवहार नोंदवल्यानंतर येथे माहिती दिसेल.",
    noAcct: "नवीन आहात?", haveAcct: "आधीच खाते आहे?",
    errOwner: "तुमचे नाव लिहा", errShop: "दुकानाचे नाव लिहा", errMobile: "योग्य 10 अंकी मोबाइल नंबर टाका",
    errArea: "तुमचा परिसर लिहा", errPass: "पासवर्ड किमान 6 अक्षरांचा असावा",
    errNone: "या नंबरवर खाते सापडले नाही", errWrong: "पासवर्ड चुकीचा आहे", errExists: "हा नंबर आधीच नोंदलेला आहे — लॉगिन करा",
    types: { kirana: "किराणा", dairy: "डेअरी", medical: "मेडिकल", veg: "फळे-भाज्या", stationery: "स्टेशनरी", other: "इतर" },
    chips: ["स्टॉक", "उधारी", "नफा"], forShops: "स्थानिक दुकानदारांसाठी बनवले", logout: "लॉगआउट",
  },
};

function Awning({ h = 16, n = 14 }) {
  return (
    <div className="flex w-full" aria-hidden="true" style={{ height: h }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="awning-segment flex-1" style={{ "--segment-index": i, background: i % 2 ? C.accent2 : C.accent, borderRadius: "0 0 999px 999px" }} />
      ))}
    </div>
  );
}

function StorefrontIllustration() {
  return (
    <svg className="storefront-illustration" viewBox="0 0 420 150" role="img" aria-label={uiText("Illustration of a neighborhood shop")}>
      <ellipse cx="208" cy="140" rx="188" ry="9" fill="#042f25" opacity=".42" />
      <path d="M72 61h276v77H72z" fill="#f4dfaa" />
      <path d="M84 73h121v65H84z" fill="#fff6d9" />
      <path d="M94 84h100v41H94z" fill="#0b7952" />
      <path d="M101 91h16v13h-16zm22 0h16v13h-16zm22 0h16v13h-16zm22 0h16v13h-16z" fill="#f4a619" />
      <path d="M101 110h16v11h-16zm22 0h16v11h-16zm22 0h16v11h-16zm22 0h16v11h-16z" fill="#fff4d2" />
      <path d="M218 78h111v60H218z" fill="#f8eed0" />
      <path d="M232 91a15 15 0 0 1 30 0v20h-30z" fill="#c78430" />
      <path d="M224 112h96v26h-96z" fill="#0d684b" />
      <path d="M252 119c0-8 6-13 13-13s13 5 13 13v19h-26z" fill="#267a52" />
      <circle cx="265" cy="110" r="6" fill="#f1bd78" />
      <path d="M65 61h292l-15-27H80z" fill="#f4a619" />
      <path d="M88 34h26v27H88zm52 0h26v27h-26zm52 0h26v27h-26zm52 0h26v27h-26zm52 0h26v27h-26z" fill="#fff4d2" />
      <path d="M54 61h314" stroke="#df8510" strokeWidth="5" />
      <path d="M42 78l9 13 9-13m8 0 9 13 9-13" fill="none" stroke="#f4a619" strokeWidth="3" />
      <circle cx="371" cy="31" r="12" fill="#ffc247" />
      <path d="M376 101h12v31h-12z" fill="#246db2" />
      <circle cx="382" cy="92" r="7" fill="#efb47d" />
      <path d="M373 102a9 9 0 0 1 18 0" fill="#e94342" />
      <path d="M45 109c11-11 29-11 40 0-11 11-29 11-40 0zm279-19c10-10 25-10 35 0-10 10-25 10-35 0z" fill="#b3e2c0" opacity=".55" />
      <path d="M340 139c8-14 9-24 7-35 12 8 13 22 4 35m-4 0v-17" fill="#20a569" />
      <rect x="131" y="11" width="74" height="18" rx="9" fill="#ffc247" />
      <text x="168" y="24" textAnchor="middle" fill="#49300a" fontSize="9" fontWeight="800">दुकान खुली है</text>
    </svg>
  );
}

function ProductIllustration({ kind = "box", size = 48, label }) {
  const palettes = {
    umbrella: ["#fae2d9", "#d83939"],
    milk: ["#e2edff", "#347cc2"],
    biscuit: ["#fff0d6", "#dc9b21"],
    bottle: ["#fbe5d8", "#a9482c"],
    rice: ["#f4ead2", "#c99a44"],
    festival: ["#fce8d2", "#ee8327"],
    cloud: ["#e2f2ec", "#158263"],
    box: ["#e7efe4", "#18855a"],
  };
  const [tile, color] = palettes[kind] || palettes.box;
  return (
    <svg className="product-illustration" width={size} height={size} viewBox="0 0 64 64" role={label ? "img" : "presentation"} aria-label={label} aria-hidden={label ? undefined : "true"}>
      <rect x="2" y="2" width="60" height="60" rx="17" fill={tile} />
      {kind === "umbrella" && <>
        <path d="M12 32a20 20 0 0 1 40 0H12z" fill={color} />
        <path d="M32 32v16c0 7-11 7-11 0" fill="none" stroke="#5c3827" strokeWidth="4" strokeLinecap="round" />
        <path d="M22 32q0-8 10-8t10 8" fill="#f28b82" />
      </>}
      {kind === "milk" && <>
        <path d="M24 12h16l-2 8 7 8v23H19V28l7-8z" fill="#fff" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M24 12h16v8H24z" fill={color} />
        <path d="M20 32h24v12H20z" fill="#81b9ef" />
        <path d="M27 37c2-5 8-5 10 0-2 4-8 4-10 0z" fill="#fff" />
      </>}
      {kind === "biscuit" && <>
        <rect x="15" y="17" width="34" height="31" rx="7" fill={color} />
        <rect x="19" y="21" width="26" height="23" rx="4" fill="#ffe7ad" />
        <circle cx="25" cy="28" r="2" fill="#c77b1a" /><circle cx="38" cy="28" r="2" fill="#c77b1a" />
        <circle cx="31" cy="37" r="2" fill="#c77b1a" /><circle cx="41" cy="38" r="2" fill="#c77b1a" />
      </>}
      {kind === "bottle" && <>
        <path d="M27 12h10v8l6 6v25H21V26l6-6z" fill={color} />
        <path d="M27 12h10v6H27z" fill="#713a2b" />
        <path d="M23 31h18v11H23z" fill="#f6d5a7" />
        <path d="M27 35h10" stroke={color} strokeWidth="2" />
      </>}
      {kind === "rice" && <>
        <path d="M20 15h24l4 8v27H16V23z" fill="#fff4d4" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 15h24v9H20z" fill={color} />
        <path d="M24 34q8-8 16 0-8 8-16 0z" fill="#fff" />
        <path d="M32 27v13" stroke={color} strokeWidth="2" />
      </>}
      {kind === "festival" && <>
        <path d="M14 38q18-7 36 0l-4 10H18z" fill="#df7b24" />
        <path d="M18 39q14 8 28 0" fill="none" stroke="#a84b24" strokeWidth="2" />
        <circle cx="24" cy="34" r="7" fill="#f5a623" />
        <circle cx="34" cy="31" r="8" fill="#ef7628" />
        <circle cx="43" cy="35" r="6" fill="#ffc247" />
        <path d="M31 22q0-8 8-9-1 8-8 9zm4 1q6-6 12-3-5 6-12 3z" fill="#168755" />
        <path d="M19 49h27" stroke="#a95225" strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {kind === "cloud" && <>
        <path d="M17 39a9 9 0 0 1 2-18 14 14 0 0 1 26 5 7 7 0 0 1 2 14H17z" fill="#fff" stroke={color} strokeWidth="2.5" />
        <path d="m24 46-3 6m14-6-3 6m14-6-3 6" stroke="#38a6d8" strokeWidth="3" strokeLinecap="round" />
      </>}
      {kind === "box" && <>
        <path d="m15 25 17-10 17 10v22L32 56 15 47z" fill={color} />
        <path d="m15 25 17 10 17-10M32 35v21" fill="none" stroke="#fff2cc" strokeWidth="2" />
        <path d="M25 20l17 10" stroke="#fff2cc" strokeWidth="2" />
      </>}
    </svg>
  );
}

function Field({ icon: Icon, label, error, right, ...props }) {
  return (
    <label className="block">
      <span className="text-[12px] font-bold" style={{ color: C.sub }}>{label}</span>
      <div className="field mt-1.5 flex items-center gap-2.5 rounded-2xl px-3.5" style={{ background: C.cardAlt, border: `2px solid ${error ? C.danger : C.accent}`, height: 54 }}>
        <Icon size={18} color={C.faint} />
        <input {...props} className="field-input flex-1 min-w-0 bg-transparent outline-none text-[15px] font-semibold" style={{ color: C.text }} />
        {right}
      </div>
      {error && <span className="block mt-1 text-[11px] font-semibold" style={{ color: C.danger }}>{error}</span>}
    </label>
  );
}

function AuthScreen({ lang, setLang, lightMode, setLightMode, accounts, onAuth, onRegister, onResetPassword }) {
  const a = AUTH[lang];
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ owner: "", shop: "", phone: "", type: "kirana", area: "", password: "", recoveryCode: "" });
  const [err, setErr] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingRecovery, setPendingRecovery] = useState(null);
  const set = (k) => (e) => { setF((p) => ({ ...p, [k]: e.target.value })); setErr((p) => ({ ...p, [k]: "" })); setNote(""); };
  const switchMode = (m) => { setMode(m); setErr({}); setNote(""); };

  const submit = async (e) => {
    e.preventDefault();
    const phone = f.phone.replace(/\D/g, "").slice(-10);
    const bad = {};
    if (!/^[6-9]\d{9}$/.test(phone)) bad.phone = a.errMobile;
    if (f.password.length < 6) bad.password = a.errPass;
    if (mode === "signup") {
      if (!f.owner.trim()) bad.owner = a.errOwner;
      if (!f.shop.trim()) bad.shop = a.errShop;
      if (!f.area.trim()) bad.area = a.errArea;
    }
    if (mode === "reset" && !f.recoveryCode.trim()) bad.recoveryCode = a.recoveryCode;
    if (Object.keys(bad).length) return setErr(bad);
    const found = accounts.find((x) => x.phone === phone);
    if (mode === "login" && !found) return setErr({ phone: a.errNone });
    if (mode === "signup" && found) return setErr({ phone: a.errExists });
    if (mode === "reset" && !found) return setErr({ phone: a.errNone });
    setSubmitting(true);
    try {
      if (mode === "login") {
        if (!await verifyPassword(f.password, found.passwordSalt, found.passwordHash)) {
          setErr({ password: a.errWrong });
          return;
        }
        const { passwordSalt, passwordHash, recoverySalt, recoveryHash, ...profile } = found;
        return onAuth(profile);
      }
      if (mode === "reset") {
        if (!found.recoverySalt || !found.recoveryHash) {
          setNote(a.recoveryUnavailable);
          return;
        }
        const recoveryCode = f.recoveryCode.replace(/[^0-9a-f]/gi, "").toUpperCase();
        if (!await verifyPassword(recoveryCode, found.recoverySalt, found.recoveryHash)) {
          setErr({ recoveryCode: a.recoveryInvalid });
          return;
        }
        const credentials = await createPasswordHash(f.password);
        if (!onResetPassword(phone, credentials)) {
          setNote(uiText("Could not save your password in this browser. Check browser storage settings and try again."));
          return;
        }
        setMode("login");
        setF((previous) => ({ ...previous, password: "", recoveryCode: "" }));
        setErr({});
        setNote(a.resetSuccess);
        return;
      }
      const recoveryCode = createRecoveryCode();
      const [credentials, recoveryCredentials] = await Promise.all([
        createPasswordHash(f.password),
        createPasswordHash(recoveryCode),
      ]);
      const acct = {
        owner: f.owner.trim(),
        shop: f.shop.trim(),
        phone,
        type: f.type,
        area: f.area.trim(),
        ...credentials,
        recoverySalt: recoveryCredentials.passwordSalt,
        recoveryHash: recoveryCredentials.passwordHash,
      };
      if (!onRegister(acct)) {
        setNote(uiText("Could not save your account in this browser. Check browser storage settings and try again."));
        return;
      }
      const { passwordSalt, passwordHash, recoverySalt, recoveryHash, ...profile } = acct;
      setPendingRecovery({ code: recoveryCode, profile });
    } catch (error) {
      console.error("Secure account authentication failed.", error);
      setNote(uiText("Secure sign-in is unavailable. Please use a supported browser and try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isReset = mode === "reset";
  return (
    <div className="auth-screen min-h-screen flex flex-col" style={{ background: C.screen, color: C.text }}>
      <div className="auth-header relative overflow-hidden" style={{ background: "linear-gradient(160deg,#064E36 0%,#0B8A57 100%)", paddingBottom: 24 }}>
        <Awning h={20} n={16} />
        <Store size={220} color="rgba(255,255,255,0.06)" className="absolute -right-10 top-10" />
        <div className="relative mx-auto w-full max-w-[460px] px-5 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5 rounded-full p-1" style={{ background: "rgba(255,255,255,0.16)" }}>
              {LANGS.map((l) => (
                <button key={l.id} type="button" aria-label={l.name} title={l.name} onClick={() => setLang(l.id)} className="pill-btn px-2.5 py-1 rounded-full text-[12px] font-bold" style={{ background: lang === l.id ? "#fff" : "transparent", color: lang === l.id ? "#064E36" : "#fff" }}>{l.label}</button>
              ))}
            </div>
            <button type="button" aria-label={uiText("Toggle theme")} onClick={() => setLightMode((v) => !v)} className="pill-btn flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "rgba(255,255,255,0.16)", color: "#fff" }}>
              {lightMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center justify-center rounded-2xl bg-white p-2" style={{ width: 68, height: 68, boxShadow: "0 10px 24px -8px rgba(0,0,0,.4)" }}>
              <img src={logo} alt="Dukaan Mitra" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <h1 className="text-[28px] font-extrabold leading-none text-white" style={{ fontFamily: fontHead }}>{T[lang].appTitle}</h1>
              <p className="mt-1.5 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: "#F7C95C" }}>{a.forShops}</p>
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-snug" style={{ color: "#D6F5E6" }}>{a.tagline}</p>
          <div className="mt-4 flex gap-2">
            {[Package, Handshake, TrendingUp].map((Ic, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold text-white" style={{ background: "rgba(255,255,255,0.14)" }}><Ic size={13} /> {a.chips[i]}</span>
            ))}
          </div>
        </div>
        <div className="auth-shop-art" aria-hidden="true"><StorefrontIllustration /></div>
      </div>

      <div className="auth-form-wrap relative mx-auto w-full max-w-[460px] px-4 pb-10">
        <div className="rounded-[28px] p-5" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 24px 48px -20px rgba(6,60,40,.45)" }}>
          {pendingRecovery ? <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${C.accent}1f` }}><ShieldCheck size={24} color={C.accent} /></div>
            <h2 className="mt-4 text-[20px] font-extrabold" style={{ fontFamily: fontHead, color: C.text }}>{a.recoveryCode}</h2>
            <p className="mt-2 text-[12px] leading-relaxed" style={{ color: C.sub }}>{a.recoveryInstructions}</p>
            <p className="mt-4 rounded-xl px-3 py-4 text-[17px] font-extrabold tracking-[0.12em]" style={{ background: C.cardAlt, color: C.text, fontFamily: fontMono }} aria-label={a.recoveryCode}>{pendingRecovery.code}</p>
            <button type="button" onClick={() => onAuth(pendingRecovery.profile)} className="cta mt-5 w-full rounded-2xl py-4 text-[15px] font-extrabold" style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>{a.recoverySaved}</button>
          </div> : <>
            {isReset ? <button type="button" onClick={() => switchMode("login")} className="pill-btn text-[13px] font-bold" style={{ color: C.accent }}>← {a.backToLogin}</button> :
              <div className="flex rounded-2xl p-1" style={{ background: C.cardAlt }}>
                {[["login", a.login], ["signup", a.signup]].map(([id, label]) => (
                  <button key={id} type="button" onClick={() => switchMode(id)} className="pill-btn flex-1 rounded-xl py-3 text-[14px] font-extrabold" style={{ background: mode === id ? C.card : "transparent", color: mode === id ? C.accent : C.faint, boxShadow: mode === id ? C.shadow : "none" }}>{label}</button>
                ))}
              </div>}
            <h2 className="mt-5 text-[22px] font-extrabold" style={{ fontFamily: fontHead, color: C.text }}>{isReset ? a.resetTitle : isLogin ? a.loginTitle : a.signupTitle}</h2>
            <p className="text-[13px] mt-1" style={{ color: C.sub }}>{isReset ? a.resetSub : isLogin ? a.loginSub : a.signupSub}</p>

            <form onSubmit={submit} noValidate className="mt-4 space-y-3.5">
            {isSignup && <>
              <Field icon={User} label={a.owner} value={f.owner} onChange={set("owner")} error={err.owner} autoComplete="name" />
              <Field icon={Store} label={a.shop} value={f.shop} onChange={set("shop")} error={err.shop} />
              <div>
                <span className="text-[12px] font-bold" style={{ color: C.sub }}>{a.type}</span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {Object.entries(a.types).map(([id, label]) => (
                    <button key={id} type="button" onClick={() => setF((p) => ({ ...p, type: id }))} className="pill-btn rounded-full px-3.5 py-2 text-[13px] font-bold" style={{ background: f.type === id ? C.accent : C.cardAlt, color: f.type === id ? C.onAccent : C.sub, border: `1.5px solid ${f.type === id ? C.accent : C.border}` }}>{label}</button>
                  ))}
                </div>
              </div>
            </>}
            <Field icon={Phone} label={a.mobile} value={f.phone} onChange={set("phone")} error={err.phone} inputMode="numeric" maxLength={14} placeholder="98765 43210" autoComplete="tel" />
            {isSignup && <Field icon={MapPin} label={a.area} value={f.area} onChange={set("area")} error={err.area} />}
            {isReset && <Field icon={ShieldCheck} label={a.recoveryCode} value={f.recoveryCode} onChange={set("recoveryCode")} error={err.recoveryCode} autoComplete="one-time-code" />}
            <Field icon={Lock} label={isReset ? a.resetPassword : a.password} type={showPw ? "text" : "password"} value={f.password} onChange={set("password")} error={err.password} autoComplete={isLogin ? "current-password" : "new-password"}
              right={<button type="button" aria-label={uiText(showPw ? "Hide password" : "Show password")} onClick={() => setShowPw((v) => !v)} className="pill-btn p-1" style={{ color: C.faint }}>{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>} />
            {isLogin && (
              <div className="flex justify-end">
                <button type="button" onClick={() => switchMode("reset")} className="pill-btn text-[13px] font-bold" style={{ color: C.accent }}>{a.forgot}</button>
              </div>
            )}
            {note && <p className="text-[12px] font-semibold rounded-xl px-3 py-2" style={{ background: `${C.warn}1f`, color: C.warn }}>{note}</p>}
            <button type="submit" disabled={submitting} className="cta w-full rounded-2xl py-4 text-[16px] font-extrabold flex items-center justify-center gap-2 disabled:opacity-70" style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`, color: C.onAccent }}>
              {submitting ? uiText("Please wait…") : isReset ? a.resetBtn : isLogin ? a.loginBtn : a.signupBtn} <ArrowRight size={18} />
            </button>
          </form>

            {!isReset && <>
              <div className="mt-4 flex items-center gap-3"><span className="flex-1 h-px" style={{ background: C.border }} /><span className="text-[12px]" style={{ color: C.faint }}>{isLogin ? a.noAcct : a.haveAcct}</span><span className="flex-1 h-px" style={{ background: C.border }} /></div>
              <div className="mt-3 grid grid-cols-1 gap-2.5">
                <button type="button" onClick={() => switchMode(isLogin ? "signup" : "login")} className="pill-btn rounded-2xl py-3 text-[13px] font-extrabold" style={{ background: C.cardAlt, color: C.text, border: `1.5px solid ${C.borderStrong}` }}>{isLogin ? a.signup : a.login}</button>
              </div>
            </>}
          </>}
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px]" style={{ color: C.faint }}><ShieldCheck size={14} /> {a.forShops}</p>
      </div>
    </div>
  );
}

export default function DukaanMitraPrototype() {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState(loadSavedLanguage);
  const [stock, setStock] = useState([]);
  const [dismissedAlertIds, setDismissedAlertIds] = useState([]);
  const [showReason, setShowReason] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  const [accounts, setAccounts] = useState(loadSavedAccounts);
  const [user, setUser] = useState(null);
  const [showBrief, setShowBrief] = useState(false);
  const [actionMode, setActionMode] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);
  const [splash, setSplash] = useState(true);
  useEffect(() => { const id = setTimeout(() => setSplash(false), 2200); return () => clearTimeout(id); }, []);
  useEffect(() => () => clearTimeout(toastTimerRef.current), []);
  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error("Unable to save the language preference.", error);
    }
  }, [lang]);
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(`${STOCK_STORAGE_KEY}.${user.phone}`, JSON.stringify(stock));
    } catch (error) {
      console.error("Unable to save shop stock.", error);
    }
  }, [stock, user]);
  activeLanguage = lang;
  Object.assign(C, lightMode ? LIGHT_C : DARK_C);
  if (user) Object.assign(USER, user);
  USER.logout = () => {
    setUser(null); setTab("home"); setDismissedAlertIds([]);
  };
  const handleAuth = (acct) => {
    setStock(loadSavedStock(acct.phone));
    Object.assign(USER, acct); setUser(acct); setTab("home"); setDismissedAlertIds([]);
    window.scrollTo?.(0, 0);
  };
  const handleRegister = (acct) => {
    const nextAccounts = [...accounts, acct];
    try {
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(nextAccounts));
    } catch (error) {
      console.error("Unable to save the shop account.", error);
      return false;
    }
    setAccounts(nextAccounts);
    return true;
  };
  const handleResetPassword = (phone, credentials) => {
    const nextAccounts = accounts.map((account) => account.phone === phone ? { ...account, ...credentials } : account);
    try {
      localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(nextAccounts));
    } catch (error) {
      console.error("Unable to save the reset shop password.", error);
      return false;
    }
    setAccounts(nextAccounts);
    return true;
  };
  const t = T[lang];
  const notify = (message) => {
    clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(""), 2200);
  };
  const isDemoAccount = user?.phone === DEMO_PHONE;
  const activeAlertCount = isDemoAccount ? Math.max(0, 3 - dismissedAlertIds.length) : 0;

  const TABS = [
    { id: "home", label: t.tabHome, icon: Home },
    { id: "stock", label: t.tabStock, icon: ClipboardList },
    { id: "alerts", label: t.tabAlerts, icon: Bell },
    { id: "trends", label: t.tabTrends, icon: BarChart3 },
    { id: "network", label: t.tabNetwork, icon: MapPinned },
  ];

  const changeQty = (id, delta) => {
    setStock((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it)));
  };

  const handleScanFound = (product) => {
    setStock((prev) => {
      const existing = prev.find((p) => p.name === product.name);
      if (existing) return prev.map((p) => (p.name === product.name ? { ...p, qty: p.qty + 10 } : p));
      return [...prev, { id: prev.length + 1, name: product.name, qty: 10, min: 10, max: 40, unit: product.unit, trend: 0, loc: "New" }];
    });
    setShowScan(false);
    setTab("stock");
  };

  return (
    <div className={`app-shell ${lightMode ? "light-mode" : "dark-mode"} w-full min-h-screen flex flex-col`} style={{ "--input-accent": C.accent, background: C.bgApp, fontFamily: fontBody, color: C.text, colorScheme: lightMode ? "light" : "dark" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" />
      <style>{`
        @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes logoReveal {
          0% { opacity: 0; transform: translateY(-18px) scale(.96); }
          60% { opacity: 1; transform: translateY(4px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes logoGlow {
          0%, 100% { opacity: .42; transform: translateY(-50%) scale(.92); }
          50% { opacity: .95; transform: translateY(-50%) scale(1.08); }
        }
        @keyframes logoLightSweep {
          0% { left: -35%; opacity: 0; }
          12% { opacity: .8; }
          42% { left: 110%; opacity: .55; }
          55%, 100% { left: 110%; opacity: 0; }
        }
        @keyframes headerReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes subtitleReveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes navReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .app-shell *, .app-shell *::before, .app-shell *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
        @keyframes scanmove { 0% { top: 8%; } 50% { top: 88%; } 100% { top: 8%; } }
        @keyframes scannerDotBlink { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }

        .app-shell * { box-sizing: border-box; }

        .app-screen > .flex-1, .app-screen > .mx-5 { max-width: 1280px; width: calc(100% - 40px); margin-left: auto; margin-right: auto; }
        .app-screen > .mx-5.mt-1, .app-screen > .mx-5.mt-3, .app-screen > .mx-5.mt-4, .app-screen > .mx-5.mt-5 { width: calc(100% - 40px); }
        @media (min-width: 900px) {
          .app-screen { max-width: 1440px; margin: 0 auto; }
          .app-screen > .mx-5 { width: calc(100% - 64px); }
          .app-screen > .flex-1 { width: 100%; }
          .top-nav-button { min-width: 110px; }
          .brand-logo-image { width: min(100%, 430px); max-height: 120px; }
          .app-subtitle { font-size: 15px !important; }
        }
        @media (max-width: 640px) {
          .app-screen > .mx-5 { width: calc(100% - 32px); }
        }

        
        .brand-lockup { position: relative; padding-bottom: 12px; text-align: center; max-width: 1280px; margin: 0 auto; }
        .logo-stage {
          position: relative;
          width: min(100%, 1100px);
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          animation: logoReveal .8s cubic-bezier(.2,.8,.2,1) both;
        }
        .brand-logo-image {
          position: relative;
          z-index: 2;
          display: block;
          width: min(100%, 430px);
          height: auto;
          max-height: 120px;
          object-fit: contain;
          object-position: center center;
          filter: drop-shadow(0 12px 28px rgba(0,0,0,.34));
          transform-origin: center center;
          animation: logoFloat 5s ease-in-out .9s infinite;
          transition: transform .35s ease, filter .35s ease;
        }
        .brand-logo-image:hover {
          transform: translateY(-4px) scale(1.025);
          filter: drop-shadow(0 18px 34px rgba(0,0,0,.42));
        }
        @media (max-width: 900px) {
          .brand-logo-image { width: min(100%, 360px); max-height: 105px; }
        }
        @media (max-width: 640px) {
          .brand-logo-image { width: min(100%, 300px); max-height: 90px; }
        }
        .logo-glow {
          position: absolute;
          left: 20%;
          top: 50%;
          width: 60%;
          height: 70%;
          transform: translateY(-50%);
          background: radial-gradient(circle, ${C.accent}2e 0%, ${C.accent2}14 34%, transparent 70%);
          filter: blur(22px);
          z-index: 0;
          animation: logoGlow 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        .logo-stage::after {
          content: "";
          position: absolute;
          z-index: 3;
          top: 0;
          left: -35%;
          width: 24%;
          height: 100%;
          transform: skewX(-18deg);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.30), rgba(52,232,176,.22), transparent);
          filter: blur(7px);
          pointer-events: none;
          animation: logoLightSweep 4.2s ease-in-out 1.2s infinite;
        }
        .app-subtitle {
          color: ${C.sub};
          animation: subtitleReveal .7s cubic-bezier(.2,.8,.2,1) .18s both;
        }
        .app-header { animation: headerReveal .65s cubic-bezier(.2,.8,.2,1) both; max-width: 1280px; width: 100%; margin: 0 auto; }
        .app-header + * { animation: navReveal .7s cubic-bezier(.2,.8,.2,1) .12s both; }
        .app-shell button { transition: transform .22s ease, opacity .22s ease, background .22s ease, box-shadow .22s ease; }
        .app-shell .top-nav-button { position: relative; overflow: visible; }
        .app-shell .top-nav-button::after {
          content: ""; position: absolute; left: 18%; right: 18%; bottom: 3px; height: 2px;
          border-radius: 999px; background: ${C.accent}; transform: scaleX(0); transform-origin: center;
          transition: transform .3s ease; opacity: .9;
        }
        .app-shell .top-nav-button:hover::after { transform: scaleX(1); }
        .app-shell .top-nav-button:hover { box-shadow: 0 8px 24px rgba(52,232,176,.10); }
        .app-shell button:hover { transform: translateY(-1px); }
        .app-shell button:active { transform: scale(.97); }
        .app-shell .rounded-2xl { transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; }
        .app-shell .rounded-2xl:hover { box-shadow: 0 12px 34px rgba(0,0,0,.14); }
        .brand-kicker {
          font-family: ${fontMono};
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: ${C.accent};
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 6px;
          background: ${C.accent}1f;
          border: 1px solid ${C.accent}44;
          color: ${C.accent};
        }
        .app-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${C.text};
        }
        .app-logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          flex-shrink: 0;
          background: linear-gradient(145deg, ${C.accent}, ${C.accent2});
          color: ${C.onAccent};
        }
        .app-logo-text {
          background: linear-gradient(90deg, ${C.text}, ${C.sub});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .lockup-scan {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 110px;
          transform: translateX(-50%);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, ${C.accent}, transparent);
          opacity: 0.7;
        }

        .theme-toggle { transition: background 0.2s ease, transform 0.15s ease; }
        .theme-toggle:active { transform: scale(0.92); }

        .notification-card {
          background: linear-gradient(135deg, ${C.accent2}14, ${C.card});
          border: 1px solid ${C.accent2}35;
          border-radius: 16px;
          padding: 14px;
        }

        .forecast-chart { margin-bottom: 4px; }
        .forecast-meaning { color: ${C.faint}; }
        .stage-meaning { display: inline-flex; align-items: center; gap: 5px; color: ${C.faint}; font-weight: 600; }
        .stage-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; }
        .historical-dot { background: ${C.faint}; }
        .current-dot { background: ${C.accent2}; }
        .prediction-dot { background: transparent; border: 1.5px dashed ${C.gold}; }
        .rising-meaning { color: ${C.accent}; font-weight: 600; }
        .falling-meaning { color: ${C.danger}; font-weight: 600; }
        .stable-meaning { color: ${C.gold}; font-weight: 600; }

        .simple-demand-list { display: flex; flex-direction: column; gap: 12px; margin-top: 6px; }
        .simple-demand-row { display: flex; flex-direction: column; gap: 5px; animation: demandRowEnter .42s calc(var(--stagger-index, 0) * 55ms) ease-out both; }
        .simple-demand-name { font-size: 11.5px; font-weight: 600; }
        .simple-demand-status { font-size: 10px; font-weight: 700; }
        .simple-demand-track {
          height: 6px;
          border-radius: 999px;
          overflow: hidden;
          background: ${C.cardAlt};
        }
        .simple-demand-fill { height: 100%; border-radius: 999px; transform-origin: left center; animation: demandFill .75s calc(.12s + var(--stagger-index, 0) * 55ms) cubic-bezier(.2,.8,.2,1) both; transition: width .3s ease; }
        @keyframes demandRowEnter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demandFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .term-row-label { color: ${C.text}; }

        .scanner-viewport {
          background:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 28px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 28px),
            radial-gradient(circle at 50% 45%, #10151d 0%, #000 78%);
        }
        .scanner-crosshair { position: absolute; background: rgba(255,255,255,0.16); }
        .scanner-crosshair-x { top: 50%; left: 10%; right: 10%; height: 1px; transform: translateY(-50%); }
        .scanner-crosshair-y { left: 50%; top: 10%; bottom: 10%; width: 1px; transform: translateX(-50%); }

        .scanner-readout { top: 9%; }
        .scanner-metrics { top: 15%; }
        .scanner-status { top: 62%; left: 0; right: 0; margin: 0 auto; text-align: center; }
        .scanner-hint { top: calc(62% + 46px); left: 0; right: 0; text-align: center; }
        .scanner-manual { bottom: 64px; left: 50%; transform: translateX(-50%); }
        .scanner-dots { display: inline-flex; gap: 4px; }
        .scanner-dots i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${C.accent};
          display: inline-block;
          animation: scannerDotBlink 1.2s infinite ease-in-out;
        }
        .scanner-dots i:nth-child(2) { animation-delay: 0.15s; }
        .scanner-dots i:nth-child(3) { animation-delay: 0.3s; }


        .plain-language-card { font-size: 1rem; }
        .top-nav-button span { line-height: 1.15; text-align: center; }
        button { -webkit-tap-highlight-color: transparent; }
        @media (max-width: 700px) {
          .app-screen { font-size: 16px; }
          .app-subtitle { font-size: 15px !important; line-height: 1.45; }
          .top-nav-button { min-width: 62px; }
        }

        /* ===== Refined shopkeeper dashboard ===== */
        @keyframes splashPop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.06); opacity: 1 } 100% { transform: scale(1) } }
        @keyframes splashRise { from { transform: translateY(14px); opacity: 0 } to { transform: none; opacity: 1 } }
        @keyframes awningDrop { from { transform: translateY(-100%) } to { transform: none } }
        .splash-logo { animation: splashPop .7s cubic-bezier(.2,.9,.3,1.2) both; }
        .splash-text { animation: splashRise .6s .35s ease both; }
        .splash-awning { animation: awningDrop .6s ease both; }
        .app-shell {
          background:
            radial-gradient(ellipse at 8% 0%, ${C.accent2}1c, transparent 34%),
            radial-gradient(ellipse at 94% 18%, ${C.accent}10, transparent 32%),
            ${C.bgApp} !important;
          transition: background .4s ease, color .35s ease;
        }
        .app-screen { overflow: visible !important; background: ${C.screen} !important; transition: background-color .35s ease, color .35s ease; }
        .app-screen > .absolute.inset-0 { position: fixed !important; }
        .app-shell button {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease, background-color .25s ease, border-color .25s ease, color .25s ease, filter .25s ease;
        }
        .app-shell button:hover { filter: brightness(1.04); }
        .app-shell button:active { transform: translateY(1px) scale(.985); }
        .app-shell button:focus-visible { outline: 3px solid ${C.accent}88; outline-offset: 3px; }
        .app-shell button[style*="linear-gradient"]:not(.top-nav-button):not(.pill-btn):not(.quick-action) {
          border-radius: 14px;
          box-shadow: 0 8px 22px -12px ${C.accent}aa;
          font-weight: 750;
        }
        .app-shell .cta { min-height: 54px; border-radius: 15px !important; }
        .app-shell .field { transition: border-color .2s ease, box-shadow .2s ease, background-color .25s ease; }
        .app-shell .field:focus-within { border-color: ${C.accent} !important; box-shadow: 0 0 0 4px ${C.accent}20; }
        .app-shell input::placeholder { color: ${C.faint}; font-weight: 500; }
        .app-shell [class*="text-[9"] { font-size: 11px !important; }
        .app-shell [class*="text-[10"] { font-size: 11.5px !important; }
        .app-shell [class*="text-[11"] { font-size: 12.5px !important; }
        .app-shell [class*="text-[12"] { font-size: 13.5px !important; }
        .app-shell [class*="text-[13"] { font-size: 14.5px !important; }
        .app-shell ::selection { background: ${C.accent}55; }
        .app-header > div:first-child > [aria-hidden="true"],
        .auth-header > .flex[aria-hidden="true"] { height: 5px !important; opacity: .75; }
        .auth-screen { background: radial-gradient(ellipse at 90% 6%, ${C.accent}12, transparent 36%), ${C.screen} !important; }
        .auth-header {
          background:
            radial-gradient(circle at 88% 18%, rgba(255,255,255,.16), transparent 24%),
            radial-gradient(circle at 14% 100%, ${C.accent2}38, transparent 34%),
            ${C.hero} !important;
        }
        .auth-screen > div:nth-child(2) > div {
          border-color: ${C.borderStrong} !important;
          box-shadow: 0 28px 70px -38px rgba(5,53,36,.48) !important;
          backdrop-filter: blur(12px);
        }
        .auth-screen .pill-btn { transition: transform .18s ease, background-color .22s ease, color .22s ease, box-shadow .22s ease; }
        .auth-screen .pill-btn:hover { transform: translateY(-1px); }
        .auth-screen .field { border-radius: 15px !important; }
        .auth-screen .field > svg { transition: color .2s ease, transform .2s ease; }
        .auth-screen .field:focus-within > svg { color: ${C.accent} !important; transform: scale(1.08); }
        .auth-screen .field-input { transition: transform .2s ease; }
        .auth-screen .field:focus-within .field-input { transform: translateX(1px); }
        .auth-screen .cta { position: relative; overflow: hidden; letter-spacing: .01em; }
        .auth-screen .cta::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,.24) 50%, transparent 75%); transform: translateX(-130%); transition: transform .6s ease; }
        .auth-screen .cta:hover::after { transform: translateX(130%); }
        .auth-form-wrap > div:first-child { animation: formCardEnter .58s .12s cubic-bezier(.2,.8,.2,1) both; }
        .auth-shop-art { animation: storefrontEnter .72s .08s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes formCardEnter { from { opacity: 0; transform: translateY(16px) scale(.99); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes storefrontEnter { from { opacity: 0; transform: translateY(12px); } to { opacity: .98; transform: translateY(0); } }
        .alert-card { animation: cardEnter .42s calc(var(--stagger-index, 0) * 90ms) cubic-bezier(.2,.8,.2,1) both; }
        .alert-tag { border-radius: 999px; padding: 4px 7px; font-size: 9px; font-weight: 800; }
        .today-watch-card { border: 1px solid ${C.accent}24 !important; }
        .stock-item-card { animation: cardEnter .38s calc(var(--stagger-index, 0) * 45ms) cubic-bezier(.2,.8,.2,1) both; }
        .stock-item-card:hover { transform: translateY(-2px); border-color: ${C.accent}55 !important; box-shadow: 0 14px 30px -22px ${C.accent}88 !important; }
        .stock-level-track { height: 5px; width: min(100%, 150px); overflow: hidden; border-radius: 999px; background: ${C.cardAlt}; }
        .stock-level-track > span { display: block; height: 100%; border-radius: inherit; transform-origin: left center; animation: demandFill .65s cubic-bezier(.2,.8,.2,1) both; transition: width .25s ease; }
        .stock-qty-button { transition: transform .18s ease, background-color .18s ease, box-shadow .18s ease; }
        .stock-qty-button:hover { transform: scale(1.08); box-shadow: 0 0 0 3px ${C.accent}16; }
        .shop-report-card { background: linear-gradient(145deg, ${C.card}, ${C.cardAlt}aa) !important; }
        .report-stat { display: flex; min-width: 0; flex-direction: column; align-items: center; gap: 3px; border-radius: 14px; padding: 9px 4px; background: ${C.cardAlt}; text-align: center; }
        .report-stat strong { font: 800 15px ${fontHead}; }
        .report-stat span { color: ${C.faint}; font-size: 9px; line-height: 1.2; }
        .trend-segment { display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-height: 36px; }
        .shop-radar-sweep { position: absolute; inset: 0; background: conic-gradient(from 0deg, transparent 0deg 285deg, ${C.accent}42 360deg); animation: radarSweep 4s linear infinite; pointer-events: none; }
        .radar-pin::after { content: ""; position: absolute; inset: -2px; border: 2px solid ${C.accent}; border-radius: 50%; animation: radarPinPulse 2s infinite; pointer-events: none; }
        @keyframes radarSweep { to { transform: rotate(360deg); } }
        @keyframes radarPinPulse { to { transform: scale(1.9); opacity: 0; } }
        .nearby-shop-card { padding: 12px !important; border-radius: 18px !important; background: ${C.card} !important; box-shadow: ${C.shadow}; animation: cardEnter .38s calc(var(--stagger-index, 0) * 70ms) cubic-bezier(.2,.8,.2,1) both; }
        .shop-initials-avatar { display: grid; width: 42px; height: 42px; flex: 0 0 auto; place-items: center; border-radius: 13px; background: linear-gradient(145deg, ${C.gold}, ${C.warn}); color: #3a2a10; font: 800 12px ${fontHead}; box-shadow: 0 5px 12px -7px ${C.warn}; transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease; }
        .alert-card .product-illustration { transition: transform .28s cubic-bezier(.2,.8,.2,1), box-shadow .28s ease; }
        .alert-card:hover .product-illustration { transform: translateY(-2px) rotate(-3deg) scale(1.04); box-shadow: 0 9px 18px ${C.accent}22; }
        .nearby-shop-card:hover .shop-initials-avatar { transform: translateY(-2px) rotate(-3deg) scale(1.04); box-shadow: 0 9px 18px ${C.warn}44; }
        .stock-search-box { border-width: 2px !important; transition: border-color .22s ease, box-shadow .22s ease; }
        .stock-search-box:focus-within { border-color: ${C.accent} !important; animation: textbox-border-pulse 1.7s ease-in-out infinite; }
        .stock-search-input { border: 0 !important; box-shadow: none !important; animation: none !important; }
        .alert-count-badge {
          position: absolute;
          z-index: 2;
          top: 2px;
          left: calc(50% + 5px);
          display: grid;
          min-width: 19px;
          height: 19px;
          place-items: center;
          padding: 0 4px;
          border: 2px solid;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 2px 5px rgba(0,0,0,.18);
        }
        .top-nav-button .top-nav-icon { transition: transform .22s cubic-bezier(.2,.8,.2,1), stroke-width .22s ease; }
        .top-nav-button:hover .top-nav-icon, .top-nav-button.is-active .top-nav-icon { transform: translateY(-1px); }
        .top-nav-button.is-active { min-width: 88px; box-shadow: 0 9px 22px -13px ${C.accent}bb !important; }
        .active-tab-illustration { filter: drop-shadow(0 2px 3px rgba(0,0,0,.14)); }
        .nearby-shop-card { transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease; }
        .nearby-shop-card:hover { transform: translateX(2px); border-color: ${C.accent}55 !important; box-shadow: 0 10px 24px -18px ${C.accent}88; }
        @keyframes cardEnter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .app-header > div:first-child {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 92% 8%, rgba(255,255,255,.14), transparent 35%),
            ${C.hero} !important;
          box-shadow: 0 16px 40px -28px ${C.accent}bb !important;
        }
        .shop-banner::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,.07) 50%, transparent 65%);
          transform: translateX(-100%);
          animation: bannerSweep 8s ease-in-out 1.5s infinite;
        }
        @keyframes bannerSweep { 0%, 60% { transform: translateX(-100%); } 82%, 100% { transform: translateX(100%); } }
        .app-header > div:last-child { padding-top: 24px !important; padding-bottom: 18px !important; }
        .app-header h1 { letter-spacing: -.035em !important; }
        .sales-sparkline { animation: chartReveal .8s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes chartReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: .7; transform: translateY(0); } }
        .sales-hero { min-height: 270px; isolation: isolate; padding-bottom: 0 !important; }
        .hero-grid {
          z-index: 0;
          opacity: .22;
          background-image: linear-gradient(rgba(255,255,255,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.11) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: linear-gradient(105deg, black 0%, transparent 88%);
        }
        .hero-orb { position: absolute; border-radius: 999px; filter: blur(2px); pointer-events: none; }
        .hero-orb-one { width: 220px; height: 220px; right: 5%; top: -72%; background: radial-gradient(circle, ${C.accent}35, transparent 70%); animation: orbDrift 8s ease-in-out infinite alternate; }
        .hero-orb-two { width: 170px; height: 170px; right: 42%; bottom: -100%; background: radial-gradient(circle, ${C.accent2}35, transparent 70%); animation: orbDrift 10s ease-in-out infinite alternate-reverse; }
        @keyframes orbDrift { from { transform: translate3d(-8px, 0, 0) scale(.92); } to { transform: translate3d(12px, 16px, 0) scale(1.08); } }
        .hero-live, .shop-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 999px;
          padding: 6px 9px;
          background: rgba(255,255,255,.1);
          color: rgba(255,255,255,.9);
          font: 700 9px ${fontMono};
          letter-spacing: .08em;
          backdrop-filter: blur(10px);
        }
        .hero-live i, .shop-live-pill i { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${C.accent}; box-shadow: 0 0 0 3px ${C.accent}2e, 0 0 12px ${C.accent}; animation: livePing 1.8s ease-out infinite; }
        @keyframes livePing { 0%, 100% { box-shadow: 0 0 0 2px ${C.accent}22, 0 0 10px ${C.accent}88; } 50% { box-shadow: 0 0 0 5px ${C.accent}10, 0 0 16px ${C.accent}; } }
        .shop-live-pill { padding: 6px 8px; font-size: 8px; letter-spacing: .03em; margin-right: 2px; }
        .shop-avatar { outline: 2px solid rgba(255,255,255,.24); outline-offset: 2px; box-shadow: 0 8px 24px -10px ${C.gold}aa; }
        .hero-metric { display: inline-flex; align-items: center; border: 1px solid rgba(255,255,255,.17); border-radius: 999px; padding: 7px 10px; background: rgba(255,255,255,.11); color: rgba(255,255,255,.93); font-size: 11px; font-weight: 700; backdrop-filter: blur(10px); }
        .hero-metric-warm { border-color: rgba(255,198,109,.65); background: #f2a516; color: #392700; backdrop-filter: none; }
        .hero-market-art { position: absolute; z-index: 1; bottom: 0; left: 0; width: 100%; height: 130px; overflow: visible; pointer-events: none; }
        .hero-cloud { transform-box: fill-box; animation: heroCloudDrift 8s ease-in-out infinite alternate; }
        .hero-cloud-right { animation-delay: -3s; animation-direction: alternate-reverse; }
        .hero-rain { animation: heroRainFall 1.2s linear infinite; }
        .hero-awning { transform-box: fill-box; transform-origin: center; animation: heroAwningGlow 3s ease-in-out infinite alternate; }
        .hero-awning-stripes { animation: heroAwningGlow 3s ease-in-out -1.5s infinite alternate; }
        .hero-shopkeeper { transform-box: fill-box; transform-origin: center bottom; animation: heroPersonBob 2.2s ease-in-out infinite; }
        .hero-walker { transform-box: fill-box; animation: heroWalk 5s ease-in-out infinite alternate; }
        .hero-coin { transform-box: fill-box; transform-origin: center; animation: heroCoinFloat 2.7s ease-in-out infinite; }
        .hero-coin-two { animation-delay: -.8s; }
        .hero-coin-three { animation-delay: -1.5s; }
        @keyframes heroCloudDrift { from { transform: translateX(-5px); } to { transform: translateX(8px); } }
        @keyframes heroRainFall { from { transform: translateY(-4px); opacity: .15; } to { transform: translateY(8px); opacity: .65; } }
        @keyframes heroAwningGlow { from { opacity: .76; } to { opacity: 1; } }
        @keyframes heroPersonBob { 50% { transform: translateY(-3px); } }
        @keyframes heroWalk { from { transform: translateX(-3px); } to { transform: translateX(8px); } }
        @keyframes heroCoinFloat { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-5px) rotate(7deg); } }
        .spark-line { stroke-dasharray: 220; stroke-dashoffset: 220; animation: drawSpark 1.5s .15s ease-out forwards; }
        .spark-area { opacity: 0; animation: fadeSpark .7s .8s ease-out forwards; }
        .spark-point { transform-origin: 142px 5px; animation: pointPulse 2.2s 1.4s ease-in-out infinite; }
        @keyframes drawSpark { to { stroke-dashoffset: 0; } }
        @keyframes fadeSpark { to { opacity: 1; } }
        @keyframes pointPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .7; transform: scale(1.5); } }
        .weekly-sales-card {
          background: linear-gradient(145deg, ${C.card}, ${C.cardAlt}bd) !important;
          border-color: ${C.borderStrong} !important;
          box-shadow: ${C.shadow}, inset 0 1px 0 rgba(255,255,255,.035) !important;
        }
        .chart-period { border: 1px solid ${C.accent2}35; border-radius: 999px; padding: 6px 8px; background: ${C.accent2}12; color: ${C.accent2}; font: 700 9px ${fontMono}; letter-spacing: .045em; }
        .chart-legend { display: inline-flex; align-items: center; gap: 6px; color: ${C.faint}; font-size: 10px; font-weight: 600; }
        .chart-legend i { width: 7px; height: 7px; border-radius: 50%; background: ${C.accent}; box-shadow: 0 0 10px ${C.accent}99; }
        .weekly-chart { height: 136px; overflow: visible; }
        .weekly-chart-area { opacity: 0; animation: fadeSpark .8s .4s ease-out forwards; }
        .weekly-chart-line { stroke-dasharray: 520; stroke-dashoffset: 520; animation: drawWeekly 1.25s .1s cubic-bezier(.2,.8,.2,1) forwards; filter: drop-shadow(0 0 5px ${C.accent}66); }
        .weekly-chart-point { opacity: 0; transform-box: fill-box; transform-origin: center; animation: popWeekly .3s calc(.25s + var(--point-index) * .08s) ease-out forwards; }
        @keyframes drawWeekly { to { stroke-dashoffset: 0; } }
        @keyframes popWeekly { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: scale(1); } }
        .awning-segment { animation: segmentGlow 3.6s calc(var(--segment-index) * .06s) ease-in-out infinite alternate; }
        @keyframes segmentGlow { from { opacity: .58; } to { opacity: 1; } }
        .app-screen > .flex-1 { animation: screenRise .42s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes screenRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .app-shell .rounded-2xl, .app-shell .rounded-\\[20px\\], .app-shell .rounded-\\[28px\\] {
          transition: border-color .25s ease, box-shadow .25s ease, transform .25s cubic-bezier(.2,.8,.2,1), background-color .25s ease;
        }
        .app-shell .rounded-2xl:hover, .app-shell .rounded-\\[20px\\]:hover {
          border-color: ${C.accent}40 !important;
          box-shadow: 0 18px 40px -28px ${C.accent}70;
        }
        .quick-action {
          position: relative;
          overflow: hidden;
          min-height: 128px;
          border-radius: 20px !important;
          border: 1px solid ${C.border} !important;
          background: radial-gradient(ellipse at 50% -15%, color-mix(in srgb, var(--action-tone) 18%, transparent), transparent 62%), linear-gradient(155deg, ${C.card}, ${C.cardAlt}) !important;
          box-shadow: ${C.shadow} !important;
        }
        .quick-action::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 25%, ${C.accent}12 50%, transparent 75%);
          transform: translateX(-130%);
          transition: transform .6s ease;
          pointer-events: none;
        }
        .quick-action:hover { transform: translateY(-3px); border-color: ${C.accent}55 !important; box-shadow: 0 18px 34px -22px ${C.accent}88 !important; }
        .quick-action:hover::after { transform: translateX(130%); }
        .quick-action span:first-child {
          width: 48px !important;
          height: 48px !important;
          border-radius: 16px !important;
          box-shadow: 0 8px 20px -12px ${C.accent}aa !important;
          transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s ease;
        }
        .quick-action:hover .action-icon { transform: translateY(-3px) rotate(-4deg) scale(1.06); box-shadow: 0 14px 28px -12px var(--action-tone) !important; }
        .notification-card { background: linear-gradient(135deg, ${C.accent}12, ${C.card}) !important; border-color: ${C.accent}28 !important; }
        .bottom-nav {
          background: linear-gradient(180deg, transparent, ${C.screen}e8 22%, ${C.screen} 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .bottom-nav > div > div {
          border-color: ${C.borderStrong} !important;
          background: ${C.card}eF !important;
          box-shadow: 0 18px 46px -24px rgba(0,0,0,.36) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .bottom-nav .top-nav-button { min-height: 58px; border-radius: 17px !important; }
        .bottom-nav .top-nav-button[style*="linear-gradient"] {
          transform: none !important;
          box-shadow: 0 8px 20px -12px ${C.accent}bb !important;
        }
        .bottom-nav .top-nav-button::after { display: none; }
        .theme-toggle:hover { transform: rotate(12deg); box-shadow: 0 0 0 4px ${C.accent}18; }
        .app-shell .brand-mark { box-shadow: 0 0 18px ${C.accent}20; }
        @media (max-width: 640px) {
          .app-screen > .flex-1, .app-screen > .mx-5 { width: calc(100% - 32px); }
          .quick-action { min-height: 116px; }
          .sales-hero { min-height: 260px; }
          .sales-sparkline { width: 112px; }
          .hero-live { padding: 5px 7px; font-size: 8px; }
          .bottom-nav > div { padding-bottom: max(10px, env(safe-area-inset-bottom)); }
          .bottom-nav .top-nav-button { min-height: 54px; padding-top: 8px; padding-bottom: 8px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .app-shell *, .app-shell *::before, .app-shell *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
      {splash ? <div className="splash flex min-h-screen flex-col items-center justify-center text-center px-6" style={{ background: C.hero, color: "#fff" }}>
        <div className="splash-awning absolute top-0 left-0 right-0"><Awning h={28} n={14} /></div>
        <div className="splash-logo flex items-center justify-center rounded-[28px] bg-white p-3" style={{ width: 112, height: 112, boxShadow: "0 24px 48px -12px rgba(0,0,0,.5)" }}>
          <img src={logo} alt="Dukaan Mitra" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        </div>
        <h1 className="splash-text mt-6 text-[34px] font-extrabold" style={{ fontFamily: fontHead }}>{T[lang].appTitle}</h1>
        <p className="splash-text mt-2 text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: "#F7C95C" }}>{AUTH[lang].forShops}</p>
        <div className="scanner-dots mt-8"><i style={{ background: "#F7C95C" }} /><i style={{ background: "#F7C95C" }} /><i style={{ background: "#F7C95C" }} /></div>
      </div> : !user ? <AuthScreen lang={lang} setLang={setLang} lightMode={lightMode} setLightMode={setLightMode} accounts={accounts} onAuth={handleAuth} onRegister={handleRegister} onResetPassword={handleResetPassword} /> : <PhoneFrame>
        <StatusBar lang={lang} setLang={setLang} lightMode={lightMode} setLightMode={setLightMode} />
        {tab === "home" && <HomeScreen t={t} stock={stock} showPromotionalImages={isDemoAccount} onScan={() => setShowScan(true)} onOpenReason={() => setShowReason(true)} onLater={() => notify(t.notNow)} onRecordSale={() => setActionMode("sale")} onAddProduct={() => setActionMode("add")} onOpenBrief={() => setShowBrief(true)} />}
        {tab === "stock" && <StockScreen t={t} lang={lang} stock={stock} onChange={changeQty} onScanClick={() => setShowScan(true)} onAddProduct={() => setActionMode("add")} onRecordSale={() => setActionMode("sale")} />}
        {tab === "alerts" && <AlertsScreen t={t} dismissedIds={dismissedAlertIds} onDismiss={(id) => setDismissedAlertIds((current) => current.includes(id) ? current : [...current, id])} onAction={notify} hasSampleData={isDemoAccount} />}
        {tab === "trends" && <TrendsScreen t={t} lang={lang} stock={stock} onAction={notify} hasSampleData={isDemoAccount} />}
        {tab === "network" && <NetworkScreen t={t} hasSampleData={isDemoAccount} />}

        <TopNav tabs={TABS} tab={tab} setTab={setTab} alertCount={activeAlertCount} alertCountLabel={t.alertsCount} />

        {showReason && <ReasonSheet t={t} onClose={() => setShowReason(false)} />}
        {showScan && <ScanModal t={t} onClose={() => setShowScan(false)} onFound={handleScanFound} />}
        {showBrief && <BriefSheet t={t} onClose={() => setShowBrief(false)} />}
        {actionMode && <ActionSheet t={t} mode={actionMode} onClose={() => setActionMode(null)} onSaved={(value, mode) => {
          if (mode === "sale") {
            const match = value.match(/(.+?)(?:\s+)(\d+)$/);
            const nameText = match ? match[1].trim().toLowerCase() : value.trim().toLowerCase();
            const qty = match ? Math.max(1, Number(match[2])) : 1;
            const found = stock.find((item) => pname(item, lang).toLowerCase().includes(nameText) || item.name.toLowerCase().includes(nameText));
            if (found) {
              changeQty(found.id, -qty);
              notify(`${t.saleRecorded}: ${pname(found, lang)} ×${qty}`);
            } else {
              notify(`${t.saleRecorded}: ${value}`);
            }
          } else {
            const name = value.trim();
            setStock((prev) => [...prev, { id: Date.now(), key: null, name, qty: 1, min: 5, max: 30, unit: "pc", trend: 0, loc: "New" }]);
            notify(`${t.addProduct}: ${name}`);
          }
          setActionMode(null);
        }} />}
        {toast && <div className="fixed left-4 right-4 bottom-28 z-[60] mx-auto max-w-[460px] rounded-2xl px-4 py-3.5 text-center text-[13px] font-extrabold" style={{ background: C.accent, color: C.onAccent, boxShadow: "0 10px 30px rgba(0,0,0,.35)" }}>{toast}</div>}
      </PhoneFrame>}
    </div>
  );
}