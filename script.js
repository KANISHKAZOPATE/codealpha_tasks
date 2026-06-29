/*=========================================
  PixelVista Image Gallery
  CodeAlpha Internship
==========================================*/

// ===============================
// Select Elements
// ===============================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const caption = document.querySelector(".caption");
const counter = document.querySelector(".counter");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// ===============================
// Variables
// ===============================

let currentIndex = 0;
let visibleItems = [];

// ===============================
// Update Visible Images
// ===============================

function updateVisibleItems() {

    visibleItems = [];

    galleryItems.forEach(item => {

        if (window.getComputedStyle(item).display !== "none") {

            visibleItems.push(item);

        }

    });

}

// ===============================
// Open Lightbox
// ===============================

function openLightbox(index) {

    updateVisibleItems();

    currentIndex = index;

    const currentItem = visibleItems[currentIndex];

    const image = currentItem.querySelector("img");

    const title = currentItem.querySelector("h3");

    lightboxImg.src = image.src;

    lightboxImg.alt = image.alt;

    caption.textContent = title.textContent;

    counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

    lightbox.classList.add("show");

}

// ===============================
// Close Lightbox
// ===============================

function closeLightbox() {

    lightbox.classList.remove("show");

}

closeBtn.addEventListener("click", closeLightbox);

// ===============================
// Next Image
// ===============================

function nextImage() {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }

    openLightbox(currentIndex);

}

// ===============================
// Previous Image
// ===============================

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = visibleItems.length - 1;

    }

    openLightbox(currentIndex);

}

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", previousImage);

// ===============================
// Gallery Click
// ===============================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        openLightbox(currentIndex);

    });

});

// ===============================
// Filter Images
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all") {

                item.style.display = "block";

            }

            else if (item.classList.contains(filter)) {

                item.style.display = "block";

            }

            else {

                item.style.display = "none";

            }

        });

        updateVisibleItems();

    });

});

// ===============================
// Keyboard Controls
// ===============================

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    switch (event.key) {

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closeLightbox();

            break;

    }

});

// ===============================
// Close When Clicking Background
// ===============================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});

// ===============================
// Touch Swipe Support (Mobile)
// ===============================

let startX = 0;

lightbox.addEventListener("touchstart", (e) => {

    startX = e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend", (e) => {

    let endX = e.changedTouches[0].screenX;

    if (startX - endX > 60) {

        nextImage();

    }

    if (endX - startX > 60) {

        previousImage();

    }

});

// ===============================
// Image Preloading
// ===============================

galleryItems.forEach(item => {

    const img = item.querySelector("img");

    const preload = new Image();

    preload.src = img.src;

});

// ===============================
// Initialize
// ===============================

updateVisibleItems();

console.log("✅ PixelVista Gallery Loaded Successfully");