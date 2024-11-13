import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the user data
    const userData = {
      name,
      age,
      interest,
      role
    };

    try {
      // Make the POST request to create a user
      const response = await axios.post('http://localhost:3007/user/createUser', userData);

      if (response.data.success) {
        // Redirect to the chat page on successful user creation
        navigate('/chat');
      } else {
        alert('User creation failed!');
      }
    } catch (error) {
      console.error('There was an error creating the user!', error);
      alert('Error occurred while creating user!');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-900">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-900">
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            />
          </div>
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-900">
              Interest
            </label>
            <input
              id="interest"
              name="interest"
              type="text"
              required
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-1.5 text-white font-semibold hover:bg-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
