(() => {
    var _loaded = (() => {
        const galleries = document.querySelectorAll(".gallery");
        const galleriesItems = {};

        var nextID = 1;

        var hash = function(div){
            div.hashID = div.hashID || ('hashID_' + (nextID++));
            return div.hashID;
        }

        var galleryDefinitor = (function (gallery) {
            let prevBtn = gallery.parentNode.querySelector(".gallery-btn.prev");
            let nextBtn = gallery.parentNode.querySelector(".gallery-btn.next");
            
            let items = Array.from(gallery.querySelectorAll(".gallery-item"));

            let currentIndex = 0;

            galleriesItems[hash(gallery)] = items;

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

        galleries.forEach(galleryDefinitor);

        window.document.reloadGallery = (() => {
            galleries.forEach((gallery) => {
                if (!galleriesItems[hash(gallery)])
                    galleriesItems[hash(gallery)] = Array.from(gallery.querySelectorAll(".gallery-item"));
                else {
                    galleriesItems[hash(gallery)].splice(0,galleriesItems[hash(gallery)].length);

                    gallery.querySelectorAll(".gallery-item").forEach((item) => {
                        galleriesItems[hash(gallery)].push(item);
                    });
                }
            });
        });
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", _loaded);
    } else {
        _loaded();
    }
})();
