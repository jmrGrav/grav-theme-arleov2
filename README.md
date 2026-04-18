# grav-theme-arleov2

A dark/light Grav CMS theme for [arleo.eu](https://arleo.eu).

Inspired by [LoveIt](https://hugoloveit.com/) (Hugo theme).

![Screenshot](https://raw.githubusercontent.com/jmrGrav/grav-theme-arleov2/main/screenshot.jpg)

## Features

- Dark/light mode with `localStorage` persistence and `prefers-color-scheme` detection
- Anti-FOUC inline script (CSP `nonce`-compatible, no `unsafe-inline` required)
- Sidebar navigation: collapsible on desktop, slide-in drawer on mobile
- Sticky header with logo + search field aligned to sidebar width
- GitHub icon link + theme toggle + burger menu in header controls
- Syntax highlighting via [highlight.js](https://highlightjs.org/) (Tokyo Night Dark / GitHub Light)
- Fully responsive (390px → 1440px+)
- CSP-compliant: no external font CDN, no inline styles
- Compatible with [`grav-plugin-csp-nonce`](https://github.com/Perlkonig/grav-plugin-csp-nonce)

## Requirements

- Grav CMS >= 1.7.0

## Installation

Copy the `arleov2` folder into `user/themes/`.

In `user/config/system.yaml`:

```yaml
pages:
  theme: arleov2
```

## License

MIT — see [LICENSE](LICENSE)
