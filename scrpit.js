document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navigation =
        document.getElementById("navigation");

    const menuIcon =
        menuToggle.querySelector("i");


    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("show");

        const menuOpen =
            navigation.classList.contains("show");


        if (menuOpen) {

            menuIcon.classList.remove("fa-bars");

            menuIcon.classList.add("fa-xmark");

        } else {

            menuIcon.classList.remove("fa-xmark");

            menuIcon.classList.add("fa-bars");

        }

    });



    /* =====================================
       CLOSE MENU AFTER CLICK
    ===================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("show");

            menuIcon.classList.remove("fa-xmark");

            menuIcon.classList.add("fa-bars");

        });

    });



    /* =====================================
       ACTIVE NAV LINK
    ===================================== */

    const sections =
        document.querySelectorAll("section[id]");


    window.addEventListener("scroll", () => {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    });



    /* =====================================
       NAVBAR SHADOW
    ===================================== */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 8px 30px rgba(0,0,0,0.07)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    });



    /* =====================================
       COUNTER ANIMATION
    ===================================== */

    const stats =
        document.querySelector(".stats");


    const counters =
        document.querySelectorAll(".stat strong");


    let counterStarted = false;


    function startCounters() {

        if (counterStarted) return;

        counterStarted = true;


        counters.forEach(counter => {

            const original =
                counter.textContent;


            if (original.includes("%")) {

                const target =
                    parseFloat(original);

                let value = 0;


                const timer =
                    setInterval(() => {

                        value += 1;

                        counter.textContent =
                            value.toFixed(1) + "%";


                        if (value >= target) {

                            clearInterval(timer);

                            counter.textContent =
                                original;

                        }

                    }, 18);

            }


            else if (original.includes("+")) {

                const target =
                    parseInt(original);

                let value = 0;


                const timer =
                    setInterval(() => {

                        value += 4;

                        counter.textContent =
                            value + "+";


                        if (value >= target) {

                            clearInterval(timer);

                            counter.textContent =
                                original;

                        }

                    }, 20);

            }

        });

    }



    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startCounters();

                        statsObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    statsObserver.observe(stats);



    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".solution-card, .tech-row, .about-card"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const target =
                        document.querySelector(
                            this.getAttribute("href")
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        });

});