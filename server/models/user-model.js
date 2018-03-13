const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    name: {
        first: String,
        last: String,
    },
    phone: [String],
    about: String,
    department: {
        type: String,
        enum: ['None', 'Housekeeping', 'Maintenance', 'Front Desk', 'Owner Relation', 'Executive'],
        default: 'None'
    },
    position: String,
    access_privileges: {
        type: 'String',
        enum: ['Employee', 'Admin', 'Executive'],
        default: 'Employee'
    }
    }, 
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;