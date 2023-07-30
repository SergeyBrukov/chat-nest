const socket = io("http://localhost:3000");

const msgInput = document.querySelector(".message-input");
const msgList = document.querySelector(".messages-list");
const sendBtn = document.querySelector(".send-btn");
const usernameInput = document.querySelector(".username-input");
const messages = [];

const handleSendMessage = (value) => {

  const messageData = {
    username: usernameInput.value,
    text: value,
    createdAt: new Date()
  };

  socket.emit("sendMessage", messageData);
};

const renderMessages = (messages) => {
  let messageIntoList = "";

  messages.forEach(
    (message) =>
      (messageIntoList += `
        <li class="bg-dark p-2 rounded mb-2 d-flex justify-content-between message">
            <div class="mr-2">
                <span class="text-info">${message.username}</span>
                <p class="text-light">${message.text}</p>
            </div>
            <span class="text-muted text-right date">
                ${new Date(message.createdAt).toLocaleString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      })}
            </span>
        </li>`)
  );

  msgList.innerHTML = messageIntoList;
};

(async () => {
  const { data } = await axios.get("http://localhost:3000/chat");

  data.forEach(item => messages.push(item));

  renderMessages(data);
})();

msgInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    handleSendMessage(event.target.value);
    msgInput.value = "";
  }
});

sendBtn.addEventListener("click", () => {
  handleSendMessage(msgInput.value);
  msgInput.value = "";
});

socket.on("recMessage", (messageData) => {
  messages.push(messageData);
  renderMessages(messages);
});


