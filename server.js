const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;
const imagePath = __dirname + "/images";

app.use(express.static("public"));
app.use("/images", express.static("images"));

// Set storage for image uploads
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagePath);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadMulter = multer({ storage: storage });

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/public/creator.html");
});

app.listen(port, () => console.log("Listening to port", port));

app.post("/upload", uploadMulter.single("image"), (req, res) => {
    console.log("Processing", req.file.originalname, req.file.size, "bytes");
    if (req.file) {
        res.json({
            success: true,
            message: `${req.file.originalname} has been uploaded to ${imagePath}`,
        });
    } else {
        res.json({
            success: false,
            message: "Image could not be uploaded.",
        });
    }
});
