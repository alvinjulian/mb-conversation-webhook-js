/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sent', function(t) {
        t.increments('id').unsigned().primary();
        t.string('messageId').notNull();
        t.string('from').notNull();
        t.string('to').notNull();
        t.string('templateName').notNull();
        t.string('trackId').notNull();
        t.string('status').notNull();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('sent');
};
