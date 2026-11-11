# Reference Specification: Dossier-Style Motion Portfolio

## 1. Visual Design & Typography
- **Display Font**: `Inter Tight`, weights 600, 700. Tight tracking (-0.03em to -0.04em), line-height 0.95 to 1.05 for giant titles.
- **Body Font**: `Inter`, weights 400, 500. Letter-spacing normal to -0.01em, line-height 1.5 to 1.6.
- **Eyebrows / Badges**: Uppercase, tracking +0.1em to +0.15em, 11px - 13px.

## 2. Color System
- `--bg`: `#0B0B0C` (Deep obsidian black)
- `--fg`: `#F2F0EB` (Warm editorial off-white)
- `--muted`: `#8A8A8A` (Refined neutral gray)
- `--accent`: `#C8F169` (Acid electric lime)
- `--surface`: `#141416` (Card and modal background)
- `--border`: `rgba(242, 240, 235, 0.08)` (Subtle hairline divider)

## 3. Layout Grid & Breakpoints
- **Desktop (1440px+)**: Container max-width `1440px`, padding `40px` (or `48px`). Full viewport hero at `100svh`.
- **Tablet (768px - 1199px)**: Container padding `32px`, adjusted card scale and grid layouts.
- **Mobile (390px)**: Container padding `20px`, fluid clamp typography, full touch targets ($\ge 44\text{px}$), stacked cards, accordion services.

## 4. Motion & Pacing Specs
- **Preloader**: 0 to 100 counter (~1.6s) with easing, followed by curtain slide up (`yPercent: -100`, 0.9s `expo.inOut`).
- **Hero Intro**: Headline 3-line mask reveal (`translateY: 110% -> 0%`, stagger `0.12s`, 1.2s `expo.out`), images scale `1.15 -> 1` stagger `0.1s`.
- **Hero Reel**: Infinite horizontal marquee loop (~40s linear). Lenis velocity reactive speed up/reverse.
- **Featured Work**: Sticky stacking cards (`top: 12vh`), prior card scales down to `0.92` with dimming; image clip-path inset reveal. Secondary project drift marquee (~60s).
- **Services**: Hairline divider line draws left to right (`scaleX: 0 -> 1`), hover title shift `+24px` turning `--accent`, accordion expansion on mobile.
- **Stories / Testimonials**: Alternating marquee rows (50s - 70s), pause on hover, odometers rolling digits to target.
- **Footer**: Reveal scrub with scale `0.9 -> 1`, headline staggered character rise, live local time, copy-to-clipboard email toast.
- **Cursor**: 12px dot following pointer, scaling to 64px with text badges ("View" / "Drag"), mix-blend difference, disabled on touch.
