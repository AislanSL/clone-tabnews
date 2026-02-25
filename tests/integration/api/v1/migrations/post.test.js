test("POST /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", { method: "POST" });
  expect(response.status).toBe(200);

  const reponseBody = await response.json();
  console.log(reponseBody);
  
  expect(Array.isArray(reponseBody)).toBe(true);
});