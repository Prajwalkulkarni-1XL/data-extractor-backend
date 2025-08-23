import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: String,
    categoryURL: String,
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

const Category = mongoose.model("Category", categorySchema);

export default Category;