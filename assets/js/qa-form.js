// Q&A Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('qaForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Form validation
    function validateForm() {
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value;
        const question = form.querySelector('#question').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Validate name
        if (!name) {
            showFieldError('name', 'Vui lòng nhập tên của bạn');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'Tên phải có ít nhất 2 ký tự');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showFieldError('email', 'Vui lòng nhập email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Email không hợp lệ');
            isValid = false;
        }
        
        // Validate subject
        if (!subject) {
            showFieldError('subject', 'Vui lòng chọn chủ đề');
            isValid = false;
        }
        
        // Validate question
        if (!question) {
            showFieldError('question', 'Vui lòng nhập câu hỏi');
            isValid = false;
        } else if (question.length < 10) {
            showFieldError('question', 'Câu hỏi phải có ít nhất 10 ký tự');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show field error
    function showFieldError(fieldId, message) {
        const field = form.querySelector(`#${fieldId}`);
        const formGroup = field.closest('.form-group');
        
        // Add error class to field
        field.classList.add('error');
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        // Insert error message after field
        formGroup.appendChild(errorDiv);
    }
    
    // Clear error messages
    function clearErrorMessages() {
        // Remove error classes
        form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        
        // Remove error messages
        form.querySelectorAll('.field-error').forEach(error => {
            error.remove();
        });
    }
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success';
        successDiv.innerHTML = `
            <strong>✅ Gửi thành công!</strong><br>
            Cảm ơn bạn đã gửi câu hỏi. Tôi sẽ trả lời trong thời gian sớm nhất có thể.
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form
        form.reset();
    }
    
    // Show error message
    function showErrorMessage() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error';
        errorDiv.innerHTML = `
            <strong>❌ Có lỗi xảy ra!</strong><br>
            Không thể gửi câu hỏi. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.
        `;
        
        form.parentNode.insertBefore(errorDiv, form);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        
        // Submit form
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        })
        .finally(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    });
    
    // Real-time validation
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            
            // Clear previous error for this field
            const existingError = form.querySelector(`#${fieldId}`).closest('.form-group').querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            this.classList.remove('error');
            
            // Validate specific field
            if (fieldId === 'name' && value && value.length < 2) {
                showFieldError(fieldId, 'Tên phải có ít nhất 2 ký tự');
            } else if (fieldId === 'email' && value && !isValidEmail(value)) {
                showFieldError(fieldId, 'Email không hợp lệ');
            } else if (fieldId === 'question' && value && value.length < 10) {
                showFieldError(fieldId, 'Câu hỏi phải có ít nhất 10 ký tự');
            }
        });
    });
    
    // Auto-resize textarea
    const textarea = form.querySelector('#question');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .qa-contact-form input.error,
    .qa-contact-form select.error,
    .qa-contact-form textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .field-error {
        display: block;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #dc3545;
    }
`;
document.head.appendChild(style);
