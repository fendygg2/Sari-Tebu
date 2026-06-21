import EmailClient from "./client.js";

export default new EmailClient({
    sourceAddress: process.env.AWS_SES_EMAIL_ADDRESS,
    awsEnabled: process.env.AWS_SES_ENABLED,
    awsRegion: process.env.AWS_SES_REGION,
    awsAccessKeyID: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
