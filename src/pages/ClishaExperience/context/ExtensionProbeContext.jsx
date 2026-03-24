import React, { createContext, useContext } from 'react';
import { useClishaExtensionProbe } from '../../../hooks/useClishaExtensionProbe';

const ExtensionProbeContext = createContext(null);

export function ExtensionProbeProvider({ children }) {
  const value = useClishaExtensionProbe();
  return <ExtensionProbeContext.Provider value={value}>{children}</ExtensionProbeContext.Provider>;
}

export function useExtensionProbe() {
  const ctx = useContext(ExtensionProbeContext);
  if (!ctx) {
    return {
      ok: typeof window !== 'undefined' && window.localStorage.getItem('hasExt') === 'true',
      status: typeof window !== 'undefined' ? window.localStorage.getItem('extensionStatus') : 'unknown',
      version: null,
      recheck: () => {},
      requiredVersion: '1.1.0',
      probeReady: true,
    };
  }
  return ctx;
}
