const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 3000;
const imagePath = __dirname + "/images";

app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(express.json());

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

app.get("/display", (_, res) => {
    res.sendFile(__dirname + "/public/display.html");
});

app.post("/upload", uploadMulter.single("image"), (req, res) => {
    console.log("Processing", req.file.originalname, req.file.size, "bytes");
    if (req.file) {
        res.json({
            file: req.file
        });
    } else {
        throw err;
    }
});

app.post("/share", (req, res) => {
    const fileName = "postcardData.json";

    // write to file
    fs.writeFile(fileName, JSON.stringify(req.body), (err) => {
        console.log("Writing data to file...");
        if (err) {
            throw err;
        }
    });
    
    // send response
    res.json({
        message: `Data successfully written to ${fileName}`
    })
});

app.get("/getPostcard", (req, res) => {
    console.log("Heya")
    
    fs.readFile("data.json", 'utf-8', (err, content) => {
        console.log(content)
        res.json(content)
    })

});

// listen to requests
app.listen(port, () => console.log("Listening to port", port));