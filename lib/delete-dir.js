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

var pathToDelete = getPaths().from; 

if(pathToDelete == undefined || pathToDelete.length <= 3) {
    console.log(`Invalid or dangerous path to delete provided: ${pathToDelete}`)
} else {
    var bar = new progress.Bar({
        format: '{bar} | Duration: {duration}s | {value}/{total} dir deleted'
    }, progress.Presets.shades_classic)

    var stackOfDirectories = [];

    bar.start(1, 0);

    deleteStuff(pathToDelete);
    
    while (stackOfDirectories.length > 0) {
        let directoryToDelete = stackOfDirectories.pop();
        fs.rmdirSync(directoryToDelete);
        bar.increment();
    }
    
    bar.increment();
    bar.stop();
}


