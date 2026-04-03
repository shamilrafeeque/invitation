document.addEventListener("DOMContentLoaded", () => {

    // Envelope Interaction
    const envelopeCover = document.getElementById("envelope-cover");
    const mainContent = document.getElementById("main-content");

    envelopeCover.addEventListener("click", () => {
        // Trigger flap open animation
        envelopeCover.classList.add("opening");

        // Wait for flap animation then fade out wrapper
        setTimeout(() => {
            envelopeCover.classList.add("opened");
            mainContent.classList.remove("hidden");

            // Allow time for display:block to apply before scrolling
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 50);

            // Completely remove from DOM flow after fade
            setTimeout(() => {
                envelopeCover.style.display = 'none';
            }, 1000);

        }, 800);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Countdown Timer matching format of target
    // Target Date: April 26, 2026
    const countDownDate = new Date("Apr 26, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("cd-days").innerHTML = "00";
            document.getElementById("cd-hours").innerHTML = "00";
            document.getElementById("cd-mins").innerHTML = "00";
            document.getElementById("cd-secs").innerHTML = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format to always have 2 digits
        document.getElementById("cd-days").innerHTML = days < 10 ? '0' + days : days;
        document.getElementById("cd-hours").innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById("cd-mins").innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("cd-secs").innerHTML = seconds < 10 ? '0' + seconds : seconds;

    }, 1000);

    // Back to Top button logic
    const backToTopBtn = document.getElementById("back-to-top");
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
