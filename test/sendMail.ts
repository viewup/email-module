// @ts-ignore
const {sendMail} = require('../lib/Mailer/mail');


const mail= {
    from: 'breno@viewup.com.br',
    to: 'breno@viewup.com.br',
    subject: 'subtitulo',
    html: '<html></html>',

};

describe("Send Mail", function () {



    // @ts-ignore
    it('sendMail', () => {
        try {
            const result = sendMail(mail);
        } catch (e) {
            console.log(e);


        }
    });




});
