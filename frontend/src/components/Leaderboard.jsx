import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-xl text-gray-600">
            Top fundraisers making a difference in the world
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Second Place */}
            {leaderboard[1] && (
              <div className="text-center order-1 md:order-1">
                <div className="relative inline-block mb-4">
                  <img
                    src={leaderboard[1].avatar}
                    alt={leaderboard[1].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{leaderboard[1].name}</h3>
                <p className="text-2xl font-bold text-gray-700 mt-2">
                  ₹{leaderboard[1].donationsRaised.toLocaleString()}
                </p>
                <div className="mt-4 bg-gray-100 rounded-full py-2 px-4">
                  <span className="text-sm font-medium text-gray-600">Silver Medal</span>
                </div>
              </div>
            )}

            {/* First Place */}
            {leaderboard[0] && (
              <div className="text-center order-2 md:order-2 transform md:scale-110">
                <div className="relative inline-block mb-4">
                  <img
                    src={leaderboard[0].avatar}
                    alt={leaderboard[0].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{leaderboard[0].name}</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  ₹{leaderboard[0].donationsRaised.toLocaleString()}
                </p>
                <div className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full py-2 px-4">
                  <span className="text-sm font-bold">🏆 Champion</span>
                </div>
              </div>
            )}

            {/* Third Place */}
            {leaderboard[2] && (
              <div className="text-center order-3 md:order-3">
                <div className="relative inline-block mb-4">
                  <img
                    src={leaderboard[2].avatar}
                    alt={leaderboard[2].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-amber-400"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{leaderboard[2].name}</h3>
                <p className="text-2xl font-bold text-amber-600 mt-2">
                  ₹{leaderboard[2].donationsRaised.toLocaleString()}
                </p>
                <div className="mt-4 bg-amber-100 rounded-full py-2 px-4">
                  <span className="text-sm font-medium text-amber-700">Bronze Medal</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Full Rankings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {leaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                  index < 3 ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadge(user.rank)}`}>
                      {getRankIcon(user.rank)}
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {user.totalReferrals} referrals • Joined {new Date(user.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{user.donationsRaised.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round((user.donationsRaised / 50000) * 100)}% to next level
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ₹{leaderboard.reduce((sum, user) => sum + user.donationsRaised, 0).toLocaleString()}
            </div>
            <p className="text-gray-600">Total Raised</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {leaderboard.reduce((sum, user) => sum + user.totalReferrals, 0)}
            </div>
            <p className="text-gray-600">Total Referrals</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {leaderboard.length}
            </div>
            <p className="text-gray-600">Active Fundraisers</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;