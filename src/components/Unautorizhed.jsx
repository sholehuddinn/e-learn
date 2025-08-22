"use client"

import React, { useState, useEffect } from 'react';
import { ShieldX, Home, ArrowLeft, AlertTriangle, Lock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingIcons = [
    { icon: Lock, delay: 0 },
    { icon: ShieldX, delay: 1 },
    { icon: AlertTriangle, delay: 2 },
    { icon: BookOpen, delay: 3 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
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
          <item.icon size={24} />
        </div>
      ))}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Error Icon with Animation */}
          <div className={`text-center mb-8 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full animate-pulse"></div>
              <div className="relative bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center shadow-lg border border-red-500/30">
                <ShieldX className="w-10 h-10 text-red-400" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-100 mb-2">
              401
            </h1>
            <h2 className="text-2xl font-semibold text-red-400 mb-2">
              Akses Ditolak
            </h2>
            <p className="text-gray-400 text-lg">Anda tidak memiliki izin untuk mengakses halaman ini</p>
          </div>

          {/* Error Card */}
          <div className={`backdrop-blur-lg bg-gray-900/40 rounded-3xl shadow-2xl border border-gray-700/30 p-8 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            
            <div className="space-y-6">
              {/* Error Details */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Mengapa saya melihat halaman ini?</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Anda belum login ke sistem</li>
                      <li>• Sesi login Anda telah berakhir</li>
                      <li>• Anda tidak memiliki hak akses yang diperlukan</li>
                      <li>• Role pengguna Anda tidak sesuai</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Login Button */}
                <Link
                  type="button"
                  href={"/login"}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className="flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-2" />
                    <span>Login ke Akun Anda</span>
                  </div>
                </Link>

                {/* Navigation Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    type="button"
                    href={"/login"}
                    className="flex items-center justify-center px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-gray-200 font-medium rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 group"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Kembali
                  </Link>
                  <Link
                    type="button"
                    href={"/login"}
                    className="flex items-center justify-center px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-gray-200 font-medium rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50 group"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Beranda
                  </Link>
                </div>
              </div>

              {/* Help Section */}
              <div className="text-center pt-4 border-t border-gray-700/30">
                <p className="text-gray-500 text-sm mb-2">
                  Butuh bantuan?
                </p>
                <div className="space-x-4">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors relative group">
                    Hubungi Administrator
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <span className="text-gray-600">•</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors relative group">
                    Pusat Bantuan
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`text-center mt-8 text-sm text-gray-600 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <p>© 2025 Universitas Dr. Soetomo Surabaya</p>
            <p>E-Learning Platform</p>
          </div>
        </div>
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