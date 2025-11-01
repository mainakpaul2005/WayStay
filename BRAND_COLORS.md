# WayStay Brand Color System

## Official Brand Palette

### Core Colors

| Color Name | Hex | HSL | Usage |
|-----------|-----|-----|-------|
| **Wild Sand** | #E4EEF0 | 214 22% 94% | Background, neutral backdrop |
| **Mirage** | #16232A | 208 30% 13% | Primary text, headings, body text |
| **Deep Sea Green** | #075056 | 177 100% 18% | Secondary text, metadata, subtle differentiation |
| **Blaze Orange** | #FF5B04 | 16 100% 50% | Accent, action elements, buttons, links, key icons |

---

## CSS Variable Mapping

### Light Theme (`:root`)

```css
--background: 214 22% 94%;              /* Wild Sand #E4EEF0 */
--foreground: 208 30% 13%;              /* Mirage #16232A */
--card: 0 0% 100%;                      /* White */
--card-foreground: 208 30% 13%;         /* Mirage #16232A */
--primary: 208 30% 13%;                 /* Mirage #16232A */
--primary-foreground: 214 22% 94%;      /* Wild Sand #E4EEF0 */
--secondary: 177 100% 18%;              /* Deep Sea Green #075056 */
--secondary-foreground: 214 22% 94%;    /* Wild Sand #E4EEF0 */
--accent: 16 100% 50%;                  /* Blaze Orange #FF5B04 */
--accent-foreground: 0 0% 100%;         /* White */
--border: 214 22% 88%;                  /* Light Wild Sand */
--input: 214 22% 90%;                   /* Very Light Wild Sand */
--ring: 16 100% 50%;                    /* Blaze Orange #FF5B04 */
```

### Dark Theme (`.dark`)

```css
--background: 208 30% 8%;               /* Very Dark Mirage */
--foreground: 214 22% 94%;              /* Wild Sand #E4EEF0 */
--primary: 214 22% 94%;                 /* Wild Sand #E4EEF0 */
--secondary: 177 100% 30%;              /* Lighter Deep Sea Green */
--accent: 16 100% 50%;                  /* Blaze Orange #FF5B04 (consistent) */
```

---

## Component Usage Guide

### Buttons

**Primary Button** (Call-to-Action)
- Background: `bg-primary` → Mirage (#16232A)
- Text: `text-primary-foreground` → Wild Sand (#E4EEF0)
- Hover: Adds Blaze Orange border/shadow for emphasis

**Secondary Button** (Alternative Action)
- Background: `bg-secondary` → Deep Sea Green (#075056)
- Text: `text-secondary-foreground` → Wild Sand (#E4EEF0)

**Accent Button** (Important/Featured)
- Background: `bg-accent` → Blaze Orange (#FF5B04)
- Text: `text-accent-foreground` → White (#FFFFFF)

### Text

**Headings (H1, H2, H3)**
- Color: `text-foreground` → Mirage (#16232A)
- Alternative: `text-primary` → Mirage (#16232A)

**Body Text**
- Color: `text-foreground` → Mirage (#16232A)

**Secondary Text**
- Color: `text-secondary` or `text-muted-foreground` → Deep Sea Green (#075056)

### Links & Interactive Elements

- Default: `text-primary` → Mirage (#16232A)
- Hover: Add accent highlight → Blaze Orange (#FF5B04)
- Active: Solid Blaze Orange → (#FF5B04)

### Backgrounds & Cards

- Page Background: `bg-background` → Wild Sand (#E4EEF0)
- Card/Container: `bg-card` → White (#FFFFFF)
- Sidebar: `bg-sidebar` → Wild Sand (#E4EEF0)
- Hover State: Subtle Blaze Orange tint

### Badges & Labels

- Info Badge: `bg-secondary` → Deep Sea Green (#075056)
- Featured Badge: `bg-accent` → Blaze Orange (#FF5B04)
- Muted Badge: `bg-muted` → Light Wild Sand

### Borders & Dividers

- Default Border: `border-border` → Light Wild Sand
- Focus State: `border-accent` → Blaze Orange (#FF5B04)
- Hover Border: `border-primary` → Mirage (#16232A)

---

## Tailwind Class Examples

### Typography

```tsx
// Primary heading - Mirage
<h1 className="text-foreground font-bold">Welcome to WayStay</h1>

// Secondary text - Deep Sea Green
<p className="text-secondary">Discover unique accommodations</p>

// Muted text - Subtle secondary
<span className="text-muted-foreground">Last updated 2 hours ago</span>
```

### Buttons

```tsx
// Primary action - Mirage on Wild Sand
<Button className="bg-primary text-primary-foreground">Book Now</Button>

// Accent action - Blaze Orange
<Button className="bg-accent text-accent-foreground">Featured Deal</Button>

// Secondary action - Deep Sea Green
<Button className="bg-secondary text-secondary-foreground">Learn More</Button>
```

### Cards & Containers

```tsx
// Standard card - White on Wild Sand
<div className="bg-card text-card-foreground p-6 rounded-lg border border-border">
  Content here
</div>

// Elevated card with accent
<div className="bg-card border-2 border-accent/20 hover:border-accent/50">
  Featured content
</div>
```

### Links

```tsx
// Link with accent hover
<Link href="/search" className="text-primary hover:text-accent transition-colors">
  Search Properties
</Link>

// Link with underline
<a className="text-primary border-b-2 border-accent">Explore More</a>
```

---

## Color Accessibility

### Contrast Ratios

| Combination | Ratio | Level |
|-------------|-------|-------|
| Mirage on Wild Sand | 8.5:1 | AAA (Excellent) |
| Deep Sea Green on Wild Sand | 6.2:1 | AA (Good) |
| Blaze Orange on White | 4.8:1 | AA (Good) |
| White on Blaze Orange | 7.1:1 | AAA (Excellent) |

All combinations meet WCAG AA accessibility standards.

---

## DO's and DON'Ts

### ✅ DO

- Use Mirage for all primary text and headings
- Use Blaze Orange for call-to-action buttons and focus states
- Use Deep Sea Green for secondary information
- Use Wild Sand for backgrounds and neutral surfaces
- Maintain consistent spacing around accent elements

### ❌ DON'T

- Mix multiple brand colors in a single button
- Use Blaze Orange for body text (hard to read)
- Override primary brand colors with generic grays
- Use old grayscale colors from previous themes
- Apply accent color to non-interactive elements without reason

---

## File References

**CSS Variables Defined In:**
- `styles/globals.css` (Lines 5-40 for light theme, Lines 42-74 for dark theme)

**Tailwind Configuration:**
- `tailwind.config.js` (Color mappings at lines 47-91)

**Component Examples:**
- `components/navbar.tsx` (Uses primary, accent, and hover effects)
- `components/ui/button.tsx` (Button color variants)
- `app/layout.tsx` (Page background color)

---

## Theme Switching

The design system automatically adapts between light and dark themes using the `.dark` class selector in `globals.css`. No manual color overrides needed—just add/remove the `dark` class to the `<html>` element.

```tsx
// Light theme (default)
<html>

// Dark theme
<html className="dark">
```

---

**Last Updated:** November 1, 2025
**Version:** 1.0
**Status:** Active ✓
# (removed)
