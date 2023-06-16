const mapping: Record<string, string> = {
  businesses: 'business',
  'google-ratings': 'google_rating',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
