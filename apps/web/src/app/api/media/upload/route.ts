import { NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@triunfo/database";
import { requireActor } from "@/lib/auth";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const actor = await requireActor();
    if (!actor?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Formato de arquivo não suportado. Use JPG, PNG, WEBP, GIF ou SVG." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Tamanho de arquivo excede o limite de 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const checksumSha256 = createHash("sha256").update(buffer).digest("hex");

    // Verificar se a mídia já foi enviada anteriormente pelo hash
    const existingMedia = await prisma.mediaAsset.findFirst({
      where: { checksumSha256, deletedAt: null },
    });

    if (existingMedia) {
      return NextResponse.json({
        id: existingMedia.id,
        publicUrl: existingMedia.publicUrl,
        objectKey: existingMedia.objectKey,
        mimeType: existingMedia.mimeType,
        sizeBytes: Number(existingMedia.sizeBytes),
      });
    }

    const extension = path.extname(file.name) || ".png";
    const filename = `${randomUUID()}${extension}`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    const objectKey = `uploads/${filename}`;

    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        id: randomUUID(),
        storageProvider: "local",
        bucket: "public-uploads",
        objectKey,
        publicUrl,
        mimeType: file.type,
        sizeBytes: BigInt(file.size),
        checksumSha256,
        status: "READY",
        visibility: "PUBLIC",
        defaultAltText: file.name,
        uploadedById: actor.id,
      },
    });

    return NextResponse.json({
      id: mediaAsset.id,
      publicUrl: mediaAsset.publicUrl,
      objectKey: mediaAsset.objectKey,
      mimeType: mediaAsset.mimeType,
      sizeBytes: Number(mediaAsset.sizeBytes),
    });
  } catch (error) {
    console.error("Erro no upload de mídia:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Falha ao processar upload de mídia." },
      { status: 500 }
    );
  }
}
