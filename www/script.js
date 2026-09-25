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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// AdMob Configuration (Test Interstitial Unit ID)
const ADMOB_INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712'; 

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
        commitmentText: "Simply SMILE wishes to give you a Fresh day with your Smile, Can you please smile"
    },
    es: { // Spanish
        title: "Simply SMILE",
        subtitle: "La sonrisa alarga tu vida, da paz.",
        startBtn: "🤍 Empezar 🤍",
        freshBtn: "Iniciar Reto Sonrisa Fresca",
        powerBtn: "Iniciar Reto Sonrisa Poderosa",
        commitmentText: "Simply SMILE quiere regalarte un día fresco con tu sonrisa. ¿Podrías sonreír?"
    },
    de: { // German
        title: "Simply SMILE",
        subtitle: "Lächeln verlängert das Leben, gibt Frieden.",
        startBtn: "🤍 Starten 🤍",
        freshBtn: "Frisches-Lächeln-Challenge starten",
        powerBtn: "Power-Lächeln-Challenge starten",
        commitmentText: "Simply SMILE möchte dir mit deinem Lächeln einen frischen Tag schenken. Kannst du bitte lächeln?"
    },
    fr: { // French
        title: "Simply SMILE",
        subtitle: "Le sourire prolonge la vie, apporte la paix.",
        startBtn: "🤍 Commencer 🤍",
        freshBtn: "Lancer le Défi Sourire Frais",
        powerBtn: "Lancer le Défi Sourire Puissant",
        commitmentText: "Simply SMILE souhaite vous offrir une journée fraîche grâce à votre sourire. Pourriez-vous sourire ?"
    },
    ja: { // Japanese
        title: "Simply SMILE",
        subtitle: "笑顔は寿命を延ばし、平和をもたらします。",
        startBtn: "🤍 スタート 🤍",
        freshBtn: "フレッシュスマイルチャレンジを開始",
        powerBtn: "パワースマイルチャレンジを開始",
        commitmentText: "Simply SMILE はあなたの笑顔で爽やかな一日をお届けしたいと思っています。笑顔をいただけますか？"
    },
    zh: { // Chinese
        title: "Simply SMILE",
        subtitle: "微笑延年益寿，带来内心的平静。",
        startBtn: "🤍 开始 🤍",
        freshBtn: "开始清新微笑挑战",
        powerBtn: "开始能量微笑挑战",
        commitmentText: "Simply SMILE 希望用您的微笑带给您崭新的一天，请笑一笑好吗？"
    }
};

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
                initializeForTesting: false, // Set to false before production release
            });
            isAdMobAvailable = true;
            console.log("✅ AdMob initialized successfully");
            
            // Register event listeners
            AdMob.addListener('interstitialAdDismissed', () => {
                isInterstitialLoaded = false;
                preloadInterstitialAd(); // Automatically preload the next ad
            });

            AdMob.addListener('interstitialAdFailedToLoad', (err) => {
                console.warn("AdMob Interstitial failed to load:", err);
                isInterstitialLoaded = false;
            });

            AdMob.addListener('interstitialAdLoaded', () => {
                isInterstitialLoaded = true;
                console.log("✅ Interstitial Ad loaded and ready");
            });

            // Preload the first interstitial ad
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
            adId: ADMOB_INTERSTITIAL_ID, // ✅ Uses global constant
            isTesting: true // Set to false before production release
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
        // Internet is Good
        if (internetErrorEl) internetErrorEl.classList.add("hidden");
        return true;
    } else {
        // No Internet
        if (internetErrorEl) internetErrorEl.classList.remove("hidden");
        if (loader) loader.classList.add("hidden"); // Hide spinner so they see the error
        return false;
    }
}


// ===================================================
// === CORE LOGIC ===
// ===================================================

