/**
 * Clisha Experience — Redirects to classic dashboard for full-featured pages
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ROUTE_MAP = {
  wallet: '/dashboard/wallet',
  rank: '/dashboard/rank',
  profile: '/dashboard/profile',
  token: '/dashboard/token',
  team: '/dashboard/team',
  settings: '/dashboard/settings',
  help: '/dashboard/help',
};

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const segment = pathname.split('/').pop();
  const to = ROUTE_MAP[segment] || '/dashboard';
  return <Navigate to={to} replace />;
}
