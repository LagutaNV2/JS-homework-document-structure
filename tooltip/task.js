document.addEventListener('click', (event) => {

  const activeTooltp = document.querySelector('.tooltip_active');
  if (activeTooltp) {activeTooltp.remove()};

  const target = event.target;
  if (target.classList.contains('has-tooltip')) {
    event.preventDefault();

    // Создаем подсказку
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip tooltip_active';
    tooltipElement.textContent = target.title;
    tooltipElement.style.position = 'absolute';

    // Выбираем случайную позицию
    const positions = ['top', 'right', 'bottom', 'left'];
    const randomPosition = positions[Math.floor(Math.random() * 4)];

    // Получаем размеры и положение элемента
    const rect = target.getBoundingClientRect();

    // Позиционируем подсказку в зависимости от случайной позиции
    switch (randomPosition) {
      case 'top':
        target.insertAdjacentElement('beforebegin', tooltipElement);
        // tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = `${rect.left}px`;
        tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight}px`;
        break;
      case 'right':
        target.insertAdjacentElement('afterend', tooltipElement);
        // tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = `${rect.right}px`;
        tooltipElement.style.top = `${rect.top}px`;
        break;
      case 'bottom':
        target.insertAdjacentElement('afterend', tooltipElement);
        // tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = `${rect.left}px`;
        tooltipElement.style.top = `${rect.bottom}px`;
        break;
      case 'left':
        target.insertAdjacentElement('beforebegin', tooltipElement);
        // tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = `${rect.left - tooltipElement.offsetWidth}px`;
        tooltipElement.style.top = `${rect.top}px`;
        break;
    }
  }
});