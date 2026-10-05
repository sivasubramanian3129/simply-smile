// ===================================================
// === CONFIGURATION & STATE ===
// ===================================================

// ===================================================
// === CONFIGURATION & STATE ===
// ===================================================

// --- 1. GLOBAL CONSTANTS ---
// Use the CDN to bypass local file corruption issues
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/cgarciagl/face-api.js@0.22.2/weights';
const SMILE_THRESHOLD = 0.4; 
const PHASE1_DURATION = 30; 
const PHASE2_DURATION = 45; 
const msg = "Love your smile, come again to smile, Refresh yourself !!";
const colors = ["#FFC90E", "#EB3324", "#B97A57", "#0023F5", "#22B14C", "#EA3680"];
const colorfulMsg = msg.split(' ').map((word, i) => `<span style="color:${colors[i % colors.length]}; font-weight:bold;">${word}</span>`).join(' ');

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHKszbA8zFIdxyBJucz4yAc125Uec6_lg",
  authDomain: "simplysmile.firebaseapp.com",
  projectId: "simplysmile",
  storageBucket: "simplysmile.firebasestorage.app",
  messagingSenderId: "478570960999",
  appId: "1:478570960999:web:956f76f31fb4381bbadcc2",
  measurementId: "G-ETDYY04SQ5"
};

// Initialize Firebase App and Firestore first
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test fetch function to verify Firestore connection (Defined after 'db' is ready)
async function verifyFirebaseConnection() {
  try {
    // Try fetching a dummy document to verify connectivity
    const docRef = doc(db, "test-connection", "ping");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Firebase connected successfully! Document data:", docSnap.data());
    } else {
      console.log("Firebase connected, but the test document doesn't exist yet (which is normal).");
    }
  } catch (error) {
    console.error("Firebase connection error:", error);
  }
}

// Run the verification check on load (Now safe since 'db' is initialized)
verifyFirebaseConnection();

// AdMob Configuration (Test Interstitial Unit ID)
const ADMOB_INTERSTITIAL_ID = 'ca-app-pub-3072413754084144/4577154733';
 


