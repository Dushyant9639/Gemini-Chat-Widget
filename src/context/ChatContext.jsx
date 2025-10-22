import { createContext, useState, useEffect, useContext } from "react";
import { sendMessageToGemini } from "../hooks/useChatAPI";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = { role: "user", text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setIsTyping(true);

    try {
      let aiResponse;
      let attempts = 0;
      const maxRetries = 1;

      while (attempts <= maxRetries) {
        try {
          aiResponse = await sendMessageToGemini(text);
          break; // success
        } catch (err) {
          attempts++;
          if (attempts > maxRetries) throw err;
        }
      }

      const botMsg = { role: "assistant", text: aiResponse, timestamp: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        text: "⚠️ Error contacting Gemini. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, isTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
