document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        const EmailInput = document.getElementById('EmailInput');
        const passwordInput = document.getElementById('passwordInput');
        const EmailError = document.getElementById('EmailError');
        const passwordError = document.getElementById('passwordError');
        const email = EmailInput.value;
        const password = passwordInput.value;

        let isValid = true;

        // Reset previous error messages and styles
        EmailError.textContent = '';
        passwordError.textContent = '';
        EmailInput.style.border = '1px solid #ced4da';
        passwordInput.style.border = '1px solid #ced4da';
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        // Mobile number validation
        if (!reg.test(email)) {
            EmailError.textContent = 'Please enter a valid Email Address';
            EmailInput.style.border = '1px solid red';
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
            // Form Data Object creates a way to construct a set of key/value pairs reprersenting form fields and their values 
            let formData = new FormData();

            // Appends new values inside a FormData object of the keys
            formData.append('username', email);
            formData.append('password', password);

            // Fetch request is made to the URL using POST Method and sending formdata to server by setting the body
            fetch("http://15.206.72.47/auth/login/", {
                method:"POST",
                body:formData
            })
            // --------------------------------CODE LEFT -------------------------------------------------
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
