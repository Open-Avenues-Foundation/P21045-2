import './App.css';
import CSVUpload from './components/CSVUpload'
import LandingPage from './components/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import * as React from 'react';
import CampaignPage from './components/CampaignPage'
import IndvContact from './components/IndvContact'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/contact/upload' element={ <CSVUpload/>} />
          <Route path='/contact/:id' element ={ <IndvContact/>}/>
          <Route path='/campaign' element ={ <CampaignPage/>}/>
          <Route path='/' element ={ <LandingPage/>} />
        </Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
