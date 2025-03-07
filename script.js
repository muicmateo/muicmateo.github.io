document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  // Function to activate section and nav link
  function activateSection(id) {
      // Hide all sections
      sections.forEach(section => {
          section.classList.remove('active');
      });
      
      // Remove active class from all nav links
      navLinks.forEach(link => {
          link.classList.remove('active');
      });
      
      // Show the selected section
      document.querySelector(id).classList.add('active');
      
      // Add active class to the clicked nav link
      document.querySelector(`a[href="${id}"]`).classList.add('active');
  }
  
  // Add click event listeners to nav links
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          activateSection(targetId);
          
          // Smooth scroll to the section
          window.scrollTo({
              top: document.querySelector(targetId).offsetTop - 20,
              behavior: 'smooth'
          });
      });
  });
  
  // Contact form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = new FormData(this);
          const formValues = Object.fromEntries(formData.entries());
          
          // In a real application, you would send this data to a server
          console.log('Form submitted with values:', formValues);
          
          // Show success message (simulated)
          const submitBtn = contactForm.querySelector('.submit-btn');
          const originalText = submitBtn.textContent;
          
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.backgroundColor = '#28a745';
          submitBtn.disabled = true;
          
          // Reset the form and button after 3 seconds
          setTimeout(() => {
              contactForm.reset();
              submitBtn.textContent = originalText;
              submitBtn.style.backgroundColor = '';
              submitBtn.disabled = false;
          }, 3000);
      });
  }
  
  // Skill bars animation
  function animateSkillBars() {
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
              bar.style.width = width;
          }, 300);
      });
  }
  
  // Run animation when skills section becomes active
  document.querySelector('a[href="#skills"]').addEventListener('click', function() {
      setTimeout(animateSkillBars, 400);
  });
  
  // Add scroll event to highlight current section in navigation
  window.addEventListener('scroll', function() {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - 200) {
              current = '#' + section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === current) {
              link.classList.add('active');
          }
      });
  });
  
  // Initialize the page with the first section active
  activateSection('#about');
});