const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
    // console.log(req.method, req.path);
    // next();
//     if (req.method === 'GET') {
//         res.send('Get request are disabled');
//     } else {
//         next();
//     }
// });
// app.use((req,res,next) => {
//     if (req.method != '') {
//         res.status(503).send('Site under maintenance');
//     }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is on port ', port);
});

// Encrypt data
// const bcrypt = require('bcryptjs');
// const myFunction = async () => {
//     const password = 'test123';
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('test123', hashedPassword);
//     console.log(isMatch);
// }
// myFunction()

// Using jsonwebtoken
// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisissetupforjwt', { expiresIn: '5 second' });
//     console.log(token);
//     const data = jwt.verify(token, 'thisissetupforjwt');
//     console.log(data);
// }
// myFunction()

// const pet = {
//     name: 'hall'
// }
// pet.toJSON = function () {
//     console.log(this);
//     return {};
// }
// console.log(JSON.stringify(pet));

// reference another model
// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
    // const task = await Task.findById('613f7eacf7c2504c1c2d3cad');
    // await task.populate(['owner']);
    // console.log(task.owner);

    // const user = await User.findById('613f7df9d549cf964b2e7c8b');
    // await user.populate(['tasks']);
    // console.log(user.tasks);
// }
// main();