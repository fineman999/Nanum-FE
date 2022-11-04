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
import { postMail, sendAlert } from "../../lib/apis/mail";
import axios from "axios";
import { fireAlert } from "../../components/common/Alert";
import { getBlockByBlockerIdAndBlockedUserId } from "../../lib/apis/block";
import { NotificationAlert } from "../../components/common/NotificationAlert";
const style = css`
  #send_mail {
    padding: 5rem 1rem;
  }
`;
export default function Send() {
  const router = useRouter();
  const [isName, setIsName] = useState(router.query.name);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const handleBack = () => {
    router.back();
  };

  const addImages = (file) => {
    setImages([...images, file]);
  };

  const removeImages = (index) => {
    const nextImages = [...images.slice(0, index), ...images.slice(index + 1)];

    setImages(nextImages);
  };

  //쪽지보내기
  const sendMail = async () => {
    const checkBlock = await getBlockByBlockerIdAndBlockedUserId({
      blockerId: router.query.receiverId,
      blockedUserId: router.query.senderId,
    });
    if (checkBlock.data.result.valid === true) {
      fireAlert({
        icon: "warning",
        title: "차단당하셨습니다.",
      });
      return;
    }
    const noteDetails = {
      title: "title",
      content: text,
      receiverId: router.query.receiverId,
      senderId: router.query.senderId,
    };
    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });
    const uploaderString = JSON.stringify(noteDetails);
    formData.append(
      "noteDetails",
      new Blob([uploaderString], { type: "application/json" })
    );

    const res = await axios.post(
      "https://nanum.site/supplementary-service/api/v1/notes",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (res.status == 201) {
      fireAlert({
        icon: "success",
        title: "성공적으로 쪽지를 보냈습니다.",
      });
      sendAlert({
        title: "NOTE",
        content: text,
        userIds: [router.query.receiverId],
        url: "/mail",
      });
      router.push("/mail");
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
      <NotificationAlert />
    </>
  );
}
