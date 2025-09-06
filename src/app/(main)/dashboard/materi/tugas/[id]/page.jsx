"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle,
  XCircle,
  Download,
  Edit,
  ArrowLeft,
  Loader2,
  AlertCircle,
  BookOpen,
  Upload
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import Link from "next/link";

const TugasDetailPage = () => {
  const [tugasData, setTugasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const params = useParams();
  const router = useRouter();
  
  const { id } = params;

  // Fetch data tugas
  const fetchTugasData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = sessionStorage.getItem('token_elearning');
      
      const response = await fetch(`/api/v1/mhslearning/materi/tugas/${id}`, {
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
      setTugasData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tugas data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTugasData();
    }
  }, [id]);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    
    // Handle format DD-MM-YYYY
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const date = new Date(`${year}-${month}-${day}`);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    
    // Fallback untuk format lain
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  // Render status badge
  const renderStatus = (statusHtml) => {
    if (statusHtml.includes('success')) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Telah Mengumpulkan
        </Badge>
      );
    } else if (statusHtml.includes('danger')) {
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Belum Mengumpulkan
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          Status Tidak Diketahui
        </Badge>
      );
    }
  };

  // Handle download tugas
  const handleDownload = (idTugas) => {
    // Panggil function download_tugas seperti di response
    const downloadUrl = `https://e-learning.unitomo.ac.id/assets/uploads/file_tugas/`;
    window.open(`${downloadUrl}?id=${idTugas}`, '_blank');
  };

  // Handle edit tugas
  const handleEdit = (tugasMhsId) => {
    // Redirect ke halaman edit atau buka modal edit
    console.log('Edit tugas:', tugasMhsId);
    // Implementasi sesuai kebutuhan
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-muted-foreground">Memuat data tugas...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Gagal memuat data tugas: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const data = tugasData?.data || [];
  const tugas = data[0]; // Ambil tugas pertama

  if (!tugas) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tugas Tidak Ditemukan</h3>
            <p className="text-muted-foreground">
              Tidak ada tugas yang ditemukan untuk materi ini
              <span
                onClick={() => router.back()}
                className="text-blue-600 hover:underline ml-1"
              >
                Kembali ke daftar materi
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header dengan tombol kembali */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Detail Tugas</h1>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p className="text-lg font-semibold">{formatDate(tugas.waktu)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="mr-3">
              {tugas.status.includes('success') ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-1">
                {renderStatus(tugas.status)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <FileText className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-muted-foreground">File Tugas</p>
              <p className="text-lg font-semibold">
                {tugas.file_tugas ? "Ada" : "Tidak Ada"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Deskripsi Tugas
              </CardTitle>
              <CardDescription>
                Detail dan instruksi tugas untuk materi ini
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Deskripsi Tugas */}
            <div className="bg-muted/50 rounded-lg p-6">
              <div 
                className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
                dangerouslySetInnerHTML={{ __html: tugas.deskripsi }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Button
                onClick={() => handleDownload(tugas.id_tugas)}
                className="flex items-center gap-2"
                disabled={!tugas.file_tugas}
              >
                <Download className="h-4 w-4" />
                Download Tugas
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleEdit(183790)} // ID dari response
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Tugas
              </Button>

              {!tugas.status.includes('success') && (
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Tugas
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default TugasDetailPage;