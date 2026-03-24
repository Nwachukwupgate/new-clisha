# Dev extension zip (Chrome)

The Settings page on **dev.clisha.me** / **localhost** links to:

`clisha-experience-extension.zip`

## Generate the zip

From the web app repo root:

```bash
npm run pack-extension
```

By default this zips `~/Documents/clisha-experience-extension` (override with `CLISHA_EXPERIENCE_EXTENSION_PATH` or pass the folder as the first argument to `scripts/pack-clisha-extension.sh`).

Then build/deploy so `build/extensions/clisha-experience-extension.zip` is served.

## Host the zip elsewhere (optional)

Set in `.env` or your host:

`REACT_APP_CLISHA_EXTENSION_ZIP_URL=https://your-cdn/clisha-experience-extension.zip`

## Git

`*.zip` under `public/extensions/` is gitignored to avoid large binaries; CI can run `npm run pack-extension` before `npm run build`.
