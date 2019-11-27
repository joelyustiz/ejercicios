import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const url = "https://ws-api.iextrading.com/1.0/tops";
const socket = io(url);

function App() {

  const getTable = async () => {
    try {
      
    const response = await fetch(url, {
      mode:"no-cors"
    })

    const prueba = await response.json()

     console.log(prueba);
     
    } catch (error) {
     console.log("error", error);
     
    }

  }

  useEffect(()=>{
    getTable()
   
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
