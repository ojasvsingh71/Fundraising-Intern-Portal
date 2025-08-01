const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors([
  'http://localhoat:5173',
  "https://fundraising-intern-portal-omega.vercel.app"
]));
app.use(express.json());

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Aarav Mehta",
    email: "aarav@example.com",
    referralCode: "aarav2025",
    donationsRaised: 15750,
    rank: 1,
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    joinedDate: "2024-12-01",
    totalReferrals: 47,
    badges: ["Top Performer", "Early Bird", "Milestone Master"]
  },
  {
    id: 2,
    name: "Isha Sharma",
    email: "isha@example.com",
    referralCode: "isha2025",
    donationsRaised: 12400,
    rank: 2,
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    joinedDate: "2024-12-03",
    totalReferrals: 38,
    badges: ["Rising Star", "Community Builder"]
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan@example.com",
    referralCode: "rohan2025",
    donationsRaised: 9800,
    rank: 3,
    avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    joinedDate: "2024-12-05",
    totalReferrals: 29,
    badges: ["Consistent Contributor"]
  },
  {
    id: 4,
    name: "Ananya Pillai",
    email: "ananya@example.com",
    referralCode: "ananya2025",
    donationsRaised: 8200,
    rank: 4,
    avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    joinedDate: "2024-12-07",
    totalReferrals: 25,
    badges: ["Team Player"]
  },
  {
    id: 5,
    name: "Devansh Reddy",
    email: "devansh@example.com",
    referralCode: "devansh2025",
    donationsRaised: 6500,
    rank: 5,
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    joinedDate: "2024-12-10",
    totalReferrals: 18,
    badges: ["Newcomer"]
  }
];


const rewards = [
  {
    id: 1,
    title: "Bronze Badge",
    description: "Raise ₹1,000 in donations",
    threshold: 1000,
    icon: "🥉",
    unlocked: true
  },
  {
    id: 2,
    title: "Silver Badge",
    description: "Raise ₹5,000 in donations",
    threshold: 5000,
    icon: "🥈",
    unlocked: true
  },
  {
    id: 3,
    title: "Gold Badge",
    description: "Raise ₹10,000 in donations",
    threshold: 10000,
    icon: "🥇",
    unlocked: true
  },
  {
    id: 4,
    title: "Diamond Badge",
    description: "Raise ₹25,000 in donations",
    threshold: 25000,
    icon: "💎",
    unlocked: false
  },
  {
    id: 5,
    title: "Champion Badge",
    description: "Raise ₹50,000 in donations",
    threshold: 50000,
    icon: "🏆",
    unlocked: false
  }
];


// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Get current user data (mock login)
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = mockUsers.find(u => u.email === email) || mockUsers[0];
  res.json({ success: true, user });
});

// Get user dashboard data
app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
  res.json(user);
});

// Get leaderboard data
app.get('/api/leaderboard', (req, res) => {
  const sortedUsers = [...mockUsers].sort((a, b) => b.donationsRaised - a.donationsRaised);
  res.json(sortedUsers);
});

// Get rewards data
app.get('/api/rewards/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
  
  const userRewards = rewards.map(reward => ({
    ...reward,
    unlocked: user.donationsRaised >= reward.threshold
  }));
  
  res.json(userRewards);
});

// Get donation statistics
app.get('/api/stats/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
  
  // Mock monthly donation data
  const monthlyData = [
    { month: 'Jan', amount: 2500 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 2800 },
    { month: 'Apr', amount: 4100 },
    { month: 'May', amount: 3150 }
  ];
  
  res.json({
    totalRaised: user.donationsRaised,
    monthlyGoal: 5000,
    totalReferrals: user.totalReferrals,
    monthlyData
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});