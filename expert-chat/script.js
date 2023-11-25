function sendMessage() {
    // Get the input element
    var messageInput = document.getElementById('messageInput');

    // Get the chat conversation div
    var chatConversation = document.getElementById('chatConversation');

    // Create a new message element
    var messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = messageInput.value;

    // Append the new message to the chat conversation
    chatConversation.appendChild(messageElement);

    // Clear the input field after sending the message
    messageInput.value = '';
}