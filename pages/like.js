import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import css from "styled-jsx/css";
import Header from "../components/common/Header";
import HouseListItem from "../components/HouseListItem";
import { get } from "../lib/apis/apiClient";
import { userState } from "../state/atom/authState";
import wishListState from "../state/atom/wishListState";

const style = css`
  #like {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-self: center;
    min-height: 92.5vh;
    padding: 5rem 1rem;
    box-sizing: border-box;
  }
  .house_list {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .house_list_item {
    box-sizing: border-box;
    width: 48%;
    margin-bottom: 12px;
    font-size: 10px;
  }
  .house_list_wrapper {
    position: relative;
    width: 100%;
  }
  @media all (min-width: 1024px) {
    .house_list_wrapper {
      box-sizing: border-box;
      width: 100%;
      height: 100vh;
      overflow: auto;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .house_list_wrapper::-webkit-scrollbar {
      display: none;
    }

    .house_list_item {
      box-sizing: border-box;
      width: 30%;
      margin-bottom: 12px;
      font-size: 16px;
    }
  }
`;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    name: "Bed",
    isLike: true,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스],
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    name: "Books",
    isLike: true,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    name: "Sink",
    isLike: true,
    gender: "남성전용", // 'm' 남성전용, 'f' 여성전용, 'c' 남녀공용
    type: "빌라", // [빌라, 아파트, 오피스텔]
  },
];

const BASE_URL = `${process.env.NANUM_HOUSE_SERVICE_BASE_URL}`;

export default function Like() {
  const userValue = useRecoilValue(userState);
  const [wishList, setWishList] = useRecoilState(wishListState);
  useEffect(() => {
    const API_URI = `/users/${userValue.id}/wishes`;

    get(BASE_URL, API_URI).then((res) => {
      console.log(res);
      const { status } = res;
      const { isSuccess, message, result } = res.data;

      setWishList(result.content);
    });
  }, []);
  return (
    <>
      <div id="like">
        <Header title="좋아요" type="like" />
        <div className="house_list_wrapper">
          <ul className="house_list">
            {wishList &&
              wishList.map((item, index) => (
                <li className="house_list_item" key={index}>
                  <HouseListItem item={item} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <style jsx>{style}</style>
    </>
  );
}
