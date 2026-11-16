# R.E.P.O. StreamElements Overlay

**Status:** Design approved; implementation ready  
**Repository:** `rydrakeandlonk-rgb/custom-stream-elements-assets`  
**Canvas:** 1920 × 1080  
**Platform:** StreamElements Custom Widget + OBS Browser Source

## Creative direction

**Industrial Extraction Terminal** — a gameplay-first overlay that feels like equipment belonging inside the R.E.P.O. world. Gameplay remains the primary visual content. The overlay supplies a security-monitor camera treatment, temporary communications, compact mission information and optional game-specific modules.

The game and camera remain separate OBS sources. The StreamElements widget draws the decorative overlay and transparent source windows; it does not capture, resize or crop those sources.

## Locked design decisions

| Area | Specification |
|---|---|
| Composition | Gameplay-first; full-canvas 1920 × 1080 |
| Camera treatment | Medium industrial security monitor, approximately 380 × 260 px overall |
| Camera aperture | Transparent window sized to the OBS camera source |
| Chat | Temporary messages; fade in, remain approximately 12 seconds, then fade out |
| Chat capacity | Up to 4 simultaneously visible messages |
| Background | Transparent by default; optional subtle atmosphere can be enabled later |
| Branding | Small Spectrum signature; Rydrake orange primary accent with restrained Spectrum purple |
| Modules | Independently selectable |
| Delivery | One complete StreamElements Custom Widget (HTML, CSS, JS and Fields) |

## Visual language

### Palette

| Token | Value | Use |
|---|---|---|
| Graphite | `#171C20` | Main dark metal |
| Deep graphite | `#101417` | Recesses and shadow |
| Steel | `#59636B` | Housing, seams and hardware |
| Warning yellow | `#E5B83F` | Hazard markings and warning labels |
| Recovery orange | `#E58A39` | Rydrake accent and active indicators |
| Spectrum purple | `#9B6BD6` | Small shared-brand details |
| Terminal green | `#83C78A` | Positive/ready status |
| Primary text | `#F0F0EC` | Main labels |
| Muted text | `#AAB1B5` | Secondary information |

Use dark surfaces with controlled contrast. Avoid large bright panels, excessive hazard stripes, flashing effects or strong glow. Mechanical details should support the monitor silhouette, not become visual noise.

### Typography

- Use a compact, legible sans-serif for messages and longer text.
- Use a squared/condensed utility face for short terminal labels where available.
- Use uppercase, tracked labels sparingly (e.g. `CAM 01`, `REC`, `MISSION LOG`).
- Never sacrifice readability for a game-like typeface.

## Screen composition

Coordinates below are initial design targets on the 1920 × 1080 canvas. They must be reviewed against the supplied gameplay screenshots and adjusted before the first live test.

### Gameplay

- Gameplay remains a separate, full-screen OBS source.
- No opaque gameplay plate or permanent frame.
- Do not place decorative elements over important game HUD areas.
- Keep the central play area visually clear.

### Camera monitor

- Initial overall footprint: approximately 380 × 260 px.
- Initial anchor: lower-left corner with safe margins.
- Use a chunky industrial security-monitor housing, layered steel edges, small bolts/fasteners, restrained orange status light and tiny `CAM 01` / `REC` labels.
- The inner camera aperture must remain fully transparent.
- The OBS camera source must be positioned and sized to fit the aperture exactly.
- Keep monitor chrome outside the camera aperture; do not add an opaque screen fill.

### Temporary chat

- No permanent chat panel or empty-state container.
- Place incoming messages in a compact transmission stack in a clear lower-screen region that does not overlap the camera monitor or important game HUD.
- Up to four visible messages; newest message enters at the bottom.
- Each message fades/slides in, remains for approximately 12 seconds, then fades out.
- Older messages expire independently.
- Username uses the author's StreamElements colour when supplied, otherwise the streamer accent.
- Message content must be inserted using `textContent` / text nodes, never raw HTML.
- Long messages wrap within a fixed maximum width.

### Mission information

- Compact terminal-style panel in the lower-right region, subject to gameplay HUD verification.
- Editable operation title and objective text.
- Optional progress value/label.
- Optional community activity notification.
- Hide the entire panel when all relevant options are disabled or empty; do not show a large empty container.

### Spectrum signature

