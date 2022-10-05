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
const style = css`
  #send_mail {
    padding: 5rem 1rem;
  }
`;
export default function Send() {
  const router = useRouter();
  const [isName, setIsName] = useState(router.query.name);
  const [text, setText] = useState("");

  const handleBack = () => {
    router.back();
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
              disabled={text.length > 199 ? true : false}
              startDecorator={<EditIcon />}
              endDecorator={
                <Typography level="body3" sx={{ ml: "auto" }}>
                  {text.length}/200 글자수
                </Typography>
              }
              sx={{ minWidth: 200 }}
            />
          </Stack>
          <h3 style={{ marginTop: "2rem" }}>이미지 업로드</h3>
        </section>
        <TwoButtonOption
          text1="전송"
          text2="취소"
          handleBtn1={handleBack}
          handleBtn2={handleBack}
        />
        {/* <section id="btn_list">
          <button>전송</button>
          <button>취소</button>
        </section> */}
      </div>
      <style jsx>{style}</style>
    </>
  );
}
