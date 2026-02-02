// ========== THEME TOGGLE (Dark/Light Mode) ==========
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference or default to dark
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Update the icon based on current theme
function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Show toast notification
    showToast(`Switched to ${newTheme} mode`, 'success');
}

// Initialize theme on page load
initTheme();

// Add click event listener
themeToggle?.addEventListener('click', toggleTheme);

// ========== TYPEWRITER ANIMATION ==========
const typewriterElement = document.getElementById('typewriter-text');

const typewriterTexts = [
    "Full Stack Web Developer",
    "MERN Stack Developer",
    "React.js Enthusiast",
    "Problem Solver",
    "Code Craftsman"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout;

const typingSpeed = 100;      // Speed of typing (ms per character)
const deletingSpeed = 50;     // Speed of deleting (ms per character)
const pauseAfterTyping = 2000; // Pause after completing a word (ms)
const pauseAfterDeleting = 500; // Pause after deleting before next word (ms)

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (!typewriterElement) return;
    
    if (isDeleting) {
        // Deleting characters
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typewriterTexts.length;
            typewriterTimeout = setTimeout(typeWriter, pauseAfterDeleting);
            return;
        }
        
        typewriterTimeout = setTimeout(typeWriter, deletingSpeed);
    } else {
        // Typing characters
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            typewriterTimeout = setTimeout(typeWriter, pauseAfterTyping);
            return;
        }
        
        typewriterTimeout = setTimeout(typeWriter, typingSpeed);
    }
}

// Start typewriter animation after page load
document.addEventListener('DOMContentLoaded', function() {
    // Delay start to let hero animation complete
    setTimeout(typeWriter, 1500);
});

// ---- NAV Hamburger Toggle ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ---- Scroll: Hide/Show Navbar ----
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 70) {
        navbar.style.top = '-80px';
    } else {
        navbar.style.top = '0';
    }
    lastScroll = currentScroll;
    
    // Update active nav link on scroll
    updateActiveNavLink();
});

// ---- Active Nav Link Highlighting ----
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset for navbar height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ---- Smooth Scroll & Close Mobile Menu ----
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Close hamburger menu on mobile
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Smooth scroll to section
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---- Back to Top Btn ----
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- Animated Range Sliders ----
document.querySelectorAll('input[type="range"].form-range').forEach(range => {
    const bubble = range.parentElement.querySelector('.range-bubble');
    function setVars() {
        const val = Number(range.value);
        const min = Number(range.min) || 0;
        const max = Number(range.max) || 100;
        // Animate the fill left of thumb
        const pct = ((val - min) / (max - min)) * 100;
        range.style.setProperty('--progress', pct + '%');
        if (bubble) {
            bubble.innerText = val + '%';
            const sliderWidth = range.offsetWidth;
            const left = (pct / 100) * sliderWidth;
            bubble.style.left = `calc(${left}px)`;
        }
    }
    setVars();
    range.addEventListener('input', setVars);
    window.addEventListener('resize', setVars);
});

const buttons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        projects.forEach(project => {
            if (filter === 'all' || project.classList.contains(filter)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
    
});

// Resume Upload Functionality
let selectedFile = null;
const ADMIN_PASSCODE = '1234'; // Change this to your own passcode

function toggleAdminPanel() {
    const panel = document.getElementById('resume-upload-panel');
    panel.classList.toggle('active');
    
    // Toggle body class to hide scroll indicator
    if (panel.classList.contains('active')) {
        document.body.classList.add('upload-panel-open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
        document.body.classList.remove('upload-panel-open');
        document.body.style.overflow = '';
    }
}

// Initialize upload functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing resume functionality...');
    
    // Load saved resume immediately when DOM is ready
    loadSavedResume();
    
    const uploadArea = document.getElementById('upload-area');
    const resumeInput = document.getElementById('resume-input');
    const uploadBtn = document.getElementById('upload-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const adminToggleBtn = document.getElementById('admin-toggle-btn');
    const restoreBtn = document.getElementById('restore-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');
    const resumeIframe = document.getElementById('resume-iframe');

    // Resume button - open modal instead of new tab
    resumeBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get resume URL
        let resumeUrl = getResumeUrl();
        
        if (resumeUrl) {
            resumeIframe.src = resumeUrl;
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            alert('No resume available. Please upload one.');
        }
    });

    // Close modal
    resumeModalClose?.addEventListener('click', closeResumeModal);
    
    // Close modal on background click
    resumeModal?.addEventListener('click', function(e) {
        if (e.target === resumeModal) {
            closeResumeModal();
        }
    });

    // Close upload panel on background click
    const uploadPanel = document.getElementById('resume-upload-panel');
    uploadPanel?.addEventListener('click', function(e) {
        if (e.target === uploadPanel) {
            toggleAdminPanel();
            resetUpload();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (resumeModal?.classList.contains('active')) {
                closeResumeModal();
            }
            if (uploadPanel?.classList.contains('active')) {
                toggleAdminPanel();
                resetUpload();
            }
        }
    });

    function closeResumeModal() {
        resumeModal.classList.remove('active');
        resumeIframe.src = '';
        document.body.style.overflow = ''; // Restore scroll
    }

    // Admin toggle button - direct access (no passcode)
    adminToggleBtn?.addEventListener('click', () => {
        const panel = document.getElementById('resume-upload-panel');
        
        if (panel.classList.contains('active')) {
            // If panel is open, just close it
            toggleAdminPanel();
        } else {
            // Open panel directly
            toggleAdminPanel();
            // Show restore button if custom resume exists
            const savedResume = localStorage.getItem('uploadedResume');
            if (restoreBtn) {
                restoreBtn.style.display = savedResume ? 'inline-flex' : 'none';
            }
        }
    });

    // Restore button click
    restoreBtn?.addEventListener('click', restoreOriginalResume);

    // Click to upload
    uploadArea?.addEventListener('click', () => {
        resumeInput.click();
    });

    // File selection
    resumeInput?.addEventListener('change', handleFileSelect);

    // Drag and drop events
    uploadArea?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea?.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Upload button
    uploadBtn?.addEventListener('click', uploadResume);

    // Cancel button
    cancelBtn?.addEventListener('click', () => {
        resetUpload();
        toggleAdminPanel();
    });
});

