import React, { useEffect, useState } from "react";
import SubHeader from "../../components/common/SubHeader";
import { TextField } from "@mui/material";
import PreviewImageForm from "../../components/PreviewImageForm";
import { useRouter } from "next/router";
import { fireAlert } from "../../components/common/Alert";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import axios from "axios";

const category = {
  notice: 1,
  all: 2,
  info: 3,
};
const Write = () => {
  const router = useRouter();
  const check = router.query;
  const [form, setForm] = useState({
    title: "",
    content: "",
    images: [],
  });
  const userData = useRecoilState(userState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addImages = (file) => {
    console.log("add image");
    setForm({
      ...form,
      images: [...form.images, file],
    });
  };

  const removeImages = (index) => {
    console.log("remove image");
    const nextImages = [
      ...form.images.slice(0, index),
      ...form.images.slice(index + 1),
    ];

    setForm({
      ...form,
      images: nextImages,
    });
  };

  const handleReset = () => {
    setForm({
      title: "",
      content: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title.length < 1) {
      fireAlert({ icon: "error", title: "제목을 입력해주세요." });
      return;
    }

    if (form.content.length < 1) {
      fireAlert({ icon: "error", title: "내용을 입력해주세요." });
      return;
    }
    if (userData !== undefined || userData !== null) {
      // 시작
      const boardRequest = {
        title: form.title,
        content: form.content,
        boardCategoryId: category[check.write[0]],
      };
      const formData = new FormData();
      console.log("duhihi", form.images.length);
      if (form.images.length < 1) {
        formData.append("boardImages", null);
      } else {
        form.images.forEach((image) => {
          formData.append("boardImages", image);
        });
      }

      const uploaderString = JSON.stringify(boardRequest);
      formData.append(
        "boardRequest",
        new Blob([uploaderString], { type: "application/json" })
      );
      const res = await axios.post(
        `https://nanum.site/board-service/api/v1/posts/${userData[0].id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(res);
      if (res.status == 201) {
        fireAlert({
          icon: "success",
          title: "성공적으로 게시글을 작성하였습니다.",
        });
        router.push(`board/${check.write[0]}`);
      } else {
        fireAlert({
          icon: "error",
          title: "게시글 생성을 실패했습니다.",
        });
      }
    }
  };

  return (
    <>
      <SubHeader title="게시글 작성" type="edit" />
      <section className="form_section">
        <form className="form_wrapper" onSubmit={handleSubmit}>
          <div className="form_header">
            <TextField
              name="title"
              value={form.title}
              label="제목"
              sx={{ width: "100%" }}
              placeholder="제목을 입력하세요."
              onChange={handleChange}
            />
          </div>
          <div className="form_body">
            <TextField
              name="content"
              value={form.content}
              label="내용"
              sx={{ width: "100%" }}
              placeholder="내용을 입력하세요."
              multiline
              onChange={handleChange}
            />
          </div>
          <div className="form_images">
            <PreviewImageForm
              addImages={addImages}
              removeImages={removeImages}
              size={10}
            />
          </div>
          <div className="form_btns">
            <button className="form_submit_btn">작성</button>
            <button className="form_reset_btn" onClick={handleReset}>
              리셋
            </button>
          </div>
        </form>
      </section>
      <style jsx>{`
        .form_section {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          padding: 20px;
        }
        .form_wrapper {
          box-sizing: border-box;
          width: 100%;
          padding: 15px;
          background: white;
          border-radius: 15px;
          margin-bottom: 20px;
        }
        .form_header {
          margin-bottom: 20px;
        }
        .form_body {
          margin-bottom: 20px;
        }
        .form_btns {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .form_btns > button {
          box-sizing: border-box;
          width: 40%;
          padding: 10px;
          color: white;
          border: none;
          background: #76c1b2;
          border-radius: 10px;
        }
        .form_btns .form_reset_btn {
          margin-left: 10px;
          background: #555555;
        }
      `}</style>
    </>
  );
};

export default Write;
