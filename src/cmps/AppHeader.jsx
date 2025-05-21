import { NavLink } from 'react-router-dom'
import logoImg from '../assets/img/logo.png'

export function AppHeader() {

    return (
        <section className="app-header container">
            <div className="flex justify-between">
                <nav>
                    <NavLink to="/">Home</NavLink> |
                    <NavLink to="/toy">Toys</NavLink> |
                    <NavLink to="/dashboard">Dashboard</NavLink> |
                    <NavLink to="/about">About</NavLink>
                </nav>             
            </div>
            <div className="logo">
  <img src={logoImg} alt="Mister Toy Logo"/>
</div>
        </section>
    )
}
