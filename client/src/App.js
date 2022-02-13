import './App.css';
import CSVUpload from './components/CSVUpload'
import LandingPage from './components/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactsTable from './components/ContactsTable';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CampaignPage from './components/CampaignPage'
import CampaignCreation from './components/CampaignCreation';

function App() {
  return (
    <div className="App">
  
      <BrowserRouter>
        <Routes>
          <Route path='/contact/upload' element={ <CSVUpload/>} />
          <Route path='/' element ={ <LandingPage/>} />
          <Route element={ <ContactsTable/>}/>
          <Route path="/campaign" element={<CampaignPage/>} />
          {/* <Route path="*" element={<Error/>} /> */}
        </Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
