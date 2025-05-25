import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { LoginSignup } from './LoginSignup'
import logoImg from '../assets/img/logo.png'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const { t, i18n } = useTranslation()

    const lngs = {
        en: { nativeName: 'English' },
        es: { nativeName: 'Spanish' },
    }

    function onLogout() {
        try {
            logout()
            showSuccessMsg('Bye Bye')
        } catch (error) {
            showErrorMsg('OOPs try again')
        }
    }

    return (
        <section className="app-header full">
            <section className="nav-wrapper flex justify-between align-center">
                <nav>
                    <NavLink to="/">Home</NavLink>|
                    <NavLink to="/toy">Toys</NavLink>|
                    <NavLink to="/review">Reviews</NavLink>|
                    <NavLink to="/user">Profile</NavLink>|
                    <NavLink to="/dashboard">Dashboard</NavLink>|
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
            <section className="bottom flex justify-between">
                <div className="logo">
                <img src={logoImg} alt="Mister Toy Logo"/>
                </div>
                <div>
                    {user ? (
                        <section>
                            <span to={`/user/${user._id}`}>
                                Hello {user.fullname}
                            </span>
                            <button
                                className="btn btn-logout"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        </section>
                    ) : (
                        <LoginSignup />
                    )}
                </div>
            </section>
        </section>
    )
}
