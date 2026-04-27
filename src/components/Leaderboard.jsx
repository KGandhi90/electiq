import React, { useState, useEffect } from 'react';
import { getScoreDistribution } from '../api/firebase';

export default function Leaderboard({ userScore }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    getScoreDistribution().then(result => {
      setData(result);
      setIsLoading(false);
      // Trigger animation after render
      setTimeout(() => setAnimated(true), 100);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="mt-8 p-5 bg-surface1 border border-surface3 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <div className="w-32 h-4 skeleton rounded-full"></div>
          <div className="w-16 h-5 skeleton rounded-full"></div>
        </div>
        <div className="flex items-end gap-1 h-24">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-1">
              <div 
                className="w-full rounded-t-sm skeleton"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              ></div>
              <div className="w-3 h-3 skeleton rounded-full"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <div className="w-24 h-3 skeleton rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const { distribution, total } = data;
  const maxCount = Math.max(...Object.values(distribution), 1);

  return (
    <div className="mt-8 p-5 bg-surface1 border border-surface3 rounded-2xl">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-sm font-semibold text-dark">How others scored</h3>
          <p className="text-xs text-muted font-mono mt-0.5">{total} attempts worldwide</p>
        </div>
        <span className="bg-orange-50 border border-orange-200 text-xs text-orange-600 font-medium rounded-full px-2.5 py-1">
          🔥 Firebase
        </span>
      </div>

      <div className="flex items-end gap-1 h-24">
        {Array.from({ length: 11 }).map((_, score) => {
          const count = distribution[score] || 0;
          const isUserScore = score === userScore;
          
          return (
            <div key={score} className="flex flex-col items-center flex-1 gap-1">
              <div 
                className={`w-full rounded-t-sm transition-all duration-700 ${isUserScore ? 'bg-saffron' : 'bg-surface3'}`}
                style={{ height: animated ? `${(count / maxCount) * 100}%` : '0%' }}
              ></div>
              <span className="text-xs font-mono text-muted">{score}</span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted mt-3">
        <span className="text-saffron">■</span> Your score: {userScore}/10
      </p>
    </div>
  );
}