- Small top-left signature.
- Use the approved Spectrum mark asset if available; do not invent or distort a replacement logo.
- Show streamer name and orange accent.
- Keep it compact and avoid competing with the game's top-left HUD. If the gameplay capture has important information in that exact area, relocate or disable the signature.

## Optional game modules

Each module must have its own enable/disable setting. Modules are not all shown by default.

1. **Creature database**
   - Reuse the existing R.E.P.O. creature checklist/artwork where possible.
   - Selectable creature entries and optional discovered/encountered state.
   - Keep it compact; no permanent large roster.

2. **Threat identification**
   - Select a creature or boss from a StreamElements dropdown.
   - Display the matching repository-hosted asset.
   - Support static images and animated media (GIF/WebP/video) where the widget/browser supports the format.
   - Include a safe fallback when an asset fails to load.

3. **Recovery tracker**
   - Editable objective, recovered-value target or simple progress display.
   - Manual configuration initially; do not imply automatic game-state detection.
   - Keep it hidden unless enabled.

4. **Community activity**
   - Event-driven follow, subscription, gifted-sub, cheer and raid notifications.
   - Short-lived notification treatment consistent with the communications terminal.
   - Use StreamElements event payloads and normalise each supported event type defensively.

## StreamElements configuration

The finished widget should expose a clear Fields tab for:

- Streamer name and accent colour.
- Camera monitor visibility and overall size/position preset.
- Temporary chat enable/disable, message duration, maximum visible messages and width.
- Mission panel enable/disable, operation title, objective and optional progress.
- Creature database enable/disable and selected entries/state.
- Threat display enable/disable and selected creature/boss asset.
- Recovery tracker enable/disable and editable values.
- Community activity enable/disable and notification duration.
- Optional debug labels for OBS source alignment.

Keep visual styling in CSS, behaviour in JS and user-editable values in Fields. Avoid requiring users to edit source code for routine stream changes.

## Implementation architecture

- One complete 1920 × 1080 transparent StreamElements Custom Widget.
- Separate HTML, CSS, JS and Fields code, matching StreamElements' widget editor.
- Use a single root overlay and clearly named component containers.
- Use CSS custom properties for palette, coordinates, sizing and spacing.
- Use configuration-driven module visibility; disabled modules should not reserve space.
- Keep event normalisation and rendering separate.
- Use safe DOM construction and text insertion for all user-generated content.
- Avoid unnecessary timers, polling and external runtime dependencies.
- Use stable HTTPS raw asset URLs from this repository.
- Do not add a build step, GitHub Actions workflow, backend service or external database for this overlay.

## Asset plan

Create and keep R.E.P.O.-specific assets under `games/repo/assets/`, grouped by purpose:

```
games/repo/
  README.md
  fields.json
  assets/
    camera/
    icons/
    creatures/
    threats/
    textures/
```

Use existing approved Spectrum assets and existing R.E.P.O. artwork where suitable. Do not duplicate assets already stored elsewhere in the repository unless a game-specific copy is necessary for a stable standalone overlay.

## Build and test sequence

1. Inspect available R.E.P.O. assets and choose the exact logo/creature files to reuse.
2. Implement the HTML structure and Fields configuration.
3. Build the camera monitor and transparent aperture first.
4. Add temporary chat and verify message expiry/stacking with StreamElements test events.
5. Add mission information and event notifications.
6. Add optional game modules and asset selection.
7. Verify at 1920 × 1080 and check a smaller scaled preview.
8. Align the OBS camera source to the transparent monitor aperture.
9. Test against real R.E.P.O. gameplay to confirm the HUD remains unobstructed.
10. Tune positions, text sizing and animation timing before calling the overlay production-ready.

## Acceptance checklist

- [ ] Entire overlay is one StreamElements browser source.
- [ ] Canvas is 1920 × 1080 and page background is transparent.
- [ ] Gameplay remains a separate OBS source and is unobstructed.
- [ ] Camera aperture is transparent and aligns with the camera OBS source.
- [ ] Camera monitor reads as an industrial security device at normal viewing size.
- [ ] Chat is temporary, limited to four visible messages and expires independently.
- [ ] Chat and event content are rendered safely as text.
- [ ] Mission panel can be hidden and does not show an empty state.
- [ ] Each game-specific module can be enabled independently.
- [ ] Threat selector supports the available asset formats with a fallback.
- [ ] StreamElements Fields cover routine configuration.
- [ ] No unnecessary backend, polling or GitHub Actions dependency.
- [ ] Important R.E.P.O. HUD elements remain visible.
