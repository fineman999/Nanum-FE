import Header from "../../components/common/Header";
import css from "styled-jsx/css";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { deleteBlock, getBlock } from "../../lib/apis/block";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atom/authState";
import { NoData } from "../../components/common/NoData";
import BottomMenu from "../../components/common/BottomMenu";

const style = css`
  #blocklist {
    padding: 5rem 0rem;
  }
  #unit_block {
    background-color: #ffff;
    display: flex;
    padding: 2rem 1rem;
    margin-bottom: 0.1rem;
    align-items: center;
    height: 10vh;
    box-sizing: border-box;
    justify-content: space-between;
  }
  img {
    width: 7vh;
    height: 7vh;
    margin-right: 0.5rem;
    border-radius: 100%;
  }
  #profile {
    display: flex;
    align-items: center;
  }
  #block_header {
    margin: 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #delete {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  #delete_btn {
    padding: 1rem 0rem;
    width: 50%;
    background-color: #777;
    color: white;
    font-size: 24px;
    text-align: center;
  }
  #no_data {
    text-align: center;
    margin-top: 5rem;
  }
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function Block() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [blockList, setBlockList] = useState([]);
  const userData = useRecoilValue(userState);
  const [page, setPage] = useState(0);
  const [delList, setDelList] = useState([]);

  //삭제 리스트 추가
  const addList = (id) => {
    if (delList.includes(id)) {
      const tmp = delList.filter(function (value, idex, arr) {
        return value != id;
      });
      setDelList(tmp);
    } else {
      setDelList([...delList, id]);
    }
    console.log(delList);
  };

  //선택 삭제
  const delBlcok = () => {
    const blockerId = userData.id;
    delList.map((blockId) => {
      deleteBlock(blockId)
        .then((res) => {
          console.log(res);
          getBlock({ blockerId, page })
            .then((res) => {
              console.log(res, "!!!!");
              setBlockList(res.data.result.content);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  };
  //전체 삭제
  const delAll = () => {
    blockList.map((block) => {
      deleteBlock(block.id)
        .then((res) => {
          console.log(res);
          setBlockList([]);
        })
        .catch((err) => console.log(err));
    });
  };

  useEffect(() => {
    const blockerId = userData.id;
    getBlock({ blockerId, page })
      .then((res) => {
        console.log(res);
        setBlockList(res.data.result.content);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div id="blocklist">
        <Header title="차단" type="block" />
        <div id="block_header">
          <h2>차단 목록</h2>
          <p onClick={() => setIsUpdate(!isUpdate)}>편집</p>
        </div>
        {blockList &&
          blockList.map((block) => (
            <div key={block.id} id="unit_block">
              <div id="profile">
                <img src={block.user.profileImgUrl} />
                <p>{block.user.nickName}</p>
              </div>
              <div>
                {isUpdate && (
                  <Checkbox
                    {...label}
                    color="default"
                    onClick={() => addList(block.id)}
                  />
                )}
              </div>
            </div>
          ))}
        <NoData data={blockList} />
        {isUpdate && (
          <div id="delete">
            <div
              id="delete_btn"
              style={{ marginRight: "0.1rem" }}
              onClick={delBlcok}
            >
              선택 해제
            </div>
            <div id="delete_btn" onClick={delAll}>
              전체 해제
            </div>
          </div>
        )}
      </div>
      <BottomMenu />
      <style jsx>{style}</style>
    </>
  );
}
