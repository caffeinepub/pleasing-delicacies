# Pleasing Delicacies

## Current State
Full product listing app with laddus, chutney powders, and savouries sections. Has WhatsApp contact button. No cart functionality.

## Requested Changes (Diff)

### Add
- Cart state (React context or useState) storing items with product name, quantity, weight option, and price
- "Add to Cart" button on each product card
- Floating cart icon showing item count badge
- Cart drawer/sheet that lists selected items with quantities
- "Send Order via WhatsApp" button in cart that compiles the order summary and opens wa.me/918792880292 with pre-filled message
- Highlighted Instagram and WhatsApp navigation/contact tabs

### Modify
- Product cards to include an "Add to Cart" button with weight/quantity selector

### Remove
- Nothing

## Implementation Plan
1. Add CartContext with items array, addItem, removeItem, updateQuantity functions
2. Add "Add to Cart" button to each product card with weight option selector
3. Add floating cart button with item count badge
4. Add cart Sheet/Drawer component listing cart items with remove buttons
5. Add WhatsApp order button that generates order text and opens wa.me link
6. Highlight Instagram and WhatsApp buttons in nav/contact section with vibrant colors
