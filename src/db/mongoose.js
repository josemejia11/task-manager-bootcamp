const mongoose = require('mongoose');
// /Users/josemiguelmejiachaverra/mongodb/bin/mongod --dbpath=/Users/josemiguelmejiachaverra/mongodb-data  

mongoose.connect(process.env.MONGODB_URL);

// const me = new User({
//     name: 'Susana',
//     email: 'anotherMail@test.com',
//     password: 'worksfine'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// });



// const task = new Task({
//     description: 'have lunch',
//     // completed: false
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });