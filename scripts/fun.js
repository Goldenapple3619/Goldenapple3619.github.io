(() => {
    const COLORLIST = [
        "#9c112a",
        "#9c1170",
        "#97119c",
        "#64119c",
        "#28119c",
        "#11369c",
        "#11699c",
        "#11959c",
        "#119c64",
        "#119c38",
        "#1f9c11",
        "#529c11",
        "#7c9c11",
        "#9c8911",
        "#9c5b11",
        "#9c3b11",
        "#9c1d11"
    ];
    var _loaded = (() => {
        var startTime = null;
        var elements = Array.from(document.querySelectorAll(".bouncy"));
        var index = 0;

        console.log(elements);

        function animateBouncy(deltatime) {
            if (startTime === null)
                startTime = deltatime;
            let elapsed = deltatime - startTime;

            // console.log(elapsed);

            startTime = deltatime;
    
            
            elements.forEach(element => {
                var rect = element.getBoundingClientRect();

                if (!element.getAttribute("directionX"))
                    element.setAttribute("directionX", "1");
                if (!element.getAttribute("directionY"))
                    element.setAttribute("directionY", "1");

                if (rect.right > window.innerWidth) {
                    element.style.left = `${window.innerWidth - rect.width}px`;
                    element.setAttribute("directionX", "-1");
                    rect = element.getBoundingClientRect();
                    element.style.backgroundColor = COLORLIST[index];
                    index = (index + 1) % COLORLIST.length;
                }
                if (rect.left < 0) {
                    element.style.left = `${0}px`;
                    element.setAttribute("directionX", "1");
                    rect = element.getBoundingClientRect();
                    element.style.backgroundColor = COLORLIST[index];
                    index = (index + 1) % COLORLIST.length;
                }

                if (rect.bottom > window.innerHeight) {
                    element.style.top = `${window.innerHeight - rect.height}px`;
                    element.setAttribute("directionY", "-1");
                    rect = element.getBoundingClientRect();
                    element.style.backgroundColor = COLORLIST[index];
                    index = (index + 1) % COLORLIST.length;
                }
                if (rect.top < 0) {
                    element.style.top = `${0}px`;
                    element.setAttribute("directionY", "1");
                    rect = element.getBoundingClientRect();
                    element.style.backgroundColor = COLORLIST[index];
                    index = (index + 1) % COLORLIST.length;
                }

                element.style.left = `${rect.left + parseFloat(element.getAttribute("directionX")) * 0.25 * elapsed}px`;
                element.style.top = `${rect.top + parseFloat(element.getAttribute("directionY")) * 0.25 * elapsed}px`;

            });

            requestAnimationFrame(animateBouncy);
        }

        requestAnimationFrame(animateBouncy);
        // console.log("ok");
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", _loaded);
    } else {
        _loaded();
    }
})();