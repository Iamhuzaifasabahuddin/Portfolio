---
name: Huzaifa Sabah Uddin (Hexz)
description: Freelance backend portfolio set as an industrial parts catalogue — numbered services, spec tables, an order slip.
colors:
  catalogue-paper: "#f2f3ef"
  catalogue-paper-shade: "#e6e8e1"
  field-white: "#fbfbf8"
  ink: "#141414"
  ink-secondary: "#44463f"
  safety-yellow: "#ffcc00"
  safety-yellow-light: "#ffe066"
  stock-green: "#2f6b3a"
  error-red: "#b3261e"
  ink-deep: "#000000"
  on-green: "#ffffff"
  placeholder: "#66685f"
  colophon-muted: "#c9cbc3"
typography:
  display:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 8.4vw, 6rem)"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "-0.015em"
  band-heading:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 850
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  item-heading:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.1
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  spec-label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
  figure:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  none: "0px"
spacing:
  hairline-gap: "4px"
  cell: "14px"
  row: "26px"
  section: "clamp(56px, 8vw, 96px)"
  gutter: "clamp(16px, 4vw, 48px)"
components:
  button-add:
    backgroundColor: "{colors.safety-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "50px"
  button-add-hover:
    backgroundColor: "{colors.safety-yellow-light}"
  button-add-on:
    backgroundColor: "{colors.stock-green}"
    textColor: "{colors.field-white}"
  button-ghost:
    backgroundColor: "{colors.catalogue-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "50px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.catalogue-paper}"
  button-send:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.safety-yellow}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "50px"
  section-band:
    backgroundColor: "{colors.safety-yellow}"
    textColor: "{colors.ink}"
    padding: "14px 28px 10px"
  section-band-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.safety-yellow}"
  thumb-tab:
    backgroundColor: "{colors.safety-yellow}"
    textColor: "{colors.ink}"
    width: "46px"
  thumb-tab-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.safety-yellow}"
  input-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
    height: "48px"
---

# Design System: Huzaifa Sabah Uddin (Hexz)

## Overview

The portfolio is an industrial supply catalogue (McMaster-Carr, Misumi, Grainger), not a developer portfolio. A client hires a backend the way they would order a part: every service is a numbered item (HX-01 to HX-04) with a spec table and an "Add to enquiry" control, past work is catalogue entries (W-01 to W-04), and the page closes on an order slip. It refuses both the dark terminal look and the headline-beside-a-screenshot freelancer template.

Key characteristics: cool catalogue paper with true-black ink; safety yellow that owns whole regions (section bands, thumb-index tabs, the totals cell) rather than highlighting; black-ruled spec tables; condensed industrial display type; tabular mono for every SKU and figure; square corners everywhere; one technical line drawing.

## Colors

### Primary
**Safety Yellow** owns region-scale fields: every section band, the thumb-index tabs, the hero totals cell, checked order-slip rows, "Add to enquiry" buttons. It is always a ground with ink on it, never text on paper.

### Secondary
**Stock Green** means "live / replaced / on your slip": the availability dot, "Replaced" tags, "In production" status, a selected Add button. Nothing else.

### Neutral
**Catalogue Paper** is the page ground, **Paper Shade** the row-hover and aside ground, **Field White** the form-field fill. **Ink** draws all rules and text; **Ink Secondary** carries body copy and labels on paper.

### Named Rules
- **The Ground Rule.** Yellow is a surface, not a text colour. Yellow text appears only on ink (active tab, ink band, send button, colophon links).
- **One Meaning for Green.** Green only ever says "live, replaced, or selected".

## Typography

Archivo (variable, width axis 62–125) does every word: condensed at `wdth 62` for display and band headings, `wdth 75–85` for item headings, buttons and tabs, normal width for body. JetBrains Mono with tabular numerals sets SKUs, prices, metrics and spec labels.

