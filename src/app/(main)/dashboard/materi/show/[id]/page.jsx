"use client";

import { useParams, useRouter } from "next/navigation";
import { useMateri } from "@/context/MateriContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  User,
  FileText,
  ExternalLink,
  MessageSquare,
  Download,
  Clock,
  Edit,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function ShowMateriPage() {
  const { id } = useParams();
  const router = useRouter();
  const { materiData, loading, error } = useMateri();

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  // Amanin dulu
  const list = Array.isArray(materiData?.data) ? materiData.data : [];
  const materi = list.find((m) => m.id_materi == id);

  if (!materi) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-600" />
            </div>
            <CardTitle className="text-2xl text-gray-800">
              Materi Tidak Ditemukan
            </CardTitle>
            <CardDescription>
              Materi yang Anda cari tidak tersedia atau telah dihapus
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header dengan tombol kembali */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
      </div>

      {/* Card Info Materi */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0"
                >
                  Pertemuan {materi.pertemuan}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold mb-2">
                {materi.judul}
              </CardTitle>
              <CardDescription className="text-blue-100">
                Mata Kuliah: {materi.kdmtk} - Kelas {materi.kelas}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Metadata */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Dosen:</span>
              <span className="font-medium">{materi.kddosen}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Dibuat:</span>
              <span className="font-medium">
                {formatDate(materi.created_on)}
              </span>
            </div>
            {materi.edited_on && (
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Diubah:</span>
                <span className="font-medium">
                  {formatDate(materi.edited_on)}
                </span>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          {/* Konten Materi */}
          <div className="bg-muted/50 rounded-lg p-6">
            <div
              className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
              dangerouslySetInnerHTML={{ __html: materi.konten }}
            />
          </div>

          {/* File dan Link */}
          {(materi.file_materi || materi.file_materi2 || materi.link) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-green-600" />
                Resource Materi
              </h3>
              <div className="grid gap-3">
                {materi.file_materi && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="p-2 bg-green-100 rounded">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-800">
                        File Materi Utama
                      </p>
                      <p className="text-sm text-green-600">
                        {materi.file_materi}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <a
                        href={`/file/${materi.file_materi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>
                    </Button>
                  </div>
                )}

                {materi.file_materi2 && (
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="p-2 bg-blue-100 rounded">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">
                        File Materi Tambahan
                      </p>
                      <p className="text-sm text-blue-600">
                        {materi.file_materi2}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <a
                        href={`/file/${materi.file_materi2}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>
                    </Button>
                  </div>
                )}

                {materi.link && (
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="p-2 bg-purple-100 rounded">
                      <ExternalLink className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-purple-800">
                        Link Eksternal
                      </p>
                      <p className="text-sm text-purple-600 break-all">
                        {materi.link}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <a
                        href={materi.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Buka Link
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Daftar Materi
            </Button>

            <Button
              asChild
              className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
            >
              <Link
                href={`https://e-learning.unitomo.ac.id/forum/materi/${materi.id_materi}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-4 w-4" />
                Forum Diskusi
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
            <Button>
              <Link href={"/dashboard/materi/tugas/" + materi.id_materi}>
                {" "}
                Tugas
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Informasi</h4>
              <p className="text-sm text-blue-700">
                Pastikan Anda telah membaca seluruh materi dan mengunduh file
                yang diperlukan. Jika ada pertanyaan, silakan gunakan forum
                diskusi untuk berkomunikasi dengan dosen dan teman sekelas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
