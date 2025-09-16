document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Project Modal/Lightbox Functionality ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = document.querySelector('.close-btn');
    const projectsGrid = document.querySelector('#projects.grid');

    projectsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            // Populate modal with data from the clicked card's data-* attributes
            modalTitle.textContent = card.dataset.title;
            modalCategory.textContent = card.dataset.category;
            modalDescription.textContent = card.dataset.description;
            modal.style.display = 'block';
        }
    });

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeModalBtn.addEventListener('click', closeModal);
    // Close modal if user clicks outside the content area
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Contact Form Validation ---
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = validateForm();
        
        if (isValid) {
            // In a real application, you would send the form data to a server here.
            // For this demo, we'll just show a success message.
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            form.reset();
            setTimeout(() => {
                successMessage.textContent = '';
            }, 5000);
        }
    });

    function validateForm() {
        let isValid = true;
        // Reset previous errors
        resetErrors();

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
            isValid = false;
        }
        
        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
    }

    function isValidEmail(email) {
        // Basic regex for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});