### Hierarchy
- **Display** (hero h1): uppercase, condensed, 850 weight, 15ch max.
- **Band heading** (h2 in each yellow band): uppercase, condensed.
- **Item heading** (h3): condensed 75 width, 800.
- **Body**: Archivo regular, 52–75ch measures.
- **Spec label**: mono caps, 0.72–0.75rem, Ink Secondary.
- **Figure**: mono tabular, aligned right in money columns.

### Named Rules
- **Mono Means Measurement.** Monospace is for SKUs, prices, quantities and spec labels, not for prose sentences.
- **No Eyebrows.** A heading never carries a label above it; the SKU sits in its own column beside the heading.

## Layout

Max width 1280px with a fluid gutter, plus a 46px right reserve for the fixed thumb-index tabs. Every section is a yellow band followed by a 2px ink-ruled box whose top border is shared with the band. Items inside are rows separated by 1px hairlines, using an 88px SKU column. Sections are spaced at `clamp(56px, 8vw, 96px)`. Below 860px the tabs become a bottom strip, with body padding so the strip never covers content. Below 640px every multi-column row stacks.

## Elevation & Depth

The page is flat, like a printed page. Depth comes from rules: a 2px ink rule for frames and bands, and a 1px hairline (ink at 22%) between rows. No shadows.

### Named Rules
- **Ruled, Not Lifted.** Separate things with rules and fields of colour, never with shadows or blur.

## Shapes

Square corners only (`0px`). The one circle is the stock light and the numbered callouts in the drawing.

## Components

### Buttons
Square, 2px ink border, uppercase condensed label, 50px tall (44px small).
- **Add**: yellow. It turns green and reads "Remove from slip" when the item is on the slip.
- **Ghost**: paper. It inverts to ink on hover.
- **Send**: ink with yellow text.

### Cards / Containers
There are no cards. Use catalogue rows inside a ruled box: SKU column, name and description, spec `dl`, action.

### Inputs / Fields
Field White, 1.5px ink border, square, 48px minimum height, mono caps labels above. Focus shows a yellow outline inside an ink ring. Invalid fields get a 2px red border. Order-slip checkboxes are square, and the whole row fills yellow when checked.

### Navigation
Thumb-index tabs: yellow vertical tabs fixed to the right edge. The active tab inverts to ink and steps out 10px. The Enquire tab carries the slip count. On mobile they become a horizontal bottom strip, with Enquire always inked.

### Spec Strip (signature)
The hero "Replaces" block: a ruled box with a mono caption, five struck-through tools that each carry a green "Replaced" tag, and a yellow totals cell ($1,400 → ~$90, $15,600, −94%). The strike lines draw in one after another on load, which is the page's single authored motion. Reduced motion shows them already drawn.

### Fixed-price Parts
A black sub-band ("Fixed-price parts") inside the Services box introduces catalogue rows that carry a mono **Price** and **Delivered in** instead of typical parts. Use it for anything with a set price.

### Stack Check (calculator)
Tool rows (checkbox, name, mono US$/month input) on paper; a sticky yellow totals panel (month, year, 3-year in large mono) with a reference line and an ink "Put this on my order slip" button that writes a summary line into the slip message and ticks HX-01. Hidden without JavaScript.

### Masthead
HX mark, name in condensed caps, an ink "aka Hexz" chip, edition meta, the stock light, and square outlined profile icons (LinkedIn, GitHub, email) that fill yellow on hover.

### Assembly Drawing
The architecture drawing is an inline SVG on a 24px drafting grid at 7% ink: ink boxes, dashed lines for async paths, and yellow numbered callouts keyed to a parts-list table.

## Do's and Don'ts

### Do:
- Give every new service or project a SKU (HX-nn / W-nn) and a spec table.
- Let yellow own whole regions; put ink on it.
- Set every number in tabular mono.
- Trace every figure to PRODUCT.md's evidence list.

### Don't:
- Don't add shadows, gradients, glass, or rounded corners.
- Don't use yellow text on paper.
- Don't put a label or eyebrow above a heading.
- Don't use the drafting grid anywhere except behind a technical drawing.
- Don't invent testimonials, logos, client counts, or prices.
