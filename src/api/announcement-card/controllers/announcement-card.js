'use strict';

/**
 * announcement-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::announcement-card.announcement-card', ({ strapi }) => ({

    async find(ctx) {
        const userId = ctx.state.user.userId;
        // Call the default core action
        const { data, meta } = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    image: true,
                    targeting_rules: {
                        fields: ['name', 'userIds'],
                    },
                    card_tags: {
                        fields: ['title'],
                    },
                },
            },
        });

        // Filter based on targeting_rules.userIds
        const filtered = data.filter(card => {

            const rules = card?.targeting_rules ?? [];

            // Show to everyone if no rules attached
            if (rules.length === 0) return data;

            // Otherwise check if requestedUserId is in any rule.userIds
            return rules.some(rule => {
                const ids = rule.userIds || [];
                return ids.includes(userId);
            });
        });

        return { filtered, meta };
    },

}));
