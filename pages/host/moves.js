import SubHeader from "../../components/common/SubHeader";
import HostMoveContractList from "../../components/HostMoveContractList";

const moves = () => {
  return (
    <>
      <SubHeader title="입주 신청 현황" type="moves" />
      <HostMoveContractList />
    </>
  );
};

export default moves;