// ===================================================
// === MULTI-LANGUAGE TRANSLATIONS ===
// ===================================================
const translations = {
    en: {
        title: "Simply SMILE",
        subtitle: "Smile elongates your life, gives peace.",
        startBtn: "🤍 Start 🤍",
        freshBtn: "Start Fresh Smile Challenge",
        powerBtn: "Start Power Smile Challenge",
        commitmentText: "Simply SMILE wishes to give you a Fresh day with your Smile, Can you please smile",
        camStarting: "📷 Starting Camera...",
        faceLooking: "🔍 Looking for a face...",
        sensorsWarming: "⌛ Warming up sensors...",
        getReady: "⚠️ Get Ready... Challenge Starts!",
        keepSmiling: "😁 Keep that smile! Time is moving!",
        smilePrompt: "🙂 Smile to make time move!",
        resumeSmiling: "😁 Resume Smiling!",
        paused: "⏸️ Challenge Paused. Please choose an option.",
        motivations: ["Smile, you look so gorgeous!", "Smile baby!", "Smile please!", "Try to be happy!"],
        defaultQuotePhase1: "Keep Smiling!",
        defaultQuotePhase2: "You are powerful!",
        quitGameTitle: "Do you want to quit your smile challenge?",
        quitGameYes: "Quit Game",
        quitGameNo: "Try Challenge",
        quitFreshMsg: "You were close! Do you want to restart the Fresh Smile challenge or finish?",
        quitPowerMsg: "You were close! Do you want to try the Power Smile challenge again or finish?",
        restartFresh: "Restart Fresh Smile",
        restartPower: "Restart Power Smile",
        finishBtn: "Finish",
        startAgain: "Start Again",
        successCongrats: "🥳 Congratulations !! 🥳",
        finalMsg1: "Thank you for sharing your smile! Have a nice day! 👋",
        finalMsg2: "Thank you for your Smile 😊, Your Smile adds beauty to your inner self",
        giftExitPrompt: "Don't you need your gift? 🎁<br>Your smile deserves a reward!",
        giftExitYes: "No, Go Home",
        giftExitNo: "Yes, Get Gift",
        quoteExitPrompt: "Still reading your quote? 📜<br>Do you want to leave?",
        quoteExitYes: "Yes, Go Home",
        quoteExitNo: "No, Read Quote",
        chooseYourGift: "🎁 Choose Your Gift 🎁",
        chooseFinalGift: "🎁 Choose Your Final Gift 🎁",
        noInternetTitle: "No Internet Connection",
        noInternetDesc: "SimplySMILE needs internet to prepare the magic. Please connect to continue!",
        retryConnectionBtn: "I Connected! Retry 🔄",
        challengeCompleteGift: "🥳 Challenge Complete! Get Ready for Your Gift! 🎁",
        preparingSmiles: "Preparing Smiles... 😊",
        tapToContinue: "Tap anywhere to continue",
        chooseTimingTip: "Choose your timing... ⏱️",
        keepSmilingTip: "Keep smiling! ⏳",
        tapABoxTip: "Tap a box! 🎁",
        tapHereToStartTip: "Tap here to start! 👇"
    },
    de: { 
        title: "Simply SMILE",
        subtitle: "Ein Lächeln verlängert das Leben und schenkt Frieden.",
        startBtn: "🤍 Starten 🤍",
        freshBtn: "Frisches-Lächeln-Challenge starten",
        powerBtn: "Power-Lächeln-Challenge starten",
        commitmentText: "Simply SMILE möchte dir mit einem Lächeln einen frischen Tag schenken. Möchtest du lächeln?",
        camStarting: "📷 Kamera wird gestartet...",
        faceLooking: "🔍 Suche nach einem Gesicht...",
        sensorsWarming: "⌛ Sensoren wärmen sich auf...",
        getReady: "⚠️ Mach dich bereit... Challenge beginnt!",
        keepSmiling: "😁 Behalte das Lächeln! Die Zeit läuft!",
        smilePrompt: "🙂 Lächle, damit die Zeit weitergeht!",
        resumeSmiling: "😁 Lächle weiter!",
        paused: "⏸️ Challenge pausiert. Bitte wähle eine Option.",
        motivations: ["Lächle, du siehst großartig aus!", "Lächle mein Schatz!", "Bitte lächeln!", "Versuch glücklich zu sein!"],
        defaultQuotePhase1: "Lächle weiter!",
        defaultQuotePhase2: "Du bist stark!",
        quitGameTitle: "Möchtest du deine Lächeln-Challenge abbrechen?",
        quitGameYes: "Spiel beenden",
        quitGameNo: "Challenge fortsetzen",
        quitFreshMsg: "Du warst nah dran! Möchtest du die Frisches-Lächeln-Challenge neu starten oder beenden?",
        quitPowerMsg: "Du warst nah dran! Möchtest du die Power-Lächeln-Challenge noch einmal versuchen oder beenden?",
        restartFresh: "Frisches Lächeln neu starten",
        restartPower: "Power Lächeln neu starten",
        finishBtn: "Fertig",
        startAgain: "Nochmal starten",
        successCongrats: "🥳 Herzlichen Glückwunsch !! 🥳",
        finalMsg1: "Danke, dass du dein Lächeln geteilt hast! Einen schönen Tag noch! 👋",
        finalMsg2: "Danke für dein Lächeln 😊, dein Lächeln verschönert dein inneres Selbst",
        giftExitPrompt: "Kein Geschenk gewünscht? 🎁<br>Dein Lächeln verdient eine Belohnung!",
        giftExitYes: "Nein, nach Hause",
        giftExitNo: "Ja, Geschenk holen",
        quoteExitPrompt: "Liest du noch dein Zitat? 📜<br>Möchtest du gehen?",
        quoteExitYes: "Ja, nach Hause",
        quoteExitNo: "Nein, Zitat lesen",
        chooseYourGift: "🎁 Wähle dein Geschenk 🎁",
        chooseFinalGift: "🎁 Wähle dein finales Geschenk 🎁",
        noInternetTitle: "Keine Internetverbindung",
        noInternetDesc: "SimplySMILE benötigt Internet, um die Magie vorzubereiten. Bitte verbinde dich, um fortzufahren!",
        retryConnectionBtn: "Verbunden! Wiederholen 🔄",
        challengeCompleteGift: "🥳 Challenge abgeschlossen! Mach dich bereit für dein Geschenk! 🎁",
        preparingSmiles: "Lächeln werden vorbereitet... 😊",
        tapToContinue: "Tippe irgendwo hin, um fortzufahren",
        chooseTimingTip: "Wähle deine Zeit... ⏱️",
        keepSmilingTip: "Lächle weiter! ⏳",
        tapABoxTip: "Tippe auf eine Box! 🎁",
        tapHereToStartTip: "Hier tippen zum Starten! 👇"
    },
    es: { 
        title: "Simply SMILE",
        subtitle: "La sonrisa alarga tu vida y da paz.",
        startBtn: "🤍 Empezar 🤍",
        freshBtn: "Iniciar Reto Sonrisa Fresca",
        powerBtn: "Iniciar Reto Sonrisa Poderosa",
        commitmentText: "Simply SMILE quiere regalarte un día fresco con tu sonrisa. ¿Podrías sonreír?",
        camStarting: "📷 Iniciando cámara...",
        faceLooking: "🔍 Buscando un rostro...",
        sensorsWarming: "⌛ Calentando sensores...",
        getReady: "⚠️ Prepárate... ¡Empieza el reto!",
        keepSmiling: "😁 ¡Mantén esa sonrisa! ¡El tiempo avanza!",
        smilePrompt: "🙂 ¡Sonríe para que el tiempo avance!",
        resumeSmiling: "😁 ¡Vuelve a sonreír!",
        paused: "⏸️ Reto pausado. Por favor elige una opción.",
        motivations: ["¡Sonríe, te ves genial!", "¡Sonríe un poco!", "¡Sonríe por favor!", "¡Intenta ser feliz!"],
        defaultQuotePhase1: "¡Sigue sonriendo!",
        defaultQuotePhase2: "¡Eres increíble!",
        quitGameTitle: "¿Quieres abandonar tu reto de sonrisa?",
        quitGameYes: "Salir del juego",
        quitGameNo: "Intentar reto",
        quitFreshMsg: "¡Estuviste cerca! ¿Quieres reiniciar el reto de sonrisa fresca o terminar?",
        quitPowerMsg: "¡Estuviste cerca! ¿Quieres intentar el reto de sonrisa poderosa de nuevo o terminar?",
        restartFresh: "Reiniciar Sonrisa Fresca",
        restartPower: "Reiniciar Sonrisa Poderosa",
        finishBtn: "Terminar",
        startAgain: "Empezar de nuevo",
        successCongrats: "🥳 ¡¡Felicitaciones!! 🥳",
        finalMsg1: "¡Gracias por compartir tu sonrisa! ¡Que tengas un buen día! 👋",
        finalMsg2: "Gracias por tu sonrisa 😊, tu sonrisa embellece tu ser interior",
        giftExitPrompt: "¿No necesitas tu regalo? 🎁<br>¡Tu sonrisa merece una recompensa!",
        giftExitYes: "No, ir a casa",
        giftExitNo: "Sí, obtener regalo",
        quoteExitPrompt: "¿Aún leyendo tu frase? 📜<br>¿Quieres salir?",
        quoteExitYes: "Sí, ir a casa",
        quoteExitNo: "No, leer frase",
        chooseYourGift: "🎁 Elige tu regalo 🎁",
        chooseFinalGift: "🎁 Elige tu regalo final 🎁",
        noInternetTitle: "Sin conexión a internet",
        noInternetDesc: "SimplySMILE necesita internet para preparar la magia. ¡Conéctate para continuar!",
        retryConnectionBtn: "¡Conectado! Reintentar 🔄",
        challengeCompleteGift: "🥳 ¡Reto completado! ¡Prepárate para tu regalo! 🎁",
        preparingSmiles: "Preparando sonrisas... 😊",
        tapToContinue: "Toca en cualquier lugar para continuar",
        chooseTimingTip: "Elige tu tiempo... ⏱️",
        keepSmilingTip: "¡Sigue sonriendo! ⏳",
        tapABoxTip: "¡Toca una caja! 🎁",
        tapHereToStartTip: "¡Toca aquí para empezar! 👇"
    },
    fr: { 
        title: "Simply SMILE",
        subtitle: "Le sourire prolonge la vie et apporte la paix.",
        startBtn: "🤍 Commencer 🤍",
        freshBtn: "Lancer le Défi Sourire Frais",
        powerBtn: "Lancer le Défi Sourire Puissant",
        commitmentText: "Simply SMILE souhaite vous offrir une fraîche journée grâce à votre sourire. Pourriez-vous sourire ?",
        camStarting: "📷 Démarrage de la caméra...",
        faceLooking: "🔍 Recherche d'un visage...",
        sensorsWarming: "⌛ Chauffage des capteurs...",
        getReady: "⚠️ Préparez-vous... Le défi commence !",
        keepSmiling: "😁 Gardez ce sourire ! Le temps avance !",
        smilePrompt: "🙂 Souriez pour faire avancer le temps !",
        resumeSmiling: "😁 Reprenez votre sourire !",
        paused: "⏸️ Défi en pause. Veuillez choisir une option.",
        motivations: ["Souriez, vous êtes splendide !", "Allez, un beau sourire !", "Souriez s'il vous plaît !", "Essayez d'être heureux !"],
        defaultQuotePhase1: "Gardez le sourire !",
        defaultQuotePhase2: "Vous êtes formidable !",
        quitGameTitle: "Voulez-vous quitter votre défi souriant ?",
        quitGameYes: "Quitter le jeu",
        quitGameNo: "Essayer le défi",
        quitFreshMsg: "Vous y étiez presque ! Voulez-vous recommencer le défi Sourire Frais ou terminer ?",
        quitPowerMsg: "Vous y étiez presque ! Voulez-vous réessayer le défi Sourire Puissant ou terminer ?",
        restartFresh: "Recommencer Sourire Frais",
        restartPower: "Recommencer Sourire Puissant",
        finishBtn: "Terminer",
        startAgain: "Recommencer",
        successCongrats: "🥳 Félicitations !! 🥳",
        finalMsg1: "Merci d'avoir partagé votre sourire ! Passez une bonne journée ! 👋",
        finalMsg2: "Merci pour votre sourire 😊, votre sourire embellit votre être intérieur",
        giftExitPrompt: "Pas besoin de votre cadeau ? 🎁<br>Votre sourire mérite une récompense !",
        giftExitYes: "Non, rentrer",
        giftExitNo: "Oui, avoir le cadeau",
        quoteExitPrompt: "Vous lisez encore votre citation ? 📜<br>Voulez-vous partir ?",
        quoteExitYes: "Oui, rentrer",
        quoteExitNo: "Non, lire la citation",
        chooseYourGift: "🎁 Choisissez votre cadeau 🎁",
        chooseFinalGift: "🎁 Choisissez votre cadeau final 🎁",
        noInternetTitle: "Pas de connexion internet",
        noInternetDesc: "SimplySMILE a besoin d'Internet pour préparer la magie. Veuillez vous connecter pour continuer !",
        retryConnectionBtn: "Connecté ! Réessayer 🔄",
        challengeCompleteGift: "🥳 Défi terminé ! Préparez-vous pour votre cadeau ! 🎁",
        preparingSmiles: "Préparation des sourires... 😊",
        tapToContinue: "Appuyez n'importe où pour continuer",
        chooseTimingTip: "Choisissez votre temps... ⏱️",
        keepSmilingTip: "Gardez le sourire ! ⏳",
        tapABoxTip: "Touchez une boîte ! 🎁",
        tapHereToStartTip: "Appuyez ici pour commencer ! 👇"
    },
    ja: { 
        title: "Simply SMILE",
        subtitle: "笑顔は寿命を延ばし、平和をもたらします。",
        startBtn: "🤍 スタート 🤍",
        freshBtn: "フレッシュスマイルチャレンジを開始",
        powerBtn: "パワースマイルチャレンジを開始",
        commitmentText: "Simply SMILEはあなたの笑顔で爽やかな一日をお届けしたいと思っています。少しだけ笑顔を見せてください！",
        camStarting: "📷 カメラを起動中...",
        faceLooking: "🔍 顔を探しています...",
        sensorsWarming: "⌛ センサーを準備中...",
        getReady: "⚠️ 準備して... チャレンジ開始！",
        keepSmiling: "😁 その笑顔をキープ！時間が進んでいます！",
        smilePrompt: "🙂 時間を進めるために笑顔になってね！",
        resumeSmiling: "😁 笑顔を再開！",
        paused: "⏸️️ チャレンジが一時停止しました。オプションを選択してください。",
        motivations: ["笑顔がとても素敵です！", "笑って！", "笑顔をお願いします！", "ハッピーにいこう！"],
        defaultQuotePhase1: "笑顔を続けよう！",
        defaultQuotePhase2: "あなたは素晴らしい！",
        quitGameTitle: "笑顔チャレンジを終了しますか？",
        quitGameYes: "ゲームをやめる",
        quitGameNo: "チャレンジ続行",
        quitFreshMsg: "惜しい！フレッシュスマイルチャレンジをやり直しますか、それとも終了しますか？",
        quitPowerMsg: "惜しい！パワースマイルチャレンジをもう一度試しますか、それとも終了しますか？",
        restartFresh: "フレッシュスマイルをやり直す",
        restartPower: "パワースマイルをやり直す",
        finishBtn: "終了",
        startAgain: "もう一度始める",
        successCongrats: "🥳 おめでとうございます !! 🥳",
        finalMsg1: "笑顔をシェアしていただきありがとうございます！良い一日を！ 👋",
        finalMsg2: "素敵な笑顔をありがとう 😊、あなたの笑顔は内面の美しさを引き出します",
        giftExitPrompt: "ギフトはいりませんか？ 🎁<br>あなたの笑顔には報酬がふさわしいです！",
        giftExitYes: "いいえ、ホームへ",
        giftExitNo: "はい、ギフトを受け取る",
        quoteExitPrompt: "まだ名言を読んでいますか？ 📜<br>退出しますか？",
        quoteExitYes: "はい、ホームへ",
        quoteExitNo: "いいえ、名言を読む",
        chooseYourGift: "🎁 ギフトを選んでね 🎁",
        chooseFinalGift: "🎁 最後のギフトを選んでね 🎁",
        noInternetTitle: "インターネット接続がありません",
        noInternetDesc: "SimplySMILEの魔法の準備にはインターネットが必要です。接続して続けてください！",
        retryConnectionBtn: "接続しました！再試行 🔄",
        challengeCompleteGift: "🥳 チャレンジ完了！ギフトの準備ができました！ 🎁",
        preparingSmiles: "笑顔を準備中... 😊",
        tapToContinue: "画面どこでもタップして続行",
        chooseTimingTip: "時間を選んでね... ⏱️",
        keepSmilingTip: "笑顔をキープ！ ⏳",
        tapABoxTip: "箱をタップしてね！ 🎁",
        tapHereToStartTip: "ここをタップしてスタート！ 👇"
    },
    zh: { 
        title: "Simply SMILE",
        subtitle: "微笑延年益寿，带来内心的平静。",
        startBtn: "🤍 开始 🤍",
        freshBtn: "开始清新微笑挑战",
        powerBtn: "开始能量微笑挑战",
        commitmentText: "Simply SMILE 希望用您的微笑带给您崭新的一天，请笑一笑好吗？",
        camStarting: "📷 正在启动相机...",
        faceLooking: "🔍 正在寻找面部...",
        sensorsWarming: "⌛ 传感器预热中...",
        getReady: "⚠️ 准备好... 挑战开始！",
        keepSmiling: "😁 保持微笑！时间正在前进！",
        smilePrompt: "🙂 微笑让时间动起来！",
        resumeSmiling: "😁 继续微笑！",
        paused: "⏸️ 挑战已暂停，请选择一个选项。",
        motivations: ["笑一笑，你真好看！", "笑一个宝贝！", "请笑一笑！", "保持开心！"],
        defaultQuotePhase1: "保持微笑！",
        defaultQuotePhase2: "你充满力量！",
        quitGameTitle: "您想退出微笑挑战吗？",
        quitGameYes: "退出游戏",
        quitGameNo: "尝试挑战",
        quitFreshMsg: "差一点就成功了！您想重新开始清新微笑挑战还是结束？",
        quitPowerMsg: "差一点就成功了！您想再次尝试能量微笑挑战还是结束？",
        restartFresh: "重新开始清新微笑",
        restartPower: "重新开始能量微笑",
        finishBtn: "完成",
        startAgain: "再玩一次",
        successCongrats: "🥳 恭喜 !! 🥳",
        finalMsg1: "感谢您分享您的微笑！祝您有美好的一天！ 👋",
        finalMsg2: "谢谢您的微笑 😊，您的微笑为您的内心增添了美丽",
        giftExitPrompt: "不需要您的礼物吗？ 🎁<br>您的微笑值得拥有奖励！",
        giftExitYes: "不，回主页",
        giftExitNo: "是的，领取礼物",
        quoteExitPrompt: "还在阅读名言吗？ 📜<br>您想离开吗？",
        quoteExitYes: "是的，回主页",
        quoteExitNo: "不，继续阅读",
        chooseYourGift: "🎁 请选择您的礼物 🎁",
        chooseFinalGift: "🎁 请选择您的最终礼物 🎁",
        noInternetTitle: "没有网络连接",
        noInternetDesc: "SimplySMILE 需要联网来准备魔法。请连接网络后继续！",
        retryConnectionBtn: "已连接！重试 🔄",
        challengeCompleteGift: "🥳 挑战完成！准备领取您的礼物吧！ 🎁",
        preparingSmiles: "正在准备微笑... 😊",
        tapToContinue: "点击任意处继续",
        chooseTimingTip: "选择你的时间... ⏱️",
        keepSmilingTip: "保持微笑！ ⏳",
        tapABoxTip: "点击一个盒子！ 🎁",
        tapHereToStartTip: "点击这里开始！ 👇"
    }
};

