import { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

export default function ChatWithProjects() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([
    'Areeb Ahmed sent you a connection request',
    'Shirish liked your message',
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const messageEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Sample project data with realistic project names and mentors
  const projects = [
    {
      name: 'Tic Tac Toe Game',
      description: 'A simple tic-tac-toe game using React and JavaScript.',
      techStack: 'React, JavaScript, CSS',
      status: 'Completed',
      theme: 'Game Development',
      mentor: 'John Smith',
    },
    {
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce application for buying and selling products.',
      techStack: 'React, Node.js, MongoDB',
      status: 'In Progress',
      theme: 'Web Development',
      mentor: 'Emily Johnson',
    },
    {
      name: 'Weather App',
      description: 'An application displaying real-time weather data using an external API.',
      techStack: 'React, OpenWeatherMap API, CSS',
      status: 'Completed',
      theme: 'Data Visualization',
      mentor: 'Michael Brown',
    },
    {
      name: 'Portfolio Website',
      description: 'A personal portfolio website showcasing projects and skills.',
      techStack: 'HTML, CSS, JavaScript',
      status: 'In Progress',
      theme: 'Web Design',
      mentor: 'Sophia Martinez',
    },
    {
      name: 'Chat Application',
      description: 'A real-time chat app with notifications and user authentication.',
      techStack: 'React, Firebase, Tailwind CSS',
      status: 'Planning',
      theme: 'Communication',
      mentor: 'Liam Davis',
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      {/* Left side project cards */}
      <div className="grid grid-cols-1 gap-4 w-64">
        {projects.slice(0, 3).map((project, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-indigo-600">{project.name}</h3>
            <p className="text-black">{project.description}</p>
            <p className="text-black"><strong>Tech Stack:</strong> {project.techStack}</p>
            <p className="text-black"><strong>Status:</strong> {project.status}</p>
            <p className="text-black"><strong>Theme:</strong> {project.theme}</p>
            <p className="text-black"><strong>Mentor:</strong> {project.mentor}</p>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col justify-between p-4 mx-4">
        {/* Header with Notification Bell */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
          <div className="relative">
            <button onClick={toggleNotifications} className="text-indigo-600 hover:text-indigo-800">
              <FaBell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="p-2 border-b last:border-b-0 border-gray-200 text-gray-900">
                      {notification}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No new notifications</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="overflow-y-auto flex-grow p-2 border-b-2 border-gray-200">
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
          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
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

      {/* Right side project cards */}
      <div className="grid grid-cols-1 gap-4 w-64">
        {projects.slice(3).map((project, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-indigo-600">{project.name}</h3>
            <p className="text-black">{project.description}</p>
            <p className="text-black"><strong>Tech Stack:</strong> {project.techStack}</p>
            <p className="text-black"><strong>Status:</strong> {project.status}</p>
            <p className="text-black"><strong>Theme:</strong> {project.theme}</p>
            <p className="text-black"><strong>Mentor:</strong> {project.mentor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
