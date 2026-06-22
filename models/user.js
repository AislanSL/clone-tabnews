import database from "infra/database.js";
import { NotFoundError, ValidationError } from "infra/errors.js";

async function findOneByUsername(username) {
  const userFound = await runSelectQuery(username)

  return userFound

    async function runSelectQuery(username) {
    const results = await database.query({
      text: `
        SELECT  
          *
        FROM 
          users
        WHERE
          LOWER(username) = LOWER($1)
        LIMIT
          1
        ;`,
      values: [username],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
                message: "O username não encontrado",
        action: "Verifique o username",
      })
    }

    return results.rows[0]
  }
}

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validateUniqueUsername(userInputValues.username);

  const newUser = insertQuery(userInputValues);
  return newUser;

  async function validateUniqueEmail(email) {
    const results = await database.query({
      text: `
        SELECT  
          email 
        FROM 
          users
        WHERE
          LOWER(email) = LOWER($1)
        ;`,
      values: [email],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "Email já está sendo utilizado",
        action: "Utilize outro email",
      });
    }
  }

  async function validateUniqueUsername(username) {
    const results = await database.query({
      text: `
        SELECT  
          username 
        FROM 
          users
        WHERE
          LOWER(username) = LOWER($1)
        ;`,
      values: [username],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "Username já está sendo utilizado",
        action: "Utilize outro username",
      });
    }
  }

  async function insertQuery(userInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO 
          users (username, email, password) 
        VALUES 
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return results.rows[0];
  }
}

const user = {
  create,
  findOneByUsername
};

export default user;
