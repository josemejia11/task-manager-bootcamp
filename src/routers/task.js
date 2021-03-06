const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks',auth, async (req , res)=>{
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
 //    task.save().then(() => {
 //        res.status(201).send(task);
 //    }).catch((err) => {
 //        res.status(400).send(err);
 //    });
 });
 
 // GET /tasks?completed=false
 // Get /tasks?limit=10&skip=0
 // GET /tasks?sortBy=createdAt:desc
 router.get('/tasks', auth , async (req , res)=>{
     const match = {};
     const sort = {};
     if (req.query.completed) {
         match.completed = req.query.completed === 'true';
     }

     if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
     }
     try {
        //  const tasks = await Task.find({});
        //  const tasks = await Task.find({ owner: req.user._id}); // option 1
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseFloat(req.query.skip),
                sort
            }
        }); // option 2
        // res.status(200).send(tasks); // option 1
        res.status(200).send(req.user.tasks); // option 2
     } catch (error) {
        res.status(500).send(error);
     }
 //    Task.find({}).then((result) => {
 //        res.send(result);
 //    }).catch((err) => {
 //        res.status(500).send(err);
 //    });
 });
 
 router.get('/tasks/:id' , auth , async (req , res)=>{
     const _id = req.params.id;
     try {
        //  const task = await Task.findById(_id);
        const task = await Task.findOne( { _id, owner: req.user._id });
         if (!task) {
             return res.status(404).send();
         }
         res.send(task);
     } catch (error) {
         res.status(500).send(error);
     }
     // Task.findById(_id).then((result) => {
     //     if (!result) {
     //         return res.status(404).send();
     //     }
     //     res.send(result)
     // }).catch((err) => {
     //     res.status(500).send(err);
     // });
 });
 
 router.patch('/task/:id', auth, async (req, res) => {
     const updates = Object.keys(req.body);
     const allowedUpdates = ['description','completed'];
     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
     const _id = req.params.id;
     if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update'});
     }
     try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});
        //  const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.status(201).send(task);
     } catch (error) {
        res.status(500).send();
     }
 });
 
 router.delete('/task/:id', auth, async (req, res) => {
    //  const _id = req.params.id;
     try {
         const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id});
         if (!task) {
             return res.status(404).send();
         }
         res.send(task);
     } catch (error) {
         res.status(500).send();
     }
 });

 module.exports = router;