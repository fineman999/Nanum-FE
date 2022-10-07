import React, { useState } from "react";
import SubHeader from "../../components/common/SubHeader";
import { TextField } from "@mui/material";
import PreviewImageForm from "../../components/PreviewImageForm";

const write = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    images: [],
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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

export default write;
