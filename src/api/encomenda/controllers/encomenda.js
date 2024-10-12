'use strict';

/**
 * encomenda controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::encomenda.encomenda');

module.exports = createCoreController('api::encomenda.encomenda', ({ strapi }) => ({
  // Sobrescreve o método `find`
  async find(ctx) {
    // Obtém o ID do usuário autenticado
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("Você precisa estar logado para ver os clientes.");
    }

    // Modifica a consulta para retornar apenas os dados que pertencem ao usuário autenticado
    const encomendas = await strapi.db.query('api::encomenda.encomenda').findMany({
      where: { cliente: user.id }, // Filtra pelos clientes do usuário autenticado
      populate: true, // Popula os dados relacionados (opcional)
    });

    return encomendas;
  },

  // Sobrescreve o método `create` para associar o cliente ao usuário autenticado
  async create(ctx) {
    // Obtém o ID do usuário autenticado
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("Você precisa estar logado para criar um cliente.");
    }

    // Adiciona o ID do usuário autenticado nos dados do cliente
    // @ts-ignore
    const { data } = ctx.request.body;

    if (!data) {
      return ctx.badRequest("Nenhum dado foi fornecido.");
    }

    // Associa o cliente ao usuário autenticado
    data.cliente = user.id;

    // Cria o cliente com os dados modificados
    const entity = await strapi.db.query('api::encomenda.encomenda').create({ data });

    return entity;
  },
}));
