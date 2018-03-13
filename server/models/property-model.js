const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
        name: { 
            type: String, 
            required: true,
        },
        address: {
            apartment_num: String,
            street: String,
            city: String,
            state: String,
            zip: String
          },
        effective_date: {
            type: Date,
            required: true
        },
        end_date: Date,
        floor_plan: Number,
        max_occupancy: Number,
        comments: [String],
        special_instructions: [String],
        rating: {
            type: String,
            enum: ['Standard', 'Preffered', "Elite"]
        },
        bathrooms: Number,
        owned_by: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Owner'
        },
        bedrooms: [
            {
                bedroom: { type: String, enum: ['Master', 'Guest', 'Media', 'Other']},
                bedsize: { type: String, enum: ['King', 'California King', 'Queen', 'Full', 'Twin', 'Bunk Bed', 'Trundle Bed', 'Murphy', 'Sofa']},
            }
    ]
    },
    {
        timestamps: true
    }
);

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;