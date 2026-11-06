# AI Voice Calling Agent — Architecture, considered.

A static engineering specification with an interactive architecture explorer and an explicitly simulated voice pipeline.

## Run and deploy

No framework, backend, package installation or build command is required. Serve the `dist` directory with any static server. For example, from this directory:

```sh
python3 -m http.server 8080 --directory dist
```

For Vercel: choose the **Other** framework preset, leave the build command empty, and set the output directory to `dist`. There are no API keys or environment variables. The website does not make calls or record audio.

## Source layout

- `dist/index.html`: complete narrative and the preserved technical reference.
- `dist/assets/reference.css`: retained original documentation component foundations.
- `dist/assets/style.css`: design system, responsive layout, explorer and print styling.
- `dist/assets/main.js`: strategies, component inspection, pipeline, search, calculator, navigation and export.
- `dist/assets/diagrams.js`: lazy Mermaid rendering, stable viewports, source disclosure and diagram zoom.
- `docs/REDESIGN.md`: design system, scope and implementation decisions.
- `docs/VALIDATION.md`: feature preservation, checks and verification limits.
- `docs/content-parity.json`: structural content-preservation results.

Mermaid 11.12.2 is fetched from jsDelivr, with unpkg fallback. Without access to both CDNs, original Mermaid source remains visible and copyable; SVG generation is unavailable. The component explorer and simulation do not depend on Mermaid. System fonts and the hero SVG are local.

## Interaction notes

Use A/B/C tabs to switch architectures; arrow keys, Home and End also work. Select any map node to inspect responsibilities and constraints. Maps and detailed diagrams scroll at readable sizes. Use the zoom controls as needed.

The voice sequence is a finite conceptual demonstration, with play, pause, step and reset. There is no microphone access, inference or telephony integration. Reduced-motion users get manual stepping.

Cmd/Ctrl+K opens search across all specification sections. Arrow keys move between results; Enter opens a section and Escape dismisses the dialog. Export PDF prepares all diagrams and invokes the browser's print dialog; choose Save as PDF.

The calculator uses calls/day × minutes/call × 30 × (voice rate + carrier rate), in USD. It excludes the additional costs described on the page. Rates remain editable; the carrier value is illustrative.
