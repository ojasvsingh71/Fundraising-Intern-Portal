import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useAuth } from '../contexts/AuthContext';
import { Lock, CheckCircle, Gift, Star } from 'lucide-react';

const Rewards = () => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/rewards/${user.id}`);
        const data = await response.json();
        setRewards(data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRewards();
    }
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const unlockedRewards = rewards.filter(reward => reward.unlocked);
  const lockedRewards = rewards.filter(reward => !reward.unlocked);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rewards & Achievements</h1>
          <p className="text-xl text-gray-600">
            Unlock badges and rewards as you reach fundraising milestones
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{unlockedRewards.length}</div>
              <p className="text-purple-100">Badges Earned</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                ₹{user.donationsRaised.toLocaleString()}
              </div>
              <p className="text-purple-100">Total Raised</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{lockedRewards.length}</div>
              <p className="text-purple-100">Goals Remaining</p>
            </div>
          </div>
        </div>

        {/* Unlocked Rewards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
            Your Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{reward.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{reward.title}</h3>
                  <p className="text-gray-600 mb-4">{reward.description}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-semibold">Unlocked!</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {unlockedRewards.length === 0 && (
            <div className="text-center py-12">
              <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No achievements unlocked yet. Keep fundraising to earn your first badge!</p>
            </div>
          )}
        </div>

        {/* Locked Rewards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-8 h-8 text-orange-500 mr-3" />
            Upcoming Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedRewards.map((reward) => {
              const progress = (user.donationsRaised / reward.threshold) * 100;
              const remaining = reward.threshold - user.donationsRaised;
              
              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gray-50 opacity-50"></div>
                  <div className="relative z-10">
                    <div className="text-center">
                      <div className="text-6xl mb-4 opacity-60">{reward.icon}</div>
                      <h3 className="text-xl font-bold text-gray-700 mb-2">{reward.title}</h3>
                      <p className="text-gray-500 mb-4">{reward.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>₹{user.donationsRaised.toLocaleString()}</span>
                          <span>₹{reward.threshold.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {Math.round(progress)}% complete
                        </p>
                      </div>

                      <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <Lock className="w-5 h-5" />
                        <span className="font-semibold">
                          ${remaining.toLocaleString()} to unlock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keep Going!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Every dollar you raise makes a real difference. The next milestone is within reach!
          </p>
          {lockedRewards.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <p className="text-lg font-semibold text-gray-900">
                Next Goal: {lockedRewards[0].title}
              </p>
              <p className="text-gray-600 mt-2">
                Only ₹{(lockedRewards[0].threshold - user.donationsRaised).toLocaleString()} away!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Rewards;