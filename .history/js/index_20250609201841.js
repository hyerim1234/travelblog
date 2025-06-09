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


// 요일별 연재 