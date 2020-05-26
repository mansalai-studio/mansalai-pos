
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.uuid('id').primary();
        table.integer('category_id');
        table.string('name').notNullable();
        table.text('description');
        table.integer('stock');
        table.string('sku');
        table.integer('price')
        table.string('slug').notNullable();
        table.timestamps(false, true);
        table.foreign('category_id').references('categories.id');
    }); 
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExist('products');
};
