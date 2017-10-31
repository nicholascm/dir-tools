var stream = require('stream');
var fs = require('fs');
var path = require('path');

var getPaths = () => {
    let paths = {
        from: process.argv[2],
        to: process.argv[3]
    }
    return paths;
}
// create list of all file in the root dir
// stream files to new directory

const directoryQueue = [];

fs.readdir(`${getPaths().from}`, (err, files) => {
    fs.mkdir(`${getPaths().to}`, () => {
        files.forEach(file => {
            console.log(file);
            fs.stat(file, (err, stat) => {
                if (err) console.log('error:', err)
                if (stat && !stat.isDirectory()) {
                    var filePath = `${getPaths().from}/${file}`;
                    var fileStream = fs.createReadStream(filePath);
                    var newStream = fs.createWriteStream(`${getPaths().to}/${file}`);
                    fileStream.pipe(newStream);
                } else {
                    directoryQueue.push(file);
                    // console.log(directoryQueue)
                }
            })
        });
    })
});


// look for directories in root dir
// create queue of directories to start looking for files

