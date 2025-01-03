const pornStarName = document.getElementById('name');
const category = document.getElementById('category');
const searchButton = document.getElementById('searchButton');
const imageContainer = document.getElementById('image-grid');
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
let imageURLs = [];

// To Stop the page reloading
window.addEventListener('beforeunload' , function(e) {
    e.preventDefault();
    e.returnValue = '';
})

searchButton.addEventListener('click', () => {
    APICall(pornStarName, category);
});

async function APICall(pornStarName, category) {
    // API details
    const url = 'https://porn-gallery.p.rapidapi.com/pornos/' + pornStarName.value + " " + category.value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ac2ce90b37mshfca0bf11774b8cfp1be69bjsn827d033820cb',
            'X-RapidAPI-Host': 'porn-gallery.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();

        fetchImageURLs(result);
    } catch (error) {
        console.error(error);
    }
}

async function fetchImageURLs(result) {
    // JSON format in which data is coming
    /* demo : {
        "result" : [ 
                {
                    "title" : "".
                    "images" : [],
                    "models" : [],
                    "source" : "",
                    "tags" : [],
                    "id" : ""
                }
        ]
    }*/
    const demo = JSON.parse(result);
    
    demo.results.forEach(element => {
        element.images.forEach(image => {
            imageURLs.push(image);
        });
    });

    displayImages();
}

function displayImages() {

    imageURLs.forEach(image => {
        console.log(image);
        var imageElement = document.createElement('img');

        imageElement.src = image;

        imageContainer.appendChild(imageElement);
    })
}

window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

