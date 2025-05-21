import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const MainMenu = () => {
    return (<>




        <NavLink to='/producer'>
            <Button type="submit" variant="contained" color="primary">מפיקה</Button>
        </NavLink>
        <br />
        <NavLink to='/user'>
            <Button type="submit" variant="contained" color="primary">משתמשת</Button>
        </NavLink>
    </>)
}

export default MainMenu