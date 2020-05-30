import React from 'react';
import logo from './logo.svg';
import qs from 'qs'
import './App.css';

function App() {
  const [filters, setFilters] = React.useState([])
  const [carOwners, setCarOwners] = React.useState([])
  React.useEffect(() => {
    (async () => {
      const res = await fetch('/car_owners/filters')
      const filters = await res.json();
      setFilters(filters)
      console.log({ filters })
    })()
  }, [])

  const selectFilter = async (filter) => {
    
    const {colors,countries,start_year,end_year,gender} = filter;
    const query = qs.stringify({
      colors: colors.length === 0 ? undefined : colors.join(','),
      countries: countries.length === 0 ? undefined : countries.join(','),
      start_year,
      end_year,
      gender: gender === '' ? undefined : gender.charAt(0).toUpperCase() + gender.slice(1)
    })
    // const query = `?colors=${colors.join(',')}&countries=${countries.join(',')}&start_year=${start_year}&end_year=${end_year}&gender=${gender.charAt(0).toUpperCase() + gender.slice(1)}`
    // console.log({ query })
    const res = await fetch(`/car_owners?${query}`)
    const carOwners = await res.json();
    
    console.log({ carOwners })
    setCarOwners(carOwners)
  }

  return (
    <div className="App">
      <h2 style={{ textAlign: 'left'}}>Filters</h2>
      <ul className="filters">
        {
          filters.map((filter) => {
            return (
              <li key={filter.id} className="filters-item" onClick={() => selectFilter(filter)}>
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
              </li>
            )
          })
        }
      </ul>

      <h2 style={{ textAlign: 'left'}}>Car Owner List</h2>
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
    </div>
  );
}

export default App;
