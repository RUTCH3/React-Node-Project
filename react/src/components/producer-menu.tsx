import { Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const ProducerMenu=()=> {
    return (<>
        <NavLink to={`/producer/search`}>
            <Button type="submit" variant="contained" color="primary">מפיקה קיימת</Button>
        </NavLink>
        <NavLink to={`/producer/edit`}>
            <Button type="submit" variant="contained" color="primary">הוספת מפיקה</Button>
        </NavLink>
    </>)
}

export default ProducerMenu