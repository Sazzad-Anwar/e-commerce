const asyncHandler = require('express-async-handler');
const Vendor = require('../../models/vendor');
const Products = require('../../models/products');
const Reviews = require('../../models/reviews');
const removeFile = require('../../libs/removeFile');
const client = require('../../config/db/Redis');
const util = require('util');
client.get = util.promisify(client.get);

/*
##### @Description: Add Products
##### Route: /api/v1/products
##### Method: POST
*/
const addProduct = asyncHandler(async (req, res) => {
    const {
        vendor,
        name,
        campaign,
        variant,
        image,
        brand,
        seo,
        category,
        subCategory,
        item,
        description,
        specification,
        shippingCharge,
        serviceCharge,
        location,
    } = req.body;


    let newProduct = new Products({
        vendor,
        name,
        campaign,
        variant,
        image,
        brand,
        category,
        subCategory,
        item,
        seo,
        description,
        specification,
        shippingCharge,
        serviceCharge,
        location
    });


    let product = await newProduct.save();

    res.status(201).json({
        code: 201,
        status: 'success',
        isSuccess: true,
        data: {
            product,
        }
    })

});


/*
##### @Description: Get Products
##### Route: /api/v1/products
##### Method: GET
*/
const getProducts = asyncHandler(async (req, res) => {
    const productName = req.query.search ? {
        name: {
            $regex: req.query.search,
            $options: 'i'
        }
    } : {}

    const shopName = req.query.search ? {
        shopName: {
            $regex: req.query.search,
            $options: 'i'
        }
    } : {}

    const brand = req.query.search ? {
        brand: {
            $regex: req.query.search,
            $options: 'i'
        }
    } : {}

    const location = req.query.location ? {
        location: {
            $regex: req.query.location,
            $options: 'i'
        }
    } : {}

    let { limit, lastId } = req.query;

    let products;

    if (!lastId || lastId === undefined) {
        products = await Products
            .find({ $and: [{ ...location }, { $or: [{ ...productName }, { ...brand }] }] })
            .sort({ _id: -1 })
            .limit(limit ? parseInt(limit) : 50)
            .populate([{
                path: "reviews",
                populate: {
                    path: 'user',
                    select: "name photo"
                }
            }, {
                path: 'vendor',
                select: 'shopName'
            }, {
                path: 'category',
                select: "_id category subCategory item"
            }])
    }

    if (limit && lastId) {
        products = await Products
            .find({
                $and: [
                    { ...location },
                    { $or: [{ ...productName }, { ...shopName }, { ...brand }] },
                    { _id: { $lt: lastId } }
                ]
            })
            .sort({ _id: -1 })
            .limit(parseInt(limit))
            .populate([{
                path: "reviews",
                populate: {
                    path: 'user',
                    select: "name photo"
                }
            }, {
                path: 'vendor',
                select: 'shopName'
            }, {
                path: 'category',
                select: "_id category subCategory item"
            }])
    }


    if (products?.length) {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                length: products.length,
                lastId: products[products.length - 1]._id,
                products
            }
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Products list is empty'
        })
    }

});



/*
##### @Description: Get Products By vendor
##### Route: /api/v1/products
##### Method: GET
*/


/*
##### @Description: Write review route
##### Route: /api/v1/products/review/:product
##### Method: POST
##### Access: Users
*/
const addReview = asyncHandler(async (req, res) => {
    const { rating, comment, photo, user } = req.body;
    const { product } = req.params;

    let newReview = new Reviews({
        rating, comment, photo, user, product
    });

    if (req.user._id === user) {

        let reviews = await newReview.save();

        let productDetails = await Products.findById(product).populate('reviews');

        productDetails.reviews.push(reviews._id)

        await productDetails.save();

        let getProductDetails = await Products.findById(product).populate('reviews');

        let totalReviews = getProductDetails.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);

        getProductDetails.rating = parseInt(totalReviews / getProductDetails.reviews.length);

        await getProductDetails.save();

        res.status(201).json({
            code: 201,
            status: 'success',
            isSuccess: true,
            reviews,
        });

    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: 'User is not matched with signed in user'
        })
    }
});



