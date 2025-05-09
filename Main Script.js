document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      document.querySelectorAll(".news-card").forEach(card => {
        card.style.display = (category === "all" || card.classList.contains(category)) ? "block" : "none";
      });
    });
  });

    // Custom Cursor Glow
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow) {
      document.addEventListener("mousemove", e => {
        cursorGlow.style.opacity = '0.7';
        cursorGlow.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
      });

      document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = '0';
      });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    function updateDarkModeButton(isDark) {
      if (isDark) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
      }
    }

    if (localStorage.getItem('darkMode') === 'true' || (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark').matches)) {
      document.documentElement.classList.add('dark');
      updateDarkModeButton(true);
    }

    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('darkMode', isDark);
      updateDarkModeButton(isDark);
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Floating Labels
    const floatingLabels = document.querySelectorAll('.relative input, .relative textarea');
    floatingLabels.forEach(input => {
      const label = input.nextElementSibling;
      input.addEventListener('focus', () => {
        label.classList.add('floating-label-active');
      });
      input.addEventListener('blur', () => {
        if (!input.value) label.classList.remove('floating-label-active');
      });
      if (input.value) label.classList.add('floating-label-active');
    });


    // GSAP Scroll Animations
    function initGSAPAnimations() {
      gsap.utils.toArray('.animate').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

    // Tilt Effect for Cards
    function initTiltEffects() {
      VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        max: 5,
        speed: 300,
        glare: true,
        'max-glare': 0.1,
        scale: 1.02
      });
    }

    // Three.js Particle Background for Welcome Screen
    function initWelcomeParticles() {
      const container = document.getElementById('heroParticles');
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0.6 });

      const particles = [];
      for (let i = 0; i < 100; i++) {
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
        scene.add(sphere);
        particles.push(sphere);
      }

      camera.position.z = 5;

      function animateThreeJS() {
        requestAnimationFrame(animateThreeJS);
        particles.forEach(p => {
          p.position.y -= 0.01;
          if (p.position.y < -10) p.position.y = 10;
        });
        renderer.render(scene, camera);
      }

      animateThreeJS();
    }

    // Loader Logic
    document.addEventListener("DOMContentLoaded", () => {
      const welcomeScreen = document.getElementById("welcomeScreen");
      const skeletonLoader = document.getElementById("skeletonLoader");
      const mainContent = document.getElementById("mainContent");

      setTimeout(() => {
        welcomeScreen.style.opacity = 0;
        welcomeScreen.style.visibility = "hidden";
        skeletonLoader.classList.remove("hidden");
        setTimeout(() => {
          skeletonLoader.style.opacity = 0;
          skeletonLoader.style.visibility = "hidden";
          mainContent.classList.remove("hidden");
          initTypedText();
          initGSAPAnimations();
          initTiltEffects();
        }, 2000);
      }, 4000);
    });

    // Init Functions
    function initTypedText() {
      const typedElement = document.getElementById("typedText");
    
      if (!typedElement) {
        console.warn("Typed.js element (#typedText) not found in DOM.");
        return;
      }
    
      // Optional: Add gradient text styling dynamically
      typedElement.classList.add(
        "text-transparent",
        "bg-clip-text",
        "bg-gradient-to-r",
        "from-white",
        "to-gray-300"
      );
    
      new Typed("#typedText", {
        strings: [
          "A Legacy of Excellence",
          "Inspiring Young Minds Since 19XX",
          "Where Learning Meets Innovation"
        ],
        typeSpeed: 50,        // Slower and smoother typing
        backSpeed: 20,        // Smooth backspacing
        backDelay: 1800,      // Slight pause before backspace
        startDelay: 600,      // Delay before first string starts
        loop: true,
        showCursor: true,
        cursorChar: "<span class='cursor-blink'>|</span>",
        autoInsertCss: false, // We'll define custom cursor
        fadeOut: true,
        fadeOutClass: "typed-fade-out",
        fadeOutDelay: 400
      });
    }
    function initGSAPAnimations() {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.glassmorphism, .tilt-effect').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

    function initTiltEffects() {
      VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        max: 5,
        speed: 300,
        glare: true,
        'max-glare': 0.1,
        scale: 1.02
      });
    }

    // Handle Script Errors
    function handleScriptError(event) {
      console.error("Script failed to load:", event.target.src);
      alert("A critical script failed to load. Please check your internet connection.");
    }

    // Initialize Welcome Particles
    function initWelcomeParticles() {
      const container = document.getElementById("particles-js");
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0.6 });

      const particles = [];
      for (let i = 0; i < 100; i++) {
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
        scene.add(sphere);
        particles.push(sphere);
      }

      camera.position.z = 5;

      function animateWelcomeJS() {
        requestAnimationFrame(animateWelcomeJS);
        particles.forEach(p => {
          p.position.y -= 0.01;
          if (p.position.y < -10) p.position.y = 10;
        });
        renderer.render(scene, camera);
      }

      animateWelcomeJS();

      window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
    }
    document.getElementById('enterButton').addEventListener('click', function() {
      const welcomeScreen = document.getElementById('welcomeScreen');
      welcomeScreen.style.opacity = '0';
      setTimeout(() => {
        welcomeScreen.style.display = 'none';
      }, 1000);
    });
        // Create floating particles
        document.addEventListener('DOMContentLoaded', function() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation timing
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Different animation duration for each particle
        const animationDuration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
      }
      
      // Simulate loading completion after 6 seconds
      setTimeout(() => {
        const loader = document.getElementById('skeletonLoader');
        loader.style.opacity = 0;
        loader.style.transition = 'opacity 1s ease';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 1000);
      }, 6000);
    });

    // On DOM Load
    document.addEventListener("DOMContentLoaded", () => {
      initWelcomeParticles();
      initTypedText();
      initGSAPAnimations();
      initTiltEffects();
    });
const button = $0.parentElement;
const htmlElement = document.documentElement;

// Store the original click handler if it exists (this is a simplified approach)
const originalOnClick = button.onclick;

// Add a new click event listener
button.onclick = function() {
  htmlElement.classList.toggle('dark');
  // If there was an original click handler, call it after ours
  if (originalOnClick) {
    originalOnClick.apply(this, arguments);
  }
};

const data = {
  message: "Temporarily attached a click handler to the button to toggle the 'dark' class on the <html> element."
};
gsap.from("#typedText", {
  opacity: 0,
  y: -20,
  duration: 1.2,
  ease: "power3.out"
});