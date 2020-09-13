const User = require('../models/User');
const validator = require('validator');
const { validationResult } = require('express-validator');

/**
 * POST /user
 * Adds a new user
 */
exports.postUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { email, firstName, lastName, userName } = req.body;
        const alreadyExistingUser = await User.findOne({ $or: [{ 'email': email }, { 'userName': userName }] });
        if (alreadyExistingUser && alreadyExistingUser.email === email) {
            return res.status(400).send({ error: 'Email already in user' });
        }
        if (alreadyExistingUser && alreadyExistingUser.userName === userName) {
            return res.status(400).send({ error: 'Username already taken' });
        }
        const newUser = await User.create({ email, firstName, lastName, userName })
        return res.status(200).send(newUser);
    } catch (error) {
        next(error)
    }
};
/**
 * DELETE /user
 * Deletes user
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.deleteOne({ _id: userId });
        return res.status(200).send({});
    } catch (error) {
        console.log(error);
        next(error)
    }
};
/**
 * GET /user
 * Gets all users
 */
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (error) {
        next(error)
    }
}
/**
 * PUT /user/update
 * Update user information.
 */
exports.updateUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { firstName, lastName } = req.body;

        const userToUpdate = await User.findById(req.params.userId);
        if (!userToUpdate) {
            return res.status(400).send({ error: 'No user with that Id found' });
        }
        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        await userToUpdate.save();
        res.status(200).send(userToUpdate);
    } catch (error) {
        next(error)
    }
};