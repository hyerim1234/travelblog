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
    el: '.swiper-pagination',
    clickable: true,

    // 기본 bullet 클래스 이름을 모두 내 스타일로 바꿔 버립니다.
    bulletClass: 'pagination-number',
    bulletActiveClass: 'pagination-number-active',

    // renderBullet는 now-className 인자로 받아오지만, 클래스 이름을 직접 안 써도 됩니다.
    renderBullet: (idx) => {
      const num = idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1);
      //return `<span class="pagination-number">${num}</span>`;
      //return `<span class="${className}">${num}</span>`;
    }
  },
  // ..

  // 반응형 슬라이드 개수 설정
  breakpoints: {
    1024: { slidesPerView: 5 },
    768: { slidesPerView: 3 },
    640: { slidesPerView: 2 },
    320: { slidesPerView: 1 },
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
    640: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    900: { slidesPerView: 3 },
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


//

// 정렬 탭 버튼 클릭 시 활성화 처리
document.querySelectorAll('#sortTab .sort-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    // 모든 정렬 버튼 비활성(기본색)
    document.querySelectorAll('#sortTab .sort-btn').forEach(b => {
      b.classList.remove('font-semibold', 'text-gray-900');
      b.classList.add('text-gray-500');
    });
    // 클릭된 버튼만 활성(진하게/검정)
    this.classList.remove('text-gray-500');
    this.classList.add('font-semibold', 'text-gray-900');
  });
});


// 1. 데이터 준비(더미)

const readyDays = ['thu', 'fri', 'sat', 'sun']; // 준비중 요일

const contentsData = {
  mon: [
    { title: '나는, 비둘기1', author: '부산우', category: '마흔에 읽는 그림책', img: 'img3.jpg', like: 15, support: 1, date: '2024-05-01' },
    { title: '나는, 비둘기2', author: '부산우', category: '마흔에 읽는 그림책', img: 'img4.jpg', like: 5, support: 3, date: '2024-04-01' },
    { title: '나는, 비둘기3', author: '부산우', category: '마흔에 읽는 그림책', img: 'img5.jpg', like: 25, support: 2, date: '2024-03-01' },
    { title: '나는, 비둘기4', author: '부산우', category: '마흔에 읽는 그림책', img: 'img6.jpg', like: 7, support: 4, date: '2024-02-01' },
  ],
  tue: [
    { title: '나는, 비둘기5', author: '부산우', category: '마흔에 읽는 그림책', img: 'img5.jpg', like: 30, support: 1, date: '2024-06-02' },
  ],
  wed: [
    { title: '나는, 비둘기1', author: '부산우', category: '마흔에 읽는 그림책', img: 'img3.jpg', like: 15, support: 1, date: '2024-05-01' },
    { title: '나는, 비둘기2', author: '부산우', category: '마흔에 읽는 그림책', img: 'img4.jpg', like: 5, support: 3, date: '2024-04-01' },
    { title: '나는, 비둘기3', author: '부산우', category: '마흔에 읽는 그림책', img: 'img5.jpg', like: 25, support: 2, date: '2024-03-01' },
    { title: '나는, 비둘기4', author: '부산우', category: '마흔에 읽는 그림책', img: 'img6.jpg', like: 7, support: 4, date: '2024-02-01' },
  ],
  // 나머지 요일은 생략 가능 (readyDays로 처리)
};

let currentDay = 'mon';    // 초기 탭(월요일)
let currentSort = 'latest'; // 초기 정렬

function renderCards(day, sortType) {
  // 모든 요일 숨김
  document.querySelectorAll('#day-tab-content > div[role="tabpanel"]').forEach(div => {
    div.classList.add('hidden');
  });
  const cardsArea = document.getElementById(day);
  if (!cardsArea) return;
  cardsArea.classList.remove('hidden');
  cardsArea.innerHTML = '';

  // 준비중 요일: 문구만
  if (readyDays.includes(day)) {
    cardsArea.innerHTML = `<p class="col-span-2 text-center text-gray-400">연재가 준비 중입니다.</p>`;
    return;
  }

  // 카드 출력
  let sorted = [...(contentsData[day] || [])];
  if (sortType === 'latest') {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === 'support') {
    sorted.sort((a, b) => b.support - a.support);
  } else if (sortType === 'like') {
    sorted.sort((a, b) => b.like - a.like);
  }

  sorted.forEach(item => {
    const html = `
      <div class="flex gap-4 bg-white !p-[20px] rounded shadow-sm w-full sm:w-[400px] md:w-[350px] h-26">
        <div class="flex-1">
          <p class="text-xs text-gray-400">${item.category}</p>
          <p class="font-medium text-gray-800 text-sm !my-2">${item.title}</p>
          <p class="text-xs text-gray-500 mt-1">by ${item.author}</p>
        </div>
        <img class="w-16 h-16 object-cover rounded" src="./../source/${item.img}" />
      </div>
    `;
    cardsArea.insertAdjacentHTML('beforeend', html);
  });
}

// 정렬 탭
document.querySelectorAll('#sortTab .sort-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('#sortTab .sort-btn').forEach(b => {
      b.classList.remove('font-semibold', 'text-gray-900');
      b.classList.add('text-gray-500');
    });
    this.classList.remove('text-gray-500');
    this.classList.add('font-semibold', 'text-gray-900');

    if (this.textContent.includes('최신')) currentSort = 'latest';
    else if (this.textContent.includes('응원')) currentSort = 'support';
    else currentSort = 'like';
    renderCards(currentDay, currentSort);
  });
});

// 요일 탭
document.querySelectorAll('[data-tabs-target]').forEach(btn => {
  btn.addEventListener('click', function () {
    currentDay = this.getAttribute('data-tabs-target').replace('#', '');
    renderCards(currentDay, currentSort);
  });
});

// 최초 실행
renderCards(currentDay, currentSort);
