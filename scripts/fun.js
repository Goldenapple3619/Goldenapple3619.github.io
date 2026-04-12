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

        elements.forEach(element => {
            if (!element.getAttribute("directionX"))
                element.setAttribute("directionX", Math.random() > 0.5 ? "-1" : "1");
            if (!element.getAttribute("directionY"))
                element.setAttribute("directionY", Math.random() > 0.5 ? "-1" : "1");
            if (element.getAttribute("randomizePos"))
                element.style.left = `${Math.floor(Math.random() * (window.innerWidth - 0 + 1)) + 0}px`;
            if (element.getAttribute("randomizePos"))
                element.style.top = `${Math.floor(Math.random() * (window.innerHeight - 0 + 1)) + 0}px`;
        });

        function animateBouncy(deltatime) {
            let elapsed;

            if (startTime === null)
                startTime = deltatime;

            elapsed = deltatime - startTime;
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
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", _loaded);
    } else {
        _loaded();
    }
})();

var _spawn_heart = (() => { 
    var particles = [];
    var lastTime = performance.now();
    var updateParticles = ((dt) => {
        for (var i = 0; i < particles.length; ++i) {
            if (particles[i].getClock() >= particles[i].getLifetime()) {
                particles[i].destroy();
                particles.splice(i, 1);
                --i;
                continue;
            }
            particles[i].update(dt);
        }
    });
    var mainloop = ((now) => {
        let dt = now - lastTime;
        lastTime = now;

        updateParticles(dt);
        requestAnimationFrame(mainloop);
    });

    var Particle = (() => {
        function init(x, y, velX, velY, lifetime, dom) {
            var x = x;
            var y = y;
            var vel = [velX, velY];
            var lifetime = lifetime
            var clock = 0;
            var dom = dom;
            let gravity = 0.002;

            return ({
                update: function (dt) {
                    let lifeRatio = 1 - (clock / lifetime);
                    let scale = 0.5 + lifeRatio * 0.5;

                    vel[1] -= gravity * dt;

                    x -= vel[0] * dt;
                    y -= vel[1] * dt;
    
                    clock += dt;

                    dom.style.left = `${x}px`;
                    dom.style.top = `${y}px`;

                    dom.style.opacity = lifeRatio;
                    dom.style.transform = ``;
                    dom.style.transform = `scale(${scale}) rotate(${clock * -vel[0] * 0.5}deg)`;
                },

                getClock: function () {
                    return (clock);
                },

                getLifetime: function () {
                    return (lifetime);
                },
                destroy: function () {
                    dom.remove();
                }
            });
        }

        return ({
            init: init
        });
    })();

    requestAnimationFrame(mainloop);

    return (((e) => {
        var eRect = e.currentTarget.getBoundingClientRect();
        
        var dom = document.createElement("div");

        dom.classList.add("particle");
        dom.style.position = "absolute";
        dom.style.zIndex = "10";
        dom.style.width = "20px";
        dom.style.height = "20px";
        dom.style.backgroundImage = "url(/assets/heart-s.svg)";
        dom.style.backgroundSize = "contain";
        dom.style.backgroundRepeat = "no-repeat";
        dom.style.backgroundPosition = "center";
        
        // var spawnX = eRect.x + eRect.width / 2.0 - 10;
        // var spawnY = eRect.y + 20 - 10; 

        var spawnX = e.clientX - 10;
        var spawnY = e.clientY + 20 - 10; 
        
        dom.style.left = `${spawnX}px`;
        dom.style.top = `${spawnY}px`;

        document.body.appendChild(dom);

        let velX = (Math.random() - 0.5) * 0.2;
        let velY = 0.6 + Math.random() * 0.3;

        particles.push(Particle.init(
            spawnX,
            spawnY,
            velX,
            velY,
            Math.floor(Math.random() * (2000 - 500 + 1)) + 500,
            dom
        ));
    }));
})();

(() => {
    let _loaded = (() => {
        let s = document.querySelector(".sakura");
        if (s) {
            s.addEventListener("click", _spawn_heart);   
            document.querySelector(".sakura").ondragstart = () => false;
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", _loaded);
    } else {
        _loaded();
    }
})();