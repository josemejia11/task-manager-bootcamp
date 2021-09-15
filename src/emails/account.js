const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'josemejia11@hotmail.es',
        subject: 'Welcome to App!',
        text: `Welcome to the app, ${name}. Let me know how you get alogn with the app`
    });
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'josemejia11@hotmail.es',
        subject: 'Cancel account',
        text: `Hello ${name}, we are sorry to see you go, let me know if we could have done something diferent`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}