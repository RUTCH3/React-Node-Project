import { NavLink } from "react-router-dom"

function MainMenu() {
    return (<>
        <NavLink to='/producer'><button>מפיקה</button></NavLink>
        <br />
        <NavLink to='/user'><button>משתמשת</button></NavLink>
    </>)
}

export default MainMenu