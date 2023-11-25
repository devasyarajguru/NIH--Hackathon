document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        const mobileInput = document.getElementById('mobileInput');
        const passwordInput = document.getElementById('passwordInput');
        const mobileError = document.getElementById('mobileError');
        const passwordError = document.getElementById('passwordError');
        const email = mobileInput.value;
        const password = passwordInput.value;

        let isValid = true;

        // Reset previous error messages and styles
        mobileError.textContent = '';
        passwordError.textContent = '';
        mobileInput.style.border = '1px solid #ced4da';
        passwordInput.style.border = '1px solid #ced4da';
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        // Mobile number validation
        if (!reg.test(email)) {
            mobileError.textContent = 'Please enter a valid Email Address';
            mobileInput.style.border = '1px solid red';
            isValid = false;
        }

        // Password validation
        if (password.length < 4 ) {
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
        event.preventDefault(); // Prevent form submission
        if (!isValid) {
        }
        else {
            let formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            fetch("http://15.206.72.47/auth/login/", {
                method:"POST",
                body:formData
            })
            .then(async response =>  {
                const data = await response.json()
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("userType", data.user.user_type);
                if(response.status != 400)
                {
                    window.location.href = "../files/home.html";
                }
            })
            .catch(error =>
            {
                alert("Please check login credentials")
            })
        }

        return isValid;
    });
});
