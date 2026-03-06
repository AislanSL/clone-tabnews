import database from "infra/database";

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

test("POST /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", { method: "POST" });
  expect(response1.status).toBe(201);

  const reponse1Body = await response1.json();
  
  expect(Array.isArray(reponse1Body)).toBe(true);
  expect(reponse1Body.length).toBeGreaterThan(0);
});

test("POST /api/v1/migrations should return 200", async () => {
  const response2 = await fetch("http://localhost:3000/api/v1/migrations", { method: "POST" });
  expect(response2.status).toBe(200);

  const reponse2Body = await response2.json();
  
  expect(Array.isArray(reponse2Body)).toBe(true);
  expect(reponse2Body.length).toBe(0);
});