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
          value={form.houseRequest.detailAddress || "상세"}
          variant="outlined"
          onChange={changeForm}
          sx={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default HouseAddressForm;
