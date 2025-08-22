import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: String,
    categoryURL: String,
}, {
    timestamps: true,
});

const Category = mongoose.model("Category", categorySchema);

export default Category;