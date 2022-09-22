export default function Signup() {
  return (
    <div>
      <section id="signup_header">
        <h1>NANUM</h1>
      </section>
      <section id="signup_form">
        <input type="email" id="email" />
        <input type="text" id="nickname" />
        <input type="password" id="pw" />
        <input type="text" id="tel" />

        <input type="password" id="passwordConfirmation" />
      </section>
    </div>
  );
}
