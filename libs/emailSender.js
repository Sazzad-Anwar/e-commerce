let nodeMailer = require('nodemailer');
const emailOptions = require('./emailOptions');

const emailSender = (data) => {
    const transport = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // replace with your Mail credentials
            pass: process.env.EMAIL_PASS // 16 character app genereted password from google(app password)
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    transport.sendMail(emailOptions(data), (error, info) => {

        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: %s', info.envelope.to);
            console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
        }
    });
}


module.exports = {
    emailSender,
}