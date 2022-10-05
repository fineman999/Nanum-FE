import { useState } from "react";
import ProfileModal from "./modal/ProfileModal";

export function ProfileImg({ img, size, name }) {
  //modal 관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div id="profile">
        <img
          src={img}
          onClick={() => handleOpen()}
          style={{ width: `${size}vh`, height: `${size}vh` }}
        />
      </div>
      <ProfileModal
        open={open}
        handleClose={handleClose}
        img={img}
        name={name}
      />
    </>
  );
}
