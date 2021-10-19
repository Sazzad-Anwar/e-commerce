const Category = require('../../models/productCategory');
const asyncHandler = require('express-async-handler')



/*
##### @Description: Add category Route
##### Route: /api/v1/category
##### Method: POST
*/
const createCategory = asyncHandler(async (req, res) => {
    const { category, subCategory, item } = req.body;

    let categoryExists = await Category.findOne({ category: category.toLowerCase() });

    if (categoryExists) {

        if (categoryExists.subCategory.includes(subCategory.toLowerCase()) && categoryExists.item.includes(item.toLowerCase())) {
            res.status(409).json({
                code: 409,
                isSuccess: false,
                status: 'failed',
                message: 'Category already exists'
            });
        }

        else if (categoryExists.subCategory.includes(subCategory.toLowerCase()) && !categoryExists.item.includes(item.toLowerCase())) {

            categoryExists.item.push(item.toLowerCase());
            let updatedCategory = await categoryExists.save()

            res.status(201).json({
                code: 201,
                isSuccess: true,
                status: 'success',
                data: {
                    category: updatedCategory
                }
            })
        }
        else if (!categoryExists.subCategory.includes(subCategory.toLowerCase())) {

            categoryExists.subCategory.push(subCategory.toLowerCase());
            let updatedCategory = await categoryExists.save()

            res.status(201).json({
                code: 201,
                isSuccess: true,
                status: 'success',
                data: {
                    category: updatedCategory
                }
            })
        }

        else if (!categoryExists.subCategory.includes(subCategory.toLowerCase()) && !categoryExists.item.includes(item.toLowerCase())) {

            categoryExists.subCategory.push(subCategory.toLowerCase());
            categoryExists.item.push(item.toLowerCase());
            let updatedCategory = await categoryExists.save()

            res.status(201).json({
                code: 201,
                isSuccess: true,
                status: 'success',
                data: {
                    category: updatedCategory
                }
            })
        }

    }

    if (!categoryExists) {

        let newCategory = new Category({
            category: category.toLowerCase(),
        });

        newCategory.subCategory.push(subCategory.toLowerCase());

        newCategory.item.push(item.toLowerCase());

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

    const { categoryID, subCategory, item } = req.body;

    let categoryExists = await Category.findById(categoryID);

    if (categoryExists) {

        if (categoryExists.subCategory.includes(subCategory?.toLowerCase()) && categoryExists.item.includes(item?.toLowerCase())) {

            categoryExists.item = categoryExists.item.filter(categoryItem => categoryItem !== item.toLowerCase());
            categoryExists.subCategory = categoryExists.subCategory.filter(subCategoryItem => subCategoryItem !== subCategory.toLowerCase());

            let updatedCategory = await categoryExists.save();

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    category: updatedCategory
                }
            })

        } else if (categoryExists.subCategory.includes((subCategory?.toLowerCase())) && !item) {

            categoryExists.subCategory = categoryExists.subCategory.filter(subCategoryItem => subCategoryItem !== subCategory.toLowerCase());

            let updatedCategory = await categoryExists.save();

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    category: updatedCategory
                }
            })

        } else if (categoryExists.item.includes((item?.toLowerCase())) && !subCategory) {

            categoryExists.item = categoryExists.item.filter(categoryItem => categoryItem !== item.toLowerCase());

            let updatedCategory = await categoryExists.save();

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    category: updatedCategory
                }
            })
        }
        else if (categoryID && !subCategory && !item) {

            Category.findByIdAndDelete(categoryID).then(() => {

                res.json({
                    code: 200,
                    status: 'success',
                    isSuccess: true,
                    message: 'Category is deleted'
                })

            })
        }

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