const Category = require('../../models/productCategory');
const asyncHandler = require('express-async-handler');
const updateDataModel = require('../../libs/updateDataModel');



/*
##### @Description: Add category Route
##### Route: /api/v1/category
##### Method: POST
*/
const createCategory = asyncHandler(async (req, res) => {
    const { title, parent } = req.body;

    let categoryExist = await Category.findOne({ title });

    if (categoryExist) {
        res.status(409).json({
            code: 409,
            status: 'failed',
            isSuccess: false,
            message: `Category ${title} already exists`
        });
    } else {

        let parentExists = await Category.findById(parent);

        if (parentExists) {

            let newCategory = new Category({
                title
            });

            let category = await newCategory.save();

            parentExists.children.push(category);

            await parentExists.save();

            res.status(201).json({
                code: 201,
                status: 'success',
                isSuccess: true,
                data: {
                    category
                }
            })
        } else {

            let newCategory = new Category({
                title
            });

            let category = await newCategory.save();

            res.status(201).json({
                code: 201,
                status: 'success',
                isSuccess: true,
                data: {
                    category
                }
            })
        }

    }

});



/*
##### @Description: Get category Route
##### Route: /api/v1/category
##### Method: GET
*/
const getCategories = asyncHandler(async (req, res) => {

    if (req.query.category) {

        const category = req.query.category ? {
            title: {
                $regex: req.query.category,
                $options: 'i'
            }
        } : {}

        let categories = await Category.find({ ...category }).populate({
            path: 'children',
            populate: {
                path: 'children',
                populate: {
                    path: 'children'
                }
            }
        })

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
    } else {

        let category = await Category.find().populate({
            path: 'children',
            populate: {
                path: 'children',
                populate: {
                    path: 'children'
                }
            }
        });

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                category
            }
        })

    }

});



/*
##### @Description: Update category
##### Route: /api/v1/category/:id/updated
##### Method: PUT
*/
const updateCategory = asyncHandler(async (req, res) => {

    let categoryExists = await Category.findById(req.params.id);

    if (categoryExists) {

        let categoryUpdated = await updateDataModel(req.body, categoryExists)

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
##### Route: /api/v1/category/:id/:parent/delete
##### Method: DELETE
*/
const deleteCategory = asyncHandler(async (req, res) => {

    let parent = await Category.findById(req.params.parent);

    parent.children = parent.children.filter(item => item.toString() !== req.params.id);

    await parent.save();

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