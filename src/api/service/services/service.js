'use strict';

/**
 * service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::service.service', ({ strapi }) => ({
  // Method to calculate price by kilometer
  calculatePriceByKilometer(productPricePerKm, kilometers) {
    if (typeof productPricePerKm !== 'number' || typeof kilometers !== 'number') {
      throw new Error('Invalid input: productPricePerKm and kilometers must be numbers');
    }
    return productPricePerKm * kilometers;
  },
}));
