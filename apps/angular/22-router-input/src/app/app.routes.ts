import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home.component'),
  },
  {
    path: 'subscription/:testId',
    loadComponent: () => import('./test.component'),
    // This is static data. You can also pass dynamic data (see component passing [state])
    // data: {
    //   permission: 'admin',
    // },
  },
];
