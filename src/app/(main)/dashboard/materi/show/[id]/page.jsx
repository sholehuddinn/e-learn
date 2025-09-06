"use client";

import { useParams, useRouter } from "next/navigation";
import { useMateri } from "@/context/MateriContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ShowMateriPage() {
  const { id } = useParams();
  const router = useRouter();
  const { materiData, loading, error } = useMateri();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // amanin dulu
  const list = Array.isArray(materiData) ? materiData : [];
  const materi = list.find((m) => m.id_materi === id);

  if (!materi) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Materi tidak ditemukan</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.back()}>Kembali</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{materi.judul}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: materi.konten }}
          />
          {materi.file_materi && (
            <div className="mt-4">
              <a
                href={`/file/${materi.file_materi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                📄 Lihat File Materi
              </a>
            </div>
          )}
          {materi.link && (
            <div className="mt-2">
              <a
                href={materi.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline"
              >
                🔗 Link Eksternal
              </a>
            </div>
          )}
          <div className="mt-6">
            <Button onClick={() => router.back()}>⬅ Kembali</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
