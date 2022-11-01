import SubHeader from "../components/common/SubHeader";
import LikeList from "../components/like/likeList";

const like = () => {
  return (
    <>
      <SubHeader title="좋아요" type="like" />
      <LikeList />
    </>
  );
};

export default like;
