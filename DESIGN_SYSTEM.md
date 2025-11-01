# 🎨 WayStay UI Polish - Visual Reference Guide

## Typography System

### Font Families
```
Display Font:  Playfair Display (Serif, elegant)
             Weight: 400-900
             Usage: h1, h2, h3, brand identity
             
Primary Font:  Inter (Sans-serif, clean)
             Weight: 400-500-600-700
             Usage: Body text, descriptions
             
UI Font:       Poppins (Sans-serif, modern)
             Weight: 400-500-600-700
             Usage: Buttons, badges, callouts
```

### Text Sizes & Weights

#### Headings
```
h1: size-4xl to size-5xl
   weight: font-bold (900)
   tracking: tracking-tight
   letter-spacing: -0.02em
   family: font-display

h2: size-3xl to size-4xl
   weight: font-semibold (600)
   tracking: tracking-tight
   letter-spacing: -0.01em
   family: font-display

h3: size-2xl to size-3xl
   weight: font-semibold (600)
   tracking: tracking-tight
   family: default

h4-h6: weight: font-semibold (600)
       family: default
```

#### Body Text
```
Paragraph:   leading-relaxed, font-medium (500)
Small text:  text-sm, font-medium (500)
```

## Color Palette

### Light Theme
```
Background: hsl(0, 0%, 98%)     - Very light gray
Foreground: hsl(0, 0%, 5%)      - Very dark gray
Primary:    hsl(0, 0%, 8%)      - Dark
Secondary:  hsl(0, 0%, 94%)     - Light
Muted:      hsl(0, 0%, 96%)     - Very light
Border:     hsl(0, 0%, 90%)     - Light gray
```

### Dark Theme
```
Background: hsl(0, 0%, 3%)      - Almost black
Foreground: hsl(0, 0%, 95%)     - Almost white
Primary:    hsl(0, 0%, 95%)     - Almost white
Secondary:  hsl(0, 0%, 8%)      - Dark
Muted:      hsl(0, 0%, 8%)      - Dark
Border:     hsl(0, 0%, 12%)     - Dark gray
```

## Spacing Scale

```
xs:   0.25rem (4px)
sm:   0.5rem  (8px)
md:   1rem    (16px)
lg:   1.5rem  (24px)
xl:   2rem    (32px)
2xl:  2.5rem  (40px)
3xl:  3rem    (48px)
```

### Padding Examples
```
Small component:    p-4 (16px) or p-3 (12px)
Standard component: p-6 (24px) or p-7 (28px)
Large section:      p-8 (32px) or p-10 (40px)
```

### Spacing Examples
```
Tight sections:      gap-4 (16px)
Standard sections:   gap-6 (24px)
Spacious sections:   gap-8-10 (32-40px)
Vertical padding:    py-8 to py-20
Horizontal padding:  px-4 to px-8
```

## Component Styles

### Navbar
```
Height: h-20 (80px) - was h-16 (64px)
Logo:
  - Icon: h-10 w-10 rounded-xl
  - Gradient: from-primary to-primary/80
  - Hover: group-hover:scale-110
  - Shadow: shadow-md group-hover:shadow-lg

Navigation Items:
  - Height: h-10
  - Padding: px-4 py-2
  - Font: font-medium text-base
  - Hover: bg-muted/50

Buttons:
  - Sign In: hidden sm:inline-flex (responsive)
  - Get Started: font-medium shadow-md
  - Hover: shadow-lg transition-all
```

