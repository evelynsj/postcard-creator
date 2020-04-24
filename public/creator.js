/* CONSTANTS */

const FONTS = {
    "indie-flower": {
        name: "Indie Flower",
        size: "15px",
    },
    "dancing-script": {
        name: "Dancing Script",
        size: "18px",
    },
    "long-cang": {
        name: "Long Cang",
        size: "18px",
    },
    "homemade-apple": {
        name: "Homemade Apple",
        size: "12px",
    },
};

const COLORS = {
    "white-rock": "#e6e2cf",
    "akaroa": "#dbcaac",
    "foggy-gray": "#c9cbb3",
    "submarine": "#bbc9ca",
    "spun-pearl": "#a6a5b5",
    "pink-swan": "#b5a6ab",
    "oyster-pink": "#eccfcf",
    "gray-nurse": "#eceeeb",
    "gray-nickel": "#bab9b5",
};

class Postcard {
    constructor() {
        this.background = "white-rock";
        this.font = "indie-flower";
        this.image = null;
        this.text = "Write your message here!";
    }
}

// UPLOAD FILE

const uploadFile = () => {
    const imageFile = document.getElementById("image-uploader").files[0];

    // no file chosen
    if (!imageFile) {
        return;
    }
    const formData = new FormData();

    // store image file in formData
    formData.append("image", imageFile);

    const options = {
        method: "POST",
        body: formData,
    };

    const inputLabel = document.getElementById(
        "image-uploader-label"
    );
    inputLabel.textContent = "Uploading...";
    fetch("/upload", options)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        })
        .then((data) => {
            const image = document.getElementById("image-container");
            image.src = `../images/${data.file.originalname}`;

            const container = document.getElementsByClassName("image-choose")[0];

            // no image uploaded yet
            if (!postcard.image) {
                container.classList.remove("image-choose");
                container.classList.add("image-replace");

                const messageContainer = document.getElementById("write-message");
                messageContainer.classList.add("message-image");
            }

            postcard.image = data.file.originalname;
        })
        .catch((err) => console.log(err));
};

// SEND FILE

const sendFile = () => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(postcard),
    };

    fetch("/share", options)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        })
        .then((data) => {
            console.log(data.message);
            return (window.location = "display");
        });
};

// CHANGE FONT

const changeFont = (e) => {
    if (e.target && e.target.nodeName === "LI") {
        if (e.target.classList[0] === postcard.font) {
            return;
        } else {
            const listItems = document
                .getElementById("font-styles")
                .getElementsByTagName("li");
            const currentFont = postcard.font;
            const selectedFont = e.target.classList[0];

            for (let i = 0; i < listItems.length; ++i) {
                // remove active class from current
                if (listItems[i].classList[0] === currentFont) {
                    listItems[i].classList.remove("active");
                } else if (listItems[i].classList[0] === selectedFont) {
                    // add active class to chosen
                    listItems[i].classList.add("active");

                    // change write message font
                    const writeMessage = document.getElementById("write-message");
                    writeMessage.style.fontFamily = createFontString(
                        selectedFont
                    );
                    writeMessage.style.fontSize = FONTS[selectedFont]["size"];

                    postcard.font = selectedFont;
                }
            }
        }
    }
};

// CHANGE COLOR

const changeColor = (e) => {
    if (e.target && e.target.nodeName === "BUTTON") {
        if (e.target.classList[1] === postcard.background) {
            return; // already active
        } else {
            const colorButtons = document.getElementsByClassName("square");
            const currentColor = postcard.background;
            const selectedColor = e.target.classList[1];

            for (let i = 0; i < colorButtons.length; ++i) {
                // remove active from current color
                if (colorButtons[i].classList[1] === currentColor) {
                    colorButtons[i].classList.remove("active");
                }
                // add active to new color
                else if (colorButtons[i].classList[1] === selectedColor) {
                    colorButtons[i].classList.add("active");
                    // change postcard background
                    const postcardContainer = document.getElementsByClassName(
                        "postcard-container"
                    )[0];
                    postcardContainer.style.background = COLORS[selectedColor];
                    // set postcard.background
                    postcard.background = selectedColor;
                }
            }
        }
    }
};

// PEEK COLOR

const peekColor = (e) => {
    if (e.target && e.target.nodeName === "BUTTON") {
        if (e.target.classList[1] === postcard.background) {
            return; // already active
        } else {
            const postcardContainer = document.getElementsByClassName(
                "postcard-container"
            )[0];
            const selectedColor = e.target.classList[1];

            postcardContainer.style.background = COLORS[selectedColor];
        }
    }
};

// REVERT COLOR

const revertColor = (e) => {
    if (e.target && e.target.nodeName === "BUTTON") {
        const postcardContainer = document.getElementsByClassName(
            "postcard-container"
        )[0];
        postcardContainer.style.background = COLORS[postcard.background];
    }
};

const writeMessage = () => {
    const message = document.getElementById("write-message");
    postcard.text = message.textContent;
};

const imageLoaded = () => {
    const label = document.getElementById("image-uploader-label");
    label.textContent = "Replace Image";
}

/* UTIL FUNCTION */

const createFontString = (font) => {
    return `${FONTS[font]["name"]}, sans-serif`;
};

/* EVENT LISTENERS */

document
    .getElementById("image-uploader")
    .addEventListener("change", uploadFile);

document.getElementById("image-container").addEventListener("load", imageLoaded);

document
    .getElementById("write-message")
    .addEventListener("input", writeMessage);

document.getElementById("font-styles").addEventListener("click", changeFont);

document.getElementById("color-options").addEventListener("click", changeColor);

document.getElementById("share-button").addEventListener("click", sendFile);

document
    .getElementById("color-options")
    .addEventListener("mouseover", peekColor);
document
    .getElementById("color-options")
    .addEventListener("mouseout", revertColor);

/* DYNAMIC LOADING */

// LOAD FONTS

const fontsList = document.getElementById("font-styles");
let i = 0;

for (let font in FONTS) {
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(FONTS[font]["name"]));
    listItem.classList.add(font);
    if (i === 0) {
        listItem.classList.add("active");
        i++;
    }
    fontsList.append(listItem);
}

// LOAD COLORS

const colorsContainer = document.getElementById("color-options");
let j = 0;

for (let color in COLORS) {
    let button = document.createElement("button");
    button.style.background = COLORS[color];
    button.classList.add("square");
    button.classList.add(color);
    if (j === 0) {
        button.classList.add("active");
        ++j;
    }
    colorsContainer.append(button);
}

/* CALL CONSTRUCTOR */

let postcard = new Postcard();
