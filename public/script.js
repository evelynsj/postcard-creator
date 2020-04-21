// Change fonts

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

const ACTIVE = "active";
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
