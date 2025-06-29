import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];

    // Simple rule-based response
    const botReply = getBotResponse(input);
    newMessages.push({ sender: "bot", text: botReply });

    setMessages(newMessages);
    setInput("");
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) return "Hello! 👋";
    if (msg.includes("price")) return "Please specify the product you're asking about.";
    if (msg.includes("return")) return "Our return policy lasts 30 days.";
    if (msg.includes("bye")) return "Goodbye! Have a great day!";
    
    return "I'm not sure I understand. Can you rephrase?";
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-xl shadow-lg p-4 bg-white">
      <h1 className="text-xl font-bold mb-2">🧠 Noire Chatbot</h1>
      <div className="h-80 overflow-y-auto border p-2 mb-2 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-2 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow border rounded px-2 py-1"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
