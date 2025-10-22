# Gemini Chat Widget

A React-based interactive chat widget that integrates with Google’s Gemini API to provide AI-generated responses. This project demonstrates React hooks, the Context API, async data fetching, state management, and error handling while offering a polished, responsive chat interface.

## Features

- Interactive chat: send messages and receive AI responses from the Gemini 2.5 Flash model.
- React Context API: global chat state via `ChatContext` and a `useChat` hook.
- Persistent storage: messages are saved to `localStorage` and persist across reloads.
- Loading & typing indicator: shows "Gemini is typing..." while awaiting responses.
- Retry logic: retries once on transient network failures.
- Timestamps: each message shows a time, and the date if older than today.
- Responsive & styled: built with Tailwind CSS for desktop and mobile layouts.
- Error handling: user-friendly messages shown on API or network errors.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- `@google/genai` (Google Gemini SDK)
- Axios (used by the SDK)
- `localStorage` for persistence

## Project structure (example)

```text
my-app/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx       # message list + typing indicator
│   │   ├── ChatInput.jsx        # text input + send button
│   │   └── MessageBubble.jsx    # single message display with timestamp
│   ├── context/
│   │   └── ChatContext.jsx      # ChatProvider, state and sendMessage
│   ├── hooks/
│   │   └── useChatAPI.js        # Gemini API request logic
│   ├── App.jsx                  # main layout & composition
│   └── main.jsx                 # bootstrap with ChatProvider
├── .env.local                   # VITE_GEMINI_API_KEY
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## How it works

1. User types a message in `ChatInput` and submits.
2. `sendMessage` in `ChatContext` adds the message to state and calls `sendMessageToGemini` from `useChatAPI.js`.
3. The Gemini SDK generates a response.
4. The response is appended to chat state; a typing/loading indicator shows while waiting.
5. Chat history is persisted to `localStorage`.
