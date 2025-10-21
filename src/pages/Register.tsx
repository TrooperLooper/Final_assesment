function Register() {
  return (
    <>
      <div className="container mx-auto p-4 text-center">
        <h1>Register</h1>
        <p>Please fill in the form below to create an account.</p>
        <form className="bg-red-200 p-4 rounded">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
