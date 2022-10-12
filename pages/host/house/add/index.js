import SubHeader from "../../../../components/common/SubHeader";
import HouseAddForm from "../../../../components/HouseAddForm";

const index = () => {
  return (
    <>
      <SubHeader title="하우스 등록" type="myHouse" />
      <section className="form_section">
        <HouseAddForm />
      </section>
      <style jsx>{`
        .form_section {
          width: 1024px;
          margin: 0 auto;
          max-width: "1200px";
          padding: 20px;
          background: white;
        }
      `}</style>
    </>
  );
};

export default index;
