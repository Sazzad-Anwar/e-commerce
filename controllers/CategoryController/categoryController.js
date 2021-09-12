const Category = require('../../models/productCategory');
const asyncHandler = require('express-async-handler')



/*
##### @Description: Add category Route
##### Route: /api/v1/category
##### Method: POST
*/
const createCategory = asyncHandler(async (req, res) => {
    const { category, subCategory, item } = req.body;

    if (req.user.type === 'vendor') {

        let categoryExists = await Category.findOne({ category, subCategory, item });

        if (categoryExists) {

            res.status(409).json({
                code: 409,
                isSuccess: false,
                status: 'failed',
                message: 'Category already exists'
            });
        }
        else {

            let newCategory = new Category({
                category,
                subCategory,
                item
            });

            let categoryAdded = await newCategory.save();

            res.status(201).json({
                code: 201,
                isSuccess: true,
                status: 'success',
                data: {
                    category: categoryAdded
                }
            })
        }
    } else {
        res.status(400).json({
            code: 400,
            isSuccess: false,
            status: 'failed',
            message: `Only registered 'vendors' can access this route`
        })
    }
});



/*
##### @Description: Get category Route
##### Route: /api/v1/category
##### Method: GET
*/
const getCategories = asyncHandler(async (req, res) => {

    const subCategory = req.query.subCategory ? {
        subCategory: {
            $regex: req.query.subCategory,
            $options: 'i'
        }
    } : {}

    const item = req.query.item ? {
        item: {
            $regex: req.query.item,
            $options: 'i'
        }
    } : {}

    const category = req.query.category ? {
        category: {
            $regex: req.query.category,
            $options: 'i'
        }
    } : {}


    let categories = await Category.find({ ...category, ...item, ...subCategory });

    if (categories.length) {
        res.json({
            code: 200,
            isSuccess: true,
            status: 'success',
            data: {
                categories
            }
        })
    } else {
        res.status(404).json({
            code: 404,
            isSuccess: false,
            status: 'failed',
            message: 'Categories not found !'
        })
    }
});



/*
##### @Description: Update category
##### Route: /api/v1/category
##### Method: PUT
*/
const updateCategory = asyncHandler(async (req, res) => {

    const { categoryID, category, subCategory, item } = req.body;

    if (req.user.type === 'vendor') {

        let categoryExists = await Category.findById(categoryID);

        if (categoryExists) {
            categoryExists.category = category ?? categoryExists.category;
            categoryExists.subCategory = subCategory ?? categoryExists.subCategory;
            categoryExists.item = item ?? categoryExists.item;

            let updatedCategory = await categoryExists.save();

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    category: updatedCategory
                }
            })
        } else {
            res.status(404).json({
                code: 404,
                status: 'failed',
                isSuccess: false,
                message: 'Category is not found'
            })
        }
    } else {
        res.status(400).json({
            code: 400,
            isSuccess: false,
            status: 'failed',
            message: `Only registered 'vendors' can access this route`
        })
    }
});


module.exports = {
    createCategory,
    getCategories,
    updateCategory
}