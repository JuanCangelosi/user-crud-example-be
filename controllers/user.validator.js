const { body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'postUser': {
            return [
                body('userName', 'Username cannot be empty').exists(),
                body('firstName', 'First name cannot be empty').exists(),
                body('lastName', 'Last name cannot be empty').exists(),
                body('email', 'Email cannot be empty').exists(),
                body('email', 'Invalid email').isEmail()
            ]
        }
        case 'updateUser': {
            return [
                body('firstName', 'First name cannot be empty').exists(),
                body('lastName', 'Last name cannot be empty').exists()
            ]
        }
    }
}