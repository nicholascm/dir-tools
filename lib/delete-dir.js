const fs = require('fs');
fs.readdir(`./${__dirname}/test`, (err, files) => {
    files.forEach(file => {
        // fs.unlink(file);
    })
})