import Link from "next/link";
import SubHeader from "../../../components/common/SubHeader";
import HostHouseList from "../../../components/HostHouseList";
export default function MyHouse() {
  return (
    <>
      <SubHeader title="나의 하우스" type="myHouse" />
      <Link href="/host/house/add">
        <a>등록</a>
      </Link>
      <HostHouseList />
    </>
  );
}
