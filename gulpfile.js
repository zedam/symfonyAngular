
var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./app/gulp/tasks', { recurse: true });


