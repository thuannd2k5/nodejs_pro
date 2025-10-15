const socket = io();
const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const userId = document.getElementById("userId").value;

// Gửi tin nhắn
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = messageInput.value.trim();
    if (!content) return;

    socket.emit("sendMessage", {
        fromId: Number(userId),
        toId: 1, // giả sử admin có id = 1
        content
    });

    messageInput.value = "";
});

// Nhận tin nhắn mới
socket.on("newMessage", (msg) => {
    const div = document.createElement("div");
    div.classList.add("message", msg.fromId === Number(userId) ? "from-me" : "from-admin");
    div.innerHTML = `
        <div class="content">${msg.content}</div>
        <span class="time">${new Date(msg.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
    `;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});
