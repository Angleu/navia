module.exports = {
  routes: [{
    method: 'GET',
    path: '/encomendas/driver/free',
    handler: 'encomenda.findFreeEncomenda',
    config: {
      policies: [],
      middlewares: [],
    },
  }]
};

