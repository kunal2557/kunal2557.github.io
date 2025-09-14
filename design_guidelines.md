# SmartPark Design Guidelines

## Design Approach: Reference-Based (Uber-Inspired)
Drawing from Uber's proven mobile-first design patterns with adaptations for the Indian parking market. Focus on clean, functional interface with intuitive map-based interactions.

## Core Design Elements

### Color Palette
**Primary Brand Colors:**
- Deep Blue: 210 85% 25% (primary actions, headers)
- Fresh Green: 142 70% 45% (available parking, success states)
- Vibrant Orange: 25 90% 55% (call-to-action, booking confirmations)

**Status Colors:**
- Available Green: 120 60% 50%
- Limited Yellow: 45 85% 60%
- Unavailable Red: 0 70% 55%

**Neutral Palette:**
- Dark Gray: 220 15% 20% (text, icons)
- Light Gray: 220 10% 95% (backgrounds, dividers)
- Pure White: 0 0% 100% (cards, surfaces)

### Typography
- **Primary:** Inter (Google Fonts) - clean, readable for both English/Hindi
- **Headings:** 600-700 weight
- **Body:** 400-500 weight
- **Captions:** 300-400 weight

### Layout System
Consistent spacing using Tailwind units: **2, 4, 8, 12, 16** (p-2, m-4, h-8, etc.)
- Base padding: p-4
- Section spacing: mb-8
- Component gaps: gap-4
- Card padding: p-6

### Component Library

**Navigation:**
- Bottom tab bar (mobile-first) with 4 primary sections
- Clean header with location selector and profile avatar
- Floating action buttons for quick booking/listing

**Maps & Search:**
- Full-screen map with overlay controls
- Color-coded parking spots (green/yellow/red availability)
- Search bar with location autocomplete
- Filter chips for pricing tiers (Premium/Saver/Suggested)

**Cards & Lists:**
- Elevated cards with subtle shadows
- Parking spot cards with image, pricing, distance
- Booking history with status indicators
- Vendor listings with rating stars

**Forms & Inputs:**
- Rounded input fields with floating labels
- OTP verification screens with auto-advancing inputs
- Toggle switches for vendor/user mode
- Date/time pickers for reservations

**Buttons:**
- Primary: filled with brand colors
- Secondary: outline style with blurred backgrounds on images
- Floating action buttons for core actions
- Icon buttons for navigation and controls

**Overlays:**
- Bottom sheets for booking details and confirmations
- Modal overlays for payment flows
- Toast notifications for status updates
- Loading states with skeleton screens

### Visual Treatments
**Gradients:** Subtle blue-to-purple gradients in hero sections and headers (210 85% 25% to 260 70% 35%)

**Backgrounds:** Clean white surfaces with subtle gray backgrounds for sections

**Shadows:** Material Design inspired elevation with soft shadows

### Images
**Hero Image:** No large hero image - prioritize map interface for immediate functionality

**Supporting Images:**
- Parking spot thumbnails in search results
- Vendor profile photos in listings
- Success/confirmation illustrations for completed bookings
- Empty state illustrations for no results/bookings

### Indian Market Adaptations
- ₹ INR currency display with Indian number formatting
- Hindi/English language toggle in top navigation
- Local payment method icons (UPI, Paytm, etc.)
- Indian city-specific map styling and landmarks

### Mobile-First Principles
- Touch-friendly 44px minimum tap targets
- Thumb-accessible bottom navigation
- Swipe gestures for map exploration
- Single-handed operation priority
- Progressive disclosure for complex features

This design system creates a familiar yet distinctive parking app that leverages Uber's proven UX patterns while addressing the specific needs of the Indian parking market.