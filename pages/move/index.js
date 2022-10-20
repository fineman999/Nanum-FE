import { useRouter } from "next/router";
import { useEffect } from "react";
import MoveForm from "../../components/MoveForm";

const move = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, []);
  return (
    <>
      <MoveForm />
    </>
  );
};

export default move;
