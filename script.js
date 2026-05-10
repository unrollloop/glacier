// script.js for Glacier landing page

document.addEventListener('DOMContentLoaded', function() {
  // Form submission
  const form = document.getElementById('waitlistForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        storage_needed: formData.get('storage_needed'),
        timeline: formData.get('timeline')
      };

      try {
        const response = await fetch('/.netlify/functions/submitLead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Thank you for joining the waitlist! We\'ll be in touch soon.');
          form.reset();
        } else {
          alert('There was an error submitting your information. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting your information. Please try again.');
      }
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // Stagger animations for feature cards
  const featureCards = document.querySelectorAll('#features .glass');
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add hover effects to pricing cards
  const pricingCards = document.querySelectorAll('#pricing .glass');
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover-lift');
    });
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover-lift');
    });
  });

  // Parallax effect for hero background (subtle)
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('section:first-of-type');
    if (hero) {
      hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
  });
});