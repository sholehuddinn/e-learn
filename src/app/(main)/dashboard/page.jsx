"use client"

import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, MapPin, Users, Calendar, User, Bell, Search, Menu, X, Eye, FileText, LogOut, Home } from 'lucide-react';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token_elearning');
      
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login kembali.');
      }

      const response = await fetch('/api/v1/mhslearning', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCourses(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMateriClick = (course) => {
    const url = `/materi/${course.kdmtk}/${course.kelas}/${course.kdhari}/${course.kdjur}`;
    console.log('Navigate to materi:', url);
    // Handle navigation to materi page
  };

  const handleUjianClick = (course) => {
    const url = `/ujian/${course.kdmtk}`;
    console.log('Navigate to ujian:', url);
    // Handle navigation to ujian page
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token_elearning');
    console.log('Logout and redirect to login');
    // Handle logout
  };

  const filteredCourses = courses.filter(course =>
    course.namamtk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.kdmtk?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'Sudah' ? 'text-green-600' : 'text-yellow-600';
  };

  const getStatusBg = (status) => {
    return status === 'Sudah' ? 'bg-green-100 border-green-300' : 'bg-yellow-100 border-yellow-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-72 h-72 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-72 h-72 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 backdrop-blur-lg bg-white/95 border-r border-gray-200/80 shadow-xl transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">E-Learning</h1>
              <p className="text-xs text-gray-500">Unitomo</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <div className="text-xs uppercase text-gray-400 font-semibold mb-4">Menu Utama</div>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-100 text-blue-600 border border-blue-200 shadow-sm">
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>Semua Materi</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Ujian & Tugas</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <User className="w-5 h-5" />
            <span>Profil</span>
          </a>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border border-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 relative z-10">
        {/* Header */}
        <header className="backdrop-blur-lg bg-white/80 border-b border-gray-200/80 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard Mahasiswa</h1>
                <p className="text-sm text-gray-500">Selamat datang kembali!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari mata kuliah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600">Memuat data mata kuliah...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="backdrop-blur-lg bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-700">Terjadi Kesalahan</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
              <button
                onClick={fetchCourses}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !error && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Mata Kuliah Anda ({filteredCourses.length})
                </h2>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada mata kuliah</h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Tidak ada mata kuliah yang sesuai dengan pencarian Anda.' : 'Anda belum terdaftar di mata kuliah manapun.'}
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <div
                      key={course.kdmtk + course.kelas}
                      className={`backdrop-blur-lg bg-white/80 rounded-2xl border border-gray-200 p-6 transition-all duration-500 hover:scale-105 hover:bg-white/90 hover:shadow-xl group shadow-lg ${
                        mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Course Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                            {course.namamtk?.trim()}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-200 font-medium">
                              {course.kdmtk}
                            </span>
                            <span className="font-medium">Kelas {course.kelas}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(course.status)} ${getStatusColor(course.status)}`}>
                          {course.status}
                        </div>
                      </div>

                      {/* Course Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-gray-700">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">{course.hari}</span>
                          <Clock className="w-4 h-4 text-purple-600 ml-2" />
                          <span className="text-sm">{course.jam}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-700">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Ruang {course.kdruang}</span>
                          <Users className="w-4 h-4 text-orange-600 ml-2" />
                          <span className="text-sm font-medium">{course.sks} SKS</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={() => handleMateriClick(course)}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group/btn"
                        >
                          <div className="flex items-center justify-center">
                            <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Lihat Materi
                          </div>
                        </button>
                        <button
                          onClick={() => handleUjianClick(course)}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group/btn"
                        >
                          <div className="flex items-center justify-center">
                            <FileText className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Ujian & Tugas
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
}