function getTranslation(key) {
    const currentLang = localStorage.getItem('preferred_lang') || 'en';
    return translations[currentLang]?.[key] || translations['en'][key];
}
window.getTranslation = getTranslation;

function setLanguage(lang) {
    const selectedLang = translations[lang] ? lang : 'en';
    
    // 1. Update static elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[selectedLang][key]) {
            element.innerText = translations[selectedLang][key];
        }
    });

    localStorage.setItem('preferred_lang', selectedLang);

    // 2. Instantly update dynamic screens if they are currently visible
    const t = translations[selectedLang];

    // Update Intro Screen if visible
    const introTitle = document.querySelector('#intro h1');
    const introSubtitle = document.querySelector('#intro p');
    const introStartBtn = document.getElementById('startBtn');
    if (introTitle) introTitle.innerText = t.title;
    if (introSubtitle) introSubtitle.innerText = t.subtitle;
    if (introStartBtn) introStartBtn.innerText = t.startBtn;

    // Update Commitment / Challenge Selection Screen if it's open
    const signboardCommitment = document.getElementById('signboardTextCommitment');
    if (signboardCommitment) {
        const commitmentMsgDiv = signboardCommitment.querySelector('div div');
        const freshBtn = document.getElementById('freshSmileBtn');
        const powerBtn = document.getElementById('powerSmileBtn');
        
        if (commitmentMsgDiv) commitmentMsgDiv.innerText = t.commitmentText;
        if (freshBtn) freshBtn.innerText = t.freshBtn;
        if (powerBtn) powerBtn.innerText = t.powerBtn;
    }

    // Update Active Challenge Title Frame if it's open
    const titleFrame = document.querySelector('#app-title-frame');
    if (titleFrame) {
        const titleEl = titleFrame.querySelector('.title');
        const subtitleEl = titleFrame.querySelector('.subtitle');
        if (titleEl) titleEl.innerText = t.title;
        if (subtitleEl) subtitleEl.innerText = t.subtitle;
    }

   // Update Gift screen headers using their exact IDs
    const giftTitle1 = document.getElementById('gift-title-1');
    const giftTitle2 = document.getElementById('gift-title-2');
    if (giftTitle1) giftTitle1.innerText = t.chooseYourGift;
    if (giftTitle2) giftTitle2.innerText = t.chooseFinalGift;
}

