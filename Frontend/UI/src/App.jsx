import { useEffect, useState } from 'react'
import './App.css'
import { Character } from './components/Character'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { Films } from './components/Films';
import { Planet } from './components/Planet';
import { Home } from './components/Home';

function App() {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/characters");
        console.log(response)
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        console.log(json_response)
        setCharacterData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Router>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Home</a>
            </div>
          </nav>
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

            <div className="container-fluid">
              <div className="row">
                Both socks and space rockets 🚀 will take you to new heights, but only one will get cold feet!
                <Routes>
                  <Route exact path="/" element={
                    characterData.map((data) => (
                      <Home key={data._id} data={data} />
                    ))
                  } />
                  <Route path="/characters/:id" element={
                    <Character />
                  } />
                  <Route path="/films/:id" element={
                    <Films />

                  } />
                  <Route path="/planets/:id" element={
                    <Planet />
                  } />
                </Routes>
              </div>
            </div>
          </main>
        </Router>
      </div>

    </>
  )
}

export default App
