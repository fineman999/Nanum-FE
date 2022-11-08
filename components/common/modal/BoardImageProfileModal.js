import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../../state/atom/authState";
import { fireAlert } from "../Alert";
import ProfileModal from "./ProfileModal";

export function BoardImageProfileModal({ img, size, name, type, id, left }) {
  //modal 관리
  const [open, setOpen] = useState(false);
  const authValue = useRecoilValue(authState);
  const handleOpen = () => {
 
    if(authValue.isLogin){
      setOpen(true);
    }else{
      fireAlert({icon:"info",title:"프로필 확인", text:"로그인 후 이용가능합니다!"})
    }
    
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
            marginRight: `${left ? left : "2rem"}`,
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
