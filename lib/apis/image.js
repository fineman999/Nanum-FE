import axios from "axios";

export const postS3 = async (imgFile) => {
  const res = await axios.post(
    "https://nanum.site/supplementary-service/api/images",
    imgFile,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};
