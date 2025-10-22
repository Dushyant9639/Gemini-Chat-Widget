export const loadChatHistory = () => {
  try {
    const saved = localStorage.getItem("chat_history");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveChatHistory = (messages) => {
  localStorage.setItem("chat_history", JSON.stringify(messages));
};