### Dashboard
```
Container Padding: py-12 md:py-16 lg:py-20
Section Gap: gap-8 to gap-10
Header:
  - Heading: text-4xl md:text-5xl font-display font-bold
  - Description: text-lg text-muted-foreground font-medium
  
Stats Cards:
  - Padding: p-7
  - Label: text-sm font-semibold uppercase tracking-wider
  - Value: text-3xl md:text-4xl font-display font-bold
  - Icon: h-6 w-6 text-primary
  - Hover: -translate-y-1 shadow-lg transition-all duration-300

Profile Section:
  - Avatar: h-20 w-20 border-2 border-border/50
  - Name: text-2xl font-display font-bold
  - Email: text-base flex items-center space-x-2
  - Labels: text-base font-semibold

Quick Actions:
  - Button height: h-10
  - Button padding: px-4 py-2
  - Font: text-base font-medium
  - Icons: h-5 w-5 text-primary
  - Hover: bg-primary/5 border-primary/50

Activity Items:
  - Padding: p-4
  - Background: bg-muted/30 hover:bg-muted/60
  - Icon container: h-10 w-10 bg-primary/10
  - Icon: h-5 w-5 text-primary
```

### Cards
```
Standard Card:
  - Border: border border-border/50
  - Padding: p-6 or p-7
  - Radius: rounded-lg or rounded-xl
  - Shadow: shadow-sm hover:shadow-md

Elevated Card:
  - Border: border-border/50
  - Shadow: shadow-sm hover:shadow-lg
  - Transition: transition-shadow duration-300
  - Padding: p-7

Subtle Card:
  - Border: border-border/30
  - Background: bg-card/50
  - Backdrop: backdrop-blur-sm
  - Radius: rounded-lg
```

## Animations & Transitions

### Durations
```
Rapid:    200ms (state changes, hovers)
Standard: 300ms (component transitions)
Slow:     500ms (page load animations)
```

### Hover Effects
```
Lift:     -translate-y-1 shadow-lg
Scale:    scale-105
Fade:     opacity-70 → opacity-100
Color:    text-muted-foreground → text-foreground
```

### Keyframe Animations
```
fadeIn:         (0.5s) opacity 0→1, translateY 10px→0
slideInLeft:    (0.5s) translateX -20px→0, opacity 0→1
slideInRight:   (0.5s) translateX 20px→0, opacity 0→1
```

## Utilities Reference

### Layout Utilities
```
.container         - max-w-7xl mx-auto px-4-8
.section-spacing   - py-12 md:py-16 lg:py-20
.section-spacing-tight - py-8 md:py-12 lg:py-16
```

### Typography Utilities
```
.text-gradient     - Linear gradient text effect
.text-balance      - Improved text wrapping
```

### Interactive Utilities
```
.hover-lift        - Hover with lift effect
.hover-scale       - Hover with scale effect
.focus-ring        - Accessible focus styles
```

### Visual Utilities
```
.glass-effect      - Glass morphism background
.gradient-bg       - Subtle gradient
.hero-gradient     - Bold gradient
```

### Button Styles
```
.btn-primary       - Primary button styling
.btn-secondary     - Secondary button styling
.badge-primary     - Primary badge styling
```

## Responsive Breakpoints

```
Mobile:    Default (0px+)
sm:        640px+
md:        768px+
lg:        1024px+
xl:        1280px+
2xl:       1536px+
```

### Responsive Examples
```
Typography:
  md:text-lg lg:text-xl - Scales on larger screens
  
Spacing:
  py-8 md:py-16 lg:py-20 - Increases on larger screens
  
Grid:
  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 - More columns on larger screens
```

## Accessibility Features

### Focus States
```
Focus Ring:  ring-2 ring-ring ring-offset-2
Color:       Primary color for visibility
Offset:      ring-offset-background
```

### Color Contrast
```
Headings:    7:1 ratio (AAA compliant)
Body Text:   4.5:1 ratio (AA compliant)
UI Elements: 3:1 ratio minimum
```

## Performance Optimizations

### CSS
```
Hardware Acceleration: transform, opacity
Smooth Scrolling:     scroll-behavior: smooth
Efficient Transitions: 200-300ms duration
```

### Fonts
```
System Fallbacks:   Reduces FOIT/FOUT
Subsetting:         Only needed characters
Variable Fonts:     Reduces file size
```

### Images
```
Next.js Optimization: Responsive sizing
Quality Parameter:    q=80 for thumbnails
Responsive Widths:    w=500, w=800, etc.
Format:              WebP with fallback
```

---

This visual reference guide helps you understand and maintain the design system!
