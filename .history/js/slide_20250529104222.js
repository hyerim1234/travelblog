// slideContents: 서버나 상위 스코프에서 데이터를 받아옵니다.
import slideContents from './slideContentsData.js';

const slideDisplay  = document.getElementById('slideDisplay');
const slideArticles = slideDisplay.querySelector('.slideArticles');
const prevBtn       = document.getElementById('prevBtn');
const nextBtn       = document.getElementById('nextBtn');
const orderList     = document.getElementById('contentsOrder');

const slideSize         = 970;
const hiddenSlideLength = slideContents.length - 1; // 총 슬라이드 - 1
let slidePosition       = 0;
let activeBtn           = 0;

// 1) SlideContent 아이템 렌더링
slideContents.forEach((content, idx) => {
  const slide = document.createElement('div');
  slide.className = 'slideContent';
  slide.innerHTML = `
    <div class="articleImage" style="background-image:url('${content.image}')"></div>
    <div class="cover"></div>
    <div class="articleText">${content.text}</div>
    <div class="articleAuthor">by ${content.author}</div>
  `;
  slideArticles.append(slide);
});

// 2) 페이지네이션 생성
for (let i = 0; i < slideContents.length; i++) {
  const li = document.createElement('li');
  li.textContent = String(i+1).padStart(2,'0');
  if (i === 0) li.classList.add('active');
  li.dataset.index = i;
  orderList.append(li);
  li.addEventListener('click', () => {
    slidePosition = -slideSize * i;
    activeBtn     = i;
    update();
  });
}

// 3) 버튼 핸들러
prevBtn.addEventListener('click', () => {
  if (activeBtn > 0) {
    activeBtn--;
    slidePosition += slideSize;
    update();
  }
});
nextBtn.addEventListener('click', () => {
  if (activeBtn < hiddenSlideLength) {
    activeBtn++;
    slidePosition -= slideSize;
    update();
  }
});

// 4) UI 업데이트
function update() {
  slideArticles.parentElement.style.transform = `translateX(${slidePosition}px)`;

  // 버튼 토글
  prevBtn.classList.toggle('hidden', activeBtn === 0);
  nextBtn.classList.toggle('hidden', activeBtn === hiddenSlideLength);

  // 페이지네이션 토글
  orderList.querySelectorAll('li').forEach((li, idx) =>
    li.classList.toggle('active', idx === activeBtn)
  );
}

// 초기 렌더
update();
