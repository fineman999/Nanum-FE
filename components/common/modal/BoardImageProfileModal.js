import { useState } from "react";
import ProfileModal from "./ProfileModal";

export function BoardImageProfileModal({ img, size, name, type, id }) {
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
            marginRight: "2rem",
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
        roomNum={0}
      />
    </>
  );
}
