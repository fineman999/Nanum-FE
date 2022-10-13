import SubHeader from "../../../../components/common/SubHeader";
import HouseForm from "../../../../components/HouseForm";

const index = () => {
  return (
    <>
      <SubHeader title="하우스 수정" type="myHouse" />
      <section className="form_section">
        <HouseForm />
      </section>
      <style jsx>{`
        .form_section {
          width: 100%;
          height: 100%;
          background: white;
        }
      `}</style>
    </>
  );
};

export default index;
