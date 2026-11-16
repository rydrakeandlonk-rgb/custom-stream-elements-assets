# Spectrum Stream Overlay Design System
**One team. Many worlds.**  
Version: 1.0 · StreamElements · OBS

## Purpose

This document is the source of truth for building Spectrum stream overlays. Each game's presentation should feel native to that game's world while remaining recognisably Spectrum and recognisably the individual streamer.

We do **not** use one fixed screen layout for every game. We use one shared visual identity and a reusable set of components, then compose those components around the game.

## The design principle

> The game sets the scene. Spectrum makes it ours.

A successful overlay should:
- Give gameplay the space and attention it deserves.
- Complement the game's visual language instead of fighting it.
- Keep the Spectrum identity recognisable without stamping the same large frame onto every game.
- Make chat, goals and community activity useful and readable.
- Remove elements that do not add to the viewing experience.

## 1. The identity system

### Always recognisable

These are the shared brand anchors. Use them consistently, but not necessarily all at once.

| Anchor | Standard |
|---|---|
| Spectrum mark | Use the approved Spectrum logo/mark where it fits naturally. Do not redraw or distort it. |
| Team palette | Purple and orange are the primary shared colours. |
| Member accents | Use the streamer's established colour as a secondary accent. |
| Typography | Prioritise readability. A game-inspired display font may be paired with a clear utility font. |
| Motion | Use restrained, purposeful transitions. Alerts should feel related across games. |
| UI language | Keep labels, spacing, information hierarchy and interaction behaviour consistent. |

### Spectrum palette

| Role | Colour |
|---|---|
| Spectrum purple | `#9B6BD6` |
| Spectrum orange | `#E58A39` |
| Sora blue | `#65A9E5` |
| Cutler yellow | `#E5C653` |
| Sneaky red | `#D95B5B` |
| Angel green | `#70B88A` |

Rydrake's accent is orange; AllNightLonk's accent is purple. The wider team colours are available when a multi-member or team identity is needed. Do not force all six colours into every composition.

### What can change per game

- Background art, texture, lighting and material.
- Border/plate shape, thickness and ornamentation.
- Display font and decorative iconography.
- Component placement and scale.
- Game-specific status, tracker or progression information.
- Animation style and transition timing.

### What should not change

- Core Spectrum/member colour meaning.
- Readability and contrast standards.
- Chat behaviour and moderation-safe text handling.
- Event handling and component semantics.
- The principle that gameplay remains the primary content.

## 2. Layout modes

Choose a mode based on the game and stream, not because every overlay must contain every component.

### Gameplay-first (default)
Full-screen gameplay with an integrated camera, restrained Spectrum signature and only essential information. Use for visually rich, fast, competitive or detail-heavy games.

### Broadcast
A more composed layout with camera plate, chat and a goals/community panel. Use when conversation, progression or community activity is a meaningful part of the experience.

### Event
A more expressive layout for community events, showcases, tournaments and special streams. More decorative elements are acceptable, but they must still preserve a clear hierarchy.

The mode is a composition choice, not a separate brand.

## 3. The four reusable overlay elements

### A. Animated/static full background
A full-canvas image, GIF, WebP or video that establishes the game's atmosphere. It sits behind all overlay components.

Rules:
- Keep the central gameplay viewing area visually quiet when gameplay is inset.
- Avoid high-contrast detail behind chat and text.
- Use a still image when motion adds no value.
- For video, keep loops subtle and avoid flashing or rapid movement.
- Use a local/repository-hosted asset or a stable raw asset URL.
- Provide a fallback colour in case media fails to load.

### B. Camera and gameplay borders/background plates
These are transparent decorative frames/plates positioned over OBS sources. The browser overlay does not capture or resize the game/camera itself; OBS source placement must match the plate coordinates.

Rules:
- Camera plate should frame the person, not compete with them.
- Gameplay frame should never obscure important game UI.
- For gameplay-first layouts, use only a small camera treatment or corner signature.
- Use transparent centres wherever the underlying OBS source must remain visible.
- Keep border thickness and ornamentation appropriate to the game's art direction.

### C. Customised chat
Chat should be readable, compact and integrated into the game's visual language.

