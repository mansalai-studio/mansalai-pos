const { Model } = require('objection');

export default class User extends Model {
    username!: string;
    password!: string;
    
    static tableName = 'users'

    $beforeInsert() {
      this.created_at = new Date().toISOString();
      this.updated_at = new Date().toISOString();
    }
  
    // $beforeUpdate() {
    //   this.updated_at = new Date().toISOString();
    // }

    static jsonSchema = {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 6 } // optional
      }
    }
    
}
