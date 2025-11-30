'use strict';

/**
 * app-user-profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app-user-profile.app-user-profile', ({ strapi }) => ({
    async update(ctx) {
        const userId = ctx.params.id;
        const updateData = ctx.request.body;

        // 1. Find the document by id
        const document = await strapi
            .service('api::app-user-profile.app-user-profile')
            .find({ filters: { userId: { $eq: userId } } });

        if (!document.results || document.results.length === 0) {
            return ctx.notFound('Entry not found');
        }

        const documentId = document.results[0].documentId;

        // 2. Update the document by documentId
        ctx.params.id = documentId;
        return await super.update(ctx);
    },
}));