Rules:
- Preserve username identity and role badges where possible.
- Use readable contrast and sensible message lengths.
- Avoid permanent chat if it distracts from the game; it can be shown only in Broadcast/Event modes.
- Never inject message HTML. Render user content as text.
- Limit the number of visible messages and allow older messages to expire.
- Do not let chat overlap important gameplay UI.

### D. Goals / community / interactive display
This is a flexible information area. It can show goals, progression, community activity, event status, counters or interactive game-specific information.

Rules:
- Only show information that helps the viewer understand or participate.
- Prefer event-driven activity (show a follow/sub/gift/cheer/raid when it happens) over permanent clutter.
- Keep goals editable and easy to scan.
- Do not reserve a large panel for an empty state unless the game benefits from it.
- Make the same component capable of switching between goals, community activity and game-specific data.

## 4. Composition workflow for a new game

1. **Understand the game:** identify its palette, material language, typography, pace and important UI areas.
2. **Choose the mode:** Gameplay-first, Broadcast or Event.
3. **Choose the background:** decide whether it needs a full background, subtle texture or no background at all.
4. **Map OBS sources:** record game and camera source bounds before drawing plates.
5. **Select components:** use only the four elements that improve the viewing experience.
6. **Apply Spectrum anchors:** logo/mark, team palette, streamer accent and consistent motion.
7. **Build and test at actual output size:** check 1920×1080 and a smaller/mobile-like preview.
8. **Check gameplay legibility:** ensure no important game UI is hidden or made too small.
9. **Save the result:** keep the finished game overlay, source assets and any special configuration together.

## 5. Recommended project structure

```
images/
  <game-name>/
    backgrounds/
    frames/
    icons/
    activity/
fonts/
  ...
templates/
  stream-elements/
    base-overlay.html
    base-overlay.css
    base-overlay.js
games/
  <game-name>/
    README.md
    fields.json (if used)
    screenshots/
    assets/
```

The shared base template should remain generic. Game-specific files should contain only the overrides, assets and settings that differ.

## 6. StreamElements starter template

The files in `templates/stream-elements/` are the reusable starting point:

- [base-overlay.html](../templates/stream-elements/base-overlay.html)
- [base-overlay.css](../templates/stream-elements/base-overlay.css)
- [base-overlay.js](../templates/stream-elements/base-overlay.js)

Paste each file into its matching StreamElements custom widget tab. The template includes:
- Static or animated image/video background.
- Camera and gameplay decorative plates.
- Custom chat message area.
- Editable goals and a community activity rotator.

### First-time setup

1. Create a StreamElements Custom Widget.
2. Paste the HTML, CSS and JS into their matching tabs.
3. In the JS `CONFIG` object, set the game title, background URL, background type and goals.
4. In the CSS variables, set the theme colours, typography, component positions and dimensions.
5. Position the actual game and camera sources in OBS to line up with the transparent plate centres.
6. Test chat and event payloads using a live test or StreamElements test events. Event payload fields can vary by event type; adjust the normaliser if a provider payload differs.

### Important implementation notes

- The browser overlay draws frames and plates; it does not create or crop OBS capture sources.
- Keep the background and plates transparent where the underlying OBS source must show through.
- Use HTTPS asset URLs.
- Keep the source canvas at the intended OBS resolution (typically 1920×1080), then scale the browser source as a single unit.
- Treat chat and event text as untrusted input. The starter uses `textContent` rather than inserting raw HTML.
- The starter is a foundation, not a finished game skin. Make a game-specific copy before substantial customisation.

## 7. Review checklist

- [ ] Does this feel like the game, rather than a generic overlay with a different colour?
- [ ] Is the Spectrum identity recognisable?
- [ ] Is the streamer's own colour represented appropriately?
- [ ] Is gameplay still the visual priority?
- [ ] Are chat and activity readable at normal viewing size?
- [ ] Does every permanent element justify its screen space?
- [ ] Are OBS source positions aligned with their plates?
- [ ] Does the layout still work at smaller display sizes?
- [ ] Are assets stored in the repository and referenced reliably?
- [ ] Is the game-specific configuration documented?

## 8. The standard we are aiming for

**One team. Many worlds.** Every game gets its own visual treatment. Every broadcast still belongs to Spectrum.

The goal is not to make every overlay identical. The goal is to make every overlay feel like it came from the same creative team.
