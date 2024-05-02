import React, { useState } from 'react';
import Chat from './Chat';
import ApiKeyModal from './ApiKeyModal';
import './App.css'

function App() {
  const [apiKey, setApiKey] = useState('');
  const [chats, setChats] = useState([]);

  const addNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, messages: [] }]);
  };

  const deleteChat = (chatId) => {
    setChats(chats.filter(chat => chat.id !== chatId));
  };

  return (
    <div className="App">
      {!apiKey && <ApiKeyModal setApiKey={setApiKey} />}
      <button onClick={addNewChat}>New Chat</button>
      {chats.map(chat => (
        <Chat key={chat.id} chatId={chat.id} apiKey={apiKey} deleteChat={deleteChat} />
      ))}
    </div>
  );
}

export default App;
