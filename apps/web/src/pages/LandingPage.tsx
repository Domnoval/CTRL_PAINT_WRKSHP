import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1 className="text-5xl font-bold text-center text-indigo-300 mb-8">
        🌟 AI Creativity Workshop
      </h1>
      <p className="text-center text-indigo-200 text-xl mb-12">
        Unleash your quantum creative potential in collaborative mystical experiences
      </p>
      <div className="flex justify-center gap-4">
        <a href="/auth" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg">
          Begin Journey
        </a>
      </div>
    </div>
  );
};