// --- 2. GLOBAL VARIABLES ---
let welcomeScreen, mainApp, dynamicAppContent, videoSection, video, canvas, loader;
let startBtn, statusEl, timerEl, motivationEl, actionsEl;
let quitPrompt, quitYesBtn, quitNoBtn;
let gifts1, gifts2, fortuneDiv, fortuneBox, fortuneMessage;
let finalScreen, startAgainBtn; 

let isChallengeRunning = false;
let remaining = 0;
let currentPhase = 0;
let detectionInterval = null;
let countdownInterval = null;
let quitPromptInterval = null;
let nonSmileTimer = 0;
let smileActive = false;
let fortuneReadyToDismiss = false;
let emojiInterval = null;
const emojis = ['😊', '😀', '😂', '😍', '😎', '🤩', '😘', '❤️'];

let quotesPhase1 = [];
let quotesPhase2 = [];
let modelsLoaded = false;
let isGiftExitMode = false;
let internetErrorEl, retryConnectionBtn;

// AdMob State Flags
let isAdMobAvailable = false;
let isInterstitialLoaded = false;


// ===================================================
// === ADMOB HELPER FUNCTIONS ===
// ===================================================

async function initializeAdMob() {
    if (window.Capacitor && window.Capacitor.isPluginAvailable('AdMob')) {
        const { AdMob } = window.Capacitor.Plugins;
        try {
            await AdMob.initialize({
                initializeForTesting: false, 
            });
            isAdMobAvailable = true;
            
            AdMob.addListener('interstitialAdDismissed', () => {
                isInterstitialLoaded = false;
                preloadInterstitialAd(); 
            });

            AdMob.addListener('interstitialAdFailedToLoad', (err) => {
                console.warn("AdMob Interstitial failed to load:", err);
                isInterstitialLoaded = false;
            });

            AdMob.addListener('interstitialAdLoaded', () => {
                isInterstitialLoaded = true;
            });

            preloadInterstitialAd();
        } catch (e) {
            console.error("AdMob initialization failed:", e);
        }
    }
}

async function preloadInterstitialAd() {
    if (!isAdMobAvailable) return;
    try {
        const { AdMob } = window.Capacitor.Plugins;
        await AdMob.prepareInterstitial({
            adId: ADMOB_INTERSTITIAL_ID, 
            isTesting: false // Change to false to stop serving test ads
        });
    } catch (e) {
        console.warn("Failed to prepare interstitial ad:", e);
    }
}

async function showInterstitialAd() {
    if (!isAdMobAvailable || !isInterstitialLoaded) return;
    try {
        const { AdMob } = window.Capacitor.Plugins;
        await AdMob.showInterstitial();
    } catch (e) {
        console.warn("Failed to show interstitial ad:", e);
    }
}


// ===================================================
// === UTILITY FUNCTIONS ===
// ===================================================

function updateStatus(message) {
    if(statusEl) statusEl.innerHTML = message; 
}

