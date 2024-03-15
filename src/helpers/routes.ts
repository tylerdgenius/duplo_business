export const routes = {
  entry: 'api',
  v1: {
    entry: 'v1',
    user: {
      entry: 'user',
      create: 'create',
      login: 'login',
    },
    product: {
      entry: 'product',
      create: 'create',
      getAll: 'all',
      getSingle: 'single/:id',
    },
    organization: {
      entry: 'organization',
    },
    order: {
      entry: 'order',
      create: 'create',
      getAll: 'all',
      getSingle: 'single/:id',
    },
    permissions: {
      entry: 'permissions',
      create: 'create',
      getAll: 'all',
      getSingle: 'single/:id',
      getViews: 'views/all',
    },
    roles: {
      entry: 'roles',
      create: 'create',
      getAll: 'all',
    },
  },
};