function getResumeUrl() {
    try {
        const savedResumeData = localStorage.getItem('uploadedResume');
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            if (resumeData.data) {
                return resumeData.data;
            }
        }
    } catch (error) {
        console.error('Error getting resume URL:', error);
    }
    // Return original resume path
    return './image/first resume.pdf';
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    handleFile(file);
}

function handleFile(file) {
    if (!file) return;

    // Validate file type - PDF only for better browser preview
    if (file.type !== 'application/pdf') {
        showStatus('Please select a PDF file for best viewing experience.', 'error');
        return;
    }

    // Validate file size (5MB max for base64 storage)
    if (file.size > 5 * 1024 * 1024) {
        showStatus('File size must be less than 5MB.', 'error');
        return;
    }

    selectedFile = file;
    document.getElementById('upload-btn').disabled = false;
    
    // Update upload area display
    const uploadContent = document.querySelector('.upload-content');
    uploadContent.innerHTML = `
        <i class="fas fa-file-pdf"></i>
        <p><strong>${file.name}</strong></p>
        <span class="file-types">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
    `;
    
    showStatus('File selected! Click "Replace Resume" to update.', 'success');
}

function uploadResume() {
    if (!selectedFile) return;

    showStatus('Uploading resume...', 'uploading');
    
    // Convert file to base64 for permanent storage
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const base64Data = e.target.result;
            const fileData = {
                name: selectedFile.name,
                data: base64Data,
                type: selectedFile.type,
                size: selectedFile.size,
                uploadDate: new Date().toISOString()
            };
            
            // Store in localStorage
            localStorage.setItem('uploadedResume', JSON.stringify(fileData));
            console.log('✅ Resume saved to localStorage');
            
            showStatus('✅ Resume updated successfully!', 'success');
            
            setTimeout(() => {
                resetUpload();
                toggleAdminPanel();
            }, 1500);
            
        } catch (error) {
            console.error('Upload error:', error);
            showStatus('Upload failed. File might be too large.', 'error');
        }
    };
    
    reader.onerror = function() {
        showStatus('Failed to read file. Please try again.', 'error');
    };
    
    reader.readAsDataURL(selectedFile);
}

