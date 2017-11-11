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

// const deleteDirectory = (pathToDirectory) => {
//     fs.readdir(pathToDirectory, (err, files) => {
//         let count = files.length; 
//         let completed = 0; 
//         files.forEach(file => {
//             fs.stat(`${pathToDirectory}/${file}`, (err, stat) => {
//                 if (err) console.log('error:', err)
//                 if (stat && !stat.isDirectory()) {
//                     var filePath = `${pathToDirectory}/${file}`;
//                     fs.unlink(filePath, () => { 
//                         completed++; 
//                         console.log(completed, filePath); 
//                         if (completed === count) {
//                             fs.rmdir(pathToDirectory); 
//                         }
//                     });
//                     console.log(completed); 
//                 } else {
//                     var filePath = `${pathToDirectory}/${file}`;
//                     return deleteDirectory(`${pathToDirectory}/${file}`);
//                 }
//             })
//         })
//     });
// }

// const deleteDirectories = (pathToDirectory) => {
//     fs.readdir(pathToDirectory, (err, files) => {
//         console.log(pathToDirectory); 
//         if (files.length === 0) {
//             return fs.rmdir(pathToDirectory); 
//         } else {
//             files.forEach(file => {
//                 return deleteDirectories(`${pathToDirectory}/${file}`); 
//             })
//         }
//     })
// }

let stackOfDirectories = []; 

const deleteStuff = (path) => {
    if(!fs.statSync(path).isDirectory()) {
        fs.unlink(path); 
    } else {
        stackOfDirectories.push(path);
        console.log(stackOfDirectories); 
        let files = fs.readdirSync(path);
        files.forEach(file => deleteStuff(`${path}/${file}`));
    }
}



deleteStuff(getPaths().from); 
while(stackOfDirectories.length > 0) {
    let directoryToDelete = stackOfDirectories.pop(); 
    console.log(directoryToDelete, stackOfDirectories); 
    fs.rmdir(directoryToDelete);
}
// deleteDirectory(`${getPaths().from}`);

// deleteDirectories(getPaths().from); 
