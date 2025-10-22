import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

export default function App() {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border border-gray-300 shadow-lg rounded-xl overflow-hidden">
      <header className="p-4 bg-blue-600 text-white text-lg font-semibold">
        Gemini Chat
      </header>
      <ChatWindow />
      <ChatInput />
    </div>
  );
}
