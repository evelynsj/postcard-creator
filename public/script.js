const ACTIVE = "active";

// CHANGE FONT

const FONTS = {
    "indie-flower": {
        index: 0,
        name: "Indie Flower",
        size: "15px",
    },
    "dancing-script": {
        index: 1,
        name: "Dancing Script",
        size: "18px",
    },
    "long-cang": {
        index: 2,
        name: "Long Cang",
        size: "18px",
    },
    "homemade-apple": {
        index: 3,
        name: "Homemade Apple",
        size: "12px",
    },
};

let currentFontIdx = 0;
let fontStyles = document.getElementById("font-styles");
let listItems = fontStyles.getElementsByTagName("li");

let changeFont = (e) => {
    if (e.target && e.target.nodeName === "LI") {
        if (e.target.classList.contains(ACTIVE)) {
            return; // already active
        } else {
            // remove active class from previously chosen element
            listItems[currentFontIdx].classList.remove(ACTIVE);

            // set currentFont index
            let currentFont = e.target.classList[0];
            currentFontIdx = FONTS[currentFont].index;

            // set new font for write-message
            let writeMessage = document.getElementsByClassName(
                "write-message"
            )[0];
            let font = FONTS[currentFont].name + ", sans-serif";
            writeMessage.style.fontFamily = font;
            writeMessage.style.fontSize = FONTS[currentFont].size;

            // add active to classList of chosen element
            e.target.classList.add(ACTIVE);
        }
    }
};

fontStyles.addEventListener("click", changeFont);

// CHANGE COLOR

const COLORS = {
    "color-1": {
        index: 0,
        color: "#e6e2cf",
    },
    "color-2": {
        index: 1,
        color: "#dbcaac",
    },
    "color-3": {
        index: 2,
        color: "#c9cbb3",
    },
    "color-4": {
        index: 3,
        color: "#bbc9ca",
    },
    "color-5": {
        index: 4,
        color: "#a6a5b5",
    },
    "color-6": {
        index: 5,
        color: "#b5a6ab",
    },
    "color-7": {
        index: 6,
        color: "#eccfcf",
    },
    "color-8": {
        index: 7,
        color: "#eceeeb",
    },
    "color-9": {
        index: 8,
        color: "#bab9b5",
    },
};

let currentColorIdx = 0;
let colorOptions = document.getElementById("color-options");
let colorButtons = colorOptions.getElementsByTagName("button");
let previousColor = COLORS["color-1"].color; // for hovering
let postcard = document.getElementsByClassName("postcard-container")[0];

let changeColor = (e) => {
    if (e.target && e.target.nodeName === "BUTTON") {
        if (e.target.classList.contains(ACTIVE)) {
            return; // already active
        } else {
            // remove active class from previous color
            colorButtons[currentColorIdx].classList.remove(ACTIVE);

            // set currentColor index
            let currentColor = e.target.classList[1];
            currentColorIdx = COLORS[currentColor].index;

            // set new color for postcard
            postcard.style.background = COLORS[currentColor].ACTIVE;

            // add active class to classList of chosen element
            e.target.classList.add(ACTIVE);
        }
    }
};

let viewColor = (e) => {
    if (e.target && e.target.nodeName === "BUTTON") {
        let colorChosen = e.target.classList[1];

        // store color to revert back to
        for (let key in COLORS) {
            if (COLORS[key]["index"] === currentColorIdx) {
                previousColor = COLORS[key]["color"];
            }
        }

        postcard.style.background = COLORS[colorChosen].color;
    }
};

let revertColor = (e) => {
    if (e.target && e.target.nodeName === "BUTTON") {
        postcard.style.background = previousColor;
    }
};

colorOptions.addEventListener("click", changeColor);
colorOptions.addEventListener("mouseover", viewColor);
colorOptions.addEventListener("mouseout", revertColor);

// FILE UPLOAD

let uploadFile = () => {
    const imageFile = document.getElementById("image-uploader").files[0];
    const formData = new FormData();

    // store image file in formData
    formData.append("image", imageFile); // TODO: See if need 3rd param

    const options = {
        method: "POST",
        body: formData,
    };

    fetch("/upload", options)
        .then((res) => {
            console.log(res);
            if (!res.ok) {
                throw Error(res.statusText);
            } else {
                let image = document.getElementById("image-container");
                image.src = `../images/${imageFile.name}`;
            }
        })
        .catch((err) => console.log(err));
};

let fileUpload = document.getElementById("image-uploader");
fileUpload.addEventListener("change", uploadFile);
