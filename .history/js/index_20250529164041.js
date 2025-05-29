// ======= 첫 번째 Swiper 인스턴스 (firstswiper) 초기화 =======
const firstswiper = new Swiper('.swiper-container', {
  // 가운데 슬라이드를 중심으로 표시
  centeredSlides: true,
  // 처음 보여줄 슬라이드 인덱스 (0부터 시작)
  initialSlide: 0,
  // 한 번에 화면에 보여줄 슬라이드 개수
  slidesPerView: 3,
  // 슬라이드 간격(px)
  spaceBetween: 16,

  // 이전/다음 네비게이션 버튼 셀렉터
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // 하단 페이지네이션 설정
  pagination: {
    el: '.swiper-pagination',   // 페이지네이션 컨테이너
    clickable: true,            // 클릭 가능 여부
    // 페이지네이션 bullet(숫자) 렌더링 함수
    renderBullet: (idx, className) => {
      // 1자리 숫자는 앞에 0 붙이기 (01, 02, …)
      const num = idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1);
      // Tailwind 유틸리티로 배경색을 빨간색(!bg-red-500)으로 예시 적용
      return `<span class="${className} border-b">${num}</span>`;
    },
  },

  // 반응형 슬라이드 개수 설정
  breakpoints: {
    1024: { slidesPerView: 5 },
    768:  { slidesPerView: 3 },
    640:  { slidesPerView: 2 },
    320:  { slidesPerView: 1 },
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
