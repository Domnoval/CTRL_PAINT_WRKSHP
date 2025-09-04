import React, { useState } from 'react';
import { useAuth } from '@/stores/auth';

export const QuantumAuth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp, resetPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      await signUp(email, password, fullName);
    } else {
      await signIn(email, password);
    }
  };

  return (
    <div className="quantum-auth">
      <h1 className="text-3xl font-bold text-center text-indigo-300 mb-8">
        {isSignUp ? '🌌 Join Quantum' : '🌀 Enter Portal'}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {isSignUp && (
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full mb-4 p-3 bg-indigo-900 rounded"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Quantum Email"
          className="w-full mb-4 p-3 bg-indigo-900 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mystical Password"
          className="w-full mb-4 p-3 bg-indigo-900 rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded"
        >
          {isLoading ? 'Connecting...' : (isSignUp ? 'Begin Journey' : 'Enter Portal')}
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-indigo-300 underline"
        >
          {isSignUp ? 'Already have access?' : 'Need quantum access?'}
        </button>
      </form>
    </div>
  );
};
