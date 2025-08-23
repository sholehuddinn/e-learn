"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Users, Award, Zap, ArrowRight, Play, CheckCircle, Star, GraduationCap, Globe, Clock, Trophy, User } from 'lucide-react';

export default function IndexPage() {

  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Animate stats counter
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleGetStarted = () => {
    router.push('/login');
  };

  const stats = [
    { icon: Users, label: 'Total Mahasiswa', value: '15,000+', color: 'text-blue-400' },
    { icon: BookOpen, label: 'Course Tersedia', value: '500+', color: 'text-green-400' },
    { icon: GraduationCap, label: 'Dosen Aktif', value: '200+', color: 'text-purple-400' },
    { icon: Award, label: 'Sertifikat Dikeluarkan', value: '12,000+', color: 'text-orange-400' }
  ];

  const features = [
    {
      icon: Globe,
      title: 'Akses Dimana Saja',
      description: 'Belajar kapan saja dan dimana saja dengan platform yang responsive'
    },
    {
      icon: Clock,
      title: 'Pembelajaran Fleksibel',
      description: 'Atur jadwal belajar sesuai dengan waktu yang Anda miliki'
    },
    {
      icon: Trophy,
      title: 'Sertifikat Resmi',
      description: 'Dapatkan sertifikat resmi setelah menyelesaikan course'
    },
    {
      icon: Zap,
      title: 'Interactive Learning',
      description: 'Pembelajaran interaktif dengan quiz, assignment, dan diskusi'
    }
  ];

  const floatingIcons = [
    { icon: BookOpen, delay: 0 },
    { icon: GraduationCap, delay: 1 },
    { icon: Award, delay: 2 },
    { icon: Users, delay: 3 },
    { icon: Globe, delay: 4 },
    { icon: Trophy, delay: 5 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      {mounted && floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute opacity-5 text-gray-400 animate-bounce`}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <item.icon size={20} />
        </div>
      ))}

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">E-Learning</h1>
            <p className="text-sm text-gray-400">Unitomo</p>
          </div>
        </div>
        
        <button
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
        >
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Login
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transition-all duration-1000 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Masa Depan
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Pembelajaran Digital
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                Platform e-learning terdepan Universitas Dr. Soetomo untuk pembelajaran yang 
                <span className="text-blue-400"> interaktif</span>, 
                <span className="text-purple-400"> fleksibel</span>, dan 
                <span className="text-green-400"> inovatif</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Mulai Sekarang
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button
                  onClick={handleLoginClick}
                  className="border-2 border-gray-600 hover:border-blue-500 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 group backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Sudah Punya Akun?
                  </div>
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-lg bg-gray-900/40 rounded-2xl p-6 border border-gray-700/30 transition-all duration-300 hover:scale-105 hover:bg-gray-800/50 ${
                    currentStat === index ? 'ring-2 ring-blue-500/50 shadow-xl' : ''
                  }`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Mengapa Memilih 
              <span className="text-blue-400"> Unitomo</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Pengalaman pembelajaran terbaik dengan teknologi terdepan dan metode yang terbukti efektif
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`backdrop-blur-lg bg-gray-900/40 rounded-3xl p-8 border border-gray-700/30 transition-all duration-1000 hover:scale-105 hover:bg-gray-800/50 group ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className={`backdrop-blur-lg bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-12 border border-blue-500/20 text-center transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '1200ms' }}>
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Siap Memulai Perjalanan Belajar Anda?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan mahasiswa yang telah merasakan pengalaman pembelajaran digital terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
              >
                <div className="flex items-center justify-center">
                  <User className="w-5 h-5 mr-2" />
                  Login Sekarang
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-6 lg:px-12 py-12 border-t border-gray-800/50">
          <div className="text-center text-gray-500">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-300">E-Learning Unitomo</span>
            </div>
            <p className="mb-2">© 2025 Universitas Dr. Soetomo Surabaya</p>
            <p>Platform Pembelajaran Digital Terdepan</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}