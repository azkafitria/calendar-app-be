'use strict';

/**
 * event controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) =>  ({
    async create(ctx) {    
        const entity = await strapi.service('api::event.event').create({
            data: {
                publishedAt: new Date(),
                user: ctx.state.user.id,
                name: ctx.request.body.data.name,
                description: ctx.request.body.data.description,
                date: ctx.request.body.data.date
            }
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
        return this.transformResponse(sanitizedEntity);
    },
    async update(ctx) {    
        console.log(ctx.state.user.id);
        try {
            const event = await strapi.service('api::event.event').findOne(ctx.params.id, {
                populate: { user: true },
            });
            console.log(event.user.id);
            if (event.user.id != ctx.state.user.id) {
                return ctx.unauthorized();
            }
            const entity = await strapi.service('api::event.event').update(ctx.params.id, {
                data: {
                    name: ctx.request.body.data.name,
                    description: ctx.request.body.data.description,
                }
            });
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        } catch {
            return ctx.notfound;
        }
    },
    async delete(ctx) {   
        try {
            const event = await strapi.service('api::event.event').findOne(ctx.params.id, {
                populate: { user: true },
            });
            if (event.user.id != ctx.state.user.id) {
                return ctx.unauthorized();
            }
            const entity = await strapi.service('api::event.event').delete(ctx.params.id);
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        } catch {
            return ctx.notfound;
        }
    },
    async find(ctx) {
        const events = await strapi.service('api::event.event').find({
            populate: { user: true },
        });
        const entities = events.results.filter(event => event.user.id == ctx.state.user.id);
        const sanitizedEntity = await this.sanitizeOutput(entities, ctx);
        return this.transformResponse(sanitizedEntity);
    },
    async findOne(ctx) {
        try {
            const entity = await strapi.service('api::event.event').findOne(ctx.params.id, {
                populate: { user: true },
            });
            if (entity.user.id != ctx.state.user.id) {
                return ctx.unauthorized();
            }
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        } catch {
            return ctx.notfound;
        }
    }
}));