import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await orchestrator.clearDataBase()
  await orchestrator.runPendingMigrations()
  await orchestrator.deleteAllEmails()
})

describe("Use case: Registration Flow (all successful)", () => {
  test("Create user account", async () => {
    const createUserResponse = await fetch("http://localhost:3000/api/v1/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "RegistrationFlow",
          email: "registration.flow@curso.dev",
          password: "RegistrationFlowPassword",
        })
      }
    )

    expect(createUserResponse.status).toBe(201)

    const createUserResponseBody = await createUserResponse.json()

    expect(createUserResponseBody).toEqual({
      id: createUserResponseBody.id,
      username: "RegistrationFlow",
      email: "registration.flow@curso.dev",
      password: createUserResponseBody.password,
      features: ["read:activation_token"],
      created_at: createUserResponseBody.created_at,
      updated_at: createUserResponseBody.created_at
    })
  })

  test("Receive activation email", async () => {
    const lastEmail = await orchestrator.getLastemail()

    expect(lastEmail.sender).toBe("<contato@ideiasnest.com.br>")
    expect(lastEmail.recipients[0]).toBe("<registration.flow@curso.dev>")
    expect(lastEmail.subject).toBe("Ative seu cadastro no IdeiasNest!")
    expect(lastEmail.text).toContain("RegistrationFlow")
  })

  test("Active account", async () => {

  })

  test("Get user information", async () => {
    
  })
})