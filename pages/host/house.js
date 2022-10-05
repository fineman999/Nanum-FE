import Header from "../../components/common/Header";
import css from "styled-jsx/css";

const style = css`
  #house {
    padding: 5rem 1rem 1rem;
  }
`;
export default function MyHouse() {
  return (
    <>
      <div id="house">
        <Header title="내하우스" type="house" />
      </div>
    </>
  );
}
