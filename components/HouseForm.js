import { Divider } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import styles from "../styles/HouseForm.module.css";
import HouseFileButton from "./common/HouseFileButton";
import HostHouseOptions from "./HostHouseOptions";
import HouseAddressForm from "./HouseAddressForm";
import HouseDescForm from "./HouseDescForm";
import HouseFloorImage from "./HouseFloorImage";
import HouseKeywordForm from "./HouseKeywordForm";
import HouseMainImage from "./HouseMainImage";
import HouseTypeForm from "./HouseTypeForm";
import PreviewImageForm from "./PreviewImageForm";
import HousePositionForm from "./HousePositionForm";
import { fireAlert } from "./common/Alert";

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

const HouseForm = () => {
  const router = useRouter();
  const [path, setPath] = useState(router.route.split("/")[3]);
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
  const [editImageForm, setEditImageForm] = useState({
    deleteHouseImgs: [],
    houseImgs: [],
  });

  const [keyWord, setKeyword] = useState("");
  const [preview, setPreview] = useState({
    houseMainImg: null,
    floorPlanImg: null,
  });

  const mainImageInput = useRef(null);
  const floorImageInput = useRef(null);

  useEffect(() => {
    if (path === "edit") {
      const houseId = router.asPath.split("/")[4];
      const requestApi = async () => {
        try {
          const response = await axios.get(
            `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses/1/origin/${houseId}`
          );
          console.log(response.data.result);
          const { houseMainImg, floorPlanImg } = response.data.result;
          setForm({ ...response.data.result, houseId: houseId });
          setPreview({
            houseMainImg: houseMainImg,
            floorPlanImg: floorPlanImg,
          });
        } catch (err) {
          console.log(err);
        }
      };
      requestApi();
    }
  }, []);

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

  // 하우스의 옵션을 업데이트합니다.
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

  // 하우스의 위치(위도, 경도)를 업데이트합니다.
  const handlePosition = (position) => {
    setForm((prev) => {
      return {
        ...prev,
        houseRequest: {
          ...prev.houseRequest,
          lat: position[0].y,
          lon: position[0].x,
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
    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }

    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: file,
      };
    });
  };

  const addImages = (image) => {
    if (path !== "edit") {
      const nextImages = [...form.houseImgs, image];
      setForm((prev) => {
        return {
          ...prev,
          houseImgs: nextImages,
        };
      });
    } else {
      const nextEditImages = [...editImageForm.houseImgs, image];
      setEditImageForm((prev) => {
        return {
          ...prev,
          houseImgs: nextEditImages,
        };
      });
    }
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

    if (path === "edit") {
      console.log(form.houseImgs[index]);
      const nextDeleteImages = [
        ...editImageForm.deleteHouseImgs,
        form.houseImgs[index].id,
      ];
      setEditImageForm((prev) => {
        return {
          ...prev,
          deleteHouseImgs: nextDeleteImages,
        };
      });
    }
  };

  const handleReset = () => {
    setForm({
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
    setPreview({
      houseMainImg: null,
      floorPlanImg: null,
    });
  };

  // 수정 이벤트 핸들러
  const handleEdit = () => {
    const EDIT_API = `/houses/${form.houseRequest.hostId}/${form.houseId}`;
    const DETAIL_IMAGE_EDIT_API = `/houses/${form.houseRequest.hostId}/${form.houseId}/image`;

    const requestEditApi = async () => {
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
      try {
        const response = await axios.put(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}${EDIT_API}`,
          formData
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const requestImageEditApi = async () => {
      const formData = new FormData();
      formData.append(
        "deleteHouseImgs",
        new Blob([JSON.stringify(editImageForm.deleteHouseImgs)], {
          type: "application/json",
        })
      );
      editImageForm.houseImgs.forEach((image) =>
        formData.append("houseImgs", image)
      );
      try {
        const response = await axios.put(
          `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}${DETAIL_IMAGE_EDIT_API}`,
          formData
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    requestEditApi();
    requestImageEditApi();
  };

  // 등록 이벤트 핸들러
  const handleAdd = () => {
    const API_URI = `/houses`;
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

    axios
      .post(BASE_URL + API_URI, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("하우스 등록 응답: ", res);
        const { isSuccess, message, result } = res.data;
        return result;
      })
      .then((result) => {
        const WEB_FLUX_URL = `${process.env.NANUM_WEBFLUX_SERVICE_BASE_URL}`;
        const WEB_FLUX_API_URI = `/rooms`;

        const { id, houseName, mainHouseImgPath } = result;
        const data = {
          userIds: [1],
          roomName: `${houseName} 채팅방입니다.`,
          houseId: id,
          houseImg: mainHouseImgPath,
        };
        console.log("채팅방 생성 폼: ", data);
        axios
          .post(WEB_FLUX_URL + WEB_FLUX_API_URI, data)
          .then((res) => {
            const { status } = res.data;
            if (status === 201) {
              fireAlert({ icon: "success", title: "하우스 등록 성공" });
              router.push({
                pathname: "/host/house",
              });
            }
          })
          .catch((err) => console.log("채팅방 생성 에러: ", err));
      })
      .catch((err) => console.log(err));

    // // const requestApi = async () => {
    // //   try {
    // //     const response = await axios.post(
    // //       `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}/houses`,
    // //       formData
    // //     );
    // //     const { isSuccess, message, result } = response.data;
    // //     if (isSuccess) {
    // //       fireAlert({ icon: "success", title: result });
    // //     }
    // //   } catch (err) {
    // //     console.error(err);
    // //   }
    // // };

    // // requestApi();
    // // console.log("form: ", form);
    // for (let entry of formData.entries()) {
    //   console.log(entry);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.house_add_form} onSubmit={handleSubmit}>
      {/* 하우스 대표 이미지 */}
      <div className={styles.house_main_section}>
        <div className={styles.house_main_header}>
          <h3>하우스 대표 이미지</h3>
        </div>
        <div className={styles.house_main_body}>
          <HouseMainImage
            preview={preview}
            uploadImage={uploadImage}
            mainImageInput={mainImageInput}
          />
        </div>
      </div>

      <Divider />

      {/* 하우스 텍스트 정보 */}
      <div className={styles.house_desc_section}>
        <div className={styles.house_desc_header}>
          <h3>하우스 소개</h3>
        </div>
        <div className={styles.house_desc_body}>
          <HouseDescForm form={form} changeForm={changeForm} />
        </div>
      </div>

      <Divider />

      {/* 하우스 조건 설정 */}
      <div className={styles.house_type_section}>
        <div className={styles.house_type_header}>
          <h3>하우스 타입</h3>
        </div>
        <div className={styles.house_type_body}>
          <HouseTypeForm form={form} changeForm={changeForm} />
        </div>
      </div>

      <Divider />

      {/* 하우스 주소 검색 */}
      <div className={styles.house_address_section}>
        <div className={styles.house_address_header}>
          <h3>하우스 주소 검색</h3>
        </div>
        <div className={styles.house_address_body}>
          <HouseAddressForm
            form={form}
            changeForm={changeForm}
            handleAddress={handleAddress}
          />
        </div>
      </div>

      <Divider />

      {/* 주소 좌표 */}
      <div className={styles.house_position_section}>
        <div className={styles.house_position_header}>
          <h3>하우스 위치</h3>
        </div>
        <div className={styles.house_position_body}>
          <HousePositionForm form={form} handlePosition={handlePosition} />
        </div>
      </div>

      <Divider />

      {/* 하우스 옵션 */}
      <div className={styles.house_option_section}>
        <div className={styles.house_option_header}>
          <h3>하우스 옵션</h3>
        </div>
        <div className={styles.house_option_body}>
          <HostHouseOptions
            houseOption={form.houseRequest.houseOption}
            handleOption={handleOption}
          />
        </div>
      </div>

      <Divider />

      {/* 검색 키워드 추가 */}
      <div className={styles.house_keyword_section}>
        <div className={styles.house_keyword_header}>
          <h3>하우스 키워드</h3>
        </div>
        <div className={styles.house_keyword_body}>
          <HouseKeywordForm
            form={form}
            keyword={keyWord}
            addKeyword={addKeyword}
            removeKeyword={removeKeyword}
            changeKeyword={changeKeyword}
          />
        </div>
      </div>

      <Divider />

      {/* 하우스 상세 이미지 */}
      <div className={styles.house_detail_image_section}>
        <div className={styles.house_detail_image_header}>
          <h3>하우스 상세 이미지</h3>
        </div>
        <div className={styles.house_detail_image_body}>
          <PreviewImageForm
            defaultImages={form.houseImgs}
            addImages={addImages}
            removeImages={removeImages}
            size={8}
          />
        </div>
      </div>

      <Divider />

      {/* 하우스 도면 이미지 */}
      <div className={styles.house_floor_section}>
        <div className={styles.house_floor_header}>
          <h3>하우스 도면 이미지</h3>
        </div>
        <div className={styles.house_floor_body}>
          <HouseFloorImage
            preview={preview}
            uploadImage={uploadImage}
            floorImageInput={floorImageInput}
          />
        </div>
      </div>

      <Divider />

      {/* 하우스 관련 파일 */}
      <div className={styles.house_file_section}>
        <div className={styles.house_file_header}>
          <h3>하우스 관련 서류</h3>
        </div>
        <div className={styles.house_file_body}>
          <HouseFileButton uploadFile={uploadFile} />
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="form_btns">
        {path !== "edit" ? (
          <div className={styles.house_add_btns}>
            <button className={styles.house_add_button} onClick={handleAdd}>
              등록
            </button>
            <button
              className={styles.house_reset_button}
              type="reset"
              onClick={handleReset}
            >
              리셋
            </button>
          </div>
        ) : (
          <button className={styles.house_edit_button} onClick={handleEdit}>
            수정
          </button>
        )}
      </div>
    </form>
  );
};

export default HouseForm;
