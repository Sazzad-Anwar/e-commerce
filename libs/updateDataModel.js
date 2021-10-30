module.exports = async (bodyData, model) => {

    for (const [key, value] of Object.entries(bodyData)) {
        model[key] = value ?? model[key]
    }

    let updatedModel = await model.save();

    return updatedModel;
}