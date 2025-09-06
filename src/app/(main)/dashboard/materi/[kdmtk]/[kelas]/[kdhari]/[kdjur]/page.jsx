"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  FileText,
  MessageSquare,
  ExternalLink,
  ArrowLeft,
  Loader2,
  Download,
  Eye,
  AlertCircle
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import Link from "next/link";

const MateriPage = () => {
  const [materiData, setMateriData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const params = useParams();
  const router = useRouter();
  
  const { kdmtk, kelas, kdhari, kdjur } = params;

  // Fetch data materi
  const fetchMateriData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('token_elearning');
      
      const response = await fetch(`/api/v1/mhslearning/materi/${kdmtk}/${kelas}/${kdhari}/${kdjur}`, {
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
      setMateriData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching materi data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (kdmtk && kelas && kdhari && kdjur) {
      fetchMateriData();
    }
  }, [kdmtk, kelas, kdhari, kdjur]);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Render action buttons
  const renderActionButtons = (item) => {
    return (
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button
          asChild
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Link
            href={`/dashboard/materi/tugas/${item.id_materi}`}
            className="flex items-center gap-2"
          >
            <Eye className="h-3 w-3" />
            Lihat
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
        
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <a
            href={`https://e-learning.unitomo.ac.id/forum/materi/${item.id_materi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-3 w-3" />
            Forum
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    );
  };

  

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-muted-foreground">Memuat data materi...</p>
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
            Gagal memuat data materi: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const data = materiData?.data || [];
  
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
            <h1 className="text-3xl font-bold tracking-tight">Materi Pembelajaran</h1>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Daftar Materi</CardTitle>
              <CardDescription>
                Materi pembelajaran untuk mata kuliah {kdmtk} kelas {kelas}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {data.length} Pertemuan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak Ada Materi</h3>
              <p className="text-muted-foreground">
                Belum ada materi yang tersedia untuk mata kuliah ini
              </p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-center font-semibold w-16">
                      Pertemuan
                    </TableHead>
                    <TableHead className="font-semibold min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Judul Materi
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Dibuat
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold min-w-[150px]">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow 
                      key={item.id_materi || index} 
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="text-center">
                        <Badge variant="default" className="font-mono">
                          {item.pertemuan}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="font-semibold">{item.judul || "-"}</div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <span className="text-sm">{formatDate(item.created_on)}</span>
                        {item.edited_on && (
                          <div className="text-xs text-muted-foreground">
                            Edit: {formatDate(item.edited_on)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {renderActionButtons(item)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="mt-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    Menampilkan {data.length} materi pembelajaran
                  </div>
                </TableCaption>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MateriPage;