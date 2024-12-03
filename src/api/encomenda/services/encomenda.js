'use strict';

/**
 * encomenda service
 */

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::encomenda.encomenda', ({strapi}) => ({
  async findEncomendaFreeForDriver() {
    const encomendas = await strapi.db.query('api::encomenda.encomenda').findMany({
      where: {driver: null}, // Filtra pela encomenda sem motorista associado
      populate: true, // Popula os dados relacionados (opcional)
    });

    return encomendas;
  },
  async findEncomendaOfDriver(ctx) {

    const driver = ctx.state.user;

    if (!driver) {
      return ctx.unauthorized("Você precisa estar logado para ver os clientes.");
    }

    const encomendas = await strapi.db.query('api::encomenda.encomenda').findMany({
      where: {driver: driver.id}, // Filtra pelos clientes do usuário autenticado
      populate: true, // Popula os dados relacionados (opcional)
    });

    return encomendas;
  }
}));
