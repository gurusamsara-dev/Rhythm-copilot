# Branch Structure Setup for Rhythm Copilot

## Overview
This document describes the branch structure created for the Rhythm Copilot repository and the web prototype that has been added.

## Branch Structure

The following branch hierarchy has been established:

```
main (stable production)
├── development (active development)
│   ├── test (staging/testing)
│   └── feature/voice-metronome-v1 (voice-controlled metronome prototype)
```

### Branch Details

1. **main** - Stable production branch (already existed)
2. **development** - Active development branch, created from `main`
3. **test** - Staging/testing branch, created from `development`
4. **feature/voice-metronome-v1** - Feature branch with the voice-controlled metronome web prototype

## Web Prototype

The `web-prototype/` folder has been added to the `feature/voice-metronome-v1` branch and merged into `development` and `test` branches. It contains:

### Files Added
- `web-prototype/index.html` - Main HTML file for the prototype
- `web-prototype/app.js` - JavaScript implementation with metronome and voice command logic

### Features
The web prototype implements:
- **Metronome**: Precise audio-context-based metronome with configurable BPM (20-300)
- **Voice Commands**: Speech recognition for hands-free control
  - "start" / "stop" - Control playback
  - "faster" / "slower" - Adjust tempo (±5 BPM)
  - "a bit faster/slower" - Small adjustments (±2 BPM)
  - "much faster/slower" - Large adjustments (±10 BPM)
  - "set X bpm" - Set specific tempo (e.g., "set 120 bpm")
- **Text-to-Speech**: Announces elapsed time at 50-second intervals and confirms tempo changes
- **UI Controls**: Manual buttons for start/stop and voice activation

## How to Run

1. Clone the repository
2. Navigate to the repository root
3. Open `web-prototype/index.html` in a modern browser (Chrome or Edge recommended)
4. Click "Enable Voice" to activate voice commands
5. Allow microphone access when prompted
6. Use voice commands or UI buttons to control the metronome

## Browser Compatibility

- **Best support**: Chrome/Edge on desktop
- **Limited support**: Firefox (Web Speech API support varies)
- **Mobile**: Speech recognition support varies by platform and browser

## Technical Notes

### Implementation Highlights
- Uses Web Audio API for precise audio scheduling
- Implements lookahead scheduler pattern for accurate timing
- Uses Web Speech API (SpeechRecognition and SpeechSynthesis)
- No external dependencies - vanilla JavaScript only

### Known Limitations
- Speech recognition is browser-dependent and may not work in all environments
- For production use, consider native mobile implementations or cloud-based speech services
- Requires HTTPS in production for microphone access

## Next Steps

### Required Manual Actions

Due to sandboxed environment limitations, the following steps need to be completed manually:

1. **Push branches to remote**:
   ```bash
   git push origin development
   git push origin test
   git push origin feature/voice-metronome-v1
   ```

2. **Create Pull Request**:
   - Create a PR from `feature/voice-metronome-v1` into `development`
   - Title: "Add voice-controlled metronome prototype (web)"
   - Description should include:
     - Short summary of features
     - Branch structure explanation
     - How to run instructions
     - Browser compatibility notes
   - Add labels: `feature`, `prototype`
   - Assign to: `gurusamsara-dev`

## Branch Creation Log

Branches were created locally with the following relationships:
- `development` branched from `main` at commit `1bdf325`
- `test` branched from `development` at commit `1bdf325`
- `feature/voice-metronome-v1` branched from `development` at commit `1bdf325`
- Web prototype files added to `feature/voice-metronome-v1`
- Feature branch merged into `development`
- `development` merged into `test`

## Verification

To verify the branch structure locally:
```bash
git log --oneline --graph --all
```

Expected output should show the merge commits from `feature/voice-metronome-v1` → `development` → `test`.
