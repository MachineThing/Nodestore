require('dotenv').config();

exports.config = {
  'PG_USER':process.env['PG_USER'],
  'PG_PASSWORD':process.env['PG_PASSWORD'],
  'PG_DATABASE':process.env['PG_DATABASE']
}
