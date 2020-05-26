
exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table) {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.string('slug').notNullable();
        table.timestamps(false, true);
    }); 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExist('categories');
};
