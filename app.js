// Simple web metronome + speech command prototype
// Works best in Chrome/Edge desktop. Mobile/Firefox support varies.

const LANGUAGE_KEY = 'metronome_language';
const DEFAULT_LANGUAGE = 'en-US';

let audioCtx = null;
let isPlaying = false;
let currentBpm = 100;
const bpmEl = document.getElementById('bpm');
const elapsedEl = document.getElementById('elapsed');
const statusEl = document.getElementById('status');

let startTime = 0;
let elapsedInterval = null;

// Scheduling variables (based on common "lookahead" scheduler)
let nextNoteTime = 0.0;      // when the next click should play (audio context time)
let scheduleAheadTime = 0.1; // seconds to schedule ahead
let lookahead = 25.0;        // ms between scheduler runs
let schedulerTimerID = null;

// Announcements: every N seconds (provides periodic time updates while practicing)
const announceIntervalSeconds = 50;
let lastAnnouncedMul = 0;

// create a short click sound (using oscillator)
function playClick(time, strong = true) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'square';
  o.frequency.value = strong ? 1000 : 800;
  g.gain.setValueAtTime(0.0, time);
  g.gain.linearRampToValueAtTime(0.5, time + 0.001);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(time);
  o.stop(time + 0.06);
}

// schedule notes ahead
function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    // schedule the click
    playClick(nextNoteTime, true);
    // compute next note time
    const secondsPerBeat = 60.0 / currentBpm;
    nextNoteTime += secondsPerBeat;
  }
}

// start metronome
function startMetronome() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  isPlaying = true;
  startTime = audioCtx.currentTime;
  nextNoteTime = audioCtx.currentTime + 0.05;
  lastAnnouncedMul = 0;
  schedulerTimerID = setInterval(() => {
    scheduler();
  }, lookahead);
  elapsedInterval = setInterval(updateElapsedAndAnnounce, 100);
  statusEl.textContent = 'Status: playing (voice enabled)';
}

// stop metronome
function stopMetronome() {
  isPlaying = false;
  if (schedulerTimerID) clearInterval(schedulerTimerID);
  if (elapsedInterval) clearInterval(elapsedInterval);
  statusEl.textContent = 'Status: stopped';
}

// update elapsed and announce multiples of announceIntervalSeconds
function updateElapsedAndAnnounce() {
  const elapsed = audioCtx ? (audioCtx.currentTime - startTime) : 0;
  elapsedEl.textContent = elapsed.toFixed(1);
  // Check multiples
  const mul = Math.floor(elapsed / announceIntervalSeconds);
  if (mul > 0 && mul > lastAnnouncedMul) {
    lastAnnouncedMul = mul;
    const toSay = (mul * announceIntervalSeconds).toString();
    speakString(toSay);
  }
}

// Text-to-speech
function speakString(s) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(s);
  // Load language preference from localStorage
  const savedLang = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  u.lang = savedLang;
  u.rate = 1.0;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// Voice recognition
let recognition = null;
let voiceEnabled = false;

function enableVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('SpeechRecognition not supported in this browser. Use Chrome/Edge on desktop.');
    return;
  }
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  // Load language preference from localStorage
  const savedLang = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  recognition.lang = savedLang;
  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        const text = event.results[i][0].transcript.trim().toLowerCase();
        console.log('Heard:', text);
        handleCommand(text);
      }
    }
  };
  recognition.onerror = (e) => {
    console.warn('Recognition error', e);
  };
  recognition.onend = () => {
    // auto-restart to keep listening
    if (voiceEnabled) recognition.start();
  };
  recognition.start();
  voiceEnabled = true;
  statusEl.textContent = isPlaying ? 'Status: playing (voice enabled)' : 'Status: stopped (voice enabled)';
}

// Command handling
function handleCommand(text) {
  // direct start/stop
  if (/\bstart\b/.test(text)) {
    if (!isPlaying) startMetronome();
    return;
  }
  if (/\bstop\b/.test(text) || /\bpause\b/.test(text)) {
    if (isPlaying) stopMetronome();
    return;
  }

  // set X bpm
  const setMatch = text.match(/set\s+(\d{1,3})\s*(bpm)?/);
  if (setMatch) {
    const n = parseInt(setMatch[1], 10);
    if (n >= 20 && n <= 300) {
      currentBpm = n;
      bpmEl.textContent = currentBpm;
      speakString(`Set to ${currentBpm} beats per minute`);
    }
    return;
  }

  // faster/slower with modifiers
  let delta = 0;
  if (/\ba bit faster\b/.test(text) || /\ba little faster\b/.test(text)) delta = 2;
  else if (/\bmuch faster\b/.test(text) || /\bway faster\b/.test(text)) delta = 25;
  else if (/\bfaster\b/.test(text)) delta = 15;
  else if (/\ba bit slower\b/.test(text) || /\ba little slower\b/.test(text)) delta = -2;
  else if (/\bmuch slower\b/.test(text) || /\bway slower\b/.test(text)) delta = -25;
  else if (/\bslower\b/.test(text)) delta = -15;

  if (delta !== 0) {
    currentBpm = Math.max(20, Math.min(300, currentBpm + delta));
    bpmEl.textContent = currentBpm;
    speakString(currentBpm.toString());
    return;
  }

  // optionally: set by "faster by X" numeric
  const incMatch = text.match(/faster\s+by\s+(\d{1,3})/);
  if (incMatch) {
    currentBpm = Math.max(20, Math.min(300, currentBpm + parseInt(incMatch[1], 10)));
    bpmEl.textContent = currentBpm;
    speakString(currentBpm.toString());
    return;
  }
  const decMatch = text.match(/slower\s+by\s+(\d{1,3})/);
  if (decMatch) {
    currentBpm = Math.max(20, Math.min(300, currentBpm - parseInt(decMatch[1], 10)));
    bpmEl.textContent = currentBpm;
    speakString(currentBpm.toString());
    return;
  }

  // unknown command
  console.log('Unknown command:', text);
}

// Wire UI
document.getElementById('startBtn').addEventListener('click', () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (!isPlaying) startMetronome();
});
document.getElementById('stopBtn').addEventListener('click', () => {
  if (isPlaying) stopMetronome();
});
document.getElementById('voiceBtn').addEventListener('click', () => {
  if (!voiceEnabled) {
    enableVoice();
    document.getElementById('voiceBtn').textContent = 'Voice ON';
  } else {
    voiceEnabled = false;
    if (recognition) recognition.stop();
    document.getElementById('voiceBtn').textContent = 'Enable Voice';
  }
});
