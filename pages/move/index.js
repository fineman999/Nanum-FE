import MoveForm from "../../components/MoveForm";
import SubHeader from "../../components/common/SubHeader";
const move = () => {
  return (
    <>
      <div className="move_page">
        <SubHeader title="입주 신청" type="moveForm" />
        <MoveForm />
      </div>
    </>
  );
};

export default move;