function resetUpload() {
    selectedFile = null;
    const resumeInput = document.getElementById('resume-input');
    const uploadBtn = document.getElementById('upload-btn');
    
    if (resumeInput) resumeInput.value = '';
    if (uploadBtn) uploadBtn.disabled = true;
    
    const uploadContent = document.querySelector('.upload-content');
    if (uploadContent) {
        uploadContent.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Click to upload new resume or drag and drop</p>
            <span class="file-types">PDF, DOC, DOCX (Max 5MB)</span>
        `;
    }
    hideStatus();
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('upload-status');
    if (statusDiv) {
        statusDiv.className = `upload-status ${type}`;
        statusDiv.innerHTML = `<i class="fas fa-${getStatusIcon(type)}"></i> ${message}`;
    }
}

function hideStatus() {
    const statusDiv = document.getElementById('upload-status');
    if (statusDiv) {
        statusDiv.className = 'upload-status';
        statusDiv.innerHTML = '';
    }
}

function getStatusIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'uploading': return 'spinner fa-spin';
        default: return 'info-circle';
    }
}

// Load saved resume on page load
window.addEventListener('load', () => {
    console.log('Window loaded, checking saved resume...');
    loadSavedResume();
});

function loadSavedResume() {
    try {
        const savedResumeData = localStorage.getItem('uploadedResume');
        console.log('Saved resume check:', savedResumeData ? 'Found custom resume' : 'Using original');
        return !!savedResumeData;
    } catch (error) {
        console.error('Error checking saved resume:', error);
        return false;
    }
}

function restoreOriginalResume() {
    if (confirm('Are you sure you want to restore the original resume? This will delete your uploaded resume.')) {
        localStorage.removeItem('uploadedResume');
        showStatus('✅ Original resume restored!', 'success');
        
        // Hide restore button
        const restoreBtn = document.getElementById('restore-btn');
        if (restoreBtn) {
            restoreBtn.style.display = 'none';
        }
        
        setTimeout(() => {
            toggleAdminPanel();
        }, 1500);
    }
}

// Add Skill Functionality
function toggleAddSkillPanel() {
    const panel = document.getElementById('add-skill-panel');
    panel.classList.toggle('active');
}

// Initialize add skill functionality
document.addEventListener('DOMContentLoaded', function() {
    const addSkillBtn = document.getElementById('add-skill-btn');
    const cancelSkillBtn = document.getElementById('cancel-skill-btn');
    const skillForm = document.getElementById('skill-form');
    const skillCategorySelect = document.getElementById('skill-category-select');
    const newCategoryGroup = document.getElementById('new-category-group');
    const skillLevelInput = document.getElementById('skill-level');
    const skillLevelDisplay = document.getElementById('skill-level-display');

    // Add skill button click
    addSkillBtn?.addEventListener('click', toggleAddSkillPanel);

    // Cancel button click
    cancelSkillBtn?.addEventListener('click', () => {
        resetSkillForm();
        toggleAddSkillPanel();
    });

    // Form submission
    skillForm?.addEventListener('submit', handleSkillSubmission);

    // Category selection change
    skillCategorySelect?.addEventListener('change', function() {
        if (this.value === 'new') {
            newCategoryGroup.style.display = 'block';
        } else {
            newCategoryGroup.style.display = 'none';
        }
    });

    // Skill level slider update
    skillLevelInput?.addEventListener('input', function() {
        skillLevelDisplay.textContent = this.value + '%';
    });
});

function handleSkillSubmission(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('skill-name').value.trim(),
        category: document.getElementById('skill-category-select').value,
        newCategory: document.getElementById('new-category').value.trim(),
        level: document.getElementById('skill-level').value
    };

    // Validation
    if (!formData.name) {
        showSkillStatus('Please enter a skill name.', 'error');
        return;
    }

    if (!formData.category) {
        showSkillStatus('Please select a category.', 'error');
        return;
    }

    if (formData.category === 'new' && !formData.newCategory) {
        showSkillStatus('Please enter a new category name.', 'error');
        return;
    }

    showSkillStatus('Adding skill...', 'uploading');
    
    setTimeout(() => {
        addSkillToCategory(formData);
        showSkillStatus('✅ Skill added successfully!', 'success');
        
        setTimeout(() => {
            resetSkillForm();
            toggleAddSkillPanel();
        }, 2000);
    }, 1000);
}

function addSkillToCategory(data) {
    const categoryName = data.category === 'new' ? data.newCategory : data.category;
    let skillCategory = findOrCreateSkillCategory(categoryName);
    
    // Create new skill element with ID if from storage
    const skillElement = createSkillElement(data.name, data.level, data.id || null);
    
    // Add to category
    const skillItems = skillCategory.querySelector('.skill-items');
    skillItems.appendChild(skillElement);
    
    // Save to localStorage only if not already from storage
    if (!data.fromStorage) {
        const skillId = skillElement.dataset.skillId;
        saveSkillToStorage({
            name: data.name,
            category: categoryName,
            level: data.level,
            id: skillId
        });
    }
}

function findOrCreateSkillCategory(categoryName) {
    const skillsGrid = document.querySelector('.skills-grid');
    
    // Check if category already exists
    const existingCategory = Array.from(skillsGrid.children).find(category => {
        const title = category.querySelector('.category-title');
        return title && title.textContent.trim() === categoryName;
    });
    
    if (existingCategory) {
        return existingCategory;
    }
    
    // Create new category
    const newCategory = document.createElement('div');
    newCategory.className = 'skill-category';
    newCategory.innerHTML = `
        <h3 class="category-title">${categoryName}</h3>
        <div class="skill-items"></div>
    `;
    
    skillsGrid.appendChild(newCategory);
    return newCategory;
}

function createSkillElement(skillName, skillLevel, skillId = null) {
    const skillContainer = document.createElement('div');
    skillContainer.className = 'user-skill';
    
    const id = skillId || `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    skillContainer.innerHTML = `
        <div class="skill-controls">
            <button class="skill-edit-btn" onclick="editSkill('${id}')" title="Edit Skill">
                <i class="fas fa-edit"></i>
            </button>
            <button class="skill-delete-btn" onclick="deleteSkill('${id}')" title="Delete Skill">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="skill-item-row">
            <span class="skill-name">${skillName}</span>
            <span class="skill-percent">${skillLevel}%</span>
        </div>
        <div class="skill-progress-bar">
            <div class="skill-progress" data-level="${skillLevel}" style="width: ${skillLevel}%;"></div>
        </div>
    `;
    
    skillContainer.dataset.skillId = id;
    skillContainer.dataset.skillName = skillName;
    skillContainer.dataset.skillLevel = skillLevel;
    return skillContainer;
}

function deleteSkill(skillId) {
    if (confirm('Are you sure you want to delete this skill?')) {
        // Remove from DOM
        const skillElement = document.querySelector(`[data-skill-id="${skillId}"]`);
        if (skillElement) {
            skillElement.remove();
        }
        
        // Remove from localStorage
        let savedSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
        savedSkills = savedSkills.filter(skill => skill.id !== skillId);
        localStorage.setItem('userSkills', JSON.stringify(savedSkills));
        
        showSkillStatus('✅ Skill deleted successfully!', 'success');
        
        setTimeout(() => {
            hideSkillStatus();
        }, 3000);
    }
}

function editSkill(skillId) {
    const skillElement = document.querySelector(`[data-skill-id="${skillId}"]`);
    if (!skillElement) return;
    
    const currentName = skillElement.dataset.skillName;
    const currentLevel = skillElement.dataset.skillLevel;
    
    const newName = prompt('Enter skill name:', currentName);
    if (newName === null) return;
    
    const newLevel = prompt('Enter skill level (0-100):', currentLevel);
    if (newLevel === null) return;
    
    const level = Math.min(100, Math.max(0, parseInt(newLevel) || 0));
    
    // Update DOM
    skillElement.querySelector('.skill-name').textContent = newName;
    skillElement.querySelector('.skill-percent').textContent = `${level}%`;
    const progressBar = skillElement.querySelector('.skill-progress');
    progressBar.style.width = `${level}%`;
    progressBar.dataset.level = level;
    skillElement.dataset.skillName = newName;
    skillElement.dataset.skillLevel = level;
    
    // Update localStorage
    let savedSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
    const skillIndex = savedSkills.findIndex(skill => skill.id === skillId);
    if (skillIndex !== -1) {
        savedSkills[skillIndex].name = newName;
        savedSkills[skillIndex].level = level;
        localStorage.setItem('userSkills', JSON.stringify(savedSkills));
    }
    
    showSkillStatus('✅ Skill updated successfully!', 'success');
    setTimeout(() => {
        hideSkillStatus();
    }, 3000);
}

function saveSkillToStorage(skill) {
    let savedSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
    savedSkills.push(skill);
    localStorage.setItem('userSkills', JSON.stringify(savedSkills));
}

function loadSavedSkills() {
    const savedSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
    savedSkills.forEach(skill => {
        addSkillToCategory({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            id: skill.id,
            fromStorage: true
        });
    });
}

function resetSkillForm() {
    document.getElementById('skill-form').reset();
    document.getElementById('new-category-group').style.display = 'none';
    document.getElementById('skill-level-display').textContent = '50%';
    hideSkillStatus();
}

function showSkillStatus(message, type) {
    const statusDiv = document.getElementById('skill-status');
    if (statusDiv) {
        statusDiv.className = `skill-status ${type}`;
        statusDiv.innerHTML = `<i class="fas fa-${getStatusIcon(type)}"></i> ${message}`;
    }
}

function hideSkillStatus() {
    const statusDiv = document.getElementById('skill-status');
    if (statusDiv) {
        statusDiv.className = 'skill-status';
        statusDiv.innerHTML = '';
    }
}

// Load saved skills when page loads
window.addEventListener('load', loadSavedSkills);

// Debug function to check localStorage
function debugResumeStorage() {
    const stored = localStorage.getItem('uploadedResume');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            console.log('📋 Resume in localStorage:', {
                name: data.name,
                type: data.type,
                size: data.size,
                uploadDate: data.uploadDate,
                dataLength: data.data ? data.data.length : 0
            });
        } catch (e) {
            console.error('❌ Error parsing stored resume data:', e);
        }
    } else {
        console.log('📋 No resume data in localStorage');
    }
}

