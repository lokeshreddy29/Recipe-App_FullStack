import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"
import { store } from "../Redux/store"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"

const queryClient = new QueryClient()
// wraps a component in all the necessary context providers
const renderWithProviders = (component) => {
        render (
            <Provider store = {store} >
                <QueryClientProvider client = {queryClient} >
                    <BrowserRouter>
                        {component}
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        )
}

export default renderWithProviders