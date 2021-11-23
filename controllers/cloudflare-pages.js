'use strict';

const axios = require("axios");
const pluginId = require("../admin/src/pluginId");

/**
 * cloudflare-pages.js controller
 *
 * @description: A set of functions called "actions" of the `cloudflare-pages` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    const { instances } = strapi.plugins[
      pluginId
    ].config;
    // Send 200 `ok`
    ctx.send({
      instances: (instances || []).map((instance, id) => ({ id, name: instance.name }))
    });
  },

  publish: async (ctx) => {
    const { id } = ctx.request.body;
    const { instances } = strapi.plugins[
      pluginId
    ].config;

    if (instances && instances[id] && instances[id].hook_url) {
      await axios.post(instances[id].hook_url)
    }

    ctx.send({
      message: 'ok'
    });
  }
};
