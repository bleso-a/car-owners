import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {ReactComponent as Loader} from './loader.svg'
const CarOwners = (props)=> {
    const [carOwners, setCarOwners] = React.useState([]) 
    const [isLoading, setLoading] = React.useState(false) 
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await axios.get(`/car_owners${props.location.search}`)
            .catch((err)=> {
                setLoading(false)
            })
            setCarOwners(res.data)
            setLoading(false)
        })()
      }, [])   
    return (
        <div>
            <h2 className="page-title">
                <Link to="/">
                    <i className="fas fa-chevron-left"></i>
                    Home
                </Link>
            </h2>
            {
                isLoading && (
                   <Loader/> 
                )
            }
            {
                !isLoading && (
                    <ul className="car-owners-list">
                        {
                        carOwners.map((carOwner) => (
                            <li key={carOwner.id} className="car-owners-list-item">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="200px" viewBox="0 0 64 64" width="200px"><path d="M12 35a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2zM52 35a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2zM23 40h18v2H23zM23 36h18v2H23zM29 21h6v2h-6z"/><path d="M62 30v-2a3.009 3.009 0 00-3-3h-3.96l-2.07-7.26-.62-2.47A3 3 0 0049.44 13H41V9a2.006 2.006 0 00-2-2H25a2.006 2.006 0 00-2 2v4h-8.44a3 3 0 00-2.91 2.27l-.61 2.46L8.96 25H5a3.009 3.009 0 00-3 3v2a2.992 2.992 0 001.41 2.53A4.976 4.976 0 002 36v12a2.986 2.986 0 001 2.22V54a3.009 3.009 0 003 3h8a3.009 3.009 0 003-3v-3h30v3a3.009 3.009 0 003 3h8a3.009 3.009 0 003-3v-3.78A2.986 2.986 0 0062 48V36a4.976 4.976 0 00-1.41-3.47A2.992 2.992 0 0062 30zM25 9h14v4H25zm-11.41 6.76a1 1 0 01.97-.76h34.88a1 1 0 01.97.76l.31 1.24H13.28zM12.75 19h38.5l3.42 12H25.91a5.993 5.993 0 00-11.82 0H9.33zm11.11 12h-7.72a3.983 3.983 0 017.72 0zM4 28a1 1 0 011-1h3.39l-1.14 4H5a1 1 0 01-1-1zm11 26a1 1 0 01-1 1H6a1 1 0 01-1-1v-3h10zm44 0a1 1 0 01-1 1h-8a1 1 0 01-1-1v-3h10zm1-6a1 1 0 01-1 1H5a1 1 0 01-1-1v-1h56zm0-3H4v-9a3.009 3.009 0 013-3h50a3.009 3.009 0 013 3zm0-15a1 1 0 01-1 1h-2.25l-1.14-4H59a1 1 0 011 1z"/></svg>
                            </div>
        
                            <div className="car-owners-list-item-right">
                                <h3>{carOwner.first_name} {carOwner.last_name}</h3>
        
                                <div className="car-owners-list-item-info">
                                <div>
                                    <p className="car-owners-list-item-info-label">Brand</p>
                                    <p className="car-owners-list-item-info-value">{carOwner.car_model}</p>
                                </div>
                                <div>
                                    <p className="car-owners-list-item-info-label">Year</p>
                                    <p className="car-owners-list-item-info-value">{carOwner.car_model_year}</p>
                                </div>
                                <div>
                                    <p className="car-owners-list-item-info-label">Color</p>
                                    <p className="car-owners-list-item-info-value"><span style={{ backgroundColor: carOwner.car_color }}></span></p>
                                </div>
                                </div>
                                
                                <div className="car-owners-list-item-info">
                                <div>
                                    <p className="car-owners-list-item-info-label">Country</p>
                                    <p className="car-owners-list-item-info-value">{carOwner.country}</p>
                                </div>
                                <div>
                                    <p className="car-owners-list-item-info-label">Gender</p>
                                    <p className="car-owners-list-item-info-value">{carOwner.gender}</p>
                                </div>
                                <div>
                                    <p className="car-owners-list-item-info-label">Job</p>
                                    <p className="car-owners-list-item-info-value">{carOwner.job_title}</p>
                                </div>
                                </div>
        
        
                                <p className="car-owners-list-item-info-email">Email: <span>{carOwner.email}</span></p>
                                <p className="car-owners-list-item-info-bio">Bio: <span>{carOwner.bio}</span></p>
                            </div>
                            </li>
                        ))
                        }
                    </ul>
                )
            }
           
        </div>
       
    )
}
export default CarOwners