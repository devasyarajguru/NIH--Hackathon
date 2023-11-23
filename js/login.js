document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        const mobileInput = document.getElementById('mobileInput');
        const passwordInput = document.getElementById('passwordInput');
        const mobileError = document.getElementById('mobileError');
        const passwordError = document.getElementById('passwordError');
        const mobile = mobileInput.value;
        const password = passwordInput.value;

        let isValid = true;

        // Reset previous error messages and styles
        mobileError.textContent = '';
        passwordError.textContent = '';
        mobileInput.style.border = '1px solid #ced4da';
        passwordInput.style.border = '1px solid #ced4da';

        // Mobile number validation
        if (mobile.length !== 10 || isNaN(mobile)) {
            mobileError.textContent = 'Please enter a valid 10-digit mobile number.';
            mobileInput.style.border = '1px solid red';
            isValid = false;
        }

        // Password validation
        if (password.length < 6 ) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordInput.style.border = '1px solid red';
            isValid = false;
        }

        else if(password.length > 20)
        {
            passwordError.textContent = 'Password must be less than 20 characters';
            passwordInput.style.border = '1px solid red';
            isValid = false
        }

        // If any validation fails, prevent form submission
        if (!isValid) {
            event.preventDefault(); // Prevent form submission
        }

        return isValid;
    });
});
