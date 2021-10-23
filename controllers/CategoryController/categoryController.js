const Category = require('../../models/productCategory');
const asyncHandler = require('express-async-handler')



/*
##### @Description: Add category Route
##### Route: /api/v1/category
##### Method: POST
*/
const createCategory = asyncHandler(async (req, res) => {
    const { category, subCategory } = req.body;

    let categoryExists = await Category.findOne({ category, subCategory });

    if (categoryExists) {

        res.status(409).json({
            code: 409,
            isSuccess: false,
            status: 'failed',
            message: 'Category already exists',
            data: {
                category: categoryExists
            }
        })

    } else {
        let newCategory = new Category({
            category,
            subCategory
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

    let categories = await Category.find({ ...category })

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
##### Route: /api/v1/category/:id/updated
##### Method: PUT
*/
const updateCategory = asyncHandler(async (req, res) => {

    const { category, subCategory } = req.body;

    let categoryExists = await Category.findById(req.params.id);

    if (categoryExists) {

        categoryExists.category = category ?? categoryExists.category;

        categoryExists.subCategory = subCategory ?? categoryExists.subCategory;

        let categoryUpdated = await categoryExists.save()

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                category: categoryUpdated
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
});


/*
##### @Description: Delete category
##### Route: /api/v1/category/:id/delete
##### Method: DELETE
*/
const deleteCategory = asyncHandler(async (req, res) => {

    Category.findByIdAndDelete(req.params.id).then(() => {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            message: `Category ID ${req.params.id} is deleted`
        })
    })

});

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}