var stream = require('stream');
var fs = require('fs');
var path = require('path');
var progress = require('cli-progress');

var getPaths = () => {
    let paths = {
        from: process.argv[2],
        to: process.argv[3]
    }
    return paths;
}
var bar = new progress.Bar({
    format: '{bar} | Duration: {duration}s | {value}/{total} dir deleted'

}, progress.Presets.shades_classic)

var stackOfDirectories = [];

const deleteStuff = (path) => {
    if (!fs.statSync(path).isDirectory()) {
        fs.unlinkSync(path);
    } else {
        stackOfDirectories.push(path);
        bar.total++;
        let files = fs.readdirSync(path);
        files.forEach(file => deleteStuff(`${path}/${file}`));
    }
}

bar.start(1, 0);

deleteStuff(getPaths().from);

while (stackOfDirectories.length > 0) {
    let directoryToDelete = stackOfDirectories.pop();
    fs.rmdirSync(directoryToDelete);
    bar.increment();
}
bar.increment();
bar.stop();
