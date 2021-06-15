import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { User } from "./user"
import { Auth } from "../../actions/user"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { ListUser } from "../../actions/user"
import { Search } from "../../actions/user"
import { Input } from "../navigation-and-search-components/input"


export const Users = () => {

    const [valueInp, setValInp] = useState("")

    const [current, setCurrent] = useState([])

    const [page, setPage] = useState(1)

    const users = useSelector(state => state.user.currentUser.users)

    const value = useSelector(state => state.user.currentUser)

    const currentUser = useSelector(state => state.user.currentUser.user)

    const dispatch = useDispatch()

    const scrolleHendler = () => {

        setPage(prevPage => prevPage + 1)

        setCurrent([...current, ...users])

    }


    const delItem = (user) => {

        setCurrent(current.filter(item => user !== item._id))

    }

   


    useEffect(() => {

        dispatch(ListUser(page))

    }, [page])



    return (
        <div className="card" >
            <NavLink to="/login"><button className="close_button" onClick={() => dispatch(Auth())}> &#8592; </button></NavLink>

            <Input setValInp={setValInp} valueInp={valueInp} setPage={setPage} setCurrent={setCurrent} page={page} />

            {value.search.map((user, id) => <User user={user} delItem={delItem} current={currentUser} key={id} page={page} search={value.search} />)}

            { value.search.length === 0 || <div className="search_results"> search results {value.search.length} account </div>}

            {current.map((user, id) => <User user={user} delItem={delItem} current={currentUser} key={id} page={page} setPage={setPage} />)}

            {value.userAll >= page
                ?
                <button className="button" onClick={() => scrolleHendler()}> Lode More  </button>
                :
                <div className="buttonNotActive" onClick={() => window.M.toast({ html: "These are all users" })}>These are all users</div>}
        </div>
    )
}