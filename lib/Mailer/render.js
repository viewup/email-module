"use strict";
var path = require('path');
var fs = require('fs');
var Promise = global.Promise;
var templatesRoot = path.resolve(__dirname, '..', 'Mailer', 'email');
var dot = require('dot');
var dotEmc = require('dot-emc');
var Render = {};
var cdn = "";
// let Utils = require('./utils');
//UTILS
/**
 * Get extension of file
 *
 * @param {string} path
 * @returns {string} extension
 */
function getExtension(path) {
    path = (path + '').split('.');
    return path[path.length - 1];
}
/**
 * obtem caminho de arquivo
 *
 * @param {string} filePath - Nome ou caminho do arquivo
 * @param {string|string[]} types - string ou array com os tipos do arquivo
 * @returns {string} file - caminho do arquivo
 */
function getFilePath(filePath, types) {
    if (!(types instanceof Array))
        types = types.split('/');
    var fileExtension = getExtension(filePath);
    if (!types.find(function (t) { return t == fileExtension; }))
        filePath = filePath + '.' + types[0];
    var file = false;
    if (fs.existsSync(path.resolve(templatesRoot + '/' + filePath)))
        file = path.resolve(templatesRoot + '/' + filePath);
    else if (fs.existsSync(filePath))
        file = filePath;
    return file;
}
/**
 * retorna conteúdo de arquivo
 *
 * @param {string} filePath - Nome ou caminho do arquivo
 * @param {string|string[]} types - string ou array com os tipos do arquivo
 * @returns {string} file - conteúdo do arquivo
 */
function getFile(filePath, types) {
    var file = getFilePath(filePath, types);
    return fs.readFileSync(file, 'UTF-8');
}
/**
 * Render doT/html file
 *
 * @param {string} filePath - caminho do arquivo
 * @param {object} data - Dados para o template doT
 * @returns {Promise} - Promise que envia HTML renderizado
 */
function renderDot(filePath, data) {
    return new Promise(function (resolve, reject) {
        var it = Object.assign({
            cdn: "/public/images"
        }, JSON.parse(JSON.stringify(data)));
        var file = getFilePath(filePath, ['html', 'dot']);
        if (!file)
            return reject(new Error("File " + filePath + " not found!"));
        dotEmc.renderFile(file, it, function (error, html) {
            if (error) {
                return reject(error);
            }
            resolve(html);
        });
    });
}
/**
 * Render pug file
 *
 * @param {any} path
 * @param {any} data
 */
function renderPug(path, data) {
    //TODO render pug
    return new Promise(function (resolve, reject) {
        resolve('');
    });
}
module.exports.dot = renderDot;
module.exports.pug = renderPug;
