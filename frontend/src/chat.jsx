import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Append user message to the messages array
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col justify-between p-4">
        <div className="overflow-y-auto flex-grow p-2 border-b-2 border-gray-200">
          {/* Display messages */}
          {messages.length === 0 ? (
            <div className="text-gray-500">Chat history is empty for now...</div>
          ) : (
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg p-2 max-w-xs ${
                      msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messageEndRef} /> {/* This ensures scrolling to the latest message */}
        </div>

        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
