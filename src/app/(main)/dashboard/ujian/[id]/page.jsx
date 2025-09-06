"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  FileText,
  ExternalLink,
  AlertCircle,
  Loader2,
  ArrowLeft
} from "lucide-react";

import { useExam } from "@/context/ExamContext"; // <-- pakai context

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

const DaftarUjian = () => {
  const { exams } = useExam(); // ✅ ambil dari global state
  const params = useParams();
  const router = useRouter();
  const kdmtk = params?.id;

  // filter exam berdasarkan kdmtk dari url
  const examData = useMemo(() => {
    if (!kdmtk) return exams;
    return exams.filter(
      (item) => item.kdmtk?.toLowerCase() === kdmtk.toLowerCase()
    );
  }, [exams, kdmtk]);

  // Fungsi untuk format tanggal
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

  // Fungsi untuk render status ujian
  const renderExamStatus = (item) => {
    if (!item.id_ujian) {
      return (
        <Badge variant="destructive" className="items-center">
          <AlertCircle className="h-3 w-3" />
          Jadwal Belum Ada
        </Badge>
      );
    }

    return (
      <Button
        asChild
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <a
          href={`https://e-learning.unitomo.ac.id/mahasiswa/prepare/${item.id_ujian}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <FileText className="h-4 w-4" />
          Ikuti Ujian
          <ExternalLink className="h-3 w-3" />
        </a>
      </Button>
    );
  };

  // Loading state kalau context masih kosong (belum fetch)
  if (!exams) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-muted-foreground">Memuat data ujian...</p>
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
            className="flex items-center gap-2 br"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">Daftar Ujian</h1>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Data Ujian</CardTitle>
              <CardDescription>
                {kdmtk
                  ? `Ujian untuk mata kuliah ${kdmtk}`
                  : "Semua data ujian yang tersedia"}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {examData.length} Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {examData.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak Ada Data</h3>
              <p className="text-muted-foreground">
                {kdmtk
                  ? `Tidak ada data ujian untuk mata kuliah: ${kdmtk}`
                  : "Tidak ada data ujian tersedia saat ini"}
              </p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-center font-semibold">No</TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Mata Kuliah
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">Kode</TableHead>
                    <TableHead className="text-center font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4" />
                        Kelas
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">Tipe Ujian</TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Mulai
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Selesai
                      </div>
                    </TableHead>
                    <TableHead className="text-center font-semibold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examData.map((item, index) => (
                    <TableRow key={`${item.kdmtk}-${item.id_ujian}-${index}`} className="hover:bg-muted/50">
                      <TableCell className="text-center font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.namamtk || "-"}</TableCell>
                      <TableCell className="text-center">
                        {item.kdmtk ? (
                          <Badge variant="secondary" className="font-mono">
                            {item.kdmtk}
                          </Badge>
                        ) : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.kelas ? <Badge variant="outline">{item.kelas}</Badge> : "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.nama_tipe_ujian ? (
                          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                            {item.nama_tipe_ujian}
                          </Badge>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatDate(item.tgl_mulai)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatDate(item.tgl_selesai)}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {renderExamStatus(item)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="mt-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    Menampilkan {examData.length} dari total data ujian
                    {kdmtk && ` (difilter berdasarkan: ${kdmtk})`}
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

export default DaftarUjian;