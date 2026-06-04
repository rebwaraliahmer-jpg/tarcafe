# security_spec.md

## Data Invariants
1. **Category Invariants**:
   - Every category must have translation strings in Arabic, English, and Kurdish.
   - Any image URL must be properly formatted string under 2000 characters.
   - Category ID in document path must match the internal ID property.

2. **Menu Item Invariants**:
   - Every menu item must have a category reference.
   - Pricing must be non-negative.
   - Every item must have localized title/description fields and status markers.

3. **Settings Invariants**:
   - General name and descriptions are required in Arabic, English, and Kurdish.
   - Admin password must be handled securely can be up to 100 characters.

## The "Dirty Dozen" Handled Payloads
1. Attempting to inject random attributes (ghost fields) into a Category object.
2. Attempting to create a Category with a mismatched ID in document path.
3. Injecting a 1MB payload string as a title in Arabic/Kurdish/English fields.
4. Setting any Menu Item price to a negative number.
5. Deleting a Menu Item using a poisoned ID.
6. Attempting to modify non-existing collections like `/admins/`.
7. Overwriting Restaurant settings without language fields.
8. Writing settings containing an empty or extra large passcode.
9. Injecting script tags or HTML in place of image URLs.
10. Bypassing global rules using wildcards.
11. Bypassing size constraints on string properties.
12. Attempting to write floating values where typed objects are expected.
