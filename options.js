// options.js - Language selection for Rhythm Copilot

// Available languages with their codes and names
const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'es-MX', name: 'Spanish (Mexico)' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'hi-IN', name: 'Hindi' }
];

// Get current language from localStorage or default to en-US
function getCurrentLanguage() {
  return localStorage.getItem('metronome_language') || 'en-US';
}

// Save language to localStorage
function saveLanguage(langCode) {
  localStorage.setItem('metronome_language', langCode);
  updateCurrentDisplay(langCode);
}

// Update the current language display
function updateCurrentDisplay(langCode) {
  const lang = languages.find(l => l.code === langCode);
  if (lang) {
    document.getElementById('currentLangDisplay').textContent = lang.name;
  }
}

// Create language option elements
function createLanguageOptions() {
  const grid = document.getElementById('languageGrid');
  const currentLang = getCurrentLanguage();
  
  languages.forEach(lang => {
    const option = document.createElement('div');
    option.className = 'language-option';
    if (lang.code === currentLang) {
      option.classList.add('selected');
    }
    
    option.innerHTML = `
      <div class="language-name">${lang.name}</div>
      <div class="language-code">${lang.code}</div>
    `;
    
    option.addEventListener('click', () => {
      // Remove selected class from all options
      document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      // Add selected class to clicked option
      option.classList.add('selected');
      // Save the selection
      saveLanguage(lang.code);
    });
    
    grid.appendChild(option);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  createLanguageOptions();
  updateCurrentDisplay(getCurrentLanguage());
});
