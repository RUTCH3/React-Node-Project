import { NavLink } from "react-router-dom"

function ProducerMenu() {
    return (<>
        <NavLink to={`/producer/${1}`}><button>חיפוש מפיקה</button></NavLink>
        <NavLink to={`/producer/edit/`}><button>הוספת מפיקה</button></NavLink>
    </>)
}

export default ProducerMenu