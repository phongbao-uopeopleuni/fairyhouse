# Instructions for Claude and Gemini Coding Agents

This file outlines the architecture, rules, and boundaries of the **Fairy's House Huế** website. All future AI sessions MUST read and conform to these guidelines.

## 1. Project Overview & Scope
- **Subject**: Website platform for **Fairy's House Homestay Huế** (located at 19 Lương Văn Can, Phường An Cựu, TP Huế).
- **Core Goal**: A fast, elegant, responsive showcase of the rooms, facilities, local travel guides, and direct bookings.
- **Tech Stack**: HTML5, Vanilla CSS3 (under `assets/css/style.css`), Vanilla JavaScript (under `assets/js/main.js`), bundled with Vite.

## 2. CRITICAL CONSTRAINT: Booking System Behavior
- **NO Interactive Booking/Registration Forms**: The website **MUST NOT** include any forms, input fields, dropdown reservation models, calendar widgets, or interactive booking systems.
- **Direct Link Strategy**: All booking processes, room availability queries, or price Negotiations are handled entirely offset by direct contact with the owner/staff.
- **Standard Call/Chat Buttons**:
  - Direct Call button triggers: `tel:0971045045`
  - Direct Chat button triggers: `http://zalo.me/84971045045` (Zalo is the primary reservation channel)
- **Rule for Future Modifications**: If requested to "cải thiện đặt phòng" (improve booking) or edit the CTA, always steer the design toward calling the primary number or messaging the Zalo link. Never build, simulate, or introduce visual forms or input blocks.

## 3. Brand Aesthetic & Design Guidelines
- **Color Palette**: Inspired by the physical homestay's architectural palette:
  - `--bg-primary` (`#FFFFFF`): Pristine pure white backdrop mimicking the building face.
  - `--bg-card` (`#FDFBF8`): Gentle warm ivory/linen tone.
  - `--color-primary` (`#2C1F1D`): Rich dark walnut wood.
  - `--color-accent` (`#4A675B`): Exquisite organic sage green matching the bedroom accents.
  - `--color-secondary` (`#C59B6D`): Warm honeywood teak tone.
- **Typography Guidelines**: Set via `--font-sans` ("Plus Jakarta Sans") for general structural text, and `--font-serif` ("Playfair Display" / "Lora") for high-luxury headings.

## 4. Key Interactive Components
- **Live Weather Widget**: Pulls real-time Hue weather data and translates it into custom travel suggestions (e.g., advising on temple visits, sun protection, or dining indoors during rains).
- **Luxury Lightbox Gallery**: Custom gallery lightbox built into `main.js` supporting slide transitions, pointer drag panning, keyboard hotkeys, and mouse-wheel smart zooming. Do not break or overwrite this engine.

## 5. Locales Configuration
- Vietnamese pages are located in the project's root folder (e.g., `/index.html`, `/phong.html`, `/lien-he.html`).
- English pages are in the `/en/` subdirectory (e.g., `/en/index.html`).
- Updates made to Vietnamese core content or templates should be mirrored in their corresponding English files to maintain a premium uniform multilingual presence.
