# 0hmx.com

Source for [0hmx.com](https://0hmx.com), saved from the live website.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` and visit http://localhost:8000. Internet access is required for Numeric.js, loaded from cdnjs.

## Edit and build

- `src/page.html`: homepage, dark banner styling, and red chrome portrait branding.
- `src/assets/red-chrome-portrait.png`: supplied original artwork used for the profile avatar, feature image, and favicon; embedded by the build for single-file deployment.
- `src/jungle.js`: cached monochrome jungle layers, night sky, and speed-linked parallax.
- `src/banner.html`: suspension physics, embedded vehicle artwork, responsive layout, and interactions.
- `python3 build.py`: rebuilds the checked-in `index.html` using only the Python standard library.

## Banner

- Desktop (1024px and wider): truck, bus, car from left to right.
- Tablet (600–1023px): bus and car.
- Mobile (below 600px): car.
- Tap the left/right thirds to change speed by 5 km/h, within 0–90 km/h.
- Tap the center to pause or resume. The invisible buttons also support keyboard focus and activation.
- Brief feedback fades out. Reduced-motion preferences start the animation paused.
- Higher speeds increase roughness and introduce larger ramps. The camera scales to keep jumps visible.

This is an illustrative, stylized simulation rather than an engineering prediction. Vehicle artwork is AI-generated. The red chrome portrait is owner-supplied artwork, displayed in its original colors. Shared red accents connect the portrait to the handle, links, and footer.

## Hosting

The live site is served on the owner's box. This repository is a source backup; pushing changes does not automatically deploy them. Deploy the rebuilt `index.html` through the existing ohmx-box workflow, backing up the current homepage first.
