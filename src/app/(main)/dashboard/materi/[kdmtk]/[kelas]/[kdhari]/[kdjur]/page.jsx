"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMateri } from "@/context/MateriContext";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BookOpen,
  Calendar,
  ArrowLeft,
  Loader2,
  AlertCircle,
  MessageSquare,
  ExternalLink,
  Eye,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const MateriPage = () => {
  const { kdmtk, kelas, kdhari, kdjur } = useParams();
  const router = useRouter();
  const [absenLoading, setAbsenLoading] = useState({});

  const { materiData, loading, error, fetchMateri } = useMateri();

  useEffect(() => {
    if (kdmtk && kelas && kdhari && kdjur) {
      fetchMateri({ kdmtk, kelas, kdhari, kdjur });
    }
  }, [kdmtk, kelas, kdhari, kdjur]);

  const data = materiData?.data || [];
  console.log("Materi Data:", data);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAbsen = async (id_materi) => {
    try {
      setAbsenLoading((prev) => ({ ...prev, [id_materi]: true }));
      const token = sessionStorage.getItem("token_elearning");

      const formData = new FormData();
      formData.append("kdmtk", kdmtk);
      formData.append("kelas", kelas);
      formData.append("id_materi", id_materi);

      const res = await fetch("/api/v1/mhslearning/absen", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Absen Berhasil",
          text: "Kamu berhasil bergabung di pertemuan ini.",
          timer: 2000,
          showConfirmButton: false,
        });

        fetchMateri({ kdmtk, kelas, kdhari, kdjur });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Absen",
          text: result.message || "Terjadi kesalahan.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setAbsenLoading((prev) => ({ ...prev, [id_materi]: false }));
    }
  };

  const renderActionButtons = (item) => {
    const isAttended = item.count === "1";
    const isAbsenLoading = absenLoading[item.id_materi];

    if (isAttended) {
      // Sudah absen - tampilkan tombol Lihat dan Forum
      return (
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            asChild
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Link
              href={`/dashboard/materi/show/${item.id_materi}`}
              className="flex items-center gap-2"
            >
              <Eye className="h-3 w-3" /> Lihat{" "}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      );
    } else {
      // Belum absen - tampilkan tombol Gabung Kelas
      return (
        <div className="flex justify-center">
          <Button
            onClick={() => handleAbsen(item.id_materi)}
            disabled={isAbsenLoading}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {isAbsenLoading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              <>
                <UserCheck className="h-3 w-3 mr-2" />
                Gabung Kelas
              </>
            )}
          </Button>
        </div>
      );
    }
  };

  const getStatusBadge = (item) => {
    const isAttended = item.count === "1";

    if (isAttended) {
      return (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
          <UserCheck className="h-3 w-3 mr-1" />
          Sudah Gabung
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Belum Gabung
        </Badge>
      );
    }
  };

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

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Gagal memuat data materi: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Materi Pembelajaran
          </h1>
        </div>
      </div>

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
              <BookOpen className="h-3 w-3" /> {data.length} Pertemuan
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
                        <BookOpen className="h-4 w-4" /> Judul Materi
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-center">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Dibuat
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold min-w-[180px]">
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
                        {item.judul || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(item)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatDate(item.created_on)}
                        </span>
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
                    <BookOpen className="h-4 w-4" /> Menampilkan {data.length}{" "}
                    materi pembelajaran
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
