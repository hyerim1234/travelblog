const firstswiper = new Swiper('.swiper-container', {
    centeredSlides: true,
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 16,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (idx, className) => {
        const num = idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1);
        return `<span class="${className} !bg-red-500">${num}</span>`;
      },
    },
    breakpoints: {
      1024: { slidesPerView: 5 },
      768: { slidesPerView: 3 },
      640: { slidesPerView: 2 },
      320: { slidesPerView: 1 },
    },
  });







  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
      1024: { slidesPerView: 3 },
    },
  });


  document.querySelectorAll('#travelTab button').forEach(btn => {
    btn.addEventListener('click', () => {
      // 모든 버튼을 "비활성" 상태로 되돌립니다.
      document.querySelectorAll('#travelTab button').forEach(b => {
        b.classList.remove('text-teal-400', 'border-teal-400');
        b.classList.add('text-gray-400', 'border-gray-400');
        b.setAttribute('aria-selected', 'false');
      });
      // 클릭한 버튼만 "활성" 상태로 변경합니다.
      btn.classList.remove('text-gray-400', 'border-gray-400');
      btn.classList.add('text-teal-400', 'border-teal-400');
      btn.setAttribute('aria-selected', 'true');
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll('#travelTab button');

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        tabButtons.forEach((button) => {
          // 기존 강조 클래스 제거
          button.classList.remove("text-teal-400", "border-teal-400");
          button.classList.add("text-gray-400", "border-gray-400");
        });

        // 현재 클릭된 버튼에 강조 클래스 추가
        this.classList.remove("text-gray-400", "border-gray-400");
        this.classList.add("text-teal-400", "border-teal-400");
      });
    });
  });