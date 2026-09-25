import { NavLink, useNavigate } from "react-router-dom"
import InputField from "../component/inputField"
import { FormProvider, useForm } from "react-hook-form"
import { useLoginUserMutation } from "../MutationService/authMutation"
import { toast } from "react-toastify"

export type ILoginProps = {
  email: string,
  password: string,
}

const Login = () => {
  const loginUserMutation = useLoginUserMutation()
  const navigate = useNavigate()

  const methods = useForm<ILoginProps>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: ILoginProps) => {

    if (!data) return

    loginUserMutation.mutateAsync({ payload: data }).then(response => {
      if (response?.data?.accessToken) localStorage.setItem("accessToken", response.data.accessToken)
      navigate("/")
      toast(response.message)
    }).catch(error => {
      console.log(error)
    })


  }

  return (
    <div className="container">
      <div className="card w-xl m-auto bg-secondary-light my-5">
        <div className="card-body">
          <div className="card-title flex-col">
            <h2 className="text-xl">Login</h2>
            <FormProvider {...methods}>
              <form action={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full">
                  <InputField field={"email"} label="Email" />
                  <InputField field={"password"} label="Password" type="password" />
                </div>
                <div className="card-actions justify-center flex-col flex items-center">
                  <button type="submit" className="btn btn-primary">Submit</button>

                  <p>or</p>

                  <NavLink to="register" className="btn btn-link" >Create your account</NavLink>
                </div>
              </form>
            </FormProvider>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Login;