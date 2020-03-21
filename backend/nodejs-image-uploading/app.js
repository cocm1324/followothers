const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, callBack) => {
        callBack(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, callBack) => {
        checkFileType(file, callBack);
    }
}).single('myImage');

function checkFileType(file, callBack) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return callBack(null, true);
    } else {
        return callBack('Error: Images Only');
    }
}

const app = express();
const port = 3100;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.get('/', (req, res) => res.render('index'));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected'
                }); 
            } else {
                res.render('index', {
                    msg: 'File Uploaded',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
