import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const { messages, isTyping } = useChat();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} {...msg} />
      ))}
      {isTyping && (
        <div className="flex justify-start mb-2">
          <div className="p-3 rounded-2xl max-w-[75%] text-sm shadow-md bg-gray-200 text-gray-900 animate-pulse">
            Gemini is typing...
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
