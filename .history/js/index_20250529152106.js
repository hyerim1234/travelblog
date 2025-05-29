// ======= 첫 번째 Swiper 인스턴스 (firstswiper) 초기화 =======
const firstswiper = new Swiper('.swiper-container', {
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 16,

  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: (index, className) => {
      // 1~9는 앞에 0 붙이기
      const num = (index + 1).toString().padStart(2, '0');
      return `<span class="border-b border-b-">${num}</span>`;
    },
  },

  breakpoints: {
    320:  { slidesPerView: 1 },
    640:  { slidesPerView: 2 },
    768:  { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
});

// ======= 두 번째 Swiper 인스턴스 (swiper) 초기화 =======
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,    // 기본 1개
  spaceBetween: 16,    // 간격 16px
  loop: false,         // 무한 루프 비활성

  // 페이지네이션(dot) 설정
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // 이전/다음 버튼
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // 반응형: 화면 크기에 따라 slidesPerView 변경
  breakpoints: {
    640:  { slidesPerView: 2 },
    768:  { slidesPerView: 2 },
    900:  { slidesPerView: 3 },
    1024: { slidesPerView: 3 },
  },
});


// ======= travelTab 버튼 클릭 시 탭 활성/비활성 처리 =======
// (DOMContentLoaded 이전에 스크립트가 실행될 경우도 대비한 즉시 바인딩)
document.querySelectorAll('#travelTab button').forEach(btn => {
  btn.addEventListener('click', () => {
    // 1) 모든 버튼을 비활성(회색) 상태로 되돌림
    document.querySelectorAll('#travelTab button').forEach(b => {
      b.classList.remove('text-teal-400', 'border-teal-400');
      b.classList.add('text-gray-400', 'border-gray-400');
      b.setAttribute('aria-selected', 'false');
    });
    // 2) 클릭된 버튼만 활성(티얼 색상) 상태로 변경
    btn.classList.remove('text-gray-400', 'border-gray-400');
    btn.classList.add('text-teal-400', 'border-teal-400');
    btn.setAttribute('aria-selected', 'true');
  });
});


// ======= DOMContentLoaded 이후에 다시 한 번 안전하게 바인딩 =======
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll('#travelTab button');

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 1) 모든 버튼에서 기존 강조 클래스 제거
      tabButtons.forEach((button) => {
        button.classList.remove("text-teal-400", "border-teal-400");
        button.classList.add("text-gray-400", "border-gray-400");
      });

      // 2) 현재 클릭된 버튼에 강조 클래스 추가
      this.classList.remove("text-gray-400", "border-gray-400");
      this.classList.add("text-teal-400", "border-teal-400");
    });
  });
});
