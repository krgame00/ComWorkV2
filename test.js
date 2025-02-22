const articles = [];
for (let i = 1; i <= 350; i++) {  // ✅ มีทั้งหมด 350 บทความ
    articles.push({
        title: `บทความที่ ${i}`,
        img: `images/article${(i % 10) + 1}.jpg`, // ✅ ใช้ภาพวนลูป
        link: `/blog/${i}.html`
    });
}

const itemsPerPage = 7; // ✅ แสดง 7 บทความต่อหน้า
const totalPages = Math.ceil(articles.length / itemsPerPage);
let currentPage = 1;

const articleContainer = document.getElementById("article-container");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const pageNumbersContainer = document.getElementById("pageNumbers");

const maxVisiblePages = 5; // ✅ จำนวนปุ่มเพจสูงสุดที่แสดง

function renderArticles() {
    articleContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = articles.slice(start, end);

    paginatedItems.forEach(article => {
        const articleCard = document.createElement("a");
        articleCard.href = article.link;
        articleCard.classList.add("article-card");

        const img = document.createElement("img");
        img.src = article.img;
        img.alt = article.title;

        const title = document.createElement("h3");
        title.textContent = article.title;

        articleCard.appendChild(img);
        articleCard.appendChild(title);
        articleContainer.appendChild(articleCard);
    });

    renderPagination();
}

function renderPagination() {
    pageNumbersContainer.innerHTML = "";

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        const firstPage = document.createElement("span");
        firstPage.classList.add("page-number");
        firstPage.textContent = "1";
        firstPage.addEventListener("click", () => goToPage(1));
        pageNumbersContainer.appendChild(firstPage);

        if (startPage > 2) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            dots.style.pointerEvents = "none";
            pageNumbersContainer.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageElement = document.createElement("span");
        pageElement.classList.add("page-number");
        if (i === currentPage) pageElement.classList.add("active");
        pageElement.textContent = i;
        pageElement.addEventListener("click", () => goToPage(i));
        pageNumbersContainer.appendChild(pageElement);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            dots.style.pointerEvents = "none";
            pageNumbersContainer.appendChild(dots);
        }

        const lastPage = document.createElement("span");
        lastPage.classList.add("page-number");
        lastPage.textContent = totalPages;
        lastPage.addEventListener("click", () => goToPage(totalPages));
        pageNumbersContainer.appendChild(lastPage);
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function goToPage(page) {
    currentPage = page;
    renderArticles();
}

prevButton.addEventListener("click", () => goToPage(currentPage - 1));
nextButton.addEventListener("click", () => goToPage(currentPage + 1));

renderArticles();
