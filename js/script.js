/* const OPENAI_API_KEY = "" // My OpenAI API , do not share it with anyone or deploy it on github
const submitBtn = document.querySelector("#submit"); // getting the submit id
const outputElement = document.querySelector("#output")
const inputElement = document.querySelector(".input-chatbot")
const historyElement = document.querySelector(".history")
const buttonElement = document.querySelector('.chat-btn')

window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });

function changeInput(value)
{
    const inputElement = document.querySelector('input')
    inputElement.value = value
}


// Function of getting Message when submit btn gets clicked
async function getMessage(event) {

    // Making our own API call
    const options =
    {
        method:'POST',
        headers:
        {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body:JSON.stringify(
        {
            "model": "gpt-3.5-turbo",
            "messages": 
            [
                // {"role": "system","content": "You are a helpful assistant."},
                {"role": "user","content": inputElement.value},
                
            ],
            max_tokens:100
        })
    }

    try
    {
       const response =  await fetch('https://api.openai.com/v1/chat/completions', options) // Getting the response from the URL resource

       const data = await response.json() // converting response object into Javascript object
       console.log(data);
       outputElement.textContent = data.choices[0].message.content
       if(data.choices[0].message.content)
       {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click' , () => changeInput( pElement.textContent))
            historyElement.append(pElement)
       }
    }   

    catch (error)
    {
        console.log(error);
    }

}

submitBtn.addEventListener('click' , getMessage) // Event listener of submit btn    

// When Click , it clears the Input value
function clearInput()
{
    inputElement.value = ""
}

buttonElement.addEventListener('click' , clearInput)
*/



 // Getting the ID's
 const form = document.getElementById('form');
 const name = document.getElementById('name');
 const email = document.getElementById('email');
 const password = document.getElementById('password');

 // show error message
 function showError(input, message)
 {
     const formControl = input.parentElement; // div = form-control

     formControl.className = "form-control error"; // in css .form-control input , border color will be red

     const small = formControl.querySelector('small'); // selecting the first element of CSS selector small

     small.innerText = message; // Message to show in HTML
 }

 // show success
 function showSuccess(input)
 {
     const formControl = input.parentElement;
     formControl.className = "form-control success";
 }

 // check email is valid
 function checkEmail(input)
 {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // Email Regex

     if (re.test(input.value.trim()))
     {
         showSuccess(input);
         return true;
     }
     else
     {
         showError(input,"Email is not valid");
         return false;
     }
 }

 // Check input fields
 function checkField(arr)
 {
     arr.forEach(function(input)
     {
         if(input.value.trim() === "")
         {
             showError(input , `${fieldNames(input)} is required`)
             return false;
         }
         else
         {
         showSuccess(input);
         }
     });
     return true
 }   

 // check length
 function checkLength(input, min , max)
 {
     if(input.value.length < min)
     {
         showError(input, `${fieldNames(input)} must be atleast ${min} character`)
         return false;
     }
     else if(input.value.length > max)
     {
         showError(input, `${fieldNames(input)} must be less than ${max} character`)
         return false;
     }

     else
     {
         showSuccess(input);
         return true;
     }
 }

 // field names
 function fieldNames(input)
 {
     return input.id.charAt(0).toUpperCase() + input.id.slice(1)
 }

 // Event listeners
 form.addEventListener("submit" , function(e)
 {
     e.preventDefault();
     var isValid = true;
     isValid = isValid && checkField([name,email, password])
     isValid = isValid && checkEmail(email);
     isValid = isValid && checkLength(name,3,30);
     isValid = isValid && checkLength(password,6,20)

     if(isValid){
        let formData = new FormData(form);
        formData.forEach(data => {
            console.log(data)
        })
        fetch("http://127.0.0.1:8000/auth/register/", {
            method:"POST",
            body: formData
        })
        .then( async response => {
            const data = await response.json()
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("userType", data.user.user_type);
        })
        .catch(reason => alert("Please Make sure You have Give right credentials and don't have an acount already"));
     }

 })


