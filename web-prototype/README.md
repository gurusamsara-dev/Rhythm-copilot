# Rhythm Copilot - Web Prototype

A voice-controlled metronome web application prototype with hands-free operation.

## Quick Start

1. Open `index.html` in Chrome or Edge browser
2. Click the "Enable Voice" button
3. Allow microphone access
4. Say "start" to begin the metronome
5. Use voice commands to control tempo and playback

## Voice Commands

### Playback Control
- **"start"** - Start the metronome
- **"stop"** or **"pause"** - Stop the metronome

### Tempo Adjustments
- **"faster"** - Increase by 5 BPM
- **"slower"** - Decrease by 5 BPM
- **"a bit faster"** or **"a little faster"** - Increase by 2 BPM
- **"a bit slower"** or **"a little slower"** - Decrease by 2 BPM
- **"much faster"** or **"way faster"** - Increase by 10 BPM
- **"much slower"** or **"way slower"** - Decrease by 10 BPM

### Direct Tempo Setting
- **"set 120 bpm"** - Set specific tempo (30-300 BPM)
- **"faster by 15"** - Increase by specific amount
- **"slower by 10"** - Decrease by specific amount

## Features

- **Precise Audio Timing**: Uses Web Audio API with lookahead scheduling for accurate metronome clicks
- **Voice Recognition**: Continuous listening for natural language commands
- **Text-to-Speech Feedback**: Announces elapsed time every 50 seconds and confirms tempo changes
- **BPM Range**: Supports 20-300 BPM
- **Manual Controls**: Fallback UI buttons if voice commands are unavailable
- **Real-time Display**: Shows current BPM and elapsed time

## Browser Requirements

### Recommended
- Chrome 33+ (desktop)
- Edge 79+ (desktop)

### Limited Support
- Firefox (Web Speech API support is inconsistent)
- Safari (SpeechRecognition not supported)
- Mobile browsers (varies by platform)

### Required Features
- Web Audio API
- Web Speech API (SpeechRecognition and SpeechSynthesis)
- Microphone access

## Implementation Details

### Architecture
- **No Dependencies**: Pure vanilla JavaScript
- **Scheduler Pattern**: Implements lookahead scheduling for precise timing
- **Event-Driven**: Uses browser APIs for speech and audio events

### File Structure
- `index.html` - UI markup and styling
- `app.js` - Application logic, audio scheduling, and voice command handling

### Key Components
1. **Audio Engine**: Web Audio API with oscillator-based click generation
2. **Scheduler**: Lookahead scheduling with 0.1 second (100ms) buffer
3. **Voice Recognition**: Continuous speech recognition with command parsing
4. **TTS Announcements**: Periodic time announcements via Speech Synthesis API

## Known Limitations

1. **Browser Dependency**: Speech recognition is not universally supported
2. **Microphone Required**: Voice commands need microphone access
3. **HTTPS Required**: In production, microphone access requires HTTPS
4. **Background Limitations**: Tab must be visible/audible for consistent performance
5. **Accent Sensitivity**: Recognition accuracy varies with accents and speech patterns

## Future Enhancements

For production deployment, consider:
- Native mobile applications (iOS/Android)
- Cloud-based speech recognition (Google Cloud Speech, Azure Speech)
- Offline capability with local speech models
- Additional voice commands (time signatures, accent patterns)
- Visual metronome indicators
- Tempo tapping to set BPM
- Preset tempo markings (Allegro, Andante, etc.)
- Practice session recording and playback

## Development

This is a prototype demonstrating the core concept. For production use:
- Add error handling and user feedback
- Implement fallback mechanisms for unsupported browsers
- Add analytics to understand usage patterns
- Create responsive mobile-optimized UI
- Add comprehensive testing
- Consider accessibility features (screen reader support)

## License

Part of the Rhythm Copilot project.
