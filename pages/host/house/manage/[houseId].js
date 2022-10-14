import Link from "next/link";
import SubHeader from "../../../../components/common/SubHeader";
import HostHouseRoomList from "../../../../components/HostHouseRoomList";

const manage = () => {
  return (
    <>
      <SubHeader title="방관리" type="roomManage" />
      <Link href={`/host/house/manage/add`}>
        <a>방등록</a>
      </Link>
      <HostHouseRoomList />
    </>
  );
};

export default manage;