// Call debug function on page load
window.addEventListener('load', () => {
    setTimeout(debugResumeStorage, 200);
    initializeAnimations();
});

// Animation system for scroll-triggered animations
function initializeAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger child animations with stagger effect
                const children = entry.target.querySelectorAll('.skill-category, .about-stat');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animationDelay = `${index * 0.1}s`;
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const animatedSections = document.querySelectorAll('.about, .skills');
    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // Add enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'bounce 0.6s ease';
        });
        
        btn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                btn.style.animation = '';
            }, 600);
        });

        // Add ripple effect on click
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            btn.style.position = 'relative';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple animation
    const rippleCSS = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = rippleCSS;
        document.head.appendChild(style);
    }

    // Smooth scroll with animation for nav links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('🎨 Animations initialized successfully!');
}

function restoreOriginalResume() {
    if (confirm('Are you sure you want to restore the original resume? This will delete your custom resume.')) {
        // Clear stored resume data
        localStorage.removeItem('uploadedResume');
        
        // Reset resume button to original
        const resumeBtn = document.getElementById('resume-btn');
        if (resumeBtn) {
            resumeBtn.href = './image/first resume.pdf';
            resumeBtn.removeAttribute('download'); // Don't download, just view
            resumeBtn.target = '_blank'; // Open in new tab
            
            // Reset button text
            const resumeText = resumeBtn.querySelector('i').nextSibling;
            if (resumeText) {
                resumeText.textContent = ' View Resume';
            }
        }
        
        // Hide restore button
        const restoreBtn = document.getElementById('restore-btn');
        if (restoreBtn) {
            restoreBtn.style.display = 'none';
        }
        
        showStatus('✅ Original resume restored successfully!', 'success');
        
        setTimeout(() => {
            resetUpload();
            toggleAdminPanel();
        }, 2000);
    }
}

