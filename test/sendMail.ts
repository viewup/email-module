// @ts-ignore
const {sendMail,transporter} = require('../src/Mailer/mail');


const mail= {
    from: 'breno@viewup.com.br',
    to: 'breno@viewup.com.br',
    subject: 'subtitulo',
    html: '<html></html>',

};

const smtp = {
        "port": 8888,
        "host": "localhost",
    };

describe("Send Mail", function () {



    // @ts-ignore
    it('sendMail', () => {
        try {
            const result = sendMail(smtp,mail);
        } catch (e) {
            console.log(e);
        }
    });
    it('transporter', async() => {
        try {
            const result = transporter(smtp);
            const resultado= await result(mail);
            console.log(resultado);
        } catch (e) {
            console.log(e);
        }
    });




});
