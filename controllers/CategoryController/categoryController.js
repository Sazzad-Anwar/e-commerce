const Category = require('../../models/productCategory');
const asyncHandler = require('express-async-handler')



/*
##### @Description: Add category Route
##### Route: /api/v1/category
##### Method: POST
*/
const createCategory = asyncHandler(async (req, res) => {
    const { category, subCategory, tree } = req.body;

    let subCategoryExists = await Category.findOne({ subCategory });

    if (subCategoryExists) {
        res.status(409).json({
            code: 409,
            isSuccess: false,
            status: 'failed',
            message: 'Duplicate sub-category !',
            category: subCategoryExists
        })
    } else {

        let newCategory = new Category({
            category,
            tree,
            subCategory
        });

        let categoryAdded = await newCategory.save();

        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            data: {
                category: categoryAdded
            }
        })
    }
});



/*
##### @Description: Get category Route
##### Route: /api/v1/category
##### Method: GET
*/
const getCategories = asyncHandler(async (req, res) => {

    const category = req.query.category ? {
        category: {
            $regex: req.query.category,
            $options: 'i'
        }
    } : {}

    let categories = await Category.find({ ...category });

    res.json({
        code: 200,
        isSuccess: true,
        status: 'success',
        data: {
            categories
        }
    })
});



/*
##### @Description: Update category
##### Route: /api/v1/category
##### Method: PUT
*/
const updateCategory = asyncHandler(async (req, res) => {
    const { categoryID, category, subCategory, tree } = req.body;

    let categoryExists = await Category.findById(categoryID);

    if (categoryExists) {
        categoryExists.category = category ?? categoryExists.category;
        categoryExists.subCategory = subCategory ?? categoryExists.subCategory;
        categoryExists.tree = tree ?? categoryExists.tree;

        let updatedCategory = await categoryExists.save();
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            category: updatedCategory
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Category is not found'
        })
    }
});


module.exports = {
    createCategory,
    getCategories,
    updateCategory
}