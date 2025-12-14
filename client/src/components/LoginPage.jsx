

function LoginPage() {
    return (
        <div className="h-screen">
            <form>
                <section className="flex flex-col place-items-center">
                    <label for="email"> Email: </label>
                    <input id="email" type="email" required />

                    <label for="password"> Password: </label>
                    <input id="password" type="password" required />

                    <button className='h-7 w-20 bg-autumn-leaves-1 text-white rounded-sm cursor-pointer'>Login</button>
                </section>
            </form>
        </div>
    )
}

export default LoginPage