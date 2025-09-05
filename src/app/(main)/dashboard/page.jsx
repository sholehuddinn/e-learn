"use client"

import React, { useState, useEffect } from 'react';
import { Search, Eye, FileText, Filter, BookOpen, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter()

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
    router.push(`/dashboard/materi/${course.kdmtk}/${course.kelas}/${course.kdhari}/${course.kdjur}`)
  };

  const handleUjianClick = (course) => {
    router.push(`/dashboard/ujian/${course.kdmtk}`)
  };

  const filteredCourses = courses.filter(course =>
    course.namamtk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.kdmtk?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TableRowSkeleton = () => (
    <tr className="border-b border-gray-100">
      <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
      <td className="px-6 py-4 space-x-2">
        <Skeleton className="h-8 w-20 inline-block" />
        <Skeleton className="h-8 w-24 inline-block" />
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Dashboard Mahasiswa
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Kelola mata kuliah dan tugas Anda dengan mudah dan efisien
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari mata kuliah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              className="h-11 px-6 border-gray-200 hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              onClick={() => fetchCourses(true)}
              variant="outline"
              className="h-11 px-4 border-blue-200 text-blue-700 hover:bg-blue-50"
              title="Refresh data"
            >
              🔄
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              <strong>Terjadi Kesalahan:</strong> {error}
              <Button 
                onClick={fetchCourses}
                variant="outline"
                size="sm"
                className="ml-4 text-red-700 border-red-300 hover:bg-red-100"
              >
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {loading ? 'Memuat Data...' : 'Daftar Mata Kuliah'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {!loading && `${filteredCourses.length} mata kuliah tersedia`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kode MK
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Mata Kuliah
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Hari</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Jam</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading && (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))}
                  </>
                )}

                {!loading && !error && filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {searchTerm ? 'Tidak ada hasil' : 'Belum ada mata kuliah'}
                        </h3>
                        <p className="text-gray-500 mb-4">
                          {searchTerm 
                            ? 'Coba gunakan kata kunci lain' 
                            : 'Hubungi admin untuk mendaftarkan mata kuliah'}
                        </p>
                        {searchTerm && (
                          <Button 
                            variant="outline" 
                            onClick={() => setSearchTerm('')}
                          >
                            Reset Pencarian
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && !error && filteredCourses.length > 0 && (
                  <>
                    {filteredCourses.map((course, index) => (
                      <tr 
                        key={`${course.kdmtk}-${course.kelas}`}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                        style={{ 
                          transitionDelay: `${index * 50}ms`,
                          transition: 'all 0.3s ease-out'
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-600 font-semibold text-xs">
                                {course.kdmtk?.slice(0, 2)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {course.kdmtk}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {course.namamtk?.trim()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                            {course.hari}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{course.jam}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleUjianClick(course)}
                              size="sm"
                              variant="outline"
                              className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Ujian
                            </Button>
                            <Button 
                              onClick={() => handleMateriClick(course)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Detail
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}