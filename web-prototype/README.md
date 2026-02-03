# Voice-Controlled Metronome Web Prototype

> For repository branch structure and overall project information, see the [main README](../README.md).

## Web Prototype Files

The following files have been added to the `web-prototype/` directory:

### index.html
A simple HTML page with:
- Display for BPM (beats per minute)
- Elapsed time counter
- Status indicator
- Control buttons (Start, Stop, Enable Voice)
- Instructions for voice commands

### app.js
JavaScript implementation featuring:
- Web Audio API-based metronome with precise timing
- Speech Recognition API for voice commands
- Speech Synthesis API for audio feedback
- Support for commands:
  - "start" / "stop" - Control playback
  - "faster" / "slower" - Adjust tempo by 5 BPM
  - "a bit faster/slower" - Adjust by 2 BPM
  - "much faster/slower" - Adjust by 10 BPM
  - "set X bpm" - Set specific tempo (30-300 BPM)
  - "faster/slower by X" - Adjust by specific amount

## Browser Compatibility

Works best in:
- Chrome (desktop)
- Edge (desktop)

Limited support in:
- Firefox (Web Speech API support varies)
- Mobile browsers (varies by platform)

## Usage

1. Open `index.html` in a compatible browser
2. Click "Start" to begin the metronome
3. Click "Enable Voice" to activate voice control
4. Grant microphone permissions when prompted
5. Use voice commands to control the metronome
