'use strict';

// --- Profile Modal Variables and Logic (from the top of your original script) ---
// RENAMED variables to avoid conflict with 'testimonials' modal
const profileOpenBtn = document.getElementById("openModal");
const profileModal = document.getElementById("profileModal");
const profileModalImage = document.getElementById("modalImg"); // Renamed modalImg to profileModalImage
const profileCloseBtn = document.getElementById("closeModal");

// Ensure elements exist before adding listeners to prevent errors if IDs are missing
if (profileOpenBtn && profileModal && profileModalImage) {
    profileOpenBtn.addEventListener("click", function (e) {
        e.preventDefault(); // Keep this if 'openBtn' has a default action you want to stop
        profileModal.style.display = "block";
        // Safely access src, in case querySelector returns null
        profileModalImage.src = profileOpenBtn.querySelector("img") ? profileOpenBtn.querySelector("img").src : '';
    });
}

if (profileCloseBtn && profileModal) {
    profileCloseBtn.addEventListener("click", function () {
        profileModal.style.display = "none";
    });
}

if (profileModal && profileModalImage) {
    // Tap anywhere outside the image to close the profile modal
    profileModal.addEventListener("click", function (e) {
        if (e.target === profileModal || e.target === profileModalImage) {
            profileModal.style.display = "none";
        }
    });
}
// --- End Profile Modal ---


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Open sidebar by default on mobile
if (window.innerWidth < 1024) {
    sidebar.classList.add("active");
}


// --- Testimonials Modal Variables and Logic (existing from your original script) ---
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable (this modalImg is for testimonials)
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (for testimonials modal)
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
    });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);
// --- End Testimonials Modal ---


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

/// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
        const target = this.dataset.target;

        pages.forEach(page => {
            page.classList.remove("active");
            if (page.dataset.page === target) {
                page.classList.add("active");
            }
        });

        navigationLinks.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");

        window.scrollTo(0, 0);
    });
});

 // --- NEW: Project Modal Slideshow Logic ---
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalOverlay = document.querySelector("[data-project-modal-overlay]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectTriggers = document.querySelectorAll("[data-project-trigger]"); // Select all project triggers

let slideIndexModal = 1; // Current slide index for the modal slideshow
let slideTimerModal; // Variable to hold the automatic slideshow timer for modal

// showSlidesModal function: Controls which slide is displayed in the modal
function showSlidesModal(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides-modal"); // Get all modal slides
    let dots = document.getElementsByClassName("dot-modal"); // Get all modal dots

    if (n > slides.length) { slideIndexModal = 1 }
    if (n < 1) { slideIndexModal = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot-modal", "");
    }

    if (slides[slideIndexModal - 1]) {
        slides[slideIndexModal - 1].style.display = "block";
        if (dots[slideIndexModal - 1]) {
            dots[slideIndexModal - 1].className += " active-dot-modal";
        }
    }
}

// plusSlidesModal function: Changes the slide in the modal by a given number
function plusSlidesModal(n) {
    clearTimeout(slideTimerModal);
    showSlidesModal(slideIndexModal += n);
    startSlideTimerModal();
}

// currentSlideModal function: Displays a specific slide in the modal when a dot is clicked
function currentSlideModal(n) {
    clearTimeout(slideTimerModal);
    showSlidesModal(slideIndexModal = n);
    startSlideTimerModal();
}

// startSlideTimerModal function: Sets up the automatic slideshow for the modal
function startSlideTimerModal() {
    clearTimeout(slideTimerModal);
    slideTimerModal = setTimeout(() => {
        plusSlidesModal(1);
    }, 5000); // Change image every 5 seconds
}

// Function to open the project modal
function openProjectModal() {
    if (projectModalContainer) {
        projectModalContainer.classList.add("active");
        // Initialize or reset the slideshow when the modal opens
        slideIndexModal = 1; // Start from the first slide
        showSlidesModal(slideIndexModal);
        startSlideTimerModal(); // Start auto-play
    }
}

// Function to close the project modal
function closeProjectModal() {
    if (projectModalContainer) {
        projectModalContainer.classList.remove("active");
        clearTimeout(slideTimerModal); // Stop auto-play when modal closes
    }
}

// Add click event to project trigger (e.g., Plant Pal Pro project item)
projectTriggers.forEach(trigger => {
    trigger.addEventListener("click", function() {
        // You can add logic here to load dynamic content based on which project was clicked
        // For now, we'll just open the Plant Pal Pro modal
        if (this.dataset.projectTrigger === "plant-pal-pro") {
            openProjectModal();
        }
    });
});

// Add click event to modal close button
if (projectModalCloseBtn) {
    projectModalCloseBtn.addEventListener("click", closeProjectModal);
}

// Add click event to overlay to close modal
if (projectModalOverlay) {
    projectModalOverlay.addEventListener("click", closeProjectModal);
}

// NEW: Add click events for modal slideshow navigation arrows
const prevModalBtn = document.querySelector(".prev-modal");
const nextModalBtn = document.querySelector(".next-modal");

if (prevModalBtn) {
    prevModalBtn.addEventListener("click", () => plusSlidesModal(-1));
}

if (nextModalBtn) {
    nextModalBtn.addEventListener("click", () => plusSlidesModal(1));
}

// Make modal slideshow functions globally accessible for inline onclicks on dots
window.plusSlidesModal = plusSlidesModal; // Keep this line
window.currentSlideModal = currentSlideModal; // Keep this line
// Make modal slideshow functions globally accessible for inline onclicks on dots
window.plusSlidesModal = plusSlidesModal;
window.currentSlideModal = currentSlideModal;