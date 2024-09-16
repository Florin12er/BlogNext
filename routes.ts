/**
 * An array of routes that are public
 * These routes are accessible without authentication
 */
export const publicRoutes: string[] = [
  "/", // Home
  "/auth/new-verification",
];

/**
 * An array of routes that are private
 * These routes require authentication
 */
export const privateRoutes: string[] = [];

/**
 * An array of routes used for authentication
 * These routes will autmatically redict to the dashboard
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Prefix for API routes
 * This is used to prefix all API routes
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Login redirect
 * This is the page that the user will be redirected to after login
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
