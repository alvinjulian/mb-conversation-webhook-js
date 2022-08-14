/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('failed', function(t) {
        t.increments('id').unsigned().primary();
        t.string('messageId').notNull();
        t.string('from').notNull();
        t.string('to').notNull();
        t.string('templateName').notNull();
        t.string('trackId').notNull();
        t.string('status').notNull();
        t.string('errorCode').notNull();
        t.text('description').nullable();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').notNull();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('rejected');
};
