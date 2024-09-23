import multer from "multer";

const save = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        if(file !== null){
            const name = file.originalname.split(' ').join('_')
            cb(null, Date.now()+"."+name)
        }
     
    }
});

const filter = (req: any, file: any, cb: any) => {
    if (file &&(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
       cb(null, true);
    }
    else{
        cb(null, false);
    }
}

export const uploadImage = multer({ storage: save, fileFilter: filter });
