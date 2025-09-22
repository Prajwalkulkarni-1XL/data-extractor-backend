import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: String,
    categoryUrl: {
        type: String,
        unique: true,
        required: true,
    },
    isLocked: {
        type: Boolean,
        default: false,
    },
    lockedBy: {
        type: String,
        default: null,
    },
    lockedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

export default categorySchema;