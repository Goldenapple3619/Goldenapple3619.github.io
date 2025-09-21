(() => {
    var _loaded = (() => {
        const gallery = document.querySelector(".gallery");
        const prevBtn = document.querySelector(".gallery-btn.prev");
        const nextBtn = document.querySelector(".gallery-btn.next");
        
        var items = document.querySelectorAll(".gallery-item");

        let currentIndex = 0;

        window.document.reloadGallery = (() => {
            items = document.querySelectorAll(".gallery-item");
        });

        function updateGallery() {
            gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function goToSlide(index) {
            currentIndex = index;
            updateGallery();
        }
        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateGallery();
        }
        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateGallery();
        }

        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlide);
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", _loaded);
    } else {
        _loaded();
    }
})();
