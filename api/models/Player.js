/**
 * Player.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ownership: {
      type: 'number',
      required: true
    },
    details: {
      type: 'number',
      required: true
    },
    quality: {
      type: 'number',
      required: true
    },
    estimation: {
      type: 'number',
      required: true
    },
    resilience: {
      type: 'number',
      required: true
    },
    adaptation: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    retro_id: {
      type: 'string',
      required: true
    },
  }
}
