const pool = require("./dbconfig");
const { encryptField, decryptField } = require("./cryptoUtil");

async function create(userDocument, creditCardToken, value) {
  const encryptedUserDocument = encryptField(userDocument);
  const encryptedCreditCard = encryptField(creditCardToken);

  const query = {
    text: "INSERT INTO crypto (userDocument, creditCardToken, value) VALUES ($1, $2, $3) RETURNING *",
    values: [encryptedUserDocument, encryptedCreditCard, value]
  };

  const result = await pool.query(query);
  return result.rows[0];
}

async function getById(id) {
  const query = {
    text: "SELECT * FROM crypto WHERE id = $1",
    values: [id]
  };

  const result = await pool.query(query);
  if (result.rows.length === 0) {
    return null;
  }

  const entity = result.rows[0];
  entity.userDocument = decryptField(entity.userDocument);
  entity.creditCardToken = decryptField(entity.creditCardToken);
  return entity;
}

module.exports = { create, getById };
