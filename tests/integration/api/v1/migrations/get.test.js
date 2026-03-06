import database from "infra/database";

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

test("GET /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const reponseBody = await response.json(); 
  
  expect(Array.isArray(reponseBody)).toBe(true);
  expect(reponseBody.length).toBeGreaterThan(0);
});