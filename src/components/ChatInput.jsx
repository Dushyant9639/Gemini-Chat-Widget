import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { Send } from "lucide-react";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage, loading } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 gap-2 border-t border-gray-300 bg-white">
      <input
        className="flex-1 border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white rounded-xl px-4 py-2 disabled:opacity-50"
      >
        {loading ? "..." : <Send size={18} />}
      </button>
    </form>
  );
}
