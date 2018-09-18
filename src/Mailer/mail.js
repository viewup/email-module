//@ts-ignore
//@ts-nocheck
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mailer = require('nodemailer');
var Promise = global.Promise;
var path = require('path');
var commerceBCC = 'emails@viewup.com.br';
var Render = require('./render');
var emailFolder = path.join(__dirname, '..', 'Mailer', 'email');
var moment = require('moment');
var url = require('url');
// const Utils = require('./utils');
var juice = require('juice'); //Compress HTML
var _ = require('lodash');
var Utils = {
    clone: function (data) { return JSON.parse(JSON.stringify(data)); }
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
exports.transporter = _.curry(function (smtp, mail) {
    return exports.sendMail(smtp, mail);
});
exports.sendMail = function (smtp, mail, callback) {
    var tmpSmtp = smtp;
    var bcc = commerceBCC;
    var tmpFrom = mail.from;
    if (typeof callback === "object" && process.env.NODE_ENV !== "development") {
        try {
            tmpSmtp = callback;
            callback = null;
            if (tmpSmtp === null) {
                tmpSmtp = smtp;
                mail.from = (/<[^>]*>/ig).test(mail.from) ? mail.from.replace(/<[^>]*>/ig, " <" + tmpSmtp.auth.user + ">") : tmpSmtp.auth.user;
            }
            else {
                if (tmpSmtp.port.length == 0 || tmpSmtp.host.length == 0 || tmpSmtp.auth.user.length == 0 || tmpSmtp.auth.pass.length == 0) {
                    tmpSmtp = smtp;
                    bcc += ',' + tmpFrom;
                }
                mail.from = (/<[^>]*>/ig).test(mail.from) ? mail.from.replace(/<[^>]*>/ig, " <" + tmpSmtp.auth.user + ">") : tmpSmtp.auth.user;
            }
        }
        catch (error) {
            tmpSmtp = smtp;
            mail.from = (/<[^>]*>/ig).test(mail.from) ? mail.from.replace(/<[^>]*>/ig, " <" + tmpSmtp.auth.user + ">") : tmpSmtp.auth.user;
            bcc += ',' + tmpFrom;
        }
    }
    tmpSmtp = process.env.NODE_ENV === "development" ? smtp : tmpSmtp;
    var trasnport = mailer.createTransport(tmpSmtp);
    mail = {
        from: mail.from,
        to: mail.to,
        attachments: mail.attachments,
        html: mail.html
    };
    mail.bcc = bcc;
    var copy = JSON.parse(JSON.stringify(mail));
    delete copy.html;
    return trasnport.sendMail(mail);
};
/**
 *
 * @param smtp
 * @return {Promise}
 */
function verify(smtp) {
    return mailer
        .createTransport(smtp)
        .verify();
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
exports.renderMail = function (mail, file, data, debug) { return __awaiter(_this, void 0, void 0, function () {
    var html, _a, result, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                file = (file || '').trim();
                data = data || {};
                if (!data.company)
                    console.warn(new Error("company not defined"));
                data.company = Utils.clone(data.company || {});
                switch (file.toLowerCase()) {
                    case "simplemail":
                    case "simple":
                        file = "simpleEmail";
                        break;
                    default:
                        file = file.toLowerCase() ? file.toLowerCase() : "simpleEmail";
                        break;
                }
                if (file.indexOf('.html') === -1) {
                    file += '.html';
                }
                if (typeof data.company.image !== "object") {
                    data.company.image = null;
                }
                data.company.baseAddress = null;
                if (data.company.addresses) {
                    data.company.baseAddress = data.company.addresses.find((function (a) { return a.type == 0; })) || data.company.addresses[0] || null;
                }
                if (!data.company.pallet) {
                    data.company.pallet = {
                        accentColor: "#fff"
                    };
                }
                data.title = data.title || "Novo email";
                data.copyrightDate = moment().format('YYYY');
                data.date = data.date || moment().format('DD/MM/YYYY HH:mm');
                data.link = data.link || {};
                return [4 /*yield*/, Render.dot(emailFolder + '/' + file, data || {})];
            case 1:
                html = _b.sent();
                _a = mail;
                return [4 /*yield*/, juice(html)];
            case 2:
                _a.html = _b.sent();
                return [4 /*yield*/, exports.sendMail(mail, data.company.smtp)];
            case 3:
                result = _b.sent();
                console.log("MAIL SENT", mail);
                return [2 /*return*/, result];
            case 4:
                e_1 = _b.sent();
                console.error("SEND MAIL ERROR", e_1);
                throw e_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
var renderDebug = function (mail, file, data) {
    return exports.renderMail(mail, file, data, true);
};
