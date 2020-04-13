'use strict';

const fs = requrie('fs');
const crypto = require('crypto');

class Hash {
    static loadFileContents(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    static createHashFromFileContents(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    };

    static init(dust) {
        dust.helpers.hash = (chunk, context, bodies, params) => {
            return chunk.map(chunk => {
                const filePath = params.path;
                Hash.loadFileContents(filePath).then(fileData => {
                    Hash.createHashFromFileContents(fileData)
                }).then(fileHash => {
                    const newPath = filePath.replace(/\/?dist\/client/, '/static').replace(/([^\.]+)\.(.+)/, `$1.${fileHash}.$2`);
                    return chunk.write(newPath).end();
                });
            });
        };
    }
}