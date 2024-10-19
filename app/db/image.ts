import { v4 } from "uuid";

import db from "../auth/config";

const compressImage = (file: File, quality: number = 0.8): Promise<File> => {
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

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          } else {
            reject(new Error("Compression failed, returning original file."));
          }
        },
        "image/jpeg",
        quality
      );  
    };

    reader.readAsDataURL(file);
  });
};

export const saveImage = async (image: File) => {
  const compressed = await compressImage(image);

  const result = await db.uploadBytes(db.ref(db.storage, v4()), compressed, {
    contentType: image.type,
  });

  return await db.getDownloadURL(result.ref);
};

export const saveImages = (images: File[]) => {
  const promises = images.map(async (image) => await saveImage(image));

  return Promise.all(promises);
};

export const deleteImage = async (url: string) =>
  await db.deleteObject(db.ref(db.storage, url));

export const deleteImages = async (urls: string[]) => {
  const promises = urls.map(async (url) => await deleteImage(url));

  Promise.all(promises);
};

export default { deleteImage, deleteImages, saveImage, saveImages };