// ---- Project Search Functionality ----
document.addEventListener('DOMContentLoaded', function() {
    const projectSearch = document.getElementById('project-search');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projectSearch && projectsGrid) {
        projectSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const projectCards = projectsGrid.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = (card.dataset.title || '').toLowerCase();
                const tags = (card.dataset.tags || '').toLowerCase();
                const projectTitle = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
                const projectDescription = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
                
                const matches = title.includes(searchTerm) || 
                               tags.includes(searchTerm) || 
                               projectTitle.includes(searchTerm) ||
                               projectDescription.includes(searchTerm);
                
                card.style.display = matches ? 'block' : 'none';
            });
        });
    }
    
    // Update footer year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});

// ---- Toast Notification ----
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ---- Contact Form with EmailJS ----
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS - Replace with your public key
    // Sign up at https://www.emailjs.com/ to get your keys
    // emailjs.init('YOUR_PUBLIC_KEY');
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Check if EmailJS is initialized
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                // Replace with your EmailJS service ID and template ID
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message
                };
                
                // Uncomment and configure when EmailJS is set up:
                /*
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function() {
                        showToast('Message sent successfully!', 'success');
                        contactForm.reset();
                    }, function(error) {
                        showToast('Failed to send message. Please try again.', 'error');
                        console.error('EmailJS error:', error);
                    });
                */
                
                // For now, show success message (demo mode)
                showToast('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                // Demo mode without EmailJS
                showToast('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            }
        });
    }
});

// ---- Add Project Functionality ----
let projectImageData = null;

function toggleAddProjectPanel() {
    const panel = document.getElementById('add-project-panel');
    panel.classList.toggle('active');
    
    if (!panel.classList.contains('active')) {
        resetProjectForm();
    }
}

function resetProjectForm() {
    const titleInput = document.getElementById('project-title-input');
    const descInput = document.getElementById('project-description-input');
    const categoryInput = document.getElementById('project-category-input');
    const tagsInput = document.getElementById('project-tags-input');
    const demoInput = document.getElementById('project-demo-input');
    const githubInput = document.getElementById('project-github-input');
    const preview = document.getElementById('project-image-preview');
    const status = document.getElementById('project-status');
    
    if (titleInput) titleInput.value = '';
    if (descInput) descInput.value = '';
    if (categoryInput) categoryInput.value = 'fullstack';
    if (tagsInput) tagsInput.value = '';
    if (demoInput) demoInput.value = '';
    if (githubInput) githubInput.value = '';
    if (preview) preview.innerHTML = '';
    projectImageData = null;
    
    if (status) {
        status.className = 'project-status';
        status.textContent = '';
    }
}

function showProjectStatus(message, type) {
    const status = document.getElementById('project-status');
    status.textContent = message;
    status.className = `project-status ${type}`;
}

