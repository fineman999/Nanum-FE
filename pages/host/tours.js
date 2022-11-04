import SubHeader from "../../components/common/SubHeader";
import HostTourContractFilter from "../../components/HostTourContractFilter";
import HostTourContractList from "../../components/HostTourContractList";

export default function tours() {
  return (
    <>
      <div id="process">
        <SubHeader title="투어 신청 현황" type="contracts" />
        <div className="contract_header">
          <HostTourContractFilter />
        </div>
        <div id="contract_body">
          <HostTourContractList />
        </div>
      </div>
    </>
  );
}
