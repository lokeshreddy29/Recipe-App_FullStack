import { expect, test, describe } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import renderWithProviders from './testUtils'

describe("Home page component tests", () => {
    test
    ("hero text validation", () => {
        renderWithProviders(<App />)

        // find
        const heroText = screen.getByText(/Welcome to Recipe Hub/i)
        const captionText = screen.getByText('Ready to share your recipes with the world ?')

        // asser
        expect
        (heroText).toBeInTheDocument()
        expect
        (captionText).toBeInTheDocument()
        expect
        (heroText).toHaveTextContent(/Welcome/)
    })

    test
    ("access your kitchen button validation", async () => {
        renderWithProviders(<App />)

        // find access your kitchen button
        const accessKitchenButton = screen.getByRole("button", {name: "Access your kitchen"})

        // act on it
        await userEvent.click(accessKitchenButton)

        // assert
        expect
        (await screen.findByText(/sign in/i)).toBeInTheDocument()

        // find button to go back to home
        const homeButton = screen.getByRole("button", {name: "Explore without an account"})

        // act to go back to home
        await userEvent.click(homeButton)

        // assert to validate home redirection
        expect
        (screen.getByText(/welcome to recipe hub/i)).toBeInTheDocument()
    })

    test
    ("login button", async () => {
        renderWithProviders(<App />)

        // find
        const loginButton = screen.getByRole("button", {name: 'Login'})

        // assert
        expect
        (loginButton).toBeInTheDocument()

        // act
        await userEvent.click(loginButton)

        // assert
        expect
        (screen.getByText(/sign in/i)).toBeInTheDocument()

        // find button to go back to home
        const homeButton = screen.getByRole("button", {name: "Explore without an account"})

        // act to go back to home
        await userEvent.click(homeButton)

        // assert to validate home redirection
        expect
        (screen.getByText(/welcome to recipe hub/i)).toBeInTheDocument()
    })

    test
    ("sign up button", async () => {
        renderWithProviders(<App />)

        // find
        const signUpButton = screen.getByRole("button", {name: "Signup"})
        // assert
        expect
        (signUpButton).toBeInTheDocument()

        // act
        await userEvent.click(signUpButton)

        // assert redirection
        expect
        (screen.getByText(/create an account/i)).toBeInTheDocument()

        // find button to go back to home
        const homeButton = screen.getByRole("button", {name: "Explore without an account"})

        // act to go back to home
        await userEvent.click(homeButton)

        // assert to validate home redirection
        expect
        (screen.getByText(/welcome to recipe hub/i)).toBeInTheDocument()
    })
})