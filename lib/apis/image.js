import axios from "axios";

export const postS3 = async (imgFile) => {
  const res = await axios.post(
    "http://20.214.170.222:8000/supplementary-service/api/images",
    imgFile,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};
