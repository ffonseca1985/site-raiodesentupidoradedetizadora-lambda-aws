///Lambda responsável por enviar os e-mails

const nodemailer = require('nodemailer');

exports.handler = function (event, context, callback) {

    var datetime = require('node-datetime');

    let name = event.name
    let email = event.email
    let tel = event.tel
    let message = event.message

    let data = datetime.create();
    data.format('m/d/Y H:M:S');

    let htmlRemetente = "<h2>Nova mensagem vinda do site: Raio Desentupidora<h2>"
    htmlRemetente += "<p>Nome:" + name + "<p>"
    htmlRemetente += "<p>Email:" + email + "<p>"
    htmlRemetente += "<p>Telefone:" + tel + "<p>"
    htmlRemetente += "<p>Mensagem:" + message + "<p>"
    htmlRemetente += "<p>Data:" + new Date(data.now()) + "<p>"

    const transporter = nodemailer.createTransport({
        host: "email-ssl.com.br", //endereco smtp

        port: 465,
        secure: true,
        auth: {
            user: "contato@raiodesentupidora.com.br",
            pass: "xxxxx"
        },
        tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
        from: 'contato@raiodesentupidora.com.br',
        to: 'contato@raiodesentupidora.com.br',
        subject: 'Mensagem Vinda do Site Raio Desentupidora',
        html: htmlRemetente
    };

    let response = {
        event: event
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            context.fail('Failed!')
            response.statusCode = 500
        } else {
            console.log('Email enviado: ' + info.response);
            context.succeed('Success!')
            response.statusCode = 200
        }
    });

    let htmlDestinatario = "<p>Olá, Tudo bem?</p>"
    htmlDestinatario += "<p>Somos da Raia Desentupidora</p>"
    htmlDestinatario += "<p>Obrigado por solicitar os nossos serviços - logo entraremos em contato para solucionar as suas dúvidas.</p>"
    htmlDestinatario += "<br />"
    htmlDestinatario += "<br />"
    htmlDestinatario += "<p>Central de Atendimento</p>"
    htmlDestinatario += "<p>Email: contato@raiodesentupidora.com.br</p>"

    const mail2Options = {
        from: 'contato@raiodesentupidora.com.br',
        to: event.email,
        subject: 'Raio Desentupidora',
        html: htmlDestinatario
    };

    transporter.sendMail(mail2Options, function (error, info) {
        if (error) {
            response.statusCode = 500
        } else {
            response.statusCode = 200
        }
    });

    return response;
}
