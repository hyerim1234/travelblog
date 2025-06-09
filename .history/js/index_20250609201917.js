// 메인 슬라이더
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

      /* ◀ renderBullet 콜백 안에서 inline style을 강제로 준다. ▶ */
      renderBullet: function (idx, className) {
        // 숫자 포맷 (01, 02, …)
        const num = idx + 1 < 10 ? '0' + (idx + 1) : (idx + 1);

        /* 
          - style="background:transparent; width:auto; height:auto; …" 를 인라인으로 강제 지정 
          - 이렇게 하면 CSS 우선권에 상관없이 “원” 모양이 절대로 살아남지 않는다.
        */
        return `
          <span class="${className}"
                style="
                  background-color: transparent !important;
                  width: auto !important;
                  height: auto !important;
                  margin: 0 0.75rem !important;
                  padding: 0 !important;
                  color: ##4c4c4c !important;
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

  /* ◀ 혹시 renderBullet 으로 했는데도 남아 있는 원이 있다면,
       페이지네이션이 렌더된 직후에 한 번 더 숨겨준다. ▶ */
  firstswiper.on('paginationRender', function () {
    document.querySelectorAll('.swiper-pagination-bullet').forEach(bullet => {
      // 만약 ::before 가상요소가 붙어 있으면 강제로 제거
      bullet.style.setProperty('background', 'transparent', 'important');
      bullet.style.setProperty('border-radius', '0', 'important');
      bullet.style.setProperty('padding', '0', 'important');
      bullet.style.setProperty('margin', '0 0.75rem', 'important');
      // 혹시 가상요소가 살아있다면: bullet.innerText = bullet.innerText; (숫자만 남긴다)
      bullet.textContent = bullet.textContent.trim();
    });
  });
});


// 요일별 연재 : 요일 탭 기능 , 최신순,응원순,라이킷순 정렬 기능 

// --- 요일별 연재 --- 

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