async function loadAll() {
    
    if (!checkInternetConnection()) return; // Stop if offline
    if (!statusEl) console.warn("Status element not ready yet.");
  
    // Load Quotes from Firebase Firestore
    if (quotesPhase1.length === 0) {
        try {
            // Use the globally imported doc and getDoc functions directly
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

            console.log(`Loaded ${quotesPhase1.length} quotes from Firestore.`);
        } catch (error) {
            console.error("Failed to load quotes from Firestore:", error);
        }
    }  
    
    if (typeof faceapi === "undefined") {
        if(statusEl) statusEl.textContent = "❌ face-api.js not loaded.";
        return;
    }

    try {
        console.log("Attempting to load models from CDN:", MODEL_URL);

        await Promise.all([ 
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
    
        modelsLoaded = true;
        console.log("✅ All models loaded successfully from CDN");

        if (loader) loader.classList.add("hidden"); 
        
        // Enable buttons if they are currently on screen
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
        // ✅ Optimized: Restrict resolution to 640x480 for mobile performance
        const newStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 640 }, 
                height: { ideal: 480 },
                facingMode: "user" // Ensures front camera on mobile
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
                        <button id="startAgainFinalBtn" class="btn action-positive">Start Again</button>
                        <button id="finishBtn" class="btn action-negative">Finish</button>
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
        statusMessage = "You were close! Do you want to restart the Fresh Smile challenge or finish?";
        continueText = "Restart Fresh Smile";
        continueAction = () => startChallenge(PHASE1_DURATION, 1, true); 
    } else {
        statusMessage = "You were close! Do you want to try the Power Smile challenge again or finish?";
        continueText = "Restart Power Smile";
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
                    <button id="finalFinishBtn" class="btn action-negative" style="font-size: 0.9rem; padding: 8px 16px;">Finish</button>
                </div>
            </div>
        </div>`;
    actionsEl.classList.remove("hidden");

   document.getElementById('dynamicContinueBtn').onclick = continueAction;
   document.getElementById('finalFinishBtn').onclick = () => quitGame(colorfulMsg, false); 
}

function attachGiftListeners() {
    document.querySelectorAll(".gift").forEach(oldGift => {
        const newGift = oldGift.cloneNode(true);
        oldGift.parentNode.replaceChild(newGift, oldGift);
    });

    document.querySelectorAll(".gift").forEach(gift => {
      gift.addEventListener("click", function(e) {
        const target = e.currentTarget;
        const phase = parseInt(target.dataset.phase);

        document.getElementById(`gifts${phase}`).classList.add("hidden");
        
        let fortuneText;
        if (phase === 1) {
          if (!quotesPhase1 || quotesPhase1.length === 0) fortuneText = "Keep Smiling!";
          else {
              const quoteObj = quotesPhase1[Math.floor(Math.random() * quotesPhase1.length)];
              fortuneText = quoteObj.text; 
          }
          actionsEl.classList.remove("hidden");
        } else { 
          if (!quotesPhase2 || quotesPhase2.length === 0) fortuneText = "You are powerful!";
          else {
              const quoteObj = quotesPhase2[Math.floor(Math.random() * quotesPhase2.length)];
              fortuneText = quoteObj.text; 
          }
          actionsEl.classList.add("hidden"); 
        }

        let formattedText = fortuneText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

        fortuneMessage.innerHTML = formattedText;
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
      if (loader) loader.classList.add("hidden");
      if (dynamicAppContent) dynamicAppContent.classList.add("hidden");
      
      // ✅ Get active language translations dynamically so titles match instantly
      const currentLang = localStorage.getItem('preferred_lang') || 'en';
      const t = translations[currentLang] || translations['en'];

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

  statusEl.style.backgroundColor = ""; 
  statusEl.style.color = "";

  if (timerEl) timerEl.textContent = `${formatTime(remaining)}`; 

  if (!isResume) {
      statusEl.textContent = "📷 Starting Camera...";
      try {
        await startVideo(); 
        if (loader) loader.classList.add("hidden"); 
        dynamicAppContent.classList.remove("hidden"); 
        statusEl.classList.remove("hidden");
        statusEl.textContent = "🔍 Looking for a face...";
      } catch(e) {
        isChallengeRunning = false;
        if (actionsEl) actionsEl.classList.remove("hidden");
        if (loader) loader.classList.add("hidden"); 
        dynamicAppContent.classList.remove("hidden"); 
        statusEl.classList.remove("hidden"); 
        return;
      }
  } else {
      statusEl.textContent = "😁 Resume Smiling!";
  }
  
  let lastSmileTimestamp = 0; 
  let gameReady = isResume;      
  let preparingGame = isResume;  

  // 1. DETECTION LOOP
  detectionInterval = setInterval(async () => {
    if (!isChallengeRunning) return; 

    if (!modelsLoaded || !video || video.readyState < 2) {
        if(!isResume) statusEl.textContent = "⌛ Warming up sensors...";
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

            statusEl.textContent = "⚠️ Get Ready... Challenge Starts!";
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
                
                statusEl.textContent = `😁 Keep that smile! Time is moving!`;
                statusEl.classList.remove("hidden");
                motivationEl.classList.add("hidden");
            } else {
                smileActive = false;
            }
        }
    } 
    
    if (gameReady && Date.now() - lastSmileTimestamp > 1000 && isChallengeRunning) {
         statusEl.textContent = "🙂 Smile to make time move!";
         statusEl.classList.add("hidden");
         motivationEl.classList.remove("hidden");
         
         if (Math.random() > 0.95) {
             const phrases = ["Smile, you look so gorgeous!", "Smile baby!", "Smile please!", "Try to be happy!"];
             motivationEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
         }
    }
  }, 300); 

  quitPromptInterval = setInterval(checkNonSmileTimeout, 1000);

  // 2. TIMER LOOP
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
        statusEl.textContent = "⏸️ Challenge Paused. Please choose an option.";
        motivationEl.classList.add('hidden');
        quitPrompt.classList.remove("hidden"); 
    }
}

function completeChallenge() {
    clearAllIntervals();
    isChallengeRunning = false;
    stopVideo();

// ✅ Safe check before accessing classList
document.getElementById('timer')?.classList.add("hidden"); 
document.getElementById('motivation')?.classList.add("hidden"); 
document.getElementById('quitPrompt')?.classList.add("hidden"); 
document.querySelector('#app-title-frame')?.classList.add("hidden");

    // Display AdMob Interstitial Ad on completion
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
    
    updateStatus("🥳 Congratulations !! 🥳");
    statusEl.classList.remove("hidden");

    setTimeout(() => {
        gifContainer.style.display = 'none';
        document.getElementById('gifts1').classList.remove("hidden");
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
    
    updateStatus("🥳 Congratulations !! 🥳");
    statusEl.classList.remove("hidden");

    setTimeout(() => {
        gifContainer.style.display = 'none';
        document.getElementById('gifts2').classList.remove("hidden");
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

    // Initialize AdMob Plugin
    initializeAdMob();

    // Floating Emojis
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

    // ✅ Get the currently active language
    const currentLang = localStorage.getItem('preferred_lang') || 'en';
    const t = translations[currentLang] || translations['en'];

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
                quitGame("Thank you for sharing your smile! Have a nice day! 👋", true);
            }
            else {
                document.getElementById('gifts2').classList.add("hidden"); 
                quitGame("Thank you for your Smile 😊, Your Smile adds beauty to your inner self", true);
            }
        }
    });

    // Back Button Handler
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
                
                document.querySelector("#quitPrompt-box h3").textContent = "Do you want to quit your smile challenge?";
                quitYesBtn.textContent = "Quit Game";
                quitNoBtn.textContent = "Try Challenge";

                statusEl.textContent = "⏸️ Paused";
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
                     document.querySelector("#quitPrompt-box h3").innerHTML = "Still reading your quote? 📜<br>Do you want to leave?";
                     quitYesBtn.textContent = "Yes, Go Home";   
                     quitNoBtn.textContent = "No, Read Quote";  
                } else {
                     document.querySelector("#quitPrompt-box h3").innerHTML = "Don't you need your gift? 🎁<br>Your smile deserves a reward!";
                     quitYesBtn.textContent = "No, Go Home";    
                     quitNoBtn.textContent = "Yes, Get Gift";   
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