export default function MessageBubble({ role, text, timestamp }) {
  const isUser = role === "user";
  const time = new Date(timestamp);
  const now = new Date();
  const showDate = time.toDateString() !== now.toDateString();

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formattedDate = showDate ? ` (${time.toLocaleDateString()})` : "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`p-3 rounded-2xl max-w-[75%] text-sm shadow-md ${
        isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"
      }`}>
        <p className="whitespace-pre-wrap">{text}</p>
        <span className="block text-xs text-gray-400 mt-1 text-right">
          {formattedTime}{formattedDate}
        </span>
      </div>
    </div>
  );
}