function saveProject() {
    const title = document.getElementById('project-title-input').value.trim();
    const description = document.getElementById('project-description-input').value.trim();
    const category = document.getElementById('project-category-input').value;
    const tags = document.getElementById('project-tags-input').value.trim();
    const demoUrl = document.getElementById('project-demo-input').value.trim();
    const githubUrl = document.getElementById('project-github-input').value.trim();
    
    // Validation
    if (!title) {
        showProjectStatus('Please enter a project title', 'error');
        return;
    }
    if (!description) {
        showProjectStatus('Please enter a project description', 'error');
        return;
    }
    
    // Create project object
    const project = {
        id: 'project-' + Date.now(),
        title,
        description,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        demoUrl,
        githubUrl,
        image: projectImageData,
        createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    let userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    userProjects.push(project);
    localStorage.setItem('userProjects', JSON.stringify(userProjects));
    
    // Add to DOM
    addProjectToGrid(project);
    
    showProjectStatus('✅ Project added successfully!', 'success');
    showToast('Project added successfully!', 'success');
    
    setTimeout(() => {
        toggleAddProjectPanel();
    }, 1500);
}

function addProjectToGrid(project) {
    const grid = document.getElementById('projects-grid');
    
    const card = document.createElement('div');
    card.className = `project-card ${project.category} user-project`;
    card.dataset.title = project.title.toLowerCase();
    card.dataset.tags = project.tags.join(' ').toLowerCase();
    card.dataset.projectId = project.id;
    
    const imageHtml = project.image 
        ? `<img src="${project.image}" alt="${project.title}">`
        : `<div class="project-placeholder"><i class="fas fa-image"></i></div>`;
    
    const linksHtml = `
        ${project.demoUrl ? `<a href="${project.demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
        ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer" title="Source Code"><i class="fab fa-github"></i></a>` : ''}
    `;
    
    const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    card.innerHTML = `
        <button type="button" class="project-delete-btn" onclick="deleteProject('${project.id}')" title="Delete Project">
            <i class="fas fa-trash"></i>
        </button>
        <div class="project-image">
            ${imageHtml}
            <div class="project-overlay">
                <div class="project-links">
                    ${linksHtml}
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${tagsHtml}
            </div>
        </div>
    `;
    
    grid.appendChild(card);
}

function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    // Remove from localStorage
    let userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    userProjects = userProjects.filter(p => p.id !== projectId);
    localStorage.setItem('userProjects', JSON.stringify(userProjects));
    
    // Remove from DOM
    const card = document.querySelector(`[data-project-id="${projectId}"]`);
    if (card) {
        card.remove();
    }
    
    showToast('Project deleted successfully!', 'success');
}

// Handle project image upload
function handleProjectImageUpload(input) {
    const file = input.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showProjectStatus('Please select an image file', 'error');
            input.value = '';
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            showProjectStatus('Image size should be less than 5MB', 'error');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            projectImageData = e.target.result;
            document.getElementById('project-image-preview').innerHTML = 
                `<img src="${projectImageData}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

// Load user projects on page load
document.addEventListener('DOMContentLoaded', function() {
    const userProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    userProjects.forEach(project => {
        addProjectToGrid(project);
    });
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize skill bar animations
    initSkillBarAnimations();
    
    // Initialize section title animations
    initSectionTitleAnimations();
});

// ========== SCROLL REVEAL ANIMATIONS ==========

function initScrollReveal() {
    // Add reveal classes to elements
    const aboutSection = document.querySelector('#about .about-content');
    const photoFrame = document.querySelector('.photo-frame');
    const aboutText = document.querySelector('.about-text');
    const quickFacts = document.querySelector('.quick-facts');
    const skillsSection = document.querySelector('#skills');
    const projectsSection = document.querySelector('#projects');
    const projectCards = document.querySelectorAll('.project-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Add reveal classes
    if (photoFrame) photoFrame.classList.add('reveal-left');
    if (aboutText) aboutText.classList.add('reveal-right');
    if (quickFacts) quickFacts.classList.add('stagger-children');
    
    // Add reveal to all project cards
    projectCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add reveal to skill items
    skillItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Create intersection observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger skill bar animation when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });
}

// Skill bar fill animations
function initSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    skillBars.forEach(bar => {
        // Store the target width
        const targetWidth = bar.style.width;
        bar.style.setProperty('--target-width', targetWidth);
        bar.style.width = '0';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.classList.add('animate');
        }, index * 100);
    });
}

// Section title underline animations
function initSectionTitleAnimations() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.5
    });
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
}

// Add tilt effect to project cards
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        }
    });
});

// Reset card transform on mouse leave
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
    
    // Parallax for background orbs
    orbs.forEach((orb, index) => {
        const speed = 0.05 + (index * 0.02);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add smooth appear class to dynamically added elements
function addSmoothAppear(element) {
    element.classList.add('smooth-appear');
}

// Magnetic button effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-3px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Cursor glow effect (optional, adds a glow that follows the cursor)
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', function(e) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', function() {
    cursorGlow.style.opacity = '0';
});

// ========== SCROLL PROGRESS BAR ==========
const scrollProgressBar = document.getElementById('scroll-progress-bar');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgressBar) {
        scrollProgressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// ========== COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    countersAnimated = true;
}

