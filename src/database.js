const { Client } = require('pg');
const { config } = require('./config.js');

const database = new Client({'user':config['PG_USER'], 'password':config['PG_PASSWORD'], 'database':config['PG_DATABASE']});

database.connect();

database.query('SELECT * FROM \"items\"', (err, res) => {
  console.log(err ? err.stack : res.rows[1]);
  database.end();
})
