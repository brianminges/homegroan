import React from "react"
import { getAllProviders } from "./../../modules/ProviderManager"

export const ServiceProviderList = () => {
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        getAllProviders()
        .then(setProviders)
    }, [])


    return (
        <>
            <h2>Service Providers</h2>
        </>
    )
}