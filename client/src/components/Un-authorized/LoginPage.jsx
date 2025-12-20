import { useMutation } from "@tanstack/react-query"
import { Link, Navigate, useNavigate } from "react-router"

function LoginPage({ setAccess }) {
  const api_base = "http://localhost:3000"
  const navigate = useNavigate()

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: async (loginCreds) => {
      const signInResponse = await fetch(api_base + "/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginCreds),
      })

      if (!signInResponse.ok) {
        const err = await signInResponse.json()
        throw new Error(err.message)
      } else {
        const response = await signInResponse.json()
        setAccess(response.accessToken)
        navigate("/dashboard")
      }
    },
  })

  const handleLogin = (event) => {
    event.preventDefault()
    const loginCreds = {}
    const loginFormData = new FormData(event.target)
    for (let [key, value] of loginFormData.entries()) {
      loginCreds[key] = value
    }
    mutateAsync(loginCreds)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-white p-10 lg:w-1/4 space-y-10 rounded-xl">
        <p className="font-bold text-xl text-autumn-leaves-1">Sign in</p>

        {/* form to handle sign in */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="flex flex-col gap-y-5">
            {/* inputs for email and password */}
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
              className="bg-gray-100 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
            />
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              required
              className="bg-gray-100 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
            />
          </div>
          <div className="flex justify-between">
            {/* remember me checkbox and forgot password button */}
            <div className="space-x-2">
              <input
                id="remember-me"
                type="checkbox"
                className="accent-autumn-leaves-1"
              />
              <label for="remember-me" className="text-black text-sm">
                Remember me
              </label>
            </div>
            <Link to="/">
              <button className="cursor-pointer text-black text-sm">
                Forgot password?
              </button>
            </Link>
          </div>

          {/* login and sign up buttons */}
          <button
            type="submit"
            className="h-10 w-full bg-autumn-leaves-1 text-white rounded-sm cursor-pointer
                        transition duration-300 ease-in-out hover:bg-autumn-leaves-2"
          >
            Login
          </button>
          {/* handling error incase the email or password is wrong */}
          <div className="flex justify-center">
            {isError && (
              <p className="text-autumn-compliment-dark">{error?.message}</p>
            )}
          </div>
          <div className="flex gap-x-7 mt-3 justify-center">
            <p>Not a member?</p>
            <Link to="/signup">
              <button className="text-autumn-leaves-1 font-medium cursor-pointer">
                Sign up
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link to="/">
              {" "}
              <button className="text-sm font-normal text-autumn-leaves-1 cursor-pointer ">
                Explore without an account
              </button>{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
