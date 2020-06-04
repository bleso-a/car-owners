import React from 'react'
import qs from 'qs'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {ReactComponent as Loader} from './loader.svg'

const buildQuery = (filter) => {
    
    const {colors,countries,start_year,end_year,gender} = filter;
    const query = qs.stringify({
      colors: colors.length === 0 ? undefined : colors.join(','),
      countries: countries.length === 0 ? undefined : countries.join(','),
      start_year,
      end_year,
      gender: gender === '' ? undefined : gender.charAt(0).toUpperCase() + gender.slice(1)
    })
    return query
  }


const Filters = ()=> {
    const [filters, setFilters] = React.useState([])
    const [isLoading, setLoading] = React.useState(false) 
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await axios.get('/car_owners/filters')
            .catch((err)=> {
                setLoading(false)
            })
            setFilters(res.data)
            setLoading(false)
        })()
      }, [])    
    return (
        <div>
            <h2 className="page-title">
                <i class="fas fa-filter"></i>
                Filter
            </h2>
            {
                isLoading && (
                   <Loader/> 
                )
            }

            {
                !isLoading && (
                    <ul className="filters">
                        {
                            filters.map((filter) => {
                                const query = buildQuery(filter)
                                console.log(query)
                                return (
                                    <li key={filter.id} className="filters-item">
                                        <Link to={`/car-owners/?${query}`}>
                                            <h3>{filter.start_year} - {filter.end_year}</h3>
                                            <p>{filter.gender}</p>
                                            <ul className="filters-item-countries">
                                                {
                                                    filter.countries.map((country) => <li key={country}>{country}</li>)
                                                }
                                            </ul>
                                            <ul className="filters-item-colors">
                                                {
                                                    filter.colors.map((color) => <li key={color} style={{ backgroundColor: color }} />)
                                                }
                                            </ul>

                                        </Link>
                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}
export default Filters