//Descirption: pagination
exports.pagination = (model, page, limit, model_name) => {
    page = parseInt(page);
    limit = parseInt(limit);

    const showPerPage = Math.ceil(model.length / limit);
    let result = {};

    if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        if (endIndex < model.length) {
            result.next = {
                page: page + 1,
                limit: limit,
            }
        }
        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        result.total_page = showPerPage;
        result.total_length = model.length
        result.current_page = page;
        result[model_name] = model.slice(startIndex, endIndex);
        return result;
    }
    else {
        result.result = model;
        return result;
    }
};