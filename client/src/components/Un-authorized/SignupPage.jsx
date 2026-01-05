import { Link, useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { addUserDetailsToRedux } from "../../Redux/Slices/authSlice"

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: async (user) => {
      const signUpResponse = await fetch(`http://13.54.140.29/auth/createAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })

      if (!signUpResponse.ok) {
        const err = await signUpResponse.json()
        throw new Error(err.message)
      } else {
        const response = await signUpResponse.json()
        dispatch(addUserDetailsToRedux(response))
        navigate("/")
      }
    },
  })

  const handleFormData = (event) => {
    event.preventDefault()
    const signUpCreds = {}
    const formData = new FormData(event.target)
    for (let [key, value] of formData.entries()) {
      signUpCreds[key] = value
    }
    mutateAsync(signUpCreds)
  }

  return (
    // this first div is the whole page
    <div className="w-full h-screen flex bg-white">
      {/* this second div divides the page into white and orange fractions */}
      <div className="w-2/5">
        {/* this third div aligns the creds box in the center of the white portion */}
        <div className="h-screen flex justify-center items-center">
          <form className="space-y-5" onSubmit={(e) => handleFormData(e)}>
            <div className="flex justify-center text-xl text-autumn-leaves-1">
              Create an account
            </div>
            <div className="w-75 flex flex-col gap-y-5">
              {/* inputs for username, email and password */}
              <input
                name="name"
                id="username"
                type="text"
                placeholder="Username"
                required
                className=" bg-gray-200 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
              />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                required
                className="bg-gray-200 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
              />
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                required
                className="bg-gray-200 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
              />
            </div>

            {/* sign in and sign up buttons */}

            <button
              // onClick={() => handleSignUpSubmit()}
              type="submit"
              className="h-10 w-full bg-autumn-leaves-1 text-white rounded-sm cursor-pointer
              transition duration-300 ease-in-out hover:bg-autumn-leaves-2"
            >
              Sign Up
            </button>

            {/* handling error incase the email user provider already exists */}
            <div className="flex justify-center">
              {isError && (
                <p className="text-autumn-compliment-dark">{error?.message}</p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm">Already have an account?</p>
              <Link to="/">
                {" "}
                <button className="text-md font-medium text-autumn-leaves-1 cursor-pointer ">
                  Sign In
                </button>{" "}
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

      <div className="w-3/5 bg-autumn-leaves-1 overflow-clip">
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-col items-center">
            <span className="text-md italic">
              The culinary world at your fingertips to share, save and explore
            </span>
            <span className="text-9xl">RECIPE</span>
            <span className="text-6xl">HUB</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
