# Redesign verification — 6 November 2026

## Content and feature preservation

| Item | Result |
|---|---|
| Original section IDs | All 16 retained |
| Mermaid source definitions | All 11 identical to the original |
| Technical comparison tables | All 6 unchanged |
| External content links | All 22 unique URLs retained, including 12 repository entries |
| Internal anchors | All 44 links resolve; no duplicate IDs |
| Model distinctions, hardware, costs, security and ADRs | Retained in the engineering reference |
| API examples | Preserved; escaped two original header placeholders so HTML no longer swallows them |
| A/B/C switching | Browser checked, including arrow-key selection |
| Component inspection | Browser checked on hosted, self-hosted and platform maps |
| Map zoom | Browser checked at 100% and 120%; reset and bounds implemented |
| Mermaid rendering | All 11 rendered successfully; no diagram errors |
| Mermaid copying | Copied platform source and pasted it into a browser input to verify content |
| SVG export | Browser download event completed for the platform architecture |
| Code copying | Pasted API example verified the Authorization header placeholder |
| Search | Full-text results, no-results state, arrow-key navigation and Escape checked |
| Mobile navigation | Open and Escape-close checked; focus returns to menu button |
| Voice simulation | Play, pause, manual step, full 10-step completion and replay state checked |
| Global motion control | Pause state checked in browser |
| Calculator | Default $840; 200 calls/day $1,680; zero calls $0; 5 minutes $1,050; voice $0.10/min $1,440; carrier $0/min $600; negative input rejected |
| Print/PDF control | Invoked successfully, prepared all 11 diagrams and restored the button; final browser-generated PDF pagination not inspected |

## Responsive and accessibility checks

The page was rendered in same-origin browser frames at configured widths of 320, 375, 390, 768, 1024, 1440 and 1920 CSS pixels. For each frame, document scroll width equaled client width. The browser's vertical scrollbar occupied 15 pixels. Visual checks covered the mobile opening and explorer, tablet technical reference and desktop opening/explorer.

Features include semantic navigation, a skip link, visible focus outlines, native dialog focus trapping, tab keyboard behavior, explicit input labels, keyboard-scrollable tables/diagrams/code, live feedback, and prefers-reduced-motion styling and manual simulation stepping. System reduced-motion emulation and a screen reader audit were not available in this browser interface; no formal WCAG certification is claimed.

A lazy-rendering layout issue was observed during testing: changing diagram dimensions could move a linked reference section. Fixed by reserving diagram controls/source disclosures before rendering and using stable scrollable viewports. Subsequent navigation showed the intended economics section after diagram loading. Mermaid text colors are explicitly styled in both page rendering and exported SVG.

## Performance and remaining limits

Both JavaScript files pass `node --check`. No application-origin console errors were observed during browser checks. Browser extension metadata errors were excluded from application results.

There is no framework runtime, font download, image dependency or animation package. Mermaid is loaded only when a detailed diagram is near the viewport or printing is requested. Diagrams are rendered once and cached in the DOM; scrolling does not rerender them. Animation uses CSS transforms and a bounded timer that stops offscreen or in a hidden tab.

Lighthouse, throttled mobile performance, Core Web Vitals, 200% browser zoom, Safari/Firefox and final PDF pagination were not measured. The brief's performance scores are targets, not verified results. CDN failure preserves readable diagram source; the failure path was code-reviewed rather than network-block tested.

## Technical review

- Hosted audio does not pass through the Go business tool gateway.
- Self-hosted modular and native duplex inference remain distinct alternatives.
- The platform map groups RBAC, configuration, billing/audit and model destinations; the full original diagram retains all services.
- A, B and C are separate product choices. Research B and validation C are visibly exploratory milestones.
- The simulated lookup makes no booking; mutation still requires confirmation and server validation.

The original GPT-Live product/API distinction and reference price were checked against official sources during the redesign:

- https://deploymentsafety.openai.com/gpt-live-1-1
- https://developers.openai.com/api/docs/models/gpt-live-1
- https://developers.openai.com/api/docs/models

Other technical content and references were preserved from the supplied specification, not comprehensively re-researched.
