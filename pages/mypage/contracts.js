import SubHeader from "../../components/common/SubHeader";
import { useRouter } from "next/router";
import TourContractList from "../../components/TourContractList";

export default function MailList() {
  const router = useRouter();

  return (
    <>
      <div id="maillist">
        <SubHeader title="투어 신청 현황" type="contracts" />
        <div className="contract_header"></div>
        <div className="contract_body">
          <TourContractList />
        </div>
      </div>
    </>
  );
}
