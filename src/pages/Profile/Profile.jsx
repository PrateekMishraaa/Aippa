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
import Swal from 'sweetalert2';
import { useTheme } from "@/context/ThemeContext/ThemeContext";

const Profile = () => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({
    name: '',
    firstName: '',
    lastName: '',
    middleName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    dob: '',
    joinDate: '',
    bio: '',
    company: '',
    website: '',
    status: '',
    type: '',
    skills: [],
    stats: {
      projects: 0,
      connections: 0,
      recommendations: 0
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Theme based classes - FIXED for proper light/dark mode
  const isDark = theme === 'dark';

  // Light Mode: White background, Black text
  // Dark Mode: Black background, White text
  const containerClasses = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const cardClasses = isDark ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800';
  const borderClasses = isDark ? 'border-gray-700' : 'border-gray-300';
  const inputClasses = isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300';
  const mutedTextClasses = isDark ? 'text-gray-400' : 'text-gray-600';
  const placeholderClasses = isDark ? 'placeholder-gray-500' : 'placeholder-gray-400';
  const buttonSecondaryClasses = isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300';
  const shadowClasses = isDark ? 'shadow-gray-950' : 'shadow-gray-200';
  const avatarBorderClasses = isDark ? 'border-gray-800' : 'border-white';

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userToken = localStorage.getItem('jwt');
        
        if (!userToken) {
          console.log("No JWT token found in localStorage");
          Swal.fire({
            icon: 'info',
            title: 'Not Logged In',
            text: 'Please login to view your profile'
          });
          setLoading(false);
          return;
        }

        console.log("JWT Token found");
        
        const decodedToken = jwtDecode(userToken);
        console.log("Decoded JWT token:", decodedToken);

        const userInfo = decodedToken?.email;
        
        if (userInfo) {
          console.log("User info from JWT:", userInfo);
          
          const fullName = [userInfo.first_name, userInfo.middle_name, userInfo.last_name]
            .filter(name => name && name.trim() !== '')
            .join(' ');
          
          const formatDOB = (dobString) => {
            if (!dobString) return 'Not specified';
            try {
              const dob = new Date(dobString);
              return dob.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            } catch (e) {
              return dobString;
            }
          };

          const formatJoinDate = (iatTimestamp) => {
            if (!iatTimestamp) return 'Not available';
            try {
              const joinDate = new Date(iatTimestamp * 1000);
              return joinDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              });
            } catch (e) {
              return 'Not available';
            }
          };

          setUserData({
            name: fullName,
            firstName: userInfo.first_name || '',
            lastName: userInfo.last_name || '',
            middleName: userInfo.middle_name || '',
            title: userInfo.position || userInfo.role || 'Member',
            email: userInfo.email || '',
            phone: userInfo.contact ? userInfo.contact.toString() : 'Not provided',
            location: userInfo.address || userInfo.city || 'Location not set',
            dob: formatDOB(userInfo.dob),
            joinDate: formatJoinDate(decodedToken.iat),
            bio: userInfo.bio || userInfo.about || `Hello! I'm ${fullName}. Welcome to my profile.`,
            company: userInfo.instituteId || userInfo.organization || 'Not specified',
            website: userInfo.website || userInfo.portfolio || '',
            status: userInfo.status || 'active',
            type: userInfo.type || 'User',
            skills: Array.isArray(userInfo.skills) ? userInfo.skills : ['Communication', 'Teamwork', 'Problem Solving'],
            stats: {
              projects: userInfo.projects || 0,
              connections: userInfo.connections || 0,
              recommendations: userInfo.recommendations || 0
            }
          });
        } else {
          console.warn("No email object found in JWT token");
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Token',
            text: 'Your token does not contain user information'
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error processing JWT token:", error);
        Swal.fire({
          icon: 'error',
          title: 'Token Error',
          text: `Failed to decode JWT token: ${error.message}`
        });
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    if (isEditing) {
      console.log('Saving user data:', userData);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        timer: 2000
      });
    }
    setIsEditing(prev => !prev);
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setUserData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${containerClasses} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className={`mt-4 ${mutedTextClasses}`}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${containerClasses} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} overflow-hidden mb-8`}>
          <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-700">
            <button 
              className={`absolute top-4 right-4 p-2 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-white'} transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => Swal.fire('Coming Soon', 'Profile cover photo upload will be available soon.', 'info')}
            >
              <Camera size={20} />
            </button>
          </div>

          <div className="relative px-8 pb-8">
            <div className="absolute -top-16 left-8">
              <div className={`w-32 h-32 rounded-2xl border-4 ${avatarBorderClasses} shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}>
                {userData.name ? (
                  <div className="text-white text-4xl font-bold">
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User size={48} className="text-white" />
                )}
              </div>
            </div>

            <div className="flex justify-end pt-6 gap-3">
              <button className={`px-4 py-2 border ${borderClasses} ${mutedTextClasses} rounded-lg flex items-center gap-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                <LinkIcon size={16} /> Connect
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Mail size={16} /> Message
              </button>
              <button
                onClick={handleEdit}
                className={`px-4 py-2 ${buttonSecondaryClasses} rounded-lg flex items-center gap-2 transition-colors`}
              >
                <Edit2 size={16} />
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </button>
              <button className={`p-2 border ${borderClasses} ${mutedTextClasses} rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                <Settings size={20} />
              </button>
            </div>

            <div className="mt-12">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    value={userData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className={`text-3xl font-bold ${inputClasses} rounded-lg px-3 py-2 w-full max-w-md ${placeholderClasses}`}
                    placeholder="Full Name"
                  />
                  <div className="flex gap-2">
                    <input
                      value={userData.firstName}
                      onChange={e => handleInputChange('firstName', e.target.value)}
                      className={`${inputClasses} rounded px-3 py-1 ${placeholderClasses}`}
                      placeholder="First Name"
                    />
                    <input
                      value={userData.middleName}
                      onChange={e => handleInputChange('middleName', e.target.value)}
                      className={`${inputClasses} rounded px-3 py-1 ${placeholderClasses}`}
                      placeholder="Middle Name"
                    />
                    <input
                      value={userData.lastName}
                      onChange={e => handleInputChange('lastName', e.target.value)}
                      className={`${inputClasses} rounded px-3 py-1 ${placeholderClasses}`}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className={mutedTextClasses}>
                    {userData.firstName} {userData.middleName && `${userData.middleName} `}{userData.lastName}
                  </p>
                </div>
              )}

              {isEditing ? (
                <input
                  value={userData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  className={`text-lg ${mutedTextClasses} ${inputClasses} rounded-lg px-3 py-1 mt-2 w-full max-w-md ${placeholderClasses}`}
                  placeholder="Your Title"
                />
              ) : (
                <p className={`text-lg ${mutedTextClasses} mt-2`}>{userData.title}</p>
              )}

              <div className={`flex flex-wrap gap-4 mt-4 ${mutedTextClasses}`}>
                <span className="flex items-center gap-2">
                  <Briefcase size={18} />
                  {isEditing ? (
                    <input
                      value={userData.company}
                      onChange={e => handleInputChange('company', e.target.value)}
                      className={`${inputClasses} rounded px-2 py-1 ${placeholderClasses}`}
                      placeholder="Company/Institute"
                    />
                  ) : (
                    userData.company
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {isEditing ? (
                    <input
                      value={userData.location}
                      onChange={e => handleInputChange('location', e.target.value)}
                      className={`${inputClasses} rounded px-2 py-1 ${placeholderClasses}`}
                      placeholder="Location"
                    />
                  ) : (
                    userData.location
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={18} /> Joined {userData.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">About</h2>
              {isEditing ? (
                <textarea
                  value={userData.bio}
                  onChange={e => handleInputChange('bio', e.target.value)}
                  className={`w-full h-40 p-3 ${inputClasses} rounded-lg ${placeholderClasses}`}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className={mutedTextClasses}>{userData.bio}</p>
              )}
            </div>

            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`font-medium ${mutedTextClasses}`}>First Name</p>
                  {isEditing ? (
                    <input
                      value={userData.firstName}
                      onChange={e => handleInputChange('firstName', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded`}
                    />
                  ) : (
                    <p>{userData.firstName}</p>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses}`}>Middle Name</p>
                  {isEditing ? (
                    <input
                      value={userData.middleName}
                      onChange={e => handleInputChange('middleName', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded`}
                    />
                  ) : (
                    <p>{userData.middleName || 'Not specified'}</p>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses}`}>Last Name</p>
                  {isEditing ? (
                    <input
                      value={userData.lastName}
                      onChange={e => handleInputChange('lastName', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded`}
                    />
                  ) : (
                    <p>{userData.lastName}</p>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses}`}>Date of Birth</p>
                  {isEditing ? (
                    <input
                      type="date"
                      value={userData.dob}
                      onChange={e => handleInputChange('dob', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded`}
                    />
                  ) : (
                    <p>{userData.dob}</p>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses}`}>Status</p>
                  <p className={`px-3 py-1 rounded-full inline-block ${
                    userData.status === 'active' 
                      ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                      : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                  }`}>
                    {userData.status || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses}`}>User Type</p>
                  <p>{userData.type}</p>
                </div>
              </div>
            </div>

            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              {isEditing ? (
                <input
                  value={userData.skills.join(', ')}
                  onChange={e => handleInputChange('skills', e.target.value.split(',').map(s => s.trim()))}
                  className={`w-full p-3 ${inputClasses} rounded-lg ${placeholderClasses}`}
                  placeholder="Add skills separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {userData.skills && userData.skills.length > 0 ? (
                    userData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full ${
                          isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className={mutedTextClasses}>No skills added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <p className={`font-medium ${mutedTextClasses} flex items-center`}>
                    <Mail className="mr-2" size={18} /> Email
                  </p>
                  {isEditing ? (
                    <input
                      value={userData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded`}
                      type="email"
                    />
                  ) : (
                    <p>{userData.email}</p>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses} flex items-center`}>
                    <Phone className="mr-2" size={18} /> Phone
                  </p>
                  {isEditing ? (
                    <input
                      value={userData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded`}
                      type="tel"
                    />
                  ) : (
                    <p>{userData.phone}</p>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${mutedTextClasses} flex items-center`}>
                    <Globe className="mr-2" size={18} /> Website
                  </p>
                  {isEditing ? (
                    <input
                      value={userData.website}
                      onChange={e => handleInputChange('website', e.target.value)}
                      className={`w-full p-2 ${inputClasses} rounded ${placeholderClasses}`}
                      placeholder="Website"
                    />
                  ) : userData.website ? (
                    <a
                      href={`https://${userData.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                    >
                      {userData.website}
                    </a>
                  ) : (
                    <p className={mutedTextClasses}>No website</p>
                  )}
                </div>
              </div>
            </div>

            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">Stats</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3">
                  {isEditing ? (
                    <input
                      value={userData.stats.projects}
                      onChange={e => handleNestedInputChange('stats', 'projects', parseInt(e.target.value) || 0)}
                      className={`w-16 text-center text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} ${inputClasses} rounded`}
                      type="number"
                    />
                  ) : (
                    <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      {userData.stats.projects}
                    </p>
                  )}
                  <p className={mutedTextClasses}>Projects</p>
                </div>
                <div className="p-3">
                  {isEditing ? (
                    <input
                      value={userData.stats.connections}
                      onChange={e => handleNestedInputChange('stats', 'connections', parseInt(e.target.value) || 0)}
                      className={`w-16 text-center text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'} ${inputClasses} rounded`}
                      type="number"
                    />
                  ) : (
                    <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      {userData.stats.connections}
                    </p>
                  )}
                  <p className={mutedTextClasses}>Connections</p>
                </div>
                <div className="p-3">
                  {isEditing ? (
                    <input
                      value={userData.stats.recommendations}
                      onChange={e => handleNestedInputChange('stats', 'recommendations', parseInt(e.target.value) || 0)}
                      className={`w-16 text-center text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'} ${inputClasses} rounded`}
                      type="number"
                    />
                  ) : (
                    <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                      {userData.stats.recommendations}
                    </p>
                  )}
                  <p className={mutedTextClasses}>Recommendations</p>
                </div>
              </div>
            </div>

            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">Account Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={mutedTextClasses}>User ID:</span>
                  <span className="font-medium">#{userData.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedTextClasses}>Institute ID:</span>
                  <span className="font-medium">{userData.instituteId || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={mutedTextClasses}>Joined:</span>
                  <span className="font-medium">{userData.joinDate}</span>
                </div>
              </div>
            </div>

            <div className={`${cardClasses} rounded-2xl shadow-lg ${shadowClasses} p-6`}>
              <h2 className="text-xl font-bold mb-4">Social Links</h2>
              <div className="flex gap-4">
                <button 
                  onClick={() => Swal.fire('Coming Soon', 'LinkedIn integration coming soon!', 'info')}
                  className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                >
                  <Linkedin size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                </button>
                <button 
                  onClick={() => Swal.fire('Coming Soon', 'Twitter integration coming soon!', 'info')}
                  className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                >
                  <Twitter size={20} className={isDark ? 'text-blue-300' : 'text-blue-500'} />
                </button>
                <button 
                  onClick={() => Swal.fire('Coming Soon', 'GitHub integration coming soon!', 'info')}
                  className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                >
                  <Github size={20} className={mutedTextClasses} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;