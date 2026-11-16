# R.E.P.O. StreamElements Overlay

**Status:** First implementation scaffold committed; ready for StreamElements import and visual testing.  
**Canvas:** 1920 × 1080  
**Platform:** Seven StreamElements Custom Widgets in one overlay.

## Architecture

This overlay uses seven independent Custom Widgets rather than one large widget. Each component has its own HTML, CSS, JavaScript and Fields JSON under [widgets](widgets/README.md). Every widget uses a transparent 1920 × 1080 canvas so all visible components share the same coordinate system.

## Design direction

**Industrial Extraction Terminal** — gameplay-first, with dark graphite metal, worn steel, restrained warning yellow, recovery orange and small Spectrum purple details. The game remains the primary visual content.

## Included widgets

1. Camera monitor — medium industrial security monitor with transparent camera aperture.
2. Communications — temporary chat and event notifications.
3. Mission terminal — editable operation title and objective.
4. Creature database — optional clickable creature checklist.
5. Threat display — optional dropdown-selected threat with four configurable media slots.
6. Recovery tracker — optional editable progress display.
7. Spectrum identity — compact streamer/Spectrum signature.

Camera monitor, mission terminal and identity are enabled by default. Communications has chat and event notifications enabled. Creature database, threat display and recovery tracker are disabled until configured.

## Current asset status

No R.E.P.O.-specific artwork was found in this repository during the initial implementation pass. The threat widget therefore has four configurable HTTPS asset URL slots. The creature checklist accepts editable names through Fields. Populate the media slots when the correct R.E.P.O. artwork is available.

## Installation

Follow [the widget installation guide](widgets/README.md). Create each Custom Widget in StreamElements, paste the four matching files into HTML/CSS/JS/Fields, and add all seven elements to the same StreamElements overlay. Set each element to 1920 × 1080 at X=0, Y=0, then arrange its layer order as documented.

## Testing sequence

1. Import the seven widgets into one StreamElements overlay.
2. Confirm each widget is full-canvas and transparent.
3. Align the camera OBS source to the monitor aperture.
4. Test chat and each supported event type using StreamElements test events.
5. Configure creature names and threat media slots.
6. Test against actual R.E.P.O. gameplay and move elements away from important HUD areas.

## Limitations

- No automatic R.E.P.O. game-state detection is included. Threat selection, checklist state and recovery values are manually controlled.
- Creature checklist click state is local to the widget instance and is not persisted.
- Event payloads can vary; validate each event type in StreamElements before production.
- No backend, polling, shared database or GitHub Actions is required.
