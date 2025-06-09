// 여행작가 탭 기능 ( 국내 / 해외 / 혼자 )

 // 탭 버튼 및 패널 셀렉터
  const tabButtons = document.querySelectorAll('#travelTab button');
  const tabPanels = document.querySelectorAll('#travelTabContent > div[role="tabpanel"]');

  tabButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    // 1. 모든 버튼/패널 비활성화
    tabButtons.forEach(button => {
      button.classList.remove('text-teal-400', 'border-teal-400');
      button.classList.add('text-gray-400', 'border-gray-400');
      button.setAttribute('aria-selected', 'false'); 
    });
    tabPanels.forEach(panel => {
      panel.classList.add('hidden');
    });

    // 2. 클릭된 버튼만 활성화!
    this.classList.remove('text-gray-400', 'border-gray-400');
    this.classList.add('text-teal-400', 'border-teal-400');
    this.setAttribute('aria-selected', 'true'); 
    
    // 3. 연결된 패널만 보여주기
    const targetId = this.getAttribute('data-tabs-target');
    if (targetId) {
      const targetPanel = document.querySelector(targetId);
      if (targetPanel) targetPanel.classList.remove('hidden');
    }
  });
});