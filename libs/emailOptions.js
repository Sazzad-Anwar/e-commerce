const { activationEmail, passwordResetEmail } = require("./emailTemplates");

module.exports = (data) => {

    if (data.type === 'Account activation') {
        return {
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: data.type,
            html: activationEmail(data.name, data.activationId),
        };
    }

    if (data.type === 'Password reset') {
        return {
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: data.type,
            html: passwordResetEmail(data.name, data.resetLink),
        };
    }

}
