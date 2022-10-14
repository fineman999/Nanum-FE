import { useState } from "react";
import ProfileModal from "./modal/ProfileModal";

export function ProfileImg({ img, size, name, type, id }) {
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
          style={{
            width: `${size}vh`,
            height: `${size}vh`,
            borderRadius: "100%",
          }}
        />
      </div>
      <ProfileModal
        open={open}
        handleClose={handleClose}
        img={img}
        type={type}
        name={name}
        id={id}
      />
    </>
  );
}
