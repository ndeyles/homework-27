function initSlider({ sliderSelector, interval = 3000 }) {
    const slider = document.querySelector(sliderSelector);
    const slidesContainer = slider.querySelector('.slides');
    const slides = slidesContainer.children;
    const playPauseBtn = document.getElementById('playPause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const indicatorsContainer = document.getElementById('indicators');
  
    let index = 0;
    let isPlaying = true;
    let autoSlide = setInterval(nextSlide, interval);
  
    function showSlide(i) {
      index = (i + slides.length) % slides.length;
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
      updateIndicators();
    }
  
    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }
  
    function togglePlayPause() {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playPauseBtn.textContent = '⏸';
        autoSlide = setInterval(nextSlide, interval);
      } else {
        playPauseBtn.textContent = '▶';
        clearInterval(autoSlide);
      }
    }
  
    function updateIndicators() {
      Array.from(indicatorsContainer.children).forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }
  
    Array.from(slides).forEach((_, i) => {
      const btn = document.createElement('button');
      btn.addEventListener('click', () => showSlide(i));
      indicatorsContainer.appendChild(btn);
    });
  
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
  
    let startX = 0;
    slidesContainer.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    slidesContainer.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextSlide();
      if (endX - startX > 50) prevSlide();
    });
  
    showSlide(index);
  }
  
  initSlider({ sliderSelector: '#slider', interval: 3000 });
  