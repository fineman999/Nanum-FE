import * as React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/joy/TextField";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Textarea, Typography } from "@mui/joy";
import { TwoButtonOption } from "../../components/common/Button";
import PreviewImageForm from "../../components/PreviewImageForm";
import { postMail } from "../../lib/apis/mail";
import axios from "axios";
import { fireAlert } from "../../components/common/Alert";
const style = css`
  #send_mail {
    padding: 5rem 1rem;
  }
`;
// noteDetails={"senderId":1,
//   "title": "title",
//   "content": "SDSD",
//   "receiverId": 7
// }
export default function Send() {
  const router = useRouter();
  const [isName, setIsName] = useState(router.query.name);
  const [text, setText] = useState("");
  const [noteDetails, setNoteDetails] = useState({
    title: "title",
    content: "test",
    receiverId: 1,
    senderId: 3,
  });
  const [images, setImages] = useState([]);

  const handleBack = () => {
    router.back();
  };

  const addImages = (file) => {
    console.log("add image");
    setImages([...images, file]);
  };

  const removeImages = (index) => {
    console.log("remove image");
    const nextImages = [...images.slice(0, index), ...images.slice(index + 1)];

    setImages(nextImages);
  };

  //쪽지보내기
  const sendMail = async () => {
    const formData = new FormData();
    await formData.append("images", images);
    const uploaderString = JSON.stringify(noteDetails);
    formData.append(
      "noteDetails",
      new Blob([uploaderString], { type: "application/json" })
    );

    const res = await axios.post(
      "http://20.214.170.222:8000/supplementary-service/api/v1/notes",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res);
    if (res.status == 201) {
      fireAlert({
        icon: "success",
        title: "성공적으로 쪽지를 보냈습니다.",
      });
    } else {
      fireAlert({
        icon: "error",
        title: "쪽지 보내기에 실패했습니다.",
      });
    }
  };

  return (
    <>
      <div id="send_mail">
        <Header title="쪽지" type="send" />
        <section id="send_form">
          <Stack direction="column" spacing={2}>
            <h3>받는 사람</h3>
            <TextField
              disabled
              placeholder={isName}
              startDecorator={<PersonRoundedIcon />}
            />

            <h3 style={{ marginTop: "2rem" }}>쪽지 내용</h3>

            <Textarea
              placeholder="최대 200자까지 작성가능합니다."
              value={text}
              onChange={(event) => setText(event.target.value)}
              minRows={6}
              maxRows={6}
              maxLength={20}
              disabled={text.length > 254 ? true : false}
              startDecorator={<EditIcon />}
              endDecorator={
                <Typography level="body3" sx={{ ml: "auto" }}>
                  {text.length}/255자
                </Typography>
              }
              sx={{ minWidth: 255 }}
            />
          </Stack>
          <h3 style={{ margin: "2rem 0rem 16px" }}>이미지 업로드</h3>
          <PreviewImageForm addImages={addImages} removeImages={removeImages} />
        </section>
        <TwoButtonOption
          text1="전송"
          text2="취소"
          handleBtn1={sendMail}
          handleBtn2={handleBack}
        />
      </div>
      <style jsx>{style}</style>
    </>
  );
}
