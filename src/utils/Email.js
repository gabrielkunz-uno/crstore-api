import nodemailer from 'nodemailer';

async function send(req, res) {
  try {
    let account = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: 'gabrielcrsdev@gmail.com',
        pass: 'wpAS8xsPC4XLYv7J',
      },
    });
  
    let data = await account.sendMail({
      from: '"CRS Gabriel" <gabrielcrsdev@gmail.com>',
      to: "gabrielkunz2012@gmail.com, gabriel.kunz@unochapeco.edu.br",
      subject: "Recuperação de senha CRStore",
      text: "Salve mano, pediu pra dar recovery ae?",
      html: "<b>Salve mano, pediu pra dar recovery ae?</b>",
    });

    return res.status(200).send({
      type: 'success',
      message: 'E-mail enviado com sucesso',
      data
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ocorreu um erro ao enviar o e-mail',
      data: error.message
    })
  }
}

export default {
  send
}