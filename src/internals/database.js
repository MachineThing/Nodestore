const { Client } = require('pg');
const { config } = require('../config.js');

exports.query = async function(sql) {
  const database = new Client( // All of this is in the config.js file
    {'user':config['PG_USER'],
    'password':config['PG_PASSWORD'],
    'database':config['PG_DATABASE']
  });
  await database.connect()
  const result = await database.query(sql);
  database.end()
  return result;
}
