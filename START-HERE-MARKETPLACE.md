# START HERE — Cypress Flips Marketplace Command Center

This is the operating guide for taking Cypress Flips inventory from the website and posting it across Facebook Marketplace, OfferUp, eBay, Mercari, Nextdoor, Craigslist, and future channels like Whatnot/TCGplayer.

> Core pricing strategy: **website direct local pickup prices are the lowest.** Marketplace prices should be higher to account for fees, shipping, platform friction, and negotiation.

---

## 1. Current marketplace documents

Use these category packs first:

```text
MARKETPLACE-VIDEO-GAMES-CONSOLES.md
MARKETPLACE-DISNEY-PLUSH-ACCESSORIES.md
MARKETPLACE-ACTION-FIGURES-COLLECTIBLES.md
MARKETPLACE-VINTAGE-ELECTRONICS-MISC.md
```

Use these workflow documents:

```text
MARKETPLACE-UPLOAD-TRACKER.md
MARKETPLACE-COPY-PASTE-LISTINGS.md
MARKETPLACE-NEGOTIATION-SCRIPTS.md
HIVEMIND-WEBSITE-REVIEW.md
```

---

## 2. What to post first

Post highest-conversion / highest-ticket items first.

### Day 1 — Highest value / fastest local movers

1. Nintendo Switch OEM Bundle
2. PS2 Fat Ultimate Bundle
3. Game Boy Color Teal + Pokémon Yellow
4. Nintendo Switch Standard Bundle

### Day 2 — Easy video game sales

5. Zelda: A Link Between Worlds
6. New Super Mario Bros. 2

### Day 3 — Anime/action figures

7. Trafalgar Law
8. Katakuri
9. Yuji Itadori
10. Megumi Fushiguro
11. Cody Rhodes

Zoro is currently on hold. Do not post aggressively unless the buyer falls through.

### Day 4 — Disney plush/accessories

12. Scamp
13. Kovu
14. Figaro
15. Grogu
16. Pikachu purse
17. Bambi

### Day 5 — Vintage electronics

18. Coby CX-CD109 Personal CD Player

---

## 3. Where to post each category

| Category | Best Platforms | Why |
|---|---|---|
| Switch / PS2 / GBC | Facebook, OfferUp, Nextdoor, Craigslist, eBay | Parents and retro gamers search locally first. |
| 3DS cartridges | Facebook, OfferUp, eBay, Mercari | Easy small sales; can bundle. |
| Anime figures | eBay, Mercari, Facebook, OfferUp | Collectors search by character and figure line. |
| Disney plush | Mercari, eBay, Facebook, Nextdoor | Giftable, collectible, easy to ship. |
| Vintage electronics | eBay, Mercari, Facebook | Niche nostalgia buyers; disclose untested status. |
| Future TCG | TCGplayer, eBay, Whatnot, Facebook | Condition/authenticity sensitive. |
| Future motorcycle accessories | Facebook, OfferUp, Craigslist, groups | Fitment/local inspection matters. |

---

## 4. Pricing rule

Use this pricing ladder:

```text
Website = best direct price
Facebook/OfferUp = website + 10–30%
eBay/Mercari = website + 20–50% depending shipping/fees/rarity
```

Example:

```text
Website: $190
Facebook/OfferUp: $225
eBay/Mercari: $220–240 + shipping
```

---

## 5. Status workflow

When posting, update the website/Firebase status when needed:

```text
available → hold → sold
available → reserved → sold
available → hidden
```

Current supported statuses:

```text
available
hold
pending
reserved
sold
hidden
archived
```

---

## 6. Before posting checklist

For each item:

- [ ] Confirm website price.
- [ ] Confirm marketplace ask price.
- [ ] Confirm product status is `available` unless intentionally held.
- [ ] Check photos are in correct order.
- [ ] Confirm condition flaws are disclosed.
- [ ] Copy platform-specific title.
- [ ] Copy platform-specific description.
- [ ] Add Cypress, CA pickup language.
- [ ] Add “website direct price is lower” only when useful.
- [ ] After posting, mark platform in `MARKETPLACE-UPLOAD-TRACKER.md`.

---

## 7. After item sells

1. Update Firebase or `js/inventory.js` status:

```text
status: "sold"
```

2. Remove or mark sold on every marketplace.
3. If buyer leaves feedback, ask if it can appear as testimonial.
4. Add note to tracker.

---

## 8. Recommended weekly rhythm

### Monday
Post or renew 2–3 video game listings.

### Tuesday
Post or renew 2–3 collectibles/anime figures.

### Wednesday
Post or renew plush/accessories.

### Thursday
Check messages, update prices, mark holds/sold.

### Friday–Sunday
Best time for parent/gift buyers and local pickup scheduling.

---

## 9. The Cypress Flips marketplace positioning

Use this brand angle consistently:

```text
Inspected used goods. Honest condition notes. Fair local pickup pricing. Cypress, CA based.
```

The website should remain the place with the best direct local price. Marketplaces are discovery channels. The website is the home base.
