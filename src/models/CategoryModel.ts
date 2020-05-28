const { Model } = require('objection');

export default class Category extends Model {
    id!: string;
    name!: string;
    description!: string;
    slug!: string;
    
    static tableName = 'categories'

    $beforeInsert() {
      this.created_at = new Date().toISOString();
      this.updated_at = new Date().toISOString();
    }
  
    // $beforeUpdate() {
    //   this.updated_at = new Date().toISOString();
    // }

    static jsonSchema = {
      type: 'object',
      required: ['id', 'name', 'slug'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 255 }, // optional
        slug: { typoe: 'string', minLength: 1, maxLength: 255 }
      }
    }
    
}