/*
##### @Description: Get a specific review
##### Route: /api/v1/products/review/:id
##### Method: GET
##### Access: Vendor
*/
const getReview = asyncHandler(async (req, res) => {
    const { id } = req.params;

    let review = await Reviews.findById(id).populate('user', "name _id photo")

    res.json({
        code: 200,
        status: 'success',
        isSuccess: true,
        data: {
            review
        }
    })

});

/*
##### @Description: Update a specific review
##### Route: /api/v1/products/review/:id
##### Method: PUT
##### Access: User
*/
const updateReview = asyncHandler(async (req, res) => {

    const { rating, comment, photo, user, product } = req.body;

    const { id } = req.params;


    if (req.user._id === user) {

        let reviews = await Reviews.findById(id)

        if (reviews) {
            reviews.comment = comment ?? reviews.comment;
            reviews.photo = photo ?? reviews.photo;
            reviews.rating = rating ?? reviews.rating;

            let updatedReview = await reviews.save();

            let reviewImageDelete = removeFile(reviews.photo);

            let productDetails = await Products.findById(product).populate('reviews');

            productDetails.reviews.push(updatedReview._id)

            await productDetails.save();

            let getProductDetails = await Products.findById(product).populate('reviews');

            let totalReviews = getProductDetails.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);

            getProductDetails.rating = parseInt(totalReviews / getProductDetails.reviews.length);

            await getProductDetails.save();

            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                reviews,
                reviewImageDelete
            });
        } else {
            res.status(404).json({
                code: 404,
                status: 'failed',
                isSuccess: false,
                message: 'Review is not found'
            })
        }

    } else {
        res.status(400).json({
            code: 400,
            status: 'failed',
            isSuccess: false,
            message: 'User is not matched with signed in user'
        })
    }
});



/*
##### @Description:Get a specific product
##### Route: /api/v1/products/:id
##### Method: GET
##### Access: Vendor, Users
*/
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    let product = await Products.findById(id).populate({
        path: "reviews",
        populate: {
            path: 'user',
            select: "name photo"
        }
    });

    if (product) {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                product
            }
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Product not found',
        })
    }

});




/*
##### @Description: Update a specific product
##### Route: /api/v1/products/:id
##### Method: PUT
##### Access: Vendor
*/
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        campaign,
        variant,
        image,
        brand,
        seo,
        category,
        subCategory,
        item,
        description,
        specification,
    } = req.body

    const { id } = req.params;

    let product = await Products.findOne({ vendor: req.user._id, _id: id })

    if (product) {
        product.name = name ?? product.name;
        product.campaign = campaign ?? product.campaign;
        product.variant = variant ?? product.variant;
        product.image = image ?? product.image;
        product.brand = brand ?? product.brand;
        product.category = category ?? product.category;
        product.subCategory = subCategory ?? product.subCategory;
        product.item = item ?? product.item;
        product.description = description ?? product.description;
        product.specification = specification ?? product.specification;
        product.seo = seo ?? product.seo;

        let productUpdated = await product.save();

        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                product: productUpdated
            }
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Product is not found'
        })
    }

});


/*
##### @Description: Delete a specific product
##### Route: /api/v1/products/:id
##### Method: DELETE
##### Access: Vendor
*/
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleteProduct = await Products.findOneAndDelete({ _id: id, vendor: req.user._id });

    if (deleteProduct) {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            message: 'Product deleted successfully'
        });
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: 'Product not found'
        })
    }

});

module.exports = {
    addProduct,
    getProducts,
    addReview,
    getReview,
    updateReview,
    getProduct,
    updateProduct,
    deleteProduct
}