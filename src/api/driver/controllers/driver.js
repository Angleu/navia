'use strict';

/**
 * driver controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::driver.driver', ({strapi}) => ({
  // Method to calculate price by kilometer
  async find(ctx) {
    // Obtém o ID do usuário autenticado
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("Você precisa estar logado para ver os Condutor.");
    }

    // console.log(user)

    // Modifica a consulta para retornar apenas os dados que pertencem ao usuário autenticado
    const driver = await strapi.db.query('api::driver.driver').findOne({
      where: {user: user.id}, // Filtra pelos clientes do usuário autenticado
      //populate: true, // Popula os dados relacionados (opcional)
    });

    return driver;
  },
}));
