import { v4 } from "uuid";
import db from "../auth/config";

const compressImage = (file: File, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e?.target?.result as string;
    };

    img.onerror = (error) => {
      reject(new Error("Image loading failed: " + error));
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_DIMENSION = 1080;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        }
      } else {
        if (height > MAX_DIMENSION) {
          width *= MAX_DIMENSION / height;
          height = MAX_DIMENSION;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      const base64String = canvas.toDataURL("image/jpeg", quality);

      if (base64String) {
        resolve(base64String);
      } else {
        reject(
          new Error("Compression failed, returning original base64 string.")
        );
      }
    };

    reader.readAsDataURL(file);
  });
};

export const saveBase64Image = async (
  base64Image: string,
  fileName: string
) => {
  const byteCharacters = atob(base64Image.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "image/jpeg" });

  const result = await db.uploadBytes(db.ref(db.storage, v4()), blob, {
    contentType: "image/jpeg",
  });

  return await db.getDownloadURL(result.ref);
};

export const saveImage = async (image: File | string, fileName?: string) => {
  if (typeof image === "string") {
    return await saveBase64Image(image, fileName ?? v4());
  } else {
    const compressed = await compressImage(image);
    return await saveBase64Image(compressed, fileName ?? v4());
  }
};

export const saveImages = (images: (File | string)[]) => {
  const promises = images.map(async (image) => await saveImage(image));
  return Promise.all(promises);
};

export const deleteImage = async (url: string) =>
  await db.deleteObject(db.ref(db.storage, url));

export const deleteImages = async (urls: string[]) => {
  const promises = urls.map(async (url) => await deleteImage(url));
  await Promise.all(promises);
};

export default { deleteImage, deleteImages, saveImage, saveImages };
