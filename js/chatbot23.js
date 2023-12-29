// Getting the ID's
const chatInput = document.querySelector('#chat-input');
// Send Button ID (Span ID)
const sendButton = document.querySelector('#send-btn');
const chatContainer = document.querySelector('.chat-container');

// Text of user
let userText =  null;
const API_KEY = "" // API Key here

const createElement = (html, className) =>
{
    // created new div and apply chat and outgoing classes to it and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat" , className);
    chatDiv.innerHTML = html;
    return chatDiv; // Return the created chat div
}

// const LoadLocalStorage = () =>
// {
//     chatContainer.innerHTML = localStorage.getItem("all-chats");
// } 

// LoadLocalStorage();

// get Chat Response
const chatResponse = async (incomingChatDiv) =>
{
    // API URL
    const API_URL = 'https://api.openai.com/v1/completions';
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model:'text-davinci-003',
            prompt:userText,
            max_tokens:2048,
            temperature:0.2,
            n:1,
            stop:null
        })

    }

    // Send POST request to API , get response and set the response as paragraph element text
    try
    {
        const response  = await(await fetch(API_URL,requestOptions)).json();
        console.log(response)
        pElement.textContent = response.choices[0].text.trim();
    }
    catch(error)
    {
        console.log(error)
    }

    // Removing the typing animation , append the paragraph and save the chats to the localStorage
    incomingChatDiv.querySelector(".typing-animation").remove()
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement)

    // localStorage.setItem("all-chats" , chatContainer.innerHTML); 
}


// Show Typing Animation

const typingDotAnimation = () =>
{
    const html = ` <div class="chat-content">
    <div class="chat-details">
        <img src="../images/law2.png" alt="user">
            <div class="typing-animation">
                <div class="typing-dot" style="--delay:0.2s"></div>
                <div class="typing-dot" style="--delay:0.3s"></div>
                <div class="typing-dot" style="--delay:0.4s"></div>
            </div>
    </div>
</div>`;

const incomingChatDiv = createElement(html,"incoming");
chatContainer.appendChild(incomingChatDiv);
chatResponse(incomingChatDiv);
}

// Handling Outgoing Chat
function handleOutGoingChat()
{
    userText = chatInput.value.trim();

    if(!userText) return;
    // console.log(userText);
    const html = `<div class="chat-content">
    <div class="chat-details">
        <img src="../images/user2.png" alt="user">
        <p></p>
    </div>
</div>`;

// create an outgoing chat div with user's message and append it to chat container
const OutGoingChatDiv = createElement(html, "outgoing");
OutGoingChatDiv.querySelector("p").textContent = userText;
chatContainer.appendChild(OutGoingChatDiv);
setTimeout(typingDotAnimation,500)
}

// Event Listener
sendButton.addEventListener("click" , handleOutGoingChat);