// Trigger counter animation when stats section is in view
const statsSection = document.getElementById('stats');

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

// ========== TIMELINE ANIMATION ==========
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// Add animate class styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .timeline-item.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ========== EDUCATION & EXPERIENCE MANAGEMENT ==========

// Toggle Add Education Panel
function toggleAddEducationPanel() {
    const panel = document.getElementById('add-education-panel');
    if (panel) {
        panel.classList.toggle('active');
        if (!panel.classList.contains('active')) {
            clearEducationForm();
        }
    }
}

// Toggle Add Experience Panel
function toggleAddExperiencePanel() {
    const panel = document.getElementById('add-experience-panel');
    if (panel) {
        panel.classList.toggle('active');
        if (!panel.classList.contains('active')) {
            clearExperienceForm();
        }
    }
}

// Clear Education Form
function clearEducationForm() {
    document.getElementById('edu-degree').value = '';
    document.getElementById('edu-institution').value = '';
    document.getElementById('edu-duration').value = '';
    document.getElementById('edu-description').value = '';
}

// Clear Experience Form
function clearExperienceForm() {
    document.getElementById('exp-title').value = '';
    document.getElementById('exp-company').value = '';
    document.getElementById('exp-duration').value = '';
    document.getElementById('exp-description').value = '';
}

// Save Education
function saveEducation() {
    const degree = document.getElementById('edu-degree')?.value.trim();
    const institution = document.getElementById('edu-institution')?.value.trim();
    const duration = document.getElementById('edu-duration')?.value.trim();
    const description = document.getElementById('edu-description')?.value.trim();
    
    if (!degree || !institution) {
        showToast('Please fill in Degree and Institution', 'error');
        return;
    }
    
    const educationData = getEducationFromStorage();
    const newEntry = {
        id: Date.now(),
        degree,
        institution,
        duration,
        description
    };
    
    educationData.push(newEntry);
    localStorage.setItem('education', JSON.stringify(educationData));
    
    renderEducation();
    toggleAddEducationPanel();
    showToast('Education added successfully!', 'success');
}

// Save Experience
function saveExperience() {
    const title = document.getElementById('exp-title')?.value.trim();
    const company = document.getElementById('exp-company')?.value.trim();
    const duration = document.getElementById('exp-duration')?.value.trim();
    const description = document.getElementById('exp-description')?.value.trim();
    
    if (!title || !company) {
        showToast('Please fill in Job Title and Company', 'error');
        return;
    }
    
    const experienceData = getExperienceFromStorage();
    const newEntry = {
        id: Date.now(),
        title,
        company,
        duration,
        description
    };
    
    experienceData.push(newEntry);
    localStorage.setItem('experience', JSON.stringify(experienceData));
    
    renderExperience();
    toggleAddExperiencePanel();
    showToast('Experience added successfully!', 'success');
}

// Get Education from localStorage
function getEducationFromStorage() {
    const data = localStorage.getItem('education');
    return data ? JSON.parse(data) : [];
}

// Get Experience from localStorage
function getExperienceFromStorage() {
    const data = localStorage.getItem('experience');
    return data ? JSON.parse(data) : [];
}

// Delete Education
function deleteEducation(id) {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    
    let educationData = getEducationFromStorage();
    educationData = educationData.filter(item => item.id !== id);
    localStorage.setItem('education', JSON.stringify(educationData));
    
    renderEducation();
    showToast('Education entry deleted', 'success');
}

// Delete Experience
function deleteExperience(id) {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    
    let experienceData = getExperienceFromStorage();
    experienceData = experienceData.filter(item => item.id !== id);
    localStorage.setItem('experience', JSON.stringify(experienceData));
    
    renderExperience();
    showToast('Experience entry deleted', 'success');
}

