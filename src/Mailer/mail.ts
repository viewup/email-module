//@ts-ignore
//@ts-nocheck
'use strict';
const mailer = require('nodemailer');
const Promise = global.Promise;
const path = require('path');
const commerceBCC = 'emails@viewup.com.br';
// const Render = require('./render');
const emailFolder = path.join(__dirname, '..', 'Mailer', 'email');
const moment = require('moment');
const url = require('url');
// const Utils = require('./utils');
const juice = require('juice'); //Compress HTML
import * as fs from "fs";
const _ = require('lodash');


const Utils = {
    clone: (data) => JSON.parse(JSON.stringify(data))
};
/*
 mail format{
 from: frommail@viewup.com,
 to: tomail@viewup.com,
 subject: samplesub,
 html: <html></html>
 };
 */

/**
 * @param {Object} smtp - Configuração de smtp
 * @param {Object} mail - Email no formato acima
 * @param {Function|Object} callback - Função de callback (caso não use Promise)
 * @return {Promise}
 */

export  const transporter = _.curry((smtp,mail)=>{
    return sendMail(smtp,mail);
}) ;
export const sendMail = (smtp,mail, callback) => {
    
    let tmpSmtp = smtp;
    let bcc = commerceBCC;
    const tmpFrom = mail.from;
    if (typeof callback === "object" && process.env.NODE_ENV !== "development") {
        try {
            tmpSmtp = callback;
            callback = null;
            if (tmpSmtp === null) {
                tmpSmtp = smtp;
                mail.from = (/<[^>]*>/ig).test(mail.from) ? mail.from.replace(/<[^>]*>/ig, ` <${tmpSmtp.auth.user}>`) : tmpSmtp.auth.user;
            } else {
                if (tmpSmtp.port.length == 0 || tmpSmtp.host.length == 0 || tmpSmtp.auth.user.length == 0 || tmpSmtp.auth.pass.length == 0) {
                    tmpSmtp = smtp;
                    bcc += ',' + tmpFrom;
                }
                mail.from = (/<[^>]*>/ig).test(mail.from) ? mail.from.replace(/<[^>]*>/ig, ` <${tmpSmtp.auth.user}>`) : tmpSmtp.auth.user;
            }
        } catch (error) {
            tmpSmtp = smtp;
            mail.from = (/<[^>]*>/ig).test(mail.from) ? mail.from.replace(/<[^>]*>/ig, ` <${tmpSmtp.auth.user}>`) : tmpSmtp.auth.user;
            bcc += ',' + tmpFrom;
        }
    }

    tmpSmtp = process.env.NODE_ENV === "development" ? smtp : tmpSmtp;
    const trasnport = mailer.createTransport(tmpSmtp);
     mail = {
        from: mail.from, // used as MAIL FROM: address for SMTP
        to: mail.to,
        attachments: mail.attachments,
        html: mail.html
    };
    mail.bcc = bcc;
    

    const copy = JSON.parse(JSON.stringify(mail));
    delete copy.html;
    return trasnport.sendMail(mail)
    
};
/**
 *
 * @param smtp
 * @return {Promise}
 */
function verify(smtp) {
    return mailer
        .createTransport(smtp)
        .verify()
}
/**
 *
 *
 * Renderiza e envia um email
 *
 * @param {{from: String, to:String, subject: String }} mail
 * @param {String} file - Nome ou caminho do arquivo de template
 * @param {Object} data - Dados a serem passados para renderizar arquivo
 * @param {Boolean} [debug]
 * @param {Object} data.company - Objeto de empresa
 * @return {Promise}
 * Ajuda sobre como proceder com isso tudo que acontece
 */
// export const renderMail = async  (mail: any, file: string, data: any, debug?: Boolean) => {
//     // return new Promise((resolve, reject) => {
//         try{
//         file = (file || '').trim();
//         data = data || {};
//         if (!data.company)
//             console.warn(new Error("company not defined"));
//         data.company = Utils.clone(data.company || {});
//         switch (file.toLowerCase()) {
//             case "simplemail":
//             case "simple":
//                 file = "simpleEmail";
//                 break;
//             default:
//                 file = file.toLowerCase() ? file.toLowerCase() : "simpleEmail";
//                 break;
//         }
//         if (file.indexOf('.html') === -1) {
//             file += '.html';
//         }
//         if (typeof data.company.image !== "object") {
//             data.company.image = null;
//         }
//         data.company.baseAddress = null;
//         if (data.company.addresses) {
//             data.company.baseAddress = data.company.addresses.find((a => a.type == 0)) || data.company.addresses[0] || null;
//         }
//         if (!data.company.pallet) {
//             data.company.pallet = {
//                 accentColor: "#fff"
//             }
//         }

//         data.title = data.title || "Novo email";
//         data.copyrightDate = moment().format('YYYY');
//         data.date = data.date || moment().format('DD/MM/YYYY HH:mm');
//         data.link = data.link || {};
//         const html = await Render.dot(emailFolder + '/' + file, data || {})
//         mail.html= await juice(html);
//           const result = await sendMail(mail, data.company.smtp)
//           console.log("MAIL SENT", mail);
//           return result;
//             // .then((response) => debug ? resolve({ response, mail }) : resolve(response))
//             // .catch((error) => console.error({ error }) || reject(error));
//     // })
//     }catch(e){
//         console.error("SEND MAIL ERROR", e);
//         throw e;
//     }
// }

// const renderDebug = (mail, file, data) => {
//     return renderMail(mail, file, data, true);
// }

// exports.sendMail = sendMail;
// // exports.renderMail = renderMail;
// exports.verify = verify;
// // exports.renderDebug = renderDebug;
// module.exports = exports;
