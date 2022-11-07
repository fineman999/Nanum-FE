import LoginForm from "../components/common/LoginForm";
import SubHeader from "../components/common/SubHeader";

export default function Login() {
  return (
    <>
      <SubHeader title="로그인" type="login" />
      <LoginForm />
    </>
  );
}
