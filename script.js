const accessKey = "M7jCm8WDrf3DuHGJNBkgX-O4XgSh2y9_xQnfAD9Faeo";

const formElement = document.querySelector('form');

const inputElement = document.getElementById("search-input");

const imageContainer = document.querySelector(".search-results");

const searchBtn = document.querySelector('.search-buttom');

const showMore = document.querySelector('.show-more');

let page = 1;
let inputData = "";

async function getData() {
    inputData = inputElement.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const res = await fetch(url);
    const data = await res.json();

    const results = data.results;

    if(page == 1){
        while (imageContainer.hasChildNodes()) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    }

    results.map((result) => {
        const imageBox = document.createElement("div");
        imageBox.classList.add('search-result');
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const link = document.createElement("a");
        link.href = result.links.html;
        link.target = "_blank";
        link.textContent = result.alt_description;

        imageBox.appendChild(image);
        imageBox.appendChild(link);
        imageContainer.appendChild(imageBox);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    getData();
});

showMore.addEventListener('click', () => {
    getData();
})
