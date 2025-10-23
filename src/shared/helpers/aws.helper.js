import {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand,} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-'

class AwsService{
    constructor(){
        const region = process.env.AWS_REGION;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

        if(!region || !accessKey || !secretAccessKey){
            throw new Error(
                'AWS configuration is missing . please check AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your environment variable'
            )
        }
        this.s3Client = new S3Client({
            region,
            credentials:{
                accessKeyId,
                secretAccessKey,
            }
        })
    
    this.bucket = process.env.AWS_S3_BUCKET;
    if(!this.bucket){
        throw new Error(
            'AWS_S3_BUCKET is not defined in environment variables'
        )
        async uploadFile(file, userId, folder){
            const key = ${folder}/${userId}/${Date.now()}-${file.originalname}
        }
    }
}
}