import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';    
import Vid from "./image-svids/large.mp4"

export default function App() {

  let [api , setApi] = useState(null)
  let [location , setLocation] = useState("cairo")
  let [result , setResult] = useState(false)

  async function getData(city){
    // let DataA = await axios.get("https://api.weatherapi.com/v1/current.json?key=c613201988be4d63b4d13758250709&q=cairo")
    // setApi([DataA.data.location])
    // console.log(DataA);
    // console.log(DataA.data)
    // console.log(DataA.data.location)

    let {data} = await axios.get(`https://api.weatherapi.com/v1/current.json?key=c613201988be4d63b4d13758250709&q=${city}`)
    setApi(data)
    setResult(true)
    console.log(data)
  }

  useEffect(() =>{
  getData(location)
  } , [])

  function clickSearch() {
    getData(location)
  }

  function enterSearch(e){
    if(e.key === "Enter"){
      getData(location)
    }
  }
    
  return (
  <div className="contain">

    <div className="background-vid">
      <video src={Vid} autoPlay loop muted playsInline></video>
    </div>
          
    <div className='weather'>

      <div className="left">
        <div className="content col-lg-4 col-md-6 col-sm-12" data-aos="fade-up">
        <h1 className='mb-4 fw-bold' >Weather App 🌥️</h1>
        <h2 className='text-light mb-3'>Enter your city name:</h2>
        <input type="text" placeholder="E.g., Cairo, Alex, etc" className="form-control mb-3" onChange={(e) => setLocation(e.target.value)} onKeyDown={enterSearch}/>
        <button className='btn btn-dark' onClick={clickSearch}>Search</button>
        </div>

        <div className="update col-lg-4 col-md-6 col-sm-12" data-aos="fade-down">
          {api && result && (
            <div className="conn">
            <h4 className='text-center'>Last Updated: <span className='text-danger'>{api.current.last_updated}</span></h4>
            <p className='text-center m-3'> <i class="fa-solid fa-globe"></i> Lattitude: {api.location.lat} / Longitude: {api.location.lon}</p>
            </div>
          )}
        </div>

        <p className='text-light mt-4'>© 2025 Copyright: Natalie's Weather App</p>
      </div>

      <div className="info col-lg-4 col-md-6 col-sm-12" data-aos="flip-right" data-aos-delay="300">
        {/* {api.map((item , index) => 
          <div key={index}>
            <p>{item.country}</p>
          </div>
        )}*/}

        {api && result && (
          <div className="con">
            <h2>Weather details for <span className='text-warning'><i class="fa-solid fa-location-crosshairs"></i> {api.location.name} , {api.location.country}</span> :</h2>
            <div className="line"></div>
            <p className='text-center'><i className="fa-regular fa-clock"></i> local time: {api.location.localtime}</p>
            <h1 className='text-center'> <i class="fa-solid fa-temperature-half"></i> {api.current.temp_f}F° / {api.current.temp_c} C° {api.current.condition.text} <img src={api.current.condition.icon} data-aos="zoom-in" data-aos-delay="700"/></h1>
            <h4 className='text-success mb-3'>More details:</h4>
            <p data-aos="fade-up" data-aos-delay="500"><i class="fa-solid fa-wind"></i> Wind speed : {api.current.wind_kph} & Direction: {api.current.wind_dir}</p>
            <p data-aos="fade-up" data-aos-delay="600"><i class="fa-solid fa-droplet"></i> Humidity : {api.current.humidity} </p>
            <p data-aos="fade-up" data-aos-delay="700"><i class="fa-solid fa-cloud-rain"></i> Precipitation : {api.current.precip_mm}</p>
            <p data-aos="fade-up" data-aos-delay="800"><i class="fa-solid fa-eye"></i> Visibility : {api.current.vis_km}</p>
          </div>
        )}

      </div>
      
    </div>
       
  </div>
    )
  }
