import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Globe, 
  Edit2, 
  Camera,
  Settings,
  Linkedin,
  Twitter,
  Github,
  Link as LinkIcon
} from 'lucide-react';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    joinDate: '',
    bio: '',
    company: '',
    website: '',
    skills: [],
    stats: {
      projects: 0,
      connections: 0,
      recommendations: 0
    }
  });

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    console.log("this is user token", userToken);

    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        console.log("this is decoded token", decodedToken);
        
        // Assuming your token structure has user data in decodedToken.data
        // Adjust this based on your actual token structure
        const userFromToken = decodedToken.data || decodedToken.user || decodedToken;
        
        setUserData(prev => ({
          ...prev,
          name: userFromToken.name || '',
          title: userFromToken.title || userFromToken.position || '',
          email: userFromToken.email || '',
          phone: userFromToken.phone || userFromToken.phoneNumber || '',
          location: userFromToken.location || userFromToken.address || '',
          joinDate: userFromToken.joinDate || userFromToken.createdAt || '',
          bio: userFromToken.bio || userFromToken.description || '',
          company: userFromToken.company || userFromToken.organization || '',
          website: userFromToken.website || userFromToken.portfolio || '',
          skills: userFromToken.skills || [],
          stats: {
            projects: userFromToken.projects || userFromToken.stats?.projects || 0,
            connections: userFromToken.connections || userFromToken.stats?.connections || 0,
            recommendations: userFromToken.recommendations || userFromToken.stats?.recommendations || 0
          }
        }));
      } catch (error) {
        console.log('Error decoding token:', error);
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to format date if needed
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
            <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition">
              <Camera size={20} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-8">
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name || 'User'}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-6 gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                <LinkIcon size={16} /> Connect
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2">
                <Mail size={16} /> Message
              </button>
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <Edit2 size={16} /> {isEditing ? 'Save' : 'Edit Profile'}
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Settings size={20} />
              </button>
            </div>

            {/* User Info */}
            <div className="mt-12">
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-3xl font-bold bg-gray-50 border rounded-lg px-3 py-1 mb-2 w-full max-w-md"
                  placeholder="Enter your name"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData.first_Name || 'User Name'}
                </h1>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={userData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-lg text-gray-600 bg-gray-50 border rounded-lg px-3 py-1 w-full max-w-md"
                  placeholder="Enter your title"
                />
              ) : (
                <p className="text-lg text-gray-600">
                  {userData.title || 'Your Professional Title'}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <Briefcase size={18} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-gray-50 border rounded px-2 py-1"
                      placeholder="Company"
                    />
                  ) : (
                    <span>{userData.company || 'Company name'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={18} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-gray-50 border rounded px-2 py-1"
                      placeholder="Location"
                    />
                  ) : (
                    <span>{userData.location || 'Location'}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={18} />
                  <span>Joined {formatDate(userData.joinDate) || 'Joined date'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">About</h2>
                {isEditing && (
                  <button className="text-blue-500 hover:text-blue-600">
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
              {isEditing ? (
                <textarea
                  value={userData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full h-40 p-3 border rounded-lg bg-gray-50"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {userData.bio || 'No bio added yet. Add a bio to tell people about yourself.'}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                {isEditing && (
                  <button className="text-blue-500 hover:text-blue-600">
                    <Edit2 size={18} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {userData.skills && userData.skills.length > 0 ? (
                  userData.skills.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
                {isEditing && (
                  <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-full hover:border-gray-400 hover:text-gray-600 transition">
                    + Add Skill
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-gray-50 border rounded px-2 py-1"
                        placeholder="email@example.com"
                      />
                    ) : (
                      <p className="font-medium">{userData.email || 'No email provided'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-gray-50 border rounded px-2 py-1"
                        placeholder="Phone number"
                      />
                    ) : (
                      <p className="font-medium">{userData.phone || 'No phone number provided'}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    {isEditing ? (
                      <input
                        type="url"
                        value={userData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full bg-gray-50 border rounded px-2 py-1"
                        placeholder="yourwebsite.com"
                      />
                    ) : userData.website ? (
                      <a 
                        href={`https://${userData.website}`} 
                        className="font-medium text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userData.website}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-500">No website provided</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{userData.stats.projects}</p>
                  <p className="text-sm text-gray-600">Projects</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{userData.stats.connections}</p>
                  <p className="text-sm text-gray-600">Connections</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">{userData.stats.recommendations}</p>
                  <p className="text-sm text-gray-600">Recommendations</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Social Links</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Linkedin className="text-blue-600" size={20} />
                  </div>
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Twitter className="text-blue-400" size={20} />
                  </div>
                  <span className="font-medium">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Github className="text-gray-800" size={20} />
                  </div>
                  <span className="font-medium">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;