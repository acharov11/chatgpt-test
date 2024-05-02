import React, { useState } from 'react';
import axios from 'axios';

function Chat({ chatId, apiKey, deleteChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(1);
  const [maxTokens, setMaxTokens] = useState(256);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'User', text: input, avatar: './images/Profile.png' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages: [{ role: "user", content: input }],
          temperature: parseFloat(temperature),
          max_tokens: parseInt(maxTokens, 10),
          top_p: parseFloat(topP),
          frequency_penalty: parseFloat(frequencyPenalty),
          presence_penalty: parseFloat(presencePenalty),
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      const aiMessage = { sender: 'AI', text: response.data.choices[0].message.content, avatar: './images/AIProfile.png' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { sender: 'AI', text: 'Error communicating with OpenAI.', avatar: './images/AIProfile.png' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
    setInput('');
  };

  return (
    <div className="chat">
      <div className="settings-box">
        <label>Model:<select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
        </select></label>
        <label>Temperature:<input type="range" min="0" max="1" step="0.01" value={temperature} onChange={(e) => setTemperature(e.target.value)} /></label>
        <label>Max Tokens:<input type="number" value={maxTokens} onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))} /></label>
        <label>Top P:<input type="range" min="0" max="1" step="0.01" value={topP} onChange={(e) => setTopP(e.target.value)} /></label>
        <label>Frequency Penalty:<input type="number" step="0.01" value={frequencyPenalty} onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))} /></label>
        <label>Presence Penalty:<input type="number" step="0.01" value={presencePenalty} onChange={(e) => setPresencePenalty(parseFloat(e.target.value))} /></label>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <img src={msg.avatar} alt={`${msg.sender} avatar`} className="avatar" />
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
      <button onClick={sendMessage}>Send</button>
      <button onClick={() => deleteChat(chatId)} className="delete-chat">Delete Chat</button>
    </div>
  );
}

export default Chat;
