import { NavLink } from "react-router-dom"

function ProducerMenu() {
    return (<>
        <NavLink to={`/producer/search`}><button>חיפוש מפיקה</button></NavLink>
        <NavLink to={`/producer/edit`}><button>מפיקה קיימת</button></NavLink>
    </>)
}

export default ProducerMenu