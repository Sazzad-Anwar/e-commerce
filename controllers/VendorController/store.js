const Vendor = require('../../models/vendor');
const Store = require('../../models/store');
const asyncHandler = require('express-async-handler');

/*
##### @Description: Add store
##### Route: /api/v1/vendor/store
##### Method: POST
##### Access: admin, superAdmin
*/
const addStore = asyncHandler(async (req, res) => {
    const {
        storeName,
        phone,
        logo,
        address,
        country,
        city,
        zipCode,
        seo,
        website,
        mapEmbedCode,
        image,
    } = req.body;

    const vendor = await Vendor.findById(req.user._id);

    let newStore = new Store({
        vendor: req.user.role === 'superAdmin' ? req.query.vendorId : req.user._id,
        storeName,
        phone,
        logo,
        address,
        country,
        city,
        zipCode,
        seo,
        website,
        mapEmbedCode,
        image,
    });

    let store = await newStore.save();

    if (store) {

        vendor.store.push(store._id)
        await vendor.save();

        res.status(201).json({
            code: 201,
            isSuccess: true,
            status: 'success',
            data: {
                store
            }
        })

    }

});


/*
##### @Description: Add store
##### Route: /api/v1/vendor/store
##### Method: POST
##### Access: admin, superAdmin
*/
const getStore = asyncHandler(async (req, res) => {

    const store = await Store.find({ vendor: req.user.role === 'admin' ? req.user._id : req.query.vendorId });

    if (store) {
        res.json({
            code: 200,
            status: 'success',
            isSuccess: true,
            data: {
                store
            }
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: `Stores are not found of ${req.user.role === 'admin' ? req.user._id : req.query.vendorId}`
        })
    }
});


/*
##### @Description: Update store
##### Route: /api/v1/vendor/store
##### Method: PUT
##### Access: admin, superAdmin
*/
const updateStoreDetails = asyncHandler(async (req, res) => {
    const {
        storeName,
        phone,
        logo,
        address,
        country,
        city,
        zipCode,
        seo,
        website,
        mapEmbedCode,
        image,
        _id,
    } = req.body;

    const store = await Store.findById(_id);

    if (store) {

        store.storeName = storeName ?? store.storeName;
        store.phone = phone ?? store.phone;
        store.logo = logo ?? store.logo;
        store.address = address ?? store.address;
        store.country = country ?? store.country;
        store.city = city ?? store.city;
        store.zipCode = zipCode ?? store.zipCode;
        store.seo = seo ?? store.seo;
        store.website = website ?? store.website;
        store.mapEmbedCode = mapEmbedCode ?? store.mapEmbedCode;
        store.image = image ?? store.image

        let storeUpdated = await store.save();

        res.status(201).json({
            code: 201,
            isSuccess: true,
            status: 'success',
            data: {
                store: storeUpdated
            }
        })

    } else {
        res.status(404).json({
            code: 404,
            isSuccess: false,
            status: 'failed',
            message: `Store ${_id} is not found`
        })
    }
});


/*
##### @Description: Delete store
##### Route: /api/v1/vendor/store
##### Method: DELETE
##### Access: admin, superAdmin
*/
const deleteStore = asyncHandler(async (req, res) => {

    let storeDeleted = await Store.findByIdAndDelete(req.query.storeId)

    if (storeDeleted) {

        let vendor = await Vendor.findById(req.query.vendorId);

        vendor.store = vendor.store.filter(store => store.toString() !== req.query.storeId)

        await vendor.save();

        res.json({
            status: 200,
            isSuccess: true,
            status: 'success',
            message: `Store ${req.query.storeId} is deleted`
        })
    } else {
        res.status(404).json({
            code: 404,
            status: 'failed',
            isSuccess: false,
            message: `Store ${req.query.storeId} is not found`
        })
    }
})

module.exports = {
    addStore,
    getStore,
    updateStoreDetails,
    deleteStore
}