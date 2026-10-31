# Mini-Trello — Design Kit (for Figma)

This folder contains everything you need to build a real Figma file for Mini-Trello in ~15 minutes. The SVGs are vector and their text stays editable when imported.

## Files

| File | What it is |
| --- | --- |
| `tokens.json` | Colors, spacing, radii, type scale, weights, shadows. Import with the **Tokens Studio** plugin. |
| `styleguide.svg` | Full style guide: palette (light + dark), type scale, spacing, radius, components. |
| `board-desktop.svg` | Desktop board screen (1440 × 740). |
| `modal-create-task.svg` | Create-task modal component (520 × 510). |
| `board-mobile.svg` | Mobile board screen (390 × 844). |

## Import into Figma

### 1. Create the file
- New Figma file → name it **"Mini-Trello — UI Kit"**.

### 2. Import the tokens (optional but recommended)
- Install the **Tokens Studio for Figma** plugin.
- Open the plugin → **Tools → Import** → choose `tokens.json`.
- Apply the `light` / `dark` color sets as themes.

### 3. Import the screens
- Drag `styleguide.svg`, `board-desktop.svg`, `modal-create-task.svg`, and `board-mobile.svg` onto the canvas (or use **File → Place image**).
- Each import becomes a group; right-click → **Frame selection** and name them:
  - `Style Guide`
  - `Board / Desktop`
  - `Modal / Create Task`
  - `Board / Mobile`

### 4. Turn repeated UI into components
Select and press **Ctrl + Alt + K** to create components for:
- Buttons: Primary, Ghost, Danger
- Pills: priority (Low / Medium / High), status (To Do / In Progress / Done)
- Task card

### 5. Add a little documentation
On the style guide frame, add short notes on the key decisions (three columns, priority by color + label, quick-move buttons for accessibility). Annotated files read as design thinking, not just screenshots.

### 6. Share it
- **Share → Anyone with the link → Can view → Copy link.**
- Paste the link into:
  - `README.md` (the `Figma` placeholder)
  - `CASE_STUDY.md` (the "Design files" line)
  - Your resume's Mini-Trello project line

## Notes

- The SVGs use the app's real tokens (from `public/css/styles.css`), so the mockups match the live product.
- Text is real text in Figma — edit copy directly.
- If you change a color in `tokens.json`, update the matching value in the SVGs too, since SVGs are static files.
- Prefer to build from scratch? Use `styleguide.svg` as the visual reference and `tokens.json` for exact values.
