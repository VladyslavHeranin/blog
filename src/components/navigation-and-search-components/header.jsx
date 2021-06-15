import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../reducers/userRed"


export const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return <div className="card">
        <div className="card-content nav-wrapper blue-grey darken-1">
            <nav className=" blue-grey darken-1">

                <div className="brand-logo"> <span>Micro-blog platform</span></div>

                <ul className="right hide-on-med-and-down left">

                    {!isAuth && <li><NavLink to="/login">Log in</NavLink></li>}
                    {!isAuth && <li><NavLink to="/registartion">Registartion</NavLink></li>}

                    {isAuth &&
                        <div>
                            <button className="btn" onClick={() => dispatch(logOut())} >Log out</button>
                        </div>
                    }
                </ul>

            </nav>
        </div>
    </div>
}