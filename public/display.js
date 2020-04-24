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

const displayPostcard = (postcardData) => {
    const data = JSON.parse(postcardData);

    // insert background color
    const postcardContainer = document.getElementById(
        "postcard-display-container"
    );
    postcardContainer.style.background = COLORS[data.background];

    // display images
    const imageContainer = document.getElementById("image-display");
    imageContainer.src = `../images/${data.image}`;

    // insert message
    const messageContainer = document.getElementById("message-display");
    messageContainer.textContent = data.text;
    messageContainer.style.fontFamily = FONTS[data.font]["name"];
};

window.onload = () => {
    fetch("/getPostcard")
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        })
        .then((data) => displayPostcard(data));
};
