const fs = require('fs');
const path = require('path');

const removeFile = (fileLink) => {
    let dir = path.join(__dirname, `./public/${fileLink}`);

    try {
        let files = fs.readFileSync(dir);

        if (files) {
            fs.unlinkSync(dir);
            return { isSuccess: true, message: 'file has been removed' }
        } else {
            return { isSuccess: false, message: 'file link is invalid' }
        }

    } catch (error) {
        return { isSuccess: false, message: error.message }
    }
}


module.exports = removeFile;