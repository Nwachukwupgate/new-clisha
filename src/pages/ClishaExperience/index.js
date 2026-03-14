/**
 * Clisha Experience — Redesigned gamified entry point
 * Route base: /clisha-x
 *
 * Pages:
 *   - /clisha-x           Landing
 *   - /clisha-x/login     Login
 *   - /clisha-x/signup    Sign up
 *   - /clisha-x/dashboard Gamified dashboard (protected)
 */

export { default as Login } from './auth/Login';
export { default as Signup } from './auth/Signup';
export { default as Dashboard } from './dashboard/Dashboard';
export { default as Landing } from './Landing';
export { default as ProtectedRoute } from './Middleware/ProtectedRoute';
