// Chatbot Script

// getting IDS

const chatInput = document.querySelector("#chat-input");
const sendBtn = document.querySelector(".span-btn");
const chatDetails = document.querySelector(".chat-container")

let userText = null;
const API_KEY = "" // API key here

//  Function for creating element
function createElement(html, className)
{
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat-conatiner" , className);
    chatDiv.innerHTML = html;
    return chatDiv;
}

// Get Chat Response
async function getChatResponse(inComingDiv)
{
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const options =
    {
        method:'POST',
        headers:
        {
            'Authorization': `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body:JSON.stringify(
        {
            model: "gpt-3.5-turbo-instruct",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n:1,
            stop:null
        })
    }
    // Send Post request to API , get response and set the the response as paragraph element text
    try{
        const response = await (await fetch(API_URL, options)).json();
        console.log(response);
        pElement.textContent = response.choices[0].text.trim();
    }
    catch(error)
    {
        console.log(error);
    }

    inComingDiv.querySelector(".typing-animation").remove();
    inComingDiv.querySelector(".chat-details").appendChild(pElement);

}

// Animation Typing Output
function showAnimation()
{
    const html = `<div class="chat-content">
                    <div class="chat-details">
                      <img src="../images/law2.png" alt="chat-img" />
                    <div class="typing-animation">
                         <div class="typing-dot" style="--delay:0.2s"></div>
                         <div class="typing-dot" style="--delay:0.3s"></div>
                         <div class="typing-dot" style="--delay:0.4s"></div>
                         </div>
                     </div>
                   </div>`;

                   const inComingDiv = createElement(html , '.chat-para.gpt');
                   chatDetails.appendChild(inComingDiv);
                   getChatResponse(inComingDiv);  
}

// Handling the Output chat
function handleOutputChat()
{
    const userText = chatInput.value.trim() // taking the chat Input value and removing white spaces
    if(!userText) return; // if chatinput is empty

    const html = `<div class="chat-content">
                  <div class="chat-details">
                  <img src="../images/user2.png" alt="chat-img" />
                  <p class="chat-para gpt">${userText}</p>
                  </div>
                  </div>`;

            const outGoingDiv = createElement(html , '.chat-para.gpt');
            outGoingDiv.querySelector("p").textContent = userText;
            chatDetails.appendChild(outGoingDiv);
            setTimeout(showAnimation, 500);
}

// event Listeners
sendBtn.addEventListener("click" , handleOutputChat);
