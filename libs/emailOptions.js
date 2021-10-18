const { activationEmail, passwordResetEmail, orderInvoice } = require("./emailTemplates");

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

    if (data.type === 'Order Invoice') {
        return {
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: data.type,
            html: orderInvoice(data.order, data.user,),
        };
    }

}
