import React, { useEffect, useRef, useState } from "react";
import SubHeader from "../../components/common/SubHeader";
import { TextField } from "@mui/material";
import PreviewImageForm from "../../components/PreviewImageForm";
import { useRouter } from "next/router";
import { fireAlert } from "../../components/common/Alert";
import { useRecoilState } from "recoil";
import { userState } from "../../state/atom/authState";
import axios from "axios";
import { getBoard } from "../../lib/apis/board";
import PreviewImageFixForm from "../../components/PreviewImageFixForm";
import { NotificationAlert } from "../../components/common/NotificationAlert";

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
  const [fixImg, setFixImg] = useState([]);
  const [deleteImg, setDeleteImg] = useState([]);
  const boardId = useRef(null);
  const userData = useRecoilState(userState);
  const [fixValue, setFixVale] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  useEffect(() => {
    setCategoryId([...router.asPath.split("/")][3]);
    boardId.current = [...router.asPath.split("/")][4];

    setFixVale(!isNaN(boardId.current));

    const cancleToken = axios.CancelToken.source();
    async function reactive() {
      try {
        const response = await getBoard(boardId.current, cancleToken);
        const { content, imgUrls, title } = response.data.result;
        setForm({
          ...form,
          content: content,
          title: title,
        });

        setFixImg(imgUrls);
      } catch (e) {
        console.log("Error" + e);
      }
    }
    if (boardId.current !== undefined && !isNaN(boardId.current)) {
      reactive();
    }
    return () => {
      cancleToken.cancel();
    };
  }, []);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addImages = (file) => {
    setForm({
      ...form,
      images: [...form.images, file],
    });
  };

  const removeImages = (index) => {
    const nextImages = [
      ...form.images.slice(0, index),
      ...form.images.slice(index + 1),
    ];

    setForm({
      ...form,
      images: nextImages,
    });
  };
  const removeImagesFix = (index) => {
    setDeleteImg([...deleteImg, fixImg[index]]);
    const nextImages = [...fixImg.slice(0, index), ...fixImg.slice(index + 1)];

    setFixImg(nextImages);
  };

  const handleReset = () => {
    setForm({
      title: "",
      content: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fixValue) {
      await handleSubmitFix();
      return;
    }
    await handleSubmitCreate();
  };
  const handleSubmitCreate = async () => {
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
  const handleSubmitFix = async () => {
    const imgId = deleteImg.map((ele) => ele.imgId);
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
      const boardUpdateRequest = {
        title: form.title,
        content: form.content,
        boardId: boardId.current,
        imgId: imgId,
        categoryId: categoryId,
        userId: userData[0].id,
      };
      const formData = new FormData();

      if (form.images.length < 1) {
        formData.append("updateImg", null);
      } else {
        form.images.forEach((image) => {
          formData.append("updateImg", image);
        });
      }

      const uploaderString = JSON.stringify(boardUpdateRequest);
      formData.append(
        "boardUpdateRequest",
        new Blob([uploaderString], { type: "application/json" })
      );

      const res = await axios.put(
        `https://nanum.site/board-service/api/v1/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status == 200) {
        fireAlert({
          icon: "success",
          title: "성공적으로 게시글을 수정하였습니다.",
        });
        router.back();
      } else {
        fireAlert({
          icon: "error",
          title: "게시글 수정을 실패했습니다.",
        });
      }
    }
  };

  return (
    <>
      <SubHeader
        title={`${fixValue ? "게시판 수정" : "게시판 작성"}`}
        type="edit"
      />

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
            <PreviewImageFixForm
              removeImagesFix={removeImagesFix}
              size={10}
              defaultImages={fixImg}
            />
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
      <NotificationAlert />
    </>
  );
};

export default Write;
