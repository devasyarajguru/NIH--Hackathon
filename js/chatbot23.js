// Getting the ID's
const chatInput = document.querySelector('#chat-input');
// Send Button ID (Span ID)
const sendButton = document.querySelector('#send-btn');
const chatContainer = document.querySelector('.chat-container');

// Text of user
let userText =  null;
const API_KEY = ""

const createElement = (html, className) =>
{
    // created new div and apply chat and outgoing classes to it and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat" , className);
    chatDiv.innerHTML = html;
    return chatDiv; // Return the created chat div
}

// get Chat Response
const chatResponse = () =>
{
    const API_URL = 'https://api.openai.com/v1/completions';

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
}

// Handling Outgoing Chat
function handleOutGoingChat()
{
    userText = chatInput.value.trim();
    // console.log(userText);
    const html = `<div class="chat-content">
    <div class="chat-details">
        <img src="../images/user2.png" alt="user">
        <p>${userText}</p>
    </div>
</div>`;

// create an outgoing chat div with user's message and append it to chat container
const OutGoingChatDiv = createElement(html, "outgoing");
chatContainer.appendChild(OutGoingChatDiv);
setTimeout(typingDotAnimation,500)
}

// Event Listener
sendButton.addEventListener("click" , handleOutGoingChat);