// Render Education Cards
function renderEducation() {
    const list = document.getElementById('education-list');
    if (!list) return;
    
    const educationData = getEducationFromStorage();
    
    if (educationData.length === 0) {
        list.innerHTML = `
            <div class="entries-empty">
                <i class="fas fa-graduation-cap"></i>
                <p>No education entries yet. Click "Add Education" to add one.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = educationData.map(item => `
        <div class="entry-card" data-id="${item.id}">
            <button class="delete-entry-btn" onclick="deleteEducation(${item.id})" title="Delete">
                <i class="fas fa-trash-alt"></i>
            </button>
            <div class="entry-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="entry-content">
                ${item.duration ? `<span class="entry-date">${item.duration}</span>` : ''}
                <h4 class="entry-title">${item.degree}</h4>
                <h5 class="entry-subtitle">${item.institution}</h5>
                ${item.description ? `<p class="entry-description">${item.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Render Experience Cards
function renderExperience() {
    const list = document.getElementById('experience-list');
    if (!list) return;
    
    const experienceData = getExperienceFromStorage();
    
    if (experienceData.length === 0) {
        list.innerHTML = `
            <div class="entries-empty">
                <i class="fas fa-briefcase"></i>
                <p>No experience entries yet. Click "Add Experience" to add one.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = experienceData.map(item => `
        <div class="entry-card" data-id="${item.id}">
            <button class="delete-entry-btn" onclick="deleteExperience(${item.id})" title="Delete">
                <i class="fas fa-trash-alt"></i>
            </button>
            <div class="entry-icon">
                <i class="fas fa-briefcase"></i>
            </div>
            <div class="entry-content">
                ${item.duration ? `<span class="entry-date">${item.duration}</span>` : ''}
                <h4 class="entry-title">${item.title}</h4>
                <h5 class="entry-subtitle">${item.company}</h5>
                ${item.description ? `<p class="entry-description">${item.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

// Initialize Education & Experience on page load
function initEducationExperience() {
    // Check if there's existing data, if not add default entries
    const educationData = getEducationFromStorage();
    const experienceData = getExperienceFromStorage();
    
    // If no education data, add default entries
    if (educationData.length === 0) {
        const defaultEducation = [
            {
                id: 1,
                degree: "B.Sc. Computer Science",
                institution: "Thakur College of Science and Commerce",
                duration: "2023 - Present",
                description: "Currently pursuing Bachelor's degree in Computer Science. Learning advanced programming concepts, data structures, algorithms, and modern web development technologies."
            },
            {
                id: 2,
                degree: "Higher Secondary Education",
                institution: "Science Stream",
                duration: "2021 - 2023",
                description: "Completed HSC with focus on Science and Mathematics. Developed interest in programming and technology during this period."
            }
        ];
        localStorage.setItem('education', JSON.stringify(defaultEducation));
    }
    
    // If no experience data, add default entries
    if (experienceData.length === 0) {
        const defaultExperience = [
            {
                id: 1,
                title: "MERN Stack Developer",
                company: "Self Learning & Projects",
                duration: "2024 - Present",
                description: "Mastered the MERN Stack (MongoDB, Express.js, React.js, Node.js) through hands-on projects. Built full-stack applications including Wanderlust and Zerodha clone."
            }
        ];
        localStorage.setItem('experience', JSON.stringify(defaultExperience));
    }
    
    // Render both sections
    renderEducation();
    renderExperience();
}

// Call init on DOM ready
document.addEventListener('DOMContentLoaded', initEducationExperience);

// ========== NEW ANIMATIONS ==========

// 1. Skill Bar Fill on Scroll
function initSkillBarAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width || bar.getAttribute('style')?.match(/width:\s*(\d+%)/)?.[1];
        if (width) {
            bar.style.setProperty('--target-width', width);
            bar.style.width = '0';
        }
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fill');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// 2. Project Card Staggered Entrance
function initProjectCardAnimation() {
    const cards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => observer.observe(card));
}

// 3. Button Ripple Effect
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 4. Parallax Background Orbs
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                orbs.forEach((orb, index) => {
                    const speed = 0.03 + (index * 0.015);
                    const yOffset = scrollY * speed;
                    const xOffset = Math.sin(scrollY * 0.001 + index) * 15;
                    orb.style.transform = `translate(${xOffset}px, ${-yOffset}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// 5. Section Title Underline Animation
function initTitleAnimation() {
    const titles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    titles.forEach(title => observer.observe(title));
}

// 6. Fact Items Pop-in Animation
function initFactAnimation() {
    const facts = document.querySelectorAll('.fact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    facts.forEach(fact => observer.observe(fact));
}

// 7. Entry Card Animation (Education/Experience)
function initEntryCardAnimation() {
    const entries = document.querySelectorAll('.entry-card');
    
    const observer = new IntersectionObserver((entries_list) => {
        entries_list.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    entries.forEach(entry => observer.observe(entry));
}

// 8. Footer Entrance Animation
function initFooterAnimation() {
    const footer = document.querySelector('.footer');
    
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(footer);
    }
}

// Initialize all new animations
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to let page render first
    setTimeout(() => {
        initSkillBarAnimation();
        initProjectCardAnimation();
        initButtonRipple();
        initParallaxOrbs();
        initTitleAnimation();
        initFactAnimation();
        initEntryCardAnimation();
        initFooterAnimation();
        console.log('✨ All new animations initialized');
    }, 100);
});