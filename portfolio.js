// Professional Portfolio JavaScript - written by student
// Enhanced with better interactivity and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Enhanced Responsive Navbar
    var navbar = document.querySelector('.main-navbar ul');
    var nav = document.querySelector('.main-navbar');
    
    // Create hamburger button with better styling
    var hamburger = nav.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        nav.insertBefore(hamburger, navbar);
    }
    
    // Smooth hamburger animation
    hamburger.addEventListener('click', function() {
        navbar.classList.toggle('nav-open');
        hamburger.classList.toggle('is-active');
         // Instead of toggling a class, explicitly toggle overflow-x on body
    if (navbar.classList.contains('nav-open')) {
        document.body.style.overflowX = 'hidden';  // Prevent horizontal scroll
    } else {
        document.body.style.overflowX = '';        // Restore default
    }
});
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navbar.classList.contains('nav-open')) {
            navbar.classList.remove('nav-open');
            hamburger.classList.remove('is-active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // 2. Enhanced Section Navigation with smooth transitions
    var sections = document.querySelectorAll('.portfolio-section');
    var navLinks = navbar.querySelectorAll('a');
    
    function showSection(hash) {
        sections.forEach(function(section) {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        
        var targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.remove('hidden-section');
            // Force reflow for smooth animation
            void targetSection.offsetWidth;
            targetSection.classList.add('active-section');
            
            // Add entrance animation
            targetSection.style.animation = 'slideIn 0.6s ease-out';
        }
    }
    
    // Enhanced navigation with smooth scrolling
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (this.hash) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(function(l) {
                    l.classList.remove('active-nav');
                });
                
                // Add active class to clicked link
                this.classList.add('active-nav');
                
                // Show section with delay for smooth transition
                setTimeout(function() {
                    showSection(this.hash);
                }.bind(this), 100);
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Show About section by default
    var defaultLink = nav.querySelector('a[href="#about"]');
    if (defaultLink) {
        defaultLink.classList.add('active-nav');
    }
    showSection('#about');
    
    // 3. Enhanced Form Validation with real-time feedback
    var form = document.querySelector('.feedback-form');
    if (form) {
        var inputs = form.querySelectorAll('input, textarea');
        
        // Real-time validation
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error on typing
                var error = this.parentNode.querySelector('.error-message');
                if (error) {
                    error.remove();
                }
                this.classList.remove('error');
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Remove existing errors
            form.querySelectorAll('.error-message').forEach(function(el) {
                el.remove();
            });
            
            var isValid = true;
            var name = form.querySelector('[name="name"]');
            var email = form.querySelector('[name="email"]');
            var message = form.querySelector('[name="message"]');
            
            // Enhanced validation
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, 'Name must be at least 2 characters');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter your feedback');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                var submitBtn = form.querySelector('button[type="submit"]');
                var originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(function() {
                    form.style.display = 'none';
                    var thankYou = document.createElement('div');
                    thankYou.className = 'thank-you-message';
                    thankYou.innerHTML = '<div class="success-content"><h3>Thank you for your feedback!</h3><p>Your message has been sent successfully. I appreciate your input and will get back to you soon.</p></div>';
                    form.parentNode.appendChild(thankYou);
                }, 1500);
            }
        });
    }
    
    function validateField(field) {
        var value = field.value.trim();
        var error = field.parentNode.querySelector('.error-message');
        
        if (error) {
            error.remove();
        }
        
        if (!value) {
            showError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function showError(input, message) {
        var error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.classList.add('error');
    }
    
    // 4. Enhanced Project Slider with indicators
    var projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        var projectCards = projectsSection.querySelectorAll('.project-card');
        var leftArrow = projectsSection.querySelector('.left-arrow');
        var rightArrow = projectsSection.querySelector('.right-arrow');
        var currentIndex = 0;
        var autoPlayInterval;
        
        // Create indicators
        var indicators = document.createElement('div');
        indicators.className = 'slider-indicators';
        for (var i = 0; i < projectCards.length; i++) {
            var indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.setAttribute('data-index', i);
            indicators.appendChild(indicator);
        }
        projectsSection.appendChild(indicators);
        
        function showProject(index) {
            // Hide all projects
            projectCards.forEach(function(card) {
                card.style.display = 'none';
                card.classList.remove('active-project');
            });
            
            // Update indicators
            var indicators = projectsSection.querySelectorAll('.indicator');
            indicators.forEach(function(indicator) {
                indicator.classList.remove('active');
            });
            
            // Show selected project
            if (projectCards[index]) {
                projectCards[index].style.display = 'block';
                projectCards[index].classList.add('active-project');
                indicators[index].classList.add('active');
            }
            
            currentIndex = index;
        }
        
        // Show first project
        showProject(0);
        
        // Arrow navigation
        if (leftArrow) {
            leftArrow.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
                showProject(currentIndex);
                resetAutoPlay();
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % projectCards.length;
                showProject(currentIndex);
                resetAutoPlay();
            });
        }
        
        // Indicator navigation
        var indicators = projectsSection.querySelectorAll('.indicator');
        indicators.forEach(function(indicator) {
            indicator.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                showProject(index);
                resetAutoPlay();
            });
        });
        
        // Auto-play functionality
        function startAutoPlay() {
            autoPlayInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % projectCards.length;
                showProject(currentIndex);
            }, 5000);
        }
        
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause on hover
        projectsSection.addEventListener('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });
        
        projectsSection.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
        
        // Keyboard navigation
        projectsSection.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                leftArrow.click();
            } else if (e.key === 'ArrowRight') {
                rightArrow.click();
            }
        });
        
        // Touch/swipe support
        var startX = null;
        projectsSection.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        projectsSection.addEventListener('touchend', function(e) {
            if (startX === null) return;
            var endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) {
                leftArrow.click();
            } else if (startX - endX > 50) {
                rightArrow.click();
            }
            startX = null;
        });
    }
    
    // 5. Enhanced Welcome Modal
    if (!localStorage.getItem('welcomeShown')) {
        setTimeout(function() {
            var modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = '<div class="modal-content"><button class="modal-close" aria-label="Close modal">&times;</button><div class="modal-header"><h2>Welcome to My Portfolio!</h2></div><div class="modal-body"><p>Thanks for visiting! Explore my projects, skills, and experience. Use the navigation menu to get started.</p><div class="modal-features"><div class="feature"><span class="feature-icon">🎯</span><span>Interactive Navigation</span></div><div class="feature"><span class="feature-icon">📱</span><span>Responsive Design</span></div><div class="feature"><span class="feature-icon">💬</span><span>Leave Feedback</span></div></div></div></div>';
            
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(function() {
                modal.classList.add('modal-show');
            }, 100);
            
            // Close modal functionality
            var closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('modal-show');
                setTimeout(function() {
                    modal.remove();
                }, 400);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('modal-show');
                    setTimeout(function() {
                        modal.remove();
                    }, 400);
                }
            });
            
            localStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
    
    // 6. Dark Mode Toggle
    var darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            var isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('darkMode', isDark);
        });
        
        // Set initial state
        var darkPref = localStorage.getItem('darkMode') === 'true';
        if (darkPref) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }
    }
    
    // 7. Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 8. Loading animation for sections
    function addLoadingAnimation() {
        var sections = document.querySelectorAll('.portfolio-section');
        sections.forEach(function(section, index) {
            section.style.animationDelay = (index * 0.1) + 's';
        });
    }
    
    // Initialize loading animation
    addLoadingAnimation();
    
    // 9. Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        var navLinks = Array.from(navLinks);
        var active = navLinks.findIndex(function(link) {
            return link.classList.contains('active-nav');
        });
        
        if (e.key === 'ArrowRight') {
            var next = (active + 1) % navLinks.length;
            navLinks[next].focus();
        } else if (e.key === 'ArrowLeft') {
            var prev = (active - 1 + navLinks.length) % navLinks.length;
            navLinks[prev].focus();
        }
    });
    
    // 10. Scroll to top button
    var scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
});

