import dayjs from "dayjs";
import { mkdir, stat, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { join } from "path";

import { addNote } from "@/libs/redis";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      {
        error: "No file provided",
      },
      { status: 400 }
    );
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format("YYYY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      return NextResponse.json(
        {
          error: "Failed to create upload directory",
        },
        {
          status: 500,
        }
      );
    }
  }

  try {
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${filename}-${uniqueSuffix}.${fileExtension}`;

    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    const res = await addNote(
      JSON.stringify({
        title: filename,
        content: buffer.toString("utf-8"),
      })
    );

    revalidatePath("/", "layout");

    return NextResponse.json({
      uid: res,
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to write file",
      },
      {
        status: 500,
      }
    );
  }
}
