import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import styles from "../styles/HouseAddressForm.module.css";
import PostcodeModal from "./common/modal/PostcodeModal";

const HouseAddressForm = ({ form, changeForm, handleAddress }) => {
  const [postModal, setPostModal] = useState(false);
  const onPostModal = () => setPostModal(true);
  const offPostModal = () => setPostModal(false);

  return (
    <div className={styles.address_section}>
      <PostcodeModal
        open={postModal}
        handleClose={offPostModal}
        form={form.houseRequest}
        handleAddress={handleAddress}
      />
      <div className={styles.zonecode_wrapper}>
        <TextField
          id="outlined-read-only-input"
          name="zipCode"
          label="우편번호"
          value={form.houseRequest.zipCode || "우편번호"}
          InputProps={{
            readOnly: true,
          }}
          required
          sx={{ flexGrow: 1, mr: 1 }}
        />
        <Button variant="outlined" onClick={onPostModal}>
          주소 검색
        </Button>
      </div>
      <br />
      <div className={styles.address_wrapper}>
        <TextField
          id="outlined-read-only-input"
          name="streetAddress"
          label="도로명"
          value={form.houseRequest.streetAddress || "도로명 주소"}
          InputProps={{
            readOnly: true,
          }}
          required
          sx={{ width: "100%", mb: 3 }}
        />
        <TextField
          id="outlined-read-only-input"
          name="lotAddress"
          label="지번"
          value={form.houseRequest.lotAddress || "지번 주소"}
          InputProps={{
            readOnly: true,
          }}
          sx={{ width: "100%" }}
          required
        />
      </div>
      {form.houseRequest.streetAddress && (
        <>
          <br />
          <TextField
            id="outlined-basic"
            name="detailAddress"
            label="상세"
            value={form.houseRequest.detailAddress || ""}
            variant="outlined"
            onChange={changeForm}
            sx={{ width: "100%" }}
          />
        </>
      )}
    </div>
  );
};

export default HouseAddressForm;
