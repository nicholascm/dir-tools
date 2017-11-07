var stream = require('stream');
var fs = require('graceful-fs');
var path = require('path');
var progress = require('cli-progress');


var getPaths = () => {
    let paths = {
        from: process.argv[2],
        to: process.argv[3]
    }
    return paths;
}

var bar = new progress.Bar({}, progress.Presets.shades_classic)

const printProgress = message => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(message);
}

const copyDirectory = (pathToDirectory, destinationDirectory) => {
    fs.readdir(pathToDirectory, (err, files) => {
        fs.mkdir(`${destinationDirectory}`, () => {
            files.forEach(file => {
                fs.stat(`${pathToDirectory}/${file}`, (err, stat) => {
                    if (err) console.log('error:', err)
                    if (stat && !stat.isDirectory()) {
                        bar.total++;
                        var filePath = `${pathToDirectory}/${file}`;
                        var fileStream = fs.createReadStream(filePath);
                        var newStream = fs.createWriteStream(`${destinationDirectory}/${file}`);
                        fileStream.pipe(newStream);
                        newStream.on('finish', () => bar.increment())
                    } else {
                        return copyDirectory(`${pathToDirectory}/${file}`, `${destinationDirectory}/${file}`);
                    }
                })
            });
        })
    });
}

bar.start(0, 0);
copyDirectory(`${getPaths().from}`, `${getPaths().to}`);
