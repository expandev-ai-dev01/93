/**
 * @constants ROUTES
 * @summary Application route paths
 * @category navigation
 */
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  PRODUCT_DETAIL: '/catalog/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
