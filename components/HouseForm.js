import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import styles from "../styles/HouseAddForm.module.css";
import { fireAlert } from "./common/Alert";
import FloorPlanButton from "./common/FloorPlanButton";
import HouseFileButton from "./common/HouseFileButton";
import PostcodeModal from "./common/modal/PostcodeModal";
import HostHouseOptions from "./HostHouseOptions";
import PreviewImageForm from "./PreviewImageForm";

const { kakao } = globalThis;

const HouseForm = () => {
  const [form, setForm] = useState({
    houseRequest: {
      hostId: 1, // 호스트 아이디
      houseName: "", // 하우스 이름
      houseType: "", // 주거 타입
      houseGender: "", // 성별 타입
      explanation: "", // 하우스 소개
      streetAddress: "", // 도로명 주소
      lotAddress: "", // 지번 주소
      detailAddress: "", // 상세 주소
      zipCode: "", // 우편번호
      lat: "", // 위도
      lon: "", // 경도
      keyWord: [], // 검색 키워드
      houseOption: [], // 하우스 옵션
    },
    houseMainImg: "", // 하우스 대표 이미지
    floorPlanImg: "", // 하우스 도면 이미지
    houseFile: "", // 하우스 관련 파일
    houseImgs: [], // 하우스 상세 이미지 리스트
  });

  const [postModal, setPostModal] = useState(false);
  const [keyWord, setKeyword] = useState("");
  const [preview, setPreview] = useState({
    houseMainImg: null,
    floorPlanImg: null,
  });

  const mainImageInput = useRef(null);

  useEffect(() => {
    // 주소 → 좌표(위도, 경도) 검색
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      if (form.houseRequest.streetAddress) {
        geocoder.addressSearch(
          form.houseRequest.streetAddress,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setForm((prev) => {
                return {
                  ...prev,
                  houseRequest: {
                    ...prev.houseRequest,
                    lat: result[0].y,
                    lon: result[0].x,
                  },
                };
              });
            }
          }
        );
      }
    });
  }, [form.houseRequest.streetAddress]);

  const onPostModal = () => setPostModal(true);
  const offPostModal = () => setPostModal(false);

  // 주소(도로명, 지번, 우편번호) 입력 핸들러
  const handleAddress = (addressForm) => {
    setForm((prev) => {
      return {
        ...prev,
        houseRequest: {
          ...prev.houseRequest,
          streetAddress: addressForm.roadAddress,
          lotAddress: addressForm.jibunAddress,
          zipCode: addressForm.zonecode,
        },
      };
    });
  };

  const handleOption = (option) => {
    setForm((prev) => {
      return {
        ...prev,
        houseRequest: {
          ...prev.houseRequest,
          houseOption: [...option],
        },
      };
    });
  };

  const changeForm = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        houseRequest: {
          ...prev.houseRequest,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const addKeyword = () => {
    if (keyWord === "") return;
    if (isDuplicateKeyword()) {
      alert(`중복된 키워드(${keyWord})입니다.`);
      setKeyword("");
      return;
    }
    if (form.houseRequest.keyWord.length >= 3) {
      alert("검색 키워드는 최대 3개까지 가능합니다.");
      setKeyword("");
      return;
    }

    const nextKeyword = [...form.houseRequest.keyWord, keyWord];
    setForm((prev) => {
      return {
        ...prev,
        houseRequest: {
          ...prev.houseRequest,
          keyWord: nextKeyword,
        },
      };
    });
    setKeyword("");
  };
  const removeKeyword = (index) => {
    const nextKeyword = [
      ...form.houseRequest.keyWord.slice(0, index),
      ...form.houseRequest.keyWord.slice(index + 1),
    ];
    setForm((prev) => {
      return {
        ...prev,
        houseRequest: {
          ...prev.houseRequest,
          keyWord: nextKeyword,
        },
      };
    });
  };
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const isDuplicateKeyword = () => {
    if (form.houseRequest.keyWord.includes(keyWord)) {
      return true;
    } else {
      return false;
    }
  };

  const uploadFile = (e) => {
    const [file] = e.target.files;
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: file,
      };
    });
  };

  const uploadImage = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview((prev) => {
        return {
          ...prev,
          [e.target.name]: reader.result,
        };
      });
    };
    reader.readAsDataURL(file);

    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: file,
      };
    });
  };

  const addImages = (image) => {
    const nextImages = [...form.houseImgs, image];
    setForm((prev) => {
      return {
        ...prev,
        houseImgs: nextImages,
      };
    });
  };

  const removeImages = (index) => {
    const nextImages = [
      ...form.houseImgs.slice(0, index),
      ...form.houseImgs.slice(index + 1),
    ];
    setForm((prev) => {
      return {
        ...prev,
        houseImgs: nextImages,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "houseRequest",
      new Blob([JSON.stringify(form.houseRequest)], {
        type: "application/json",
      })
    );
    formData.append("houseMainImg", form.houseMainImg);
    formData.append("floorPlanImg", form.floorPlanImg);
    formData.append("houseFile", form.houseFile);
    form.houseImgs.forEach((image) => formData.append("houseImgs", image));

    const requestApi = async () => {
      try {
        const response = await axios.post(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses`,
          formData
        );
        const { isSuccess, message, result } = response.data;
        if (isSuccess) {
          fireAlert({ icon: "success", title: result });
        }
      } catch (err) {
        console.error(err);
      }
    };

    requestApi();
    console.log("form: ", form);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
  };

  return (
    <form className={styles.house_add_form} onSubmit={handleSubmit}>
      <div className="house_section">
        {/* 하우스 대표 이미지 */}
        <div className={styles.main_image_preview_wrapper}>
          <div className={styles.main_image_preview}>
            {preview.houseMainImg && (
              <Image src={preview.houseMainImg} alt="main_img" layout="fill" />
            )}
          </div>
          <input
            name="houseMainImg"
            type="file"
            style={{ display: "none" }}
            onChange={uploadImage}
            ref={mainImageInput}
          />
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => mainImageInput.current.click()}
          >
            이미지 등록
          </Button>
        </div>

        {/* 하우스 이름 */}
        <TextField
          id="outlined-basic"
          name="houseName"
          label="하우스 이름"
          variant="outlined"
          onChange={changeForm}
          sx={{ width: "100%", mb: 3 }}
          required
        />

        {/* 하우스 소개 */}
        <TextField
          id="outlined-multiline-flexible"
          name="explanation"
          label="하우스 소개"
          multiline
          maxRows={4}
          onChange={changeForm}
          sx={{ width: "100%", mb: 3 }}
          required
        />

        {/* 하우스 조건 설정 */}
        <div className={styles.house_type_section}>
          <div className="gender_type_form">
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-autowidth-label">
                성별타입
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={form.houseRequest.houseGender}
                name="houseGender"
                autoWidth
                label="성별타입"
                onChange={changeForm}
                required
              >
                <MenuItem value="COMMON">남녀공용</MenuItem>
                <MenuItem value="MALE">남성전용</MenuItem>
                <MenuItem value="FEMALE">여성전용</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="live_type_form">
            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-autowidth-label">
                주거타입
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={form.houseRequest.houseType}
                name="houseType"
                autoWidth
                label="주거타입"
                onChange={changeForm}
                required
              >
                <MenuItem value="share">쉐어</MenuItem>
                <MenuItem value="one">마이룸(원룸)</MenuItem>
                <MenuItem value="etc">기타</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      {/* 주소 검색 */}
      <div className={styles.address_section}>
        <PostcodeModal
          open={postModal}
          handleClose={offPostModal}
          form={form.houseRequest}
          setForm={handleAddress}
        />
        <div className="zonecode_wrapper">
          <TextField
            id="outlined-read-only-input"
            name="zipCode"
            label="우편번호"
            value={form.houseRequest.zipCode || "우편번호"}
            InputProps={{
              readOnly: true,
            }}
            required
          />
          <Button variant="outlined" onClick={onPostModal}>
            주소 검색
          </Button>
        </div>

        <br />
        <div className="address_wrapper">
          <TextField
            id="outlined-read-only-input"
            name="streetAddress"
            label="도로명"
            value={form.houseRequest.streetAddress || "도로명"}
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "50%" }}
            required
          />
          <TextField
            id="outlined-read-only-input"
            name="lotAddress"
            label="지번"
            value={form.houseRequest.lotAddress || "지번"}
            InputProps={{
              readOnly: true,
            }}
            sx={{ width: "50%" }}
            required
          />
        </div>
        <br />
        {form.houseRequest.streetAddress && (
          <TextField
            id="outlined-basic"
            name="detailAddress"
            label="상세"
            variant="outlined"
            onChange={changeForm}
            sx={{ width: "100%" }}
          />
        )}
      </div>

      {/* 하우스 옵션 */}
      <HostHouseOptions handleOption={handleOption} />

      {/* 주소 좌표 */}
      <div className="geo_section">
        <h1>주소 좌표 정보</h1>
        <div>위도: {form.houseRequest.lat}</div>
        <div>경도: {form.houseRequest.lon}</div>
      </div>

      {/* 검색 키워드 추가 */}
      <div className="keyword_section">
        <TextField
          id="outlined-basic"
          name="keyWord"
          value={keyWord || ""}
          label="키워드"
          variant="outlined"
          onChange={changeKeyword}
        />
        <Button variant="outlined" onClick={addKeyword}>
          추가
        </Button>
        <ul className={styles.keyword_list}>
          {form.houseRequest.keyWord &&
            form.houseRequest.keyWord.map((keyWord, index) => (
              <li key={index}>
                <Chip label={keyWord} onDelete={() => removeKeyword(index)} />
              </li>
            ))}
        </ul>
      </div>

      {/* 하우스 상세, 도면 이미지 추가 */}
      <div className="detail_image_preview_section">
        <PreviewImageForm
          addImages={addImages}
          removeImages={removeImages}
          size={8}
        />
      </div>
      <div className="floor_image_preview_section">
        <FloorPlanButton uploadImage={uploadImage} />
        <div className={styles.main_image_preview}>
          {preview.floorPlanImg && (
            <Image
              src={preview.floorPlanImg}
              alt="floor_plan_img"
              layout="fill"
            />
          )}
        </div>
      </div>
      {/* 하우스 관련 파일 추가 */}
      <div className="file_submit_section">
        <HouseFileButton uploadFile={uploadFile} />
      </div>
      {/* 등록 버튼 */}
      <div className="form_btns">
        <button>하우스 등록</button>
        <button type="reset">하우스 리셋</button>
      </div>
    </form>
  );
};

export default HouseForm;
