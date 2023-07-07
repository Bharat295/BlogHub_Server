import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


// `mongodb://localhost:27017/temp`
const storage = new GridFsStorage({
    url:`mongodb+srv://${username}:${password}@cluster0.o1byfzn.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg" ,"image/jpeg" , "image/*"];
        // console.log(match);
        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 