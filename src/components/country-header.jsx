import React from 'react';

function CountryHeader({ data, flag }) {

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;;

  return (
    <div>
      <div>
        <p>Live {today} </p>
        <p>Today's cases: {data.todayCases}</p>
        <p>Today's deaths: {data.todayDeaths}</p>
        <p>Total number of tests: {data.tests}</p>
      </div>

      <div>
        <p>Per 1 Million</p>
        <p>Cases: {data.casesPerOneMillion}</p>
        <p>Deaths: {data.deathsPerOneMillion}</p>
        <p>Tests: {data.testsPerOneMillion}</p>
      </div>
      <img src={flag} alt={'flag'}/>
  
      
  
    </div>
  );
};

export default CountryHeader;