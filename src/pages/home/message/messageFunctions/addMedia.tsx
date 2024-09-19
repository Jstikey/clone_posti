import { useState } from "react";

export const useMedia = () => {
  const [media, setMedia] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const convertFile = (file: FileList) => {
    if (file) {
      const fileRef = file[0] || "";
      const fileType: string = fileRef.type || "";
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (e: any) => {
        setMedia(`data:${fileType};base64,${btoa(e.target.result)}`);
      };
    }
  };

  return { media, handleSubmit, convertFile };
};

export const Hello = () => {
  return <div></div>;
};
