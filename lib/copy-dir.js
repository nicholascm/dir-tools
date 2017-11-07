var stream = require('stream');
var fs = require('graceful-fs');
var path = require('path');

var getPaths = () => {
    let paths = {
        from: process.argv[2],
        to: process.argv[3]
    }
    return paths;
}

const copyDirectory = (pathToDirectory, destinationDirectory) => {
    fs.readdir(pathToDirectory, (err, files) => {
        fs.mkdir(`${destinationDirectory}`, () => {
            files.forEach(file => {
                fs.stat(`${pathToDirectory}/${file}`, (err, stat) => {
                    if (err) console.log('error:', err)
                    if (stat && !stat.isDirectory()) {
                        var filePath = `${pathToDirectory}/${file}`;
                        var fileStream = fs.createReadStream(filePath);
                        var newStream = fs.createWriteStream(`${destinationDirectory}/${file}`);
                        fileStream.pipe(newStream);
                    } else {
                        return copyDirectory(`${pathToDirectory}/${file}`, `${destinationDirectory}/${file}`);
                    }
                })
            });
        })
    });
}

copyDirectory(`${getPaths().from}`, `${getPaths().to}`);
