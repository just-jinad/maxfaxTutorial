import React from "react";
import { toast } from "sonner";

const ImageUpload = ({ handleImageUpload, questionIndex }) => (
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(questionIndex, e.target.files[0])}
  className="w-32 sm:w-40 md:w-48 h-10 px-2 py-1 border rounded-md"
  />
);

export default ImageUpload;
  