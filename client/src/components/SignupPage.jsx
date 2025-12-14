import { Link } from "react-router"

function SignUp() {
  return (
    // this first div is the whole page
    <div className="w-full h-screen flex bg-white">
        {/* this second div divides the page into white and orange fractions */}
      <div className="w-2/5">
            {/* this third div aligns the creds box in the center of the white portion */}
        <div className="h-screen flex justify-center items-center">
          <form className="space-y-5">
            <div className="flex justify-center text-xl text-autumn-leaves-1">
                Create an account
            </div>
            <div className="w-75 flex flex-col gap-y-5">
                
              {/* inputs for username, email and password */}
              <input
                id="username"
                type="text"
                placeholder="Username"
                required
                className=" bg-gray-200 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                className="bg-gray-200 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="bg-gray-200 h-10 placeholder: p-4 outline-0 focus:ring-1 ring-autumn-leaves-2"
              />
            </div>

            {/* sign in and sign up buttons */}
            <div>
              <button className='h-10 w-full bg-autumn-leaves-1 text-white rounded-sm cursor-pointer
              transition duration-300 ease-in-out hover:bg-autumn-leaves-2'>Sign Up</button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Already have an account?</p>
              <Link to='/login'> <button className="text-md font-medium text-autumn-leaves-1 cursor-pointer ">Sign In</button> </Link>
            </div>
            <div className="flex flex-col items-center">
              <Link to='/'> <button className="text-sm font-normal text-autumn-leaves-1 cursor-pointer ">Explore without an account</button> </Link>
            </div>
          </form>
        </div>
      </div>


      <div className="w-3/5 bg-autumn-leaves-1">
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <span className="text-md italic">
                    The culinary world at your fingertips to share, save and explore
                </span>
                <span className="text-9xl">
                    RECIPE
                </span>
                <span className="text-6xl">
                    HUB
                </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
