# R.E.P.O. StreamElements Widgets

Seven independent Custom Widgets live inside one StreamElements overlay. Each widget has its own HTML, CSS, JS and Fields JSON files. Each root is a transparent 1920 × 1080 canvas so visible components share one coordinate space.

## Widget order

1. `camera-monitor` — industrial monitor with transparent aperture.
2. `mission-terminal` — editable operation and objective.
3. `recovery-tracker` — optional salvage progress.
4. `creature-database` — optional clickable checklist.
5. `threat-display` — optional selectable threat artwork.
6. `communications` — temporary chat and event notifications.
7. `spectrum-identity` — streamer/Spectrum signature.

## Installing

For each folder, create a StreamElements Custom Widget and paste `html.html` into HTML, `css.css` into CSS, `js.js` into JS and `fields.json` into the Fields JSON editor.

Set each widget element to 1920 × 1080 at X=0, Y=0 in the StreamElements overlay editor. Keep all seven elements in the same overlay and arrange their layer order as above.

## Defaults

- Camera monitor, mission terminal and Spectrum identity enabled.
- Chat and event notifications enabled; up to four chat messages, approximately 12 seconds each.
- Creature database, threat display and recovery tracker disabled until configured.
- Threat display has four configurable name/classification/asset URL slots.
- Creature database accepts a comma-separated list of names.

## Asset status

No R.E.P.O.-specific artwork was found in the repository during this implementation pass. Add stable HTTPS asset URLs to the threat widget's Fields once the correct assets are available.

## Notes

- Do not resize an individual widget iframe to the size of its visible panel. Keep the full-canvas element and adjust the visible component within it.
- Place the camera OBS source below the StreamElements overlay and align it with the monitor's transparent aperture.
- Chat and event content is rendered as text rather than injected HTML.
- Validate actual StreamElements test event payloads before production.
- No backend, polling, shared storage or GitHub Actions is required for this first version.
