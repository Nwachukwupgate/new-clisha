/**
 * Single narrative for extension + dashboard (popup mirrors this in the extension build).
 */
export const HEALTH_NARRATIVE = {
  oneLiner:
    'Open a task on Clisha → we attach to the tab → you complete steps → we open the reward page.',
  steps: [
    {
      title: 'Install',
      body: 'Add the Clisha Experience extension from the Chrome Web Store (or load unpacked for testing).',
    },
    {
      title: 'Activate',
      body: 'On Tasks, use Activate Task. We open Google or your journey URL with keys so the extension can track progress.',
    },
    {
      title: 'Claim',
      body: 'Finish the steps in the other tab, then return to Clisha and open your reward when you are done.',
    },
  ],
};

export const CHROME_WEB_STORE_URL =
  'https://chromewebstore.google.com/detail/clishame/fggiejockcliimogohnaiakpbcjaafcl';

/**
 * Static path under `public/` after build. Override with `REACT_APP_CLISHA_EXTENSION_ZIP_URL` (absolute URL).
 * Run `npm run pack-extension` to generate `public/extensions/clisha-experience-extension.zip` from a local repo.
 */
export const DEV_EXTENSION_ZIP_PUBLIC_PATH = '/extensions/clisha-experience-extension.zip';

/** Resolved download href for the dev zip (env override or CRA `PUBLIC_URL` + public path). */
export function resolveDevExtensionZipDownloadUrl() {
  const fromEnv = process.env.REACT_APP_CLISHA_EXTENSION_ZIP_URL;
  if (fromEnv && String(fromEnv).trim()) return String(fromEnv).trim();
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  return `${base}${DEV_EXTENSION_ZIP_PUBLIC_PATH}`;
}

/** Tooltips for inline glossary on task card / reward */
export const GLOSSARY = {
  sessionId:
    'Session ID ties this task to your browser tab so the extension can verify steps. It is not your password.',
  taskWindow:
    'After you activate, you have a limited time to finish in the other tab before the session may reset.',
  pointsVsCoins:
    'Points are task earnings you can withdraw. Clishacoins are Vendo bonus credits from your package when connected.',
};
