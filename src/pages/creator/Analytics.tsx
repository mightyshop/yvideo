import React, { useState } from 'react';
import { Video, DollarSign, Clock, CheckCircle, X, Link as LinkIcon, FileText, ExternalLink, Calendar, Filter, Download, Music, Film, Globe, BarChart2, TrendingUp, Users, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

interface ContentStats {
  totalViews: number;
  averageWatchTime: string;
  totalEarnings: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface ViewingData {
  name: string;
  views: number;
  earnings: number;
}

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [contentType, setContentType] = useState('all');
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [appealText, setAppealText] = useState('');
  const [commentText, setCommentText] = useState('');

  const movieStats: ContentStats = {
    totalViews: 1250000,
    averageWatchTime: '45 minutes',
    totalEarnings: 12500.00,
    engagement: {
      likes: 45200,
      comments: 8900,
      shares: 12300
    }
  };

  const audioStats: ContentStats = {
    totalViews: 850000,
    averageWatchTime: '12 minutes',
    totalEarnings: 8500.00,
    engagement: {
      likes: 32100,
      comments: 5600,
      shares: 8900
    }
  };

  const monthlyData: ViewingData[] = [
    { name: 'Jan', views: 120000, earnings: 1200 },
    { name: 'Feb', views: 150000, earnings: 1500 },
    { name: 'Mar', views: 180000, earnings: 1800 },
    { name: 'Apr', views: 220000, earnings: 2200 },
    { name: 'May', views: 250000, earnings: 2500 },
    { name: 'Jun', views: 280000, earnings: 2800 }
  ];

  const geographicData = [
    { name: 'North America', views: 450000, earnings: 4500 },
    { name: 'Europe', views: 350000, earnings: 3500 },
    { name: 'Asia', views: 250000, earnings: 2500 },
    { name: 'South America', views: 150000, earnings: 1500 },
    { name: 'Africa', views: 100000, earnings: 1000 }
  ];

  const recentUGCSubmissions = [
    {
      id: 1,
      title: 'Product Review Video',
      creator: '@tech_reviewer',
      amount: 150.00,
      status: 'pending',
      thumbnail: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Unboxing Experience',
      creator: '@tech_reviewer',
      amount: 200.00,
      status: 'approved',
      thumbnail: 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Product Demo',
      creator: '@tech_reviewer',
      amount: 175.00,
      status: 'rejected',
      thumbnail: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentAffiliatePurchases = [
    {
      id: 1,
      title: 'Wireless Headphones',
      buyer: 'John Doe',
      price: 299.99,
      commission: 45.00,
      status: 'pending',
      thumbnail: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Gaming Mouse',
      buyer: 'Jane Smith',
      price: 89.99,
      commission: 13.50,
      status: 'approved',
      thumbnail: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Mechanical Keyboard',
      buyer: 'Mike Johnson',
      price: 129.99,
      commission: 19.50,
      status: 'rejected',
      thumbnail: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleAppeal = (submission: any) => {
    setSelectedSubmission(submission);
    setShowAppealModal(true);
  };

  const handleComment = (submission: any) => {
    setSelectedSubmission(submission);
    setShowCommentModal(true);
  };

  const submitAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appeal submitted:', { submission: selectedSubmission, appeal: appealText });
    setShowAppealModal(false);
    setAppealText('');
    setSelectedSubmission(null);
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Comment submitted:', { submission: selectedSubmission, comment: commentText });
    setShowCommentModal(false);
    setCommentText('');
    setSelectedSubmission(null);
  };

  const StatCard = ({ icon: Icon, label, value, subValue, color }: { icon: any, label: string, value: string | number, subValue?: string, color: string }) => (
    <div className={`bg-gray-800 p-6 rounded-xl ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
        <span className="text-sm font-medium text-gray-400">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {subValue && <div className="text-sm text-gray-400">{subValue}</div>}
    </div>
  );

  return (
    <div className="p-8">
      {/* Content Type Filter */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your content performance and earnings</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="bg-gray-800 rounded-lg px-4 py-2 text-white border border-gray-700"
          >
            <option value="all">All Content</option>
            <option value="movies">Movies Only</option>
            <option value="audio">Audio Only</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800 rounded-lg px-4 py-2 text-white border border-gray-700"
          >
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Movie Stats */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Film className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Movie Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Eye}
            label="Total Views"
            value={movieStats.totalViews.toLocaleString()}
            color="hover:bg-gray-700"
          />
          <StatCard
            icon={Clock}
            label="Average Watch Time"
            value={movieStats.averageWatchTime}
            color="hover:bg-gray-700"
          />
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value={`$${movieStats.totalEarnings.toFixed(2)}`}
            color="hover:bg-gray-700"
          />
          <StatCard
            icon={TrendingUp}
            label="Engagement"
            value={`${(movieStats.engagement.likes + movieStats.engagement.comments + movieStats.engagement.shares).toLocaleString()}`}
            subValue="Total Interactions"
            color="hover:bg-gray-700"
          />
        </div>
      </div>

      {/* Audio Stats */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Music className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold">Audio Performance</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Eye}
            label="Total Plays"
            value={audioStats.totalViews.toLocaleString()}
            color="hover:bg-gray-700"
          />
          <StatCard
            icon={Clock}
            label="Average Listen Time"
            value={audioStats.averageWatchTime}
            color="hover:bg-gray-700"
          />
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value={`$${audioStats.totalEarnings.toFixed(2)}`}
            color="hover:bg-gray-700"
          />
          <StatCard
            icon={TrendingUp}
            label="Engagement"
            value={`${(audioStats.engagement.likes + audioStats.engagement.comments + audioStats.engagement.shares).toLocaleString()}`}
            subValue="Total Interactions"
            color="hover:bg-gray-700"
          />
        </div>
      </div>

      {/* Viewing Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Monthly Viewing Trends</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="bg-gray-700 rounded-lg px-3 py-1 text-sm">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#3B82F6" name="Views" />
              <Line type="monotone" dataKey="earnings" stroke="#10B981" name="Earnings ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-gray-400" />
              <select className="bg-gray-700 rounded-lg px-3 py-1 text-sm">
                <option>All Regions</option>
                <option>Top Regions</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={geographicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="views" fill="#3B82F6" name="Views" />
              <Bar dataKey="earnings" fill="#10B981" name="Earnings ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent UGC Submissions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Recent UGC Submissions</h2>
        <div className="space-y-4">
          {recentUGCSubmissions.map(submission => (
            <div key={submission.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={submission.thumbnail} 
                  alt={submission.title} 
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{submission.title}</h3>
                      <p className="text-sm text-gray-400">{submission.creator}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-500 font-semibold">${submission.amount.toFixed(2)}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        submission.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAppeal(submission)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Appeal
                  </button>
                  <button 
                    onClick={() => handleComment(submission)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Add a Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Affiliate Purchases */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Recent Affiliate Purchases</h2>
        <div className="space-y-4">
          {recentAffiliatePurchases.map(purchase => (
            <div key={purchase.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={purchase.thumbnail} 
                  alt={purchase.title} 
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{purchase.title}</h3>
                      <p className="text-sm text-gray-400">{purchase.buyer}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      purchase.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      purchase.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">
                      Price: <span className="text-white">${purchase.price.toFixed(2)}</span>
                    </div>
                    <div className="text-gray-400">
                      Commission: <span className="text-green-500">${purchase.commission.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appeal Modal */}
      {showAppealModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Submit Appeal</h3>
              <button 
                onClick={() => setShowAppealModal(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={submitAppeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Appeal Reason</label>
                <textarea
                  value={appealText}
                  onChange={(e) => setAppealText(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Explain why you're appealing this decision..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Submit Appeal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Comment</h3>
              <button 
                onClick={() => setShowCommentModal(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={submitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Comment</label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Add your comment..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;