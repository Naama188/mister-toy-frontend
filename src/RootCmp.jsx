import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './assets/styles/main.scss'

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'
import { AboutUs } from './pages/AboutUS'
import { HomePage } from './pages/HomePage'
import { ReviewIndex } from './pages/ReviewIndex'
import { ToyDashboard } from './pages/ToyDashboard'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { ToyIndex } from './pages/ToyIndex'
import { UserDetails } from './pages/UserDetails'
import { store } from './store/store'
import { DynamicModal } from './cmps/DynamicModal'

import { ClassNames } from '@emotion/react'

export function App() {
    const obj = {
        className: "main-layout app"
    }
    return (
        <Provider store={store}>
            <Router future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}>
                <section {...obj}>
                    <AppHeader />
                    <main >
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyDashboard />} path="/dashboard" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ReviewIndex />} path="/review" />
                            <Route element={<UserDetails />} path="/user" />
                        </Routes>
                    </main>
                    <DynamicModal />
                    <AppFooter />
                </section>
            </Router>
            <UserMsg />
        </Provider>
    )
}