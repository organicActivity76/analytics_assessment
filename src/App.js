import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ChartDoughnut from './ChartDoughnut';

const API_ENDPOINT = 'https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&id=240444&api_key=KcSoo7QYydnnCcdTR9UrvyTnkqvdz9B9n8EpbAeU';

const App = () => {
  const [url, setUrl] = React.useState(API_ENDPOINT);
  const [schoolData, setData] = React.useState(null)

  const getSchool =( () => {
    axios.get(url)
    .then(response => {
      const transformedJson = response.data.results[0]
      setData(transformedJson) 
    })
    .catch( () => 
      console.log("error")
    )
  } );

  React.useEffect(() => {
    getSchool();
  }, [url]); 

  return (
    <div>
      {schoolData ? (
        <div>
          <h1>{schoolData.school.name}</h1>
          {schoolData.school.alias ? ( 
            <p>School Alias: {schoolData.school.alias}</p>
          ) : (
            <div></div>
          )}
          <p>Website: {schoolData.school.school_url}</p>
          <p>Location: {schoolData.school.city}, {schoolData.school.state}</p>
          <p>Zip Code: {schoolData.school.zip}</p>
          <p>Total Number of students: {schoolData.latest.student.size}</p>
          <h3>Program Percentage</h3>
          <ChartDoughnut data={schoolData.latest.academics.program_percentage}/>
          <h3>Race Ethnicity Percentages</h3>
          <ChartDoughnut data={schoolData.latest.student.demographics.race_ethnicity}/>
        </div>
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>

  )
}; 


export default App;
