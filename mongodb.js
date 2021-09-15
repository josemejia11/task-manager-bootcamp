// CRUD create read update delete
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');

const conenctionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// manually generate an Id
// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(conenctionUrl, { useNewUrlParser: true}, ( error, client ) => {
    if ( error ) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Joselito',
    //     age: 23
    // }, (  error, result ) => {
    //     if ( error ) {
    //         return console.log('Unable to insert data');
    //     }
    //     console.log(result.insertedId);
    // });
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'study nodejs',
    //         completed: true
    //     },{
    //         description: 'work',
    //         completed: true
    //     },{
    //         description: 'do excersise',
    //         completed: false
    //     },
    // ], ( error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert data');
    //     }
    //     console.log(result.insertedIds);
    // });

    // db.collection('users').findOne({ _id: new ObjectId("613abe723230093be9cfdcab")}, ( error, user ) => {
    //     if (error) {
    //         return console.log('Unable to find user');
    //     }
    //     console.log(user);
    // });

    // db.collection('users').find({ age: 23}).toArray( ( error, users) => {
    //     console.log(users);
    // });

    // db.collection('users').find({ age: 23}).count( ( error, count) => {
    //     console.log(count);
    // });

    // db.collection('tasks').findOne({ _id: new ObjectId("613ac201d5c3d6e6122a48f3")}, ( error, task ) => {
    //     if (error) {
    //         return console.log('Unable to find user');
    //     }
    //     console.log(task);
    // });

    // db.collection('tasks').find({ completed: false }).toArray( ( error, tasks) => {
    //     if (error) {
    //         return console.log('Unable to find user');
    //     }
    //     console.log('second challenge', tasks);
    // });

    // db.collection('users').updateOne({ _id: new ObjectId("613aca0226a41296447a193b")}, 
    // {
        // $set: {
        //     name: 'Pedro'
        // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('tasks').updateMany({ completed: false }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection('users').deleteMany({ age: 24 })
    // .then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('tasks').deleteOne({ description: 'work' })
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
});