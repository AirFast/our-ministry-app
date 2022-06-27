const bcrypt = require('bcrypt');

const hash = (plaintext) => bcrypt.hashSync(plaintext, +process.env.APP_SALT_ROUNDS);
const compare = (plaintext, hash) => bcrypt.compareSync(plaintext, hash);

module.exports = { hash, compare };