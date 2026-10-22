document.addEventListener("DOMContentLoaded", function () {
          const root = document.getElementById("gSlider");
          if (!root) return;
      
          const cards = Array.from(root.querySelectorAll(".gcard"));
          const dotsBox = document.getElementById("gDots");
          const prevBtn = document.getElementById("gPrev");
          const nextBtn = document.getElementById("gNext");
          const total = cards.length;
          if (!total) return;
      
          let current = 0;
      
          // nuqtalarni kartalar soniga qarab avtomatik yasaymiz
          const dots = cards.map(function (_, i) {
            const b = document.createElement("button");
            b.type = "button";
            b.setAttribute("aria-label", i + 1 + "-karta");
            b.addEventListener("click", function () { go(i); });
            dotsBox.appendChild(b);
            return b;
          });
      
          function render() {
            cards.forEach(function (card, i) {
              // eng qisqa aylana bo'ylab masofa (oxirgidan birinchiga ham silliq o'tadi)
              let offset = i - current;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
      
              const abs = Math.abs(offset);
              const visible = abs <= 2;
      
              card.classList.toggle("is-visible", visible);
              card.classList.toggle("is-active", offset === 0);
      
              card.style.zIndex = String(10 - abs);
              card.style.transform =
                "translateX(calc(" + offset + " * var(--step))) " +
                "scale(" + (1 - abs * 0.14) + ") " +
                "rotateY(" + (offset * -12) + "deg)";
              card.style.filter = abs === 0 ? "none" : "brightness(0.8)";
            });
      
            dots.forEach(function (d, i) {
              d.classList.toggle("active", i === current);
            });
          }
      
          function go(i) {
            current = (i + total) % total;
            render();
          }
      
          prevBtn.addEventListener("click", function () { go(current - 1); });
          nextBtn.addEventListener("click", function () { go(current + 1); });
      
          // kartaning o'ziga bosilsa ham o'sha kartaga o'tadi
          cards.forEach(function (card, i) {
            card.addEventListener("click", function () { go(i); });
          });
      
          // klaviatura
          root.tabIndex = 0;
          root.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") go(current - 1);
            if (e.key === "ArrowRight") go(current + 1);
          });
      
          // telefonda surish (swipe)
          let startX = 0;
          root.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
          }, { passive: true });
          root.addEventListener("touchend", function (e) {
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 50) go(diff < 0 ? current + 1 : current - 1);
          }, { passive: true });
      
          render();
        });

        document.addEventListener("DOMContentLoaded", function () {
        const slides = document.querySelectorAll("#familySlider .family-slide");
        const dots = document.querySelectorAll("#familyDots button");
        const prev = document.getElementById("familyPrev");
        const next = document.getElementById("familyNext");

        if (!slides.length) return;

        let current = 0;

        function showFamilySlide(index) {
          current = (index + slides.length) % slides.length;

          slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === current);
          });

          dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
          });
        }

        prev.addEventListener("click", function () {
          showFamilySlide(current - 1);
        });

        next.addEventListener("click", function () {
          showFamilySlide(current + 1);
        });

        dots.forEach(function (dot) {
          dot.addEventListener("click", function () {
            showFamilySlide(Number(dot.dataset.familySlide));
          });
        });

        let startX = 0;

        const slider = document.getElementById("familySlider");

        slider.addEventListener(
          "touchstart",
          function (e) {
            startX = e.touches[0].clientX;
          },
          { passive: true },
        );

        slider.addEventListener(
          "touchend",
          function (e) {
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;

            if (Math.abs(diff) > 50) {
              showFamilySlide(diff < 0 ? current + 1 : current - 1);
            }
          },
          { passive: true },
        );

        showFamilySlide(0);
      });