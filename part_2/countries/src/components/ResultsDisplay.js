import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = ({weatherInfo}) => {
    return (
        <>
            <h3>{`Weather in ${weatherInfo.name}`}</h3>
            <p>{`temperature ${weatherInfo.main.temp} Celcius`}</p>
            <img width='100' src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={`Weather icon of ${weatherInfo.name}`}></img>
            <p>{`wind ${weatherInfo.wind.speed} m/s`}</p>
        </>
    )
}

const DisplayMessage = ({message}) =>
<p>{message}</p>

// Each language is an object, want to print each value as a list item
const Languages = ({ countryLanguages }) => {
    const langArr = (Object.values(countryLanguages))
    return (
      langArr.map((lang, index) => <li key={index}>{lang}</li>)
    )
  }

const SingleCountry = ({singleCountry}) => {
    // Get weather inforation for capital of country (use metric units for Celcius temp)
    const [weatherInfo, setWeatherInfo] = useState([])
    
    let capLat = singleCountry.capitalInfo.latlng[0]
    let capLng = singleCountry.capitalInfo.latlng[1]

    let getAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${capLat}&lon=${capLng}&appid=${API_KEY}&units=metric`
    useEffect(() => {
        axios
        .get(getAddress)
        .then(response => {
            setWeatherInfo(response.data)
        })  
    }, [])
    
    console.log(weatherInfo)

    // If weather data is not present yet
    if (weatherInfo.length === 0) {
        return (
            <>
                <h2>{singleCountry.name.common}</h2>
                <p>capital {singleCountry.capital}</p>
                <p>area {singleCountry.area}</p>
                <h4>languages</h4>
                <ul>
                <Languages countryLanguages={singleCountry.languages}/>
                </ul>
                <img  width='200' src={singleCountry.flags.png} alt={`Flag of ${singleCountry.name.common}`}></img>
            </>
        )
    }
    else {
        return (
            <>
                <h2>{singleCountry.name.common}</h2>
                <p>capital {singleCountry.capital}</p>
                <p>area {singleCountry.area}</p>
                <h4>languages</h4>
                <ul>
                <Languages countryLanguages={singleCountry.languages}/>
                </ul>
                <img width='200' src={singleCountry.flags.png} alt={`Flag of ${singleCountry.name.common}`}></img>

                <Weather weatherInfo={weatherInfo} />
            </>
        )        
    }
}

const Results = ({countries, totalCountries, setNewFilteredCountries}) => 
{
    const enterFilterMessage = 'Please enter a filter to see country results'
    const tooManyMessage = 'Too mant matches, specify another filter'
    const noMatchesMessage = 'No countries match the filter'

    const numCountries = countries.length

    // No filter, filtered countries equals the total number of countries
    if (numCountries === totalCountries) 
        return <DisplayMessage message={enterFilterMessage} />
    else if (numCountries > 10) 
        return <DisplayMessage message={tooManyMessage} />
    else if (numCountries === 0) 
        return <DisplayMessage message={noMatchesMessage} />
    else if (numCountries === 1) 
        return <SingleCountry singleCountry={countries[0]} />
    // Else --> number of countries is more than 1, but no more than 10, add show button
    else 
        return (
            <>
                {countries.map(
                    (country, i) => <p key={i}> {country.name.common} <button onClick={() => {
                        // Pass country as array, not object to call back into Results
                        setNewFilteredCountries([country])
                    }}>show</button></p>
                )}
            </>
        )    
}

export default Results