const stream = require('stream'); 
const fs = require('fs'); 

// read cli arguments

process.argv.forEach(arg => console.log(arg));

const getPaths = () => {
    let paths = {
        from: process.argv[0], 
        to: process.argv[1] 
    }
    return paths; 
}

fs.readdir(`${__dirname}`, (err, files) =>  {
    files.forEach(file => {
        console.log(file); 
        let fileStream = fs.createReadStream(file); 
        let newStream = fs.createWriteStream(`/path/new-${file}`);
        fileStream.pipe(newStream); 
    })
}); 






// fs.readdir()
// create list of all file in the root dir
// stream files to new directory

// look for directories in root dir
// create queue of directories to start looking for files

