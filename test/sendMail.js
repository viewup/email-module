// @ts-ignore
var sendMail = require('../lib/Mailer/mail').sendMail;
var mail = {
    from: 'breno@viewup.com.br',
    to: 'breno@viewup.com.br',
    subject: 'subtitulo',
    html: '<html></html>',
};
describe("Send Mail", function () {
    // @ts-ignore
    it('sendMail', function () {
        try {
            var result = sendMail(mail);
        }
        catch (e) {
            console.log(e);
        }
    });
});
