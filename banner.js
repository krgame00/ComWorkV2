const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg"]; // ใส่ชื่อไฟล์ภาพ
let currentIndex = 0;

function showSlide(index) {
    const slideImage = document.getElementById("slideImage");
    slideImage.src = images[index];
}

// เลื่อนสไลด์ไปทางซ้าย
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
}

// เลื่อนสไลด์ไปทางขวา
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

