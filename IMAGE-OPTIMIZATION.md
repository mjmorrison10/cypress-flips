# Image Optimization Plan

The storefront currently uses JPG product photos directly from the `images/` folder. This works, but for faster mobile loading the next performance upgrade should be converting product images into optimized web formats and thumbnails.

## Recommended production setup

For each product image, create:

```text
full-size WebP: 1200px wide max
thumbnail WebP: 500px wide max
fallback JPG: original or compressed JPG
```

Example:

```text
images/optimized/video-games/switch-main.webp
images/optimized/video-games/switch-main-thumb.webp
```

## Why this matters

- Faster mobile page loads
- Better Core Web Vitals
- Lower data usage for customers
- More professional feel on phones
- Better SEO/performance signals

## Suggested tools

Local tools:

```bash
cwebp input.jpg -q 82 -resize 1200 0 -o output.webp
```

Or use:

- Squoosh
- ImageMagick
- Sharp
- Cloudinary
- Netlify image transforms

## Implementation note

The website already uses lazy loading on dynamically generated product cards. The next step is replacing product image paths in `js/inventory.js` with optimized WebP paths once optimized images are generated.
