import React from 'react';
import logo from './logo.svg';
import Car from './components/car';
import { Garage } from './components/garage';
// import './App.css';
import Sample from './components/garage';
import Props from './components/props';
import FavouriteColor from './components/favouriteColor';
import { IncOrDec } from './components/favouriteColor';
function App() {
  return ( 
    <div>
       <Sample />
      <h1>Hello World</h1>;
      <Props />
      <Garage />
      <FavouriteColor />
      <IncOrDec />
    </div>
  );
  
}

export default App;
