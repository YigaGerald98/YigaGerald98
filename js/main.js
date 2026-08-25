/* =========================================================
   YIGA GERALD — GLOBAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");


    if (!menuToggle || !navLinks) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        menuToggle.textContent =
            isOpen ? "✕" : "☰";

    });


    /* Close menu after selecting a link */

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            });

        });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        const clickedInsideNav =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideNav &&
            !clickedToggle &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        }

    });

});


/* =========================================================
   2. ACTIVE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const currentPage =
        window.location.pathname;


    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    links.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        /*
         * Ignore # links.
         */

        if (href.startsWith("#")) {
            return;
        }


        /*
         * Convert relative link to
         * an absolute URL.
         */

        const linkURL =
            new URL(
                href,
                window.location.href
            );


        /*
         * Compare paths.
         */

        if (
            linkURL.pathname ===
            currentPage
        ) {

            links.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            link.classList.add(
                "active"
            );

        }

    });

});


/* =========================================================
   3. SCROLL EFFECT
   ========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(
                ".site-header"
            );


        if (!header) {
            return;
        }


        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   4. SIMPLE REVEAL ANIMATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const elements =
            document.querySelectorAll(
                ".feature-card, .spotlight, .about-strip"
            );


        if (!elements.length) {
            return;
        }


        /*
         * If IntersectionObserver isn't
         * available, simply show everything.
         */

        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                element =>
                    element.classList.add(
                        "visible"
                    )
            );

            return;
        }


        elements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(15px)";

            element.style.transition =
                "opacity .6s ease, transform .6s ease";

        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    }
);


/* =========================================================
   5. SMOOTH INTERNAL LINKS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );


        if (!link) {
            return;
        }


        const targetID =
            link.getAttribute("href");


        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(
                targetID
            );


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================================
   6. UTILITY FUNCTIONS
   ========================================================= */


/*
 * Save something to localStorage.
 */

function saveData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save data:",
            error
        );

        return false;

    }

}


/*
 * Retrieve something from localStorage.
 */

function getData(key, fallback = null) {

    try {

        const data =
            localStorage.getItem(key);


        if (data === null) {
            return fallback;
        }


        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Could not retrieve data:",
            error
        );

        return fallback;

    }

}


/*
 * Remove saved data.
 */

function removeData(key) {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Could not remove data:",
            error
        );

        return false;

    }

}


/* =========================================================
   7. SIMPLE NOTIFICATION SYSTEM
   ========================================================= */

function showNotification(
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "notificationContainer"
        );


    /*
     * Create notification container
     * if it doesn't exist.
     */

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.id =
            "notificationContainer";


        container.style.position =
            "fixed";

        container.style.top =
            "85px";

        container.style.right =
            "20px";

        container.style.zIndex =
            "9999";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.gap =
            "10px";


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.textContent =
        message;


    notification.style.padding =
        "12px 16px";

    notification.style.borderRadius =
        "10px";

    notification.style.background =
        "#ffffff";

    notification.style.border =
        "1px solid #e2e8f0";

    notification.style.boxShadow =
        "0 10px 30px rgba(15,23,42,.12)";

    notification.style.fontSize =
        "14px";

    notification.style.fontWeight =
        "700";


    if (type === "success") {

        notification.style.borderLeft =
            "4px solid #16a34a";

    }

    else if (type === "error") {

        notification.style.borderLeft =
            "4px solid #dc2626";

    }

    else {

        notification.style.borderLeft =
            "4px solid #2563eb";

    }


    container.appendChild(
        notification
    );


    setTimeout(() => {

        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateX(20px)";

        notification.style.transition =
            "all .3s ease";


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3000);

}


/* =========================================================
   8. PAGE READY MESSAGE
   ========================================================= */

console.log(
    "Yiga Gerald ICT Learning Hub loaded successfully."
);
