import email from 'infra/email.js'

async function sendEmailToUser(user) {
  await email.send({
    from: "IdeiasNest <contato@ideiasnest.com.br>",
    to: user.email,
    subject: "Ative seu cadastro no IdeiasNest!",
    text: `${user.username}, clique no link abaixo para ativar seu cadastro no IdeiasNest:
http://link...

Atenciosamente,
Equipe IdeiasNest`,
  })
}

const activation = {
  sendEmailToUser
}

export default activation