function createFloatingEmoji() {
    const container = document.getElementById('floating-emojis-container');
    if (!container) return;

    const emoji = document.createElement('span');
    emoji.classList.add('emoji-float');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${Math.random() * 90 + 5}%`;
    emoji.style.animationDuration = `${Math.random() * 10 + 10}s`;
    container.appendChild(emoji);
    setTimeout(() => { emoji.remove(); }, 20000); 
}

function stopFloatingEmojis() {
    clearInterval(emojiInterval);
    const container = document.getElementById('floating-emojis-container');
    if (container) container.innerHTML = ''; 
}

function formatTime(sec) {
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}

function clearAllIntervals() {
    clearInterval(detectionInterval);
    clearInterval(countdownInterval);
    clearInterval(quitPromptInterval);
}

function checkInternetConnection() {
    if (navigator.onLine) {
        if (internetErrorEl) internetErrorEl.classList.add("hidden");
        return true;
    } else {
        if (internetErrorEl) internetErrorEl.classList.remove("hidden");
        if (loader) loader.classList.add("hidden"); 
        return false;
    }
}


// ===================================================
// === CORE LOGIC ===
// ===================================================

async function loadAll() {
    if (!checkInternetConnection()) return; 
    if (!statusEl) console.warn("Status element not ready yet.");
  
    if (quotesPhase1.length === 0) {
        try {
            const docRefPhase1 = doc(db, "game_phases", "phase1");
            const docSnapPhase1 = await getDoc(docRefPhase1);
            
            if (docSnapPhase1.exists()) {
                const rawData1 = docSnapPhase1.data().data;
                const data1 = JSON.parse(rawData1);
                quotesPhase1 = data1.phase1_content;
            }

            const docRefPhase2 = doc(db, "game_phases", "phase2");
            const docSnapPhase2 = await getDoc(docRefPhase2);
            
            if (docSnapPhase2.exists()) {
                const rawData2 = docSnapPhase2.data().data;
                const data2 = JSON.parse(rawData2);
                quotesPhase2 = data2.phase2_content;
            }
        } catch (error) {
            console.error("Failed to load quotes from Firestore:", error);
        }
    }  
    
    if (typeof faceapi === "undefined") {
        if(statusEl) statusEl.textContent = "❌ face-api.js not loaded.";
        return;
    }

    try {
        await Promise.all([ 
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
    
        modelsLoaded = true;
        if (loader) loader.classList.add("hidden"); 
        
        const freshBtn = document.getElementById('freshSmileBtn');
        const powerBtn = document.getElementById('powerSmileBtn');
        if (freshBtn) freshBtn.disabled = false;
        if (powerBtn) powerBtn.disabled = false;
    
    } catch (error) {
        console.error("Model loading failed:", error);
        if (internetErrorEl) internetErrorEl.classList.add("hidden"); 
        if (loader) loader.classList.add("hidden");
        if(statusEl) statusEl.textContent = "❌ Network Error: " + error.message; 
    }
}

async function startVideo() {
    if (!video) return; 

    const stream = video.srcObject;
    if (stream) stream.getTracks().forEach(t => t.stop());
    video.srcObject = null;
    
    if (videoSection) videoSection.classList.add("hidden"); 

    try {
        const newStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 640 }, 
                height: { ideal: 480 },
                facingMode: "user" 
            } 
        });
        
        video.srcObject = newStream;
        videoSection.classList.remove("hidden"); 
        
        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                const displaySize = { width: video.offsetWidth, height: video.offsetHeight };
                if (canvas) faceapi.matchDimensions(canvas, displaySize); 
                resolve();
            };
        });
    } catch (err) {
        if(statusEl) statusEl.textContent = "❌ Camera access denied.";
        console.error("Camera error:", err);
    }
}

function stopVideo() {
    if (!video) return; 
    const stream = video.srcObject;
    if (stream) stream.getTracks().forEach(t => t.stop());
    video.srcObject = null;
    if (videoSection) videoSection.classList.add("hidden"); 
}

// ===================================================
// === GAME FLOW ===
// ===================================================

function quitGame(statusMessage, includeRestartOptions = true) {
    clearAllIntervals();
    stopVideo();
    isChallengeRunning = false;
    
    const elementsToHide = [videoSection, timerEl, motivationEl, quitPrompt, statusEl, actionsEl, gifts1, gifts2, fortuneDiv];
    elementsToHide.forEach(el => { if(el) el.classList.add("hidden"); });

    const titleFrame = document.querySelector('#app-title-frame');
    if (titleFrame) titleFrame.classList.add("hidden");

    const finalScreenEl = document.getElementById('final');
    let finalContent; 

    if (includeRestartOptions) {
        finalContent = `
            <div id="finishMessageContainer" style="max-width: 600px; width: 90%; margin: 30px auto; position: relative;">
                <img src="images/smiley_sign.png" alt="Smiley characters holding a sign" style="width: 100%; height: auto; display: block;">
                <div id="signboardText" style="position: absolute; top: 45%; left: 53%; transform: translate(-50%, -50%); width: 80%; padding-top: 25px; text-align: center; color: var(--text-title); font-size: 1.0rem; font-weight: 700;">
                    ${statusMessage}
                    <div id="finalActions" style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                        <button id="startAgainFinalBtn" class="btn action-positive">${getTranslation('startAgain')}</button>
                        <button id="finishBtn" class="btn action-negative">${getTranslation('finishBtn')}</button>
                    </div>
                </div>
            </div>`;
    } else {
        finalContent = `
            <div id="finishMessageContainer" style="max-width: 600px; width: 90%; margin: 30px auto; position: relative;">
                <img src="images/smiley_Finish.png" alt="Smiley character holding a sign" style="width: 100%; height: auto; display: block;">
                <div id="signboardText" style="position: absolute; top: 50%; left: 53%; transform: translate(-50%, -50%); width: 80%; padding: 5px; text-align: center; color: var(--text-title); font-size: 1.2rem; font-weight: 600;">
                    ${statusMessage}
                </div>
            </div>`;
    }
    
    finalScreenEl.innerHTML = finalContent;
    finalScreenEl.classList.remove("hidden");
    
    if (includeRestartOptions) { 
        document.getElementById('startAgainFinalBtn').onclick = resetGame;
        document.getElementById('finishBtn').onclick = () => quitGame(colorfulMsg, false); 
    }
}

function resetGame() {
    clearAllIntervals();
    stopVideo();

    document.getElementById('final').classList.add("hidden");
    if (dynamicAppContent) dynamicAppContent.innerHTML = ''; 
    
    document.getElementById('intro').classList.remove("hidden"); 
    document.getElementById('app').classList.add("hidden");

    currentPhase = 0;
    
    [gifts1, gifts2, fortuneDiv, quitPrompt, statusEl, motivationEl].forEach(el => {
        if(el) el.classList.add("hidden");
    });

    stopFloatingEmojis(); 
    for (let i = 0; i < 5; i++) { createFloatingEmoji(); }
    emojiInterval = setInterval(createFloatingEmoji, 1500);
}

function handleQuit() {
    clearAllIntervals();
    isChallengeRunning = false;
    
    quitPrompt.classList.add("hidden");
    if(timerEl) timerEl.classList.add("hidden"); 
    if(motivationEl) motivationEl.classList.add("hidden");
    if(videoSection) videoSection.classList.add("hidden"); 
    
    const titleFrame = document.querySelector('#app-title-frame');
    if (titleFrame) titleFrame.classList.add("hidden");
    
    let statusMessage, continueText, continueAction;

    if (currentPhase === 1) {
        statusMessage = getTranslation('quitFreshMsg');
        continueText = getTranslation('restartFresh');
        continueAction = () => startChallenge(PHASE1_DURATION, 1, true); 
    } else {
        statusMessage = getTranslation('quitPowerMsg');
        continueText = getTranslation('restartPower');
        continueAction = () => startChallenge(PHASE2_DURATION, 2, true); 
    }
    
    if(statusEl) statusEl.classList.add("hidden");

    actionsEl.innerHTML = `
        <div id="quitContainer" style="max-width: 340px; width: 90%; margin: 30px auto; position: relative;">
            <img src="images/question_board.png" alt="Smiley character with whiteboard" style="width: 100%; height: auto; display: block;">
            <div id="signboardTextQuit" style="position: absolute; top: 22%; left: 9%; width: 90%; text-align: center; color: var(--text-title); font-size: 1rem; font-weight: 700;">
                <div style="font-size: 1rem; margin-bottom: 15px; line-height: 1.2;">${statusMessage}</div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 5px;">
                    <button id="dynamicContinueBtn" class="btn action-positive" style="font-size: 0.9rem; padding: 8px 16px;">${continueText}</button>
                    <button id="finalFinishBtn" class="btn action-negative" style="font-size: 0.9rem; padding: 8px 16px;">${getTranslation('finishBtn')}</button>
                </div>
            </div>
        </div>`;
    actionsEl.classList.remove("hidden");

    document.getElementById('dynamicContinueBtn').onclick = continueAction;
    document.getElementById('finalFinishBtn').onclick = () => quitGame(colorfulMsg, false); 
}

async function fetchRandomQuote(phase) {
    const currentLang = localStorage.getItem('preferred_lang') || 'en';
    
    if (!navigator.onLine) {
        return getTranslation(phase === 1 ? 'defaultQuotePhase1' : 'defaultQuotePhase2');
    }

    try {
        const docRef = doc(db, "game_phases", `phase${phase}_${currentLang}`);
        let docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            const fallbackRef = doc(db, "game_phases", `phase${phase}`);
            docSnap = await getDoc(fallbackRef);
        }
        
        if (docSnap.exists()) {
            const docData = docSnap.data();
            let quotesList = [];

            if (docData.data) {
                const parsed = typeof docData.data === 'string' ? JSON.parse(docData.data) : docData.data;
                quotesList = parsed[`phase${phase}_content`] || parsed;
            } else if (docData[`phase${phase}_content`]) {
                quotesList = docData[`phase${phase}_content`];
            } else if (Array.isArray(docData)) {
                quotesList = docData;
            }

            if (Array.isArray(quotesList) && quotesList.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotesList.length);
                const item = quotesList[randomIndex];
                
                let text = "";
                if (typeof item === 'object' && item !== null) {
                    text = item[currentLang] || item['en'] || item.text || item.quote || "";
                } else {
                    text = typeof item === 'string' ? item : (item.text || item.quote);
                }

                // --- FIX: Remove any duplicate parenthetical prompts embedded in the database text ---
                if (text) {
                    text = text.replace(/\(Tap anywhere to continue\)/gi, '')
                               .replace(/\(Tippe irgendwo hin.*?\)/gi, '')
                               .replace(/\(Toca en cualquier lugar.*?\)/gi, '')
                               .replace(/\(Appuyez n'importe où.*?\)/gi, '')
                               .replace(/\(画面どこでも.*?\)/gi, '')
                               .replace(/\(点击.*?\)/gi, '')
                               .trim();
                }

                return text;
            }
        }
    } catch (error) {
        console.warn("Failed to fetch random quote from Firestore:", error);
    }
    
    return getTranslation(phase === 1 ? 'defaultQuotePhase1' : 'defaultQuotePhase2');
}

function attachGiftListeners() {
    document.querySelectorAll(".gift").forEach(oldGift => {
        const newGift = oldGift.cloneNode(true);
        oldGift.parentNode.replaceChild(newGift, oldGift);
    });

    document.querySelectorAll(".gift").forEach(gift => {
      gift.addEventListener("click", async function(e) {
        const target = e.currentTarget;
        const phase = parseInt(target.dataset.phase);

        document.getElementById(`gifts${phase}`).classList.add("hidden");
        
        // Fetch quote dynamically from Firebase
        let fortuneText = await fetchRandomQuote(phase);

        if (phase === 1) {
          actionsEl.classList.remove("hidden");
        } else { 
          actionsEl.classList.add("hidden"); 
        }

        let formattedText = fortuneText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

        // --- RENDERED ONCE HERE ---
        fortuneMessage.innerHTML = `${formattedText}<br><br><span style="font-size: 0.8rem; opacity: 0.7; font-style: normal;">${getTranslation('tapToContinue')}</span>`;
        fortuneDiv.classList.remove("hidden"); 
        
        setTimeout(() => { fortuneReadyToDismiss = true; }, 2000);
      }); 
    });
}

async function startChallenge(duration, phase, isResume = false) {
  if (!modelsLoaded) {
    alert("Please wait — models are still loading!");
    return;
  }

  stopFloatingEmojis();

  if (actionsEl) actionsEl.classList.add("hidden"); 
  if (statusEl) statusEl.classList.add("hidden");
  if (motivationEl) motivationEl.classList.add("hidden");
  
  clearAllIntervals();

  if (!isResume) {
      if (loader) loader.classList.remove("hidden");
      if (dynamicAppContent) dynamicAppContent.classList.add("hidden");
      
      const t = translations[localStorage.getItem('preferred_lang') || 'en'] || translations['en'];

      dynamicAppContent.innerHTML = `
            <div id="app-title-frame" class="title-frame">
                <h1 class="title">${t.title}</h1>
                <p class="subtitle">${t.subtitle}</p>
            </div>
            <section id="videoSection" class="hidden"> 
                <video id="webcam" autoplay muted playsinline></video>
                <canvas id="canvas"></canvas>
                <div id="timer" class="hidden">01:00</div>
            </section>
            <div class="app-content-wrapper">
                <div id="actions" class="buttons hidden"></div>
            </div>`;
        
      video = document.getElementById("webcam"); 
      videoSection = document.getElementById("videoSection"); 
      timerEl = document.getElementById("timer");
      canvas = document.getElementById("canvas");
      actionsEl = document.getElementById("actions");
      timerEl.classList.remove("hidden");
  } else {
      if (videoSection) videoSection.classList.remove("hidden");
      if (timerEl) timerEl.classList.remove("hidden");
      if (statusEl) statusEl.classList.remove("hidden");
  }

  remaining = duration;
  currentPhase = phase;
  isChallengeRunning = true;
  nonSmileTimer = 0; 
  smileActive = false; 
  isGiftExitMode = false;

  statusEl.style.backgroundColor = ""; 
  statusEl.style.color = "";

  if (timerEl) timerEl.textContent = `${formatTime(remaining)}`; 

  if (!isResume) {
      statusEl.textContent = getTranslation('camStarting');
      try {
        await startVideo(); 
        if (loader) loader.classList.add("hidden"); 
        dynamicAppContent.classList.remove("hidden"); 
        statusEl.classList.remove("hidden");
        statusEl.textContent = getTranslation('faceLooking');
      } catch(e) {
        isChallengeRunning = false;
        if (actionsEl) actionsEl.classList.remove("hidden");
        if (loader) loader.classList.add("hidden"); 
        dynamicAppContent.classList.remove("hidden"); 
        statusEl.classList.remove("hidden"); 
        return;
      }
  } else {
      statusEl.textContent = getTranslation('resumeSmiling');
  }
  
  let lastSmileTimestamp = 0; 
  let gameReady = isResume;      
  let preparingGame = isResume;  

  detectionInterval = setInterval(async () => {
    if (!isChallengeRunning) return; 

    if (!modelsLoaded || !video || video.readyState < 2) {
        if(!isResume) statusEl.textContent = getTranslation('sensorsWarming');
        return; 
    }
    
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({
          inputSize: 320,      
          scoreThreshold: 0.3  
      })) 
      .withFaceExpressions();
    
    if (!isChallengeRunning) return;

    if (detection) {
        if (!gameReady && !preparingGame) {
            preparingGame = true; 

            statusEl.textContent = getTranslation('getReady');
            statusEl.style.backgroundColor = "#FFC90E"; 
            statusEl.style.color = "#000000";
            statusEl.style.fontWeight = "bold";

            setTimeout(() => {
                if (!isChallengeRunning) return; 
                gameReady = true; 
                statusEl.style.backgroundColor = ""; 
                statusEl.style.color = ""; 
                statusEl.style.fontWeight = "";
            }, 1000); 
        }

        if (gameReady) {
            const isSmiling = detection.expressions.happy > SMILE_THRESHOLD;
            
            if (isSmiling) {
                smileActive = true;
                lastSmileTimestamp = Date.now(); 
                
                statusEl.textContent = getTranslation('keepSmiling');
                statusEl.classList.remove("hidden");
                motivationEl.classList.add("hidden");
            } else {
                smileActive = false;
            }
        }
    } 
    
    if (gameReady && Date.now() - lastSmileTimestamp > 1000 && isChallengeRunning) {
         statusEl.textContent = getTranslation('smilePrompt');
         statusEl.classList.add("hidden");
         motivationEl.classList.remove("hidden");
         
         if (Math.random() > 0.95) {
             const t = translations[localStorage.getItem('preferred_lang') || 'en'] || translations['en'];
             const phrases = t.motivations;
             motivationEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
         }
    }
  }, 300); 

  quitPromptInterval = setInterval(checkNonSmileTimeout, 1000);

  let smileAccumulator = 0; 
  let lastTick = Date.now(); 

  countdownInterval = setInterval(() => {
    if (!isChallengeRunning) return;

    const now = Date.now();
    const delta = now - lastTick; 
    lastTick = now;

    const isSmilingRoughly = (now - lastSmileTimestamp) < 1000;

    if (isSmilingRoughly) {
      nonSmileTimer = 0; 
      smileAccumulator += delta;

      while (smileAccumulator >= 1000) {
          remaining--;
          smileAccumulator -= 1000; 
          timerEl.textContent = `${formatTime(remaining)}`;
      }
    } else {
        if (gameReady && quitPrompt.classList.contains('hidden')) {
            nonSmileTimer += (delta / 1000);
        }
    }
    
    if (remaining <= 0) completeChallenge();
  }, 50); 
}

function checkNonSmileTimeout() {
    if (!isChallengeRunning || smileActive || !quitPrompt.classList.contains('hidden')) return;
    
    if (nonSmileTimer >= 10) {
        clearAllIntervals(); 
        isGiftExitMode = false;

        document.querySelector("#quitPrompt-box h3").textContent = getTranslation('quitGameTitle');
        quitYesBtn.textContent = getTranslation('quitGameYes');
        quitNoBtn.textContent = getTranslation('quitGameNo');

        statusEl.textContent = getTranslation('paused');
        motivationEl.classList.add('hidden');
        quitPrompt.classList.remove("hidden"); 
    }
}

function completeChallenge() {
    clearAllIntervals();
    isChallengeRunning = false;
    stopVideo();

    document.getElementById('timer')?.classList.add("hidden"); 
    document.getElementById('motivation')?.classList.add("hidden"); 
    document.getElementById('quitPrompt')?.classList.add("hidden"); 
    document.querySelector('#app-title-frame')?.classList.add("hidden");

    showInterstitialAd();

    if (currentPhase === 1) {
        onOneMinuteChallengeSuccess();
    } else {
        onThreeMinuteChallengeSuccess();
    }
}

function onOneMinuteChallengeSuccess() {
    document.querySelector('#app-title-frame')?.classList.add("hidden");
    document.getElementById("actions")?.classList.add("hidden");
    document.getElementById('status')?.classList.add("hidden");
    const gifContainer = document.getElementById('interstitialGif');
    gifContainer.style.display = 'block';
    
    updateStatus(getTranslation('challengeCompleteGift'));
    statusEl.classList.remove("hidden");

    setTimeout(() => {
        gifContainer.style.display = 'none';
        const gifts1El = document.getElementById('gifts1');
        gifts1El.classList.remove("hidden");
        
        // FIX: Target h3 or the specific ID instead of h2
        const giftTitle1 = document.getElementById('gift-title-1');
        if (giftTitle1) giftTitle1.innerText = getTranslation('chooseYourGift');
        
        attachGiftListeners(); 
        statusEl.classList.add("hidden"); 
    }, 6500); 
}

function onThreeMinuteChallengeSuccess() { 
    document.querySelector('#app-title-frame')?.classList.add("hidden");
    document.getElementById("actions")?.classList.add("hidden");
    document.getElementById('status')?.classList.add("hidden"); 
    const gifContainer = document.getElementById('interstitialGif');
    gifContainer.style.display = 'block';
    
    updateStatus(getTranslation('challengeCompleteGift'));
    statusEl.classList.remove("hidden");

    setTimeout(() => {
        gifContainer.style.display = 'none';
        const gifts2El = document.getElementById('gifts2');
        gifts2El.classList.remove("hidden");
        
        // FIX: Target h3 or the specific ID instead of h2
        const giftTitle2 = document.getElementById('gift-title-2');
        if (giftTitle2) giftTitle2.innerText = getTranslation('chooseFinalGift');
        
        attachGiftListeners(); 
        statusEl.classList.add("hidden"); 
    }, 6500); 
}

// ===================================================
// === APP INITIALIZATION ===
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    welcomeScreen = document.getElementById("intro");
    mainApp = document.getElementById("app");
    dynamicAppContent = document.getElementById("dynamicAppContent");
    videoSection = document.getElementById("videoSection");
    video = document.getElementById("webcam");
    canvas = document.getElementById("canvas"); 
    loader = document.getElementById("loader");
    startBtn = document.getElementById("startBtn");
    statusEl = document.getElementById("status");
    timerEl = document.getElementById("timer");
    motivationEl = document.getElementById("motivation");
    actionsEl = document.getElementById("actions");
    quitPrompt = document.getElementById("quitPrompt");
    quitYesBtn = document.getElementById("quitYesBtn");
    quitNoBtn = document.getElementById("quitNoBtn");
    gifts1 = document.getElementById("gifts1");
    gifts2 = document.getElementById("gifts2");
    fortuneDiv = document.getElementById("fortune");
    fortuneBox = document.getElementById("fortune-box");
    fortuneMessage = document.getElementById("fortuneMessage");
    finalScreen = document.getElementById("final");
    internetErrorEl = document.getElementById("internetError");
    retryConnectionBtn = document.getElementById("retryConnectionBtn");
    
    const savedLang = localStorage.getItem('preferred_lang') || navigator.language.slice(0, 2);
    setLanguage(savedLang);

    initializeAdMob();

    for (let i = 0; i < 5; i++) { createFloatingEmoji(); }
    emojiInterval = setInterval(createFloatingEmoji, 1500);
    
    if (checkInternetConnection()) {
        loadAll();
    }

    window.addEventListener('offline', () => checkInternetConnection());
    window.addEventListener('online', () => {
        internetErrorEl.classList.add("hidden");
        if (!modelsLoaded) {
            loader.classList.remove("hidden");
            loadAll();
        }
    });

    if (retryConnectionBtn) {
        retryConnectionBtn.addEventListener("click", () => {
            if (checkInternetConnection()) {
                loader.classList.remove("hidden");
                loadAll();
            }
        });
    }

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            welcomeScreen.classList.add("hidden");
            mainApp.classList.remove("hidden");
            
            const titleFrame = document.querySelector('#app-title-frame');
            if (titleFrame) titleFrame.classList.add("hidden");
            if(statusEl) statusEl.classList.add("hidden"); 

            const t = translations[localStorage.getItem('preferred_lang') || 'en'] || translations['en'];

            dynamicAppContent.innerHTML = `
                <div id="commitmentContainer" style="max-width: 340px; width: 90%; margin: 30px auto; position: relative;">
                    <img src="images/smiley_questionbox.png" alt="Smiley character with whiteboard" style="width: 100%; height: auto; display: block;">
                    <div id="signboardTextCommitment" style="position: absolute; top: 15%; left: 10%; width: 85%; text-align: center; color: var(--text-title); font-size: 1rem; font-weight: 700;">
                        <div style="font-size: 1rem; margin-bottom: 15px; line-height: 1.3;">
                            ${t.commitmentText}
                        </div>
                        
                        <div id="duration-container" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                            <button id="freshSmileBtn" class="btn action-positive" style="font-size: 0.9rem; padding: 8px 16px;">${t.freshBtn}</button>
                            <button id="powerSmileBtn" class="btn action-positive" style="font-size: 0.9rem; padding: 8px 16px;">${t.powerBtn}</button>
                        </div>

                    </div>
                </div>`;
            
            const freshBtn = document.getElementById('freshSmileBtn');
            const powerBtn = document.getElementById('powerSmileBtn');

            if (freshBtn) {
                freshBtn.disabled = !modelsLoaded;
                freshBtn.onclick = () => startChallenge(PHASE1_DURATION, 1);
            }
            if (powerBtn) {
                powerBtn.disabled = !modelsLoaded;
                powerBtn.onclick = () => startChallenge(PHASE2_DURATION, 2);
            }
        });
    }

    const hardResetBtn = document.getElementById("hardResetBtn");
    if (hardResetBtn) {
        hardResetBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to restart the current game?")) resetGame();
        });
    }

    if (quitYesBtn) {
        quitYesBtn.addEventListener("click", () => {
            if (isGiftExitMode) {
                resetGame(); 
                isGiftExitMode = false; 
            } else {
                handleQuit();
            }
        });
    }

    if (quitNoBtn) {
        quitNoBtn.addEventListener("click", () => {
            quitPrompt.classList.add("hidden"); 
            
            if (isGiftExitMode) {
                isGiftExitMode = false; 
            } else {
                nonSmileTimer = 0; 
                startChallenge(remaining, currentPhase, true); 
            }
        });
    }

    if (fortuneDiv) fortuneDiv.addEventListener('click', (event) => {
        if (fortuneReadyToDismiss) {
            fortuneDiv.classList.add("hidden");
            fortuneReadyToDismiss = false; 
            if (currentPhase === 1) {
                document.getElementById('gifts1').classList.add("hidden");  
                quitGame(getTranslation('finalMsg1'), true);
            } else {
                document.getElementById('gifts2').classList.add("hidden"); 
                quitGame(getTranslation('finalMsg2'), true);
            }
        }
    });

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
        const App = window.Capacitor.Plugins.App;

        App.addListener('backButton', () => {
            if (!quitPrompt.classList.contains("hidden")) {
                quitNoBtn.click();
                return;
            }

            if (isChallengeRunning) {
                isGiftExitMode = false;
                clearAllIntervals();
                
                document.querySelector("#quitPrompt-box h3").textContent = getTranslation('quitGameTitle');
                quitYesBtn.textContent = getTranslation('quitGameYes');
                quitNoBtn.textContent = getTranslation('quitGameNo');

                statusEl.textContent = getTranslation('paused');
                statusEl.classList.remove("hidden");
                motivationEl.classList.add('hidden');
                quitPrompt.classList.remove("hidden");
                return;
            }

            const gifts1Visible = !document.getElementById('gifts1').classList.contains("hidden");
            const gifts2Visible = !document.getElementById('gifts2').classList.contains("hidden");
            const gifVisible = document.getElementById('interstitialGif').style.display === 'block';
            const fortuneVisible = !document.getElementById('fortune').classList.contains("hidden");

            if (gifts1Visible || gifts2Visible || gifVisible || fortuneVisible) {
                isGiftExitMode = true; 

                if (fortuneVisible) {
                     document.querySelector("#quitPrompt-box h3").innerHTML = getTranslation('quoteExitPrompt');
                     quitYesBtn.textContent = getTranslation('quoteExitYes');   
                     quitNoBtn.textContent = getTranslation('quoteExitNo');  
                } else {
                     document.querySelector("#quitPrompt-box h3").innerHTML = getTranslation('giftExitPrompt');
                     quitYesBtn.textContent = getTranslation('giftExitYes');    
                     quitNoBtn.textContent = getTranslation('giftExitNo');   
                }

                quitPrompt.classList.remove("hidden");
                return;
            }

            if (!document.getElementById('intro').classList.contains("hidden")) {
                App.exitApp();
                return;
            }

            resetGame();
        });
    }
});