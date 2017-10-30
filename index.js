var stream = require('stream'); 
var fs = require('fs'); 
var path = require('path'); 

// read cli arguments

// process.argv.forEach(arg => console.log(arg));

var getPaths = () => {
    let paths = {
        from: process.argv[0], 
        to: process.argv[1] 
    }
    return paths; 
}



fs.readdir(`${__dirname}`, (err, files) =>  {
    
    fs.mkdir('./path', () => {
        
        files.forEach(file => {
            fs.stat(file, (err, stat) => {
                if(!stat.isDirectory()) {
                    var filePath = `${__dirname}/${file}`; 
                    var fileStream = fs.createReadStream(filePath); 
                    var newStream = fs.createWriteStream(`./path/${file}`);
                    fileStream.pipe(newStream);
                }
            })
        })
    }); 
    
}); 






// fs.readdir()
// create list of all file in the root dir
// stream files to new directory

// look for directories in root dir
// create queue of directories to start looking for files

