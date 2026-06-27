let overlay = null;

function closeLightbox() {
  if (!overlay) return;
  overlay.remove();
  overlay = null;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  if (e.key === 'Escape') closeLightbox();
}

document.addEventListener('click', e => {
  const img = e.target.closest('.ph img');
  if (!img) return;

  closeLightbox();

  overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.88);
    display: grid;
    place-items: center;
    z-index: 9999;
    padding: 20px;
    cursor: zoom-out;
  `;

  const big = document.createElement('img');
  big.src = img.src;
  big.alt = img.alt || '';
  big.style.cssText = `
    max-width: min(1200px, 96vw);
    max-height: 90vh;
    border-radius: 18px;
    box-shadow: 0 30px 90px rgba(0,0,0,.55);
    cursor: default;
  `;

  overlay.appendChild(big);
  overlay.addEventListener('click', closeLightbox);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);
});
function pickService(serviceName) {
  // Находим элемент формы (выпадающий список) по его тегу или классу
  const selectElement = document.querySelector('.form select');
  
  if (selectElement) {
    // Бежим по всем опциям списка
    for (let i = 0; i < selectElement.options.length; i++) {
      // Если текст опции содержит имя нашей услуги — выбираем её
      if (selectElement.options[i].text.includes(serviceName) || selectElement.options[i].value.includes(serviceName)) {
        selectElement.selectedIndex = i;
        break;
      }
    }
  }
  
  // Плавно скроллим клиента к блоку оформления заявки
  const formSection = document.querySelector('.form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}