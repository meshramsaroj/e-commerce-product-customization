import { NavLink } from "react-router-dom"

const Form = () => {
  return (
    <div className="flex flex-col w-full">
      <fieldset className="fieldset">
        <label className="label" htmlFor="username">Email</label>
        <input name="email" type="text" className="input-text" placeholder="Enter your email" />
      </fieldset>
      <fieldset className="fieldset w-sm">
        <label className="label" htmlFor="password">Name</label>
        <input name="password" type="password" className="input-text" placeholder="Enter your password" />
      </fieldset>
    </div>
  )
}

const Login = () => {
  const handleSubmit = () => {

  }

  return (
    <div className="container">
      <div className="card w-xl m-auto bg-secondary-light my-5">
        <div className="card-body">
          <div className="card-title flex-col">
            <h2 className="text-xl">Login</h2>
            <form action={handleSubmit}>
              <Form />
            </form>
          </div>
          <div className="card-actions justify-center flex-col flex items-center">
            <button className="btn btn-primary">Submit</button>

            <p>or</p>

            <NavLink to="register" className="btn btn-link" >Create your account</NavLink>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login;