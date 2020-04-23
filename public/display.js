window.onload = () => {
    fetch("/getPostcard")
        .then((res) => {
            return res.json();
        })
        .then((data) => console.log(data));
};
