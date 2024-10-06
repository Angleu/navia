'use strict';

/**
 * produto controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::produto.produto');

module.exports = createCoreController('api::produto.produto', ({ strapi }) => ({
  // Sobrescreve o método `find`
  async find(ctx) {
    // Obtém o ID do usuário autenticado
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("Você precisa estar logado para ver seus produtos.");
    }

    // Modifica a consulta para retornar apenas os produtos que pertencem ao usuário autenticado
    const produtos = await strapi.db.query('api::produto.produto').findMany({
      where: { user: user.id }, // Filtra pelos produtos do usuário autenticado
      populate: true, // Popula os dados relacionados (opcional)
    });

    return produtos;
  },

  // Sobrescreve o método `create` para associar o produto ao usuário autenticado
  async create(ctx) {
    // Obtém o ID do usuário autenticado
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("Você precisa estar logado para criar um produto.");
    }

    // Adiciona o ID do usuário autenticado nos dados do produto
    // @ts-ignore
    const { data } = ctx.request.body;

    if (!data) {
      return ctx.badRequest("Nenhum dado foi fornecido.");
    }

    // Associa o produto ao usuário autenticado
    data.user = user.id;

    // Cria o produto com os dados modificados
    const entity = await strapi.db.query('api::produto.produto').create({ data });

    return entity;
  },
}));
