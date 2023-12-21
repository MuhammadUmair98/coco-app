const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

const s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function uploadToS3(file) {
    if (file !== undefined) {
        let myFile = file?.originalname?.split(".") || 'sharp'
        const fileType = myFile[myFile.length - 1]
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${new Date().getTime()}-${file?.originalname}.${fileType}`,
            Body: file?.buffer
        };
        const result =  s3.upload(params).promise();
        return result;
    }
}

async function downloadFileFrmoS3(fileKey) {
    const options = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
    };
    const fileStream = s3.getObject(options).promise();
    return fileStream;
}

module.exports = {
    uploadToS3,
    downloadFileFrmoS3
};
