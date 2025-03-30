import { useContext, useState } from "react";
import { ProdContext } from "../context/prod.context";

function ProducerDetailes() {
    const { getProdById } = useContext(ProdContext);

    const [searchTerm, setSearchTerm] = useState(0);
    
    const filterProd = getProdById ? (searchTerm) : 'מממממ';

    const prodList = Array.isArray(filterProd) ? filterProd : ['החכנ'];

    return (<>
        <p>producer details</p>
        <input
            type="search"
            id="search_prod"
            placeholder="Search producer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(Number(e.target.value))}
        />
        {prodList.map(e => <p>{e}</p>)}

    </>)
}

export default ProducerDetailes