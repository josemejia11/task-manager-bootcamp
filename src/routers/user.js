const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');

const router = new express.Router();

router.post('/users' , async (req , res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // });
});

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // res.send({ user: user.getPublicProfile(), token }); //Manual way to hide data
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token );
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/user/logout/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth , async (req , res)=>{
    res.send(req.user);
    // User.find({}).then((result) => {
    //     res.send(result);
    // }).catch((err) => {
    //     res.status(500).send(err);
    // });
    // User.find({}).then((result) => {
    //     res.send(result);
    // }).catch((err) => {
    //     res.status(500).send(err);
    // });
});

// router.get('/users/:id' , async (req , res)=>{
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send();
//     }
//     // const _id = req.params.id;
//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send();
//     //     }
//     //     res.send(user)
//     // }).catch((err) => {
//     //     res.status(500).send(err);
//     // });
// });

router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    // const _id = req.params.id;
    const _id = req.user._id;
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update'});
    }
    try {
        // const user = await User.findById(_id);
        // updates.forEach((update) => user[update] = req.body[update]);
        // await user.save();
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        // const user = await User.findByIdAndUpdate(_id, req.body,
        //     { new: true, runValidators: true } );
        // if (!user) {
        //     return res.status(400).send();
        // }
        res.status(201).send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/user/me',auth , async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if (!user) {
        //     return res.status(404).send();
        // }
        await req.user.remove();
        sendCancelEmail(req.user.email, req.user.name);
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send();
    }
});

const upload = multer({
    // dest: 'avatars', // to set a default folder on the proyect
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image'));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save()
    res.status(200).send();
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        const picture = req.user.avatar;
        if (!picture) {
            return res.status(404).send({ error: "Unable to find avatar"});
        }
        req.user.avatar = undefined;
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

module.exports = router;