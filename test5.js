document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-links button');
  const sections = document.querySelectorAll('.section');
  const backToTopButton = document.getElementById('backToTop');
  
//button
navButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Hapus semua class 'active' dari button dan section
    navButtons.forEach(btn => btn.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));

    // Tambahkan class 'active' ke tombol yang diklik
    this.classList.add('active');

    // Dapatkan target section dari data-target
    const target = this.getAttribute('data-target');
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});



  // Button click handlers with loading states
  const actionButtons = document.querySelectorAll('.card-options button');
  actionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const originalText = this.textContent;
      const card = this.closest('.card');
      const cardTitle = card.querySelector('h3').textContent;

      // Add loading state
      this.textContent = 'Loading...';
      this.classList.add('loading');
      card.style.pointerEvents = 'none';

      // Simulate API call
      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove('loading');
        card.style.pointerEvents = 'auto';

        const link = this.getAttribute('data-link');
        if (link) {
          window.open(link, '_blank'); // Buka link di tab baru
          return;
        }

        // Default fallback if no link
        console.log(`${originalText} clicked for ${cardTitle}`);
        alert(`No link set for ${cardTitle} - ${originalText}`);
      }, 1000);
    });
  });

  // Back to top functionality
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      navButtons.forEach(btn => btn.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));
      navButtons[0].classList.add('active');
      sections[0].classList.add('active');
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const activeButton = document.querySelector('.nav-links button.active');
      const currentIndex = Array.from(navButtons).indexOf(activeButton);
      let newIndex;

      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : navButtons.length - 1;
      } else {
        newIndex = currentIndex < navButtons.length - 1 ? currentIndex + 1 : 0;
      }

      navButtons[newIndex].click();
    }
  });

  // Animate stats on scroll
  const statsSection = document.querySelector('.stats-section');
  const statItems = document.querySelectorAll('.stat-item h4');

  const animateStats = () => {
    statItems.forEach(stat => {
      const finalValue = parseInt(stat.textContent.replace(/\D/g, ''));
      const suffix = stat.textContent.replace(/\d/g, '');
      let currentValue = 0;
      const increment = finalValue / 30;

      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          stat.textContent = finalValue + suffix;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(currentValue) + suffix;
        }
      }, 50);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  });

  if (statsSection) {
    observer.observe(statsSection);
  }
});
