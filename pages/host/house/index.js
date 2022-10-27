import SubHeader from "../../../components/common/SubHeader";
import HostHouseList from "../../../components/HostHouseList";
import MyHouseButtons from "../../../components/MyHouseButtons";
export default function MyHouse() {
  return (
    <>
      <SubHeader title="나의 하우스" type="myHouse" />
      <MyHouseButtons />
      <HostHouseList />
    </>
  );
}
