# Voice-Controlled Metronome Prototype

A web-based metronome with voice command support.

## Features

- **Voice Commands**: Control the metronome with natural language
  - "start" / "stop" - Control playback
  - "faster" / "slower" - Adjust tempo (±5 BPM)
  - "a bit faster" / "a bit slower" - Fine adjustments (±2 BPM)
  - "much faster" / "much slower" - Large adjustments (±10 BPM)
  - "set 120 bpm" - Set specific tempo (20-300 BPM range)

- **Precise Timing**: Uses Web Audio API with lookahead scheduler for accurate timing
- **Visual Feedback**: Real-time BPM, elapsed time, and status display
- **Speech Announcements**: Announces elapsed time every 50 seconds
- **Manual Controls**: Buttons for Start, Stop, and Enable Voice

## Browser Compatibility

Works best in:
- ✅ Chrome (desktop)
- ✅ Edge (desktop)
- ⚠️ Firefox (limited speech recognition support)
- ⚠️ Mobile browsers (varies by platform)

## Usage

### Local Testing

1. Open `index.html` in a web browser (Chrome/Edge recommended)
2. Click "Enable Voice" to activate voice recognition
3. Grant microphone permissions when prompted
4. Use voice commands or manual buttons to control the metronome

### Alternative: Use a local server

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server -p 8000
```

Then open: `http://localhost:8000`

## Deployment

See [GITHUB_PAGES_DEPLOYMENT.md](../GITHUB_PAGES_DEPLOYMENT.md) for instructions on deploying to GitHub Pages.

## Technical Details

- **Audio Generation**: Web Audio API oscillator for click sounds
- **Scheduling**: Lookahead scheduler (25ms interval, 100ms lookahead)
- **Speech Recognition**: Web Speech API (continuous recognition)
- **Speech Synthesis**: Web Speech Synthesis API for announcements
- **BPM Range**: 20-300 BPM with validation

## Files

- `index.html` - Main HTML interface
- `app.js` - JavaScript implementation (metronome logic, voice control, audio)

## Security

✅ CodeQL security scan: 0 vulnerabilities found
