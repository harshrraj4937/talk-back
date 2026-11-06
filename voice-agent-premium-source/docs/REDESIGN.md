# Voice architecture redesign

## Design and implementation plan

Goal: make the engineering the visual identity while preserving the complete original specification.

Direction: warm white editorial opening, ink typography and blue signal lines; a dark interactive architecture workspace; then a light engineering reference. Native HTML/CSS/JavaScript and Mermaid 11.12.2, with no application framework or build step.

- Preserve all 16 original section IDs, 11 Mermaid definitions, tables, code examples, repository URLs and cost assumptions.
- Add keyboard-operable A/B/C overview maps, component selection and an inspector. Keep the unabridged Mermaid diagrams separately accessible within the explorer.
- Add a labeled voice simulation with play, pause, step, replay and reduced-motion behavior. Separate audio transport from asynchronous tool requests.
- Make navigation, full-text search, calculator, copy and export controls accessible. Retain direct links, print/PDF output and readable diagram source on CDN failure.
- Verify content parity, local JS syntax, actual browser interactions, responsive rendering and accessibility behavior. Report unmeasured performance explicitly.

## Review decisions

Creative direction: use a constructed waveform rather than generic AI imagery. Technical accuracy: hosted media does not pass through the Go business gateway. Product scope: A, B and C are alternatives, with B/C exploration gated by evidence. Accessibility: every animated explanation has a static, readable equivalent and motion can be paused. Economics: all prices remain editable estimates with original exclusions.

## Design system

Colors: paper #f7f8fa, surface #ffffff, ink #17212b, secondary #5e6975, accent #1768e8, dark #0b1018, dark surface #121b27, signal #84d6ed, border #dde3e9.

Typography: system sans; monospace for data, section markers and code. Responsive display headings 48–96px, narrative headings 36–58px, reference headings 28–38px, body 16px. Reference small labels minimum 11px.

Spacing: 4/8/12/16/24/32/48/64/96/128px. Main narrative max width 1240px; documentation max width 1320px with a 216px navigation column.

Components: tabs, node buttons, inspector, disclosure, search dialog, numerical inputs, diagram viewport and copy/export controls.

Motion: transform/opacity only for decorative motion; one finite simulation; 180ms interactions, 500ms section reveal. Honor prefers-reduced-motion and provide a site-wide pause control.
