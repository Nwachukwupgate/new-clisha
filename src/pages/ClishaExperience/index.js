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

import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './dashboard/Dashboard';
import Landing from './Landing';
import ProtectedRoute from './Middleware/ProtectedRoute';

export { Dashboard, Landing, Login, ProtectedRoute, Signup };
