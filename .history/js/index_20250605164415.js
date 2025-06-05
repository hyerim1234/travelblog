// ============================
// 첫 번째 Swiper 인스턴스 (firstswiper)
// ============================
document.addEventListener('DOMContentLoaded', function () {
  const firstswiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 0,
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.pagination',
      clickable: true,

      renderBullet: function (idx, className) {
        // 01, 02, … 포맷
        const num = idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1);
        return `
          <span class="${className}"
                style="
                  background-color: transparent !important;
                  width: auto !important;
                  height: auto !important;
                  margin: 0 0.75rem !important;
                  padding: 0 !important;
                  color: #4c4c4c !important;
                  font-size: 1rem !important;
                  line-height: 1 !important;
                  font-weight: normal !important;
                  text-decoration: none !important;
                  border-radius: 0 !important;
                  cursor: pointer;
                  display: inline-block;
                ">
            ${num}
          </span>
        `;
      },
    },

    breakpoints: {
      1280: { slidesPerView: 3, slidesPerGroup: 3 },
      1024: { slidesPerView: 2, slidesPerGroup: 2 },
      640: { slidesPerView: 1, slidesPerGroup: 1 },
    },
  });

  // 혹시 renderBullet 로 처리했어도 남아 있는 dot이 있다면 강제 스타일 조정
  firstswiper.on('paginationRender', function () {
    document.querySelectorAll('.swiper-pagination-bullet').forEach(bullet => {
      bullet.style.setProperty('background', 'transparent', 'important');
      bullet.style.setProperty('border-radius', '0', 'important');
      bullet.style.setProperty('padding', '0', 'important');
      bullet.style.setProperty('margin', '0 0.75rem', 'important');
      bullet.textContent = bullet.textContent.trim();
    });
  });
});


// ============================
// 두 번째 Swiper 인스턴스 (RECOMMENDED ARTICLES: .mySwiper)
// ============================
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,

    // “숫자 페이징”을 동일하게 적용
    renderBullet: function (idx, className) {
      const num = idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1);
      return `
        <span class="${className}"
              style="
                background-color: transparent !important;
                width: auto !important;
                height: auto !important;
                margin: 0 0.75rem !important;
                padding: 0 !important;
                color: #4c4c4c !important;
                font-size: 1rem !important;
                line-height: 1 !important;
                font-weight: normal !important;
                text-decoration: none !important;
                border-radius: 0 !important;
                cursor: pointer;
                display: inline-block;
              ">
          ${num}
        </span>
      `;
    },
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


// ============================
// TRAVEL WRITERS 탭 활성/비활성 & 콘텐츠 토글
// ============================
document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('#travelTab button');
  const panels = document.querySelectorAll('#travelTabContent > div');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1) 모든 버튼을 비활성 스타일(회색)로 돌려놓기
      tabButtons.forEach(b => {
        b.classList.remove('text-teal-400', 'border-teal-400');
        b.classList.add('text-gray-400', 'border-gray-400');
        b.setAttribute('aria-selected', 'false');
      });

      // 2) 클릭된 버튼만 활성 스타일(티얼)로
      btn.classList.remove('text-gray-400', 'border-gray-400');
      btn.classList.add('text-teal-400', 'border-teal-400');
      btn.setAttribute('aria-selected', 'true');

      // 3) 모든 패널을 숨김(hidden)
      panels.forEach(panel => panel.classList.add('hidden'));

      // 4) 클릭된 버튼의 data-tabs-target 속성 값을 읽어서 해당 패널만 표시
      const targetSelector = btn.getAttribute('data-tabs-target'); // 예: "#abroad" or "#solo"
      document.querySelector(targetSelector).classList.remove('hidden');
    });
  });

  // **초기 실행**: 첫 번째(“국내여행”)만 보여주고 나머지는 숨김
  panels.forEach(panel => panel.classList.add('hidden'));
  document.querySelector('#domestic').classList.remove('hidden');
  // 첫 번째 버튼(국내여행)에 aria-selected, 색상 활성화 표시
  document.querySelector('#domestic-tab')
          .classList.remove('text-gray-400','border-gray-400');
  document.querySelector('#domestic-tab')
          .classList.add('text-teal-400','border-teal-400');
  document.querySelector('#domestic-tab')
          .setAttribute('aria-selected','true');
});


// ============================
// 정렬 탭(btn#sortTab) 클릭 시 스타일 토글
// ============================
document.querySelectorAll('#sortTab .sort-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('#sortTab .sort-btn').forEach(b => {
      b.classList.remove('font-semibold', 'text-gray-900');
      b.classList.add('text-gray-500');
    });
    this.classList.remove('text-gray-500');
    this.classList.add('font-semibold', 'text-gray-900');
    // (정렬 로직, renderCards 호출 등은 기존 코드 그대로)
  });
});

// … (renderCards, 요일별 탭 코드 등 기존 JS 유지) …
