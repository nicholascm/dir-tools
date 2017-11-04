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

const deleteDirectory = (pathToDirectory) => {
    fs.readdir(pathToDirectory, (err, files) => {
            files.forEach(file => {
                fs.stat(`${pathToDirectory}/${file}`, (err, stat) => {
                    if (err) console.log('error:', err)
                    if (stat && !stat.isDirectory()) {
                        var filePath = `${pathToDirectory}/${file}`;
                        fs.unlink(filePath); 
                        // var fileStream = fs.createReadStream(filePath);
                        // var newStream = fs.createWriteStream(`${destinationDirectory}/${file}`);
                        // fileStream.pipe(newStream);
                    } else {
                        var filePath = `${pathToDirectory}/${file}`;
                        fs.rmdir(filePath);
                        return deleteDirectory(`${pathToDirectory}/${file}`);
                    }
                })
        })
    });
}

deleteDirectory(`${getPaths().from}`);
