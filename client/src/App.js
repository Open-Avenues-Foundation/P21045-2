import './App.css';
import CSVUpload from './components/CSVUpload'
import LandingPage from './components/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContactsTable from './components/ContactsTable';
import * as React from 'react';
import ReactDOM from 'react-dom';
import CampaignPage from './components/CampaignPage'
import CampaignCreation from './components/CampaignCreation';
import CampaignId from './components/CampaignId';

const contacts = [{
  id: 2,
  email: "willstclair@pickuplanet.com",
  firstName: "James",
  lastName: "Olson",
  phoneNumber: "(978)-652-8789",
  city: "Plano",
  state: "TX",
  lastOrderPrice: 63,
  lastOrderDate: "2021-08-25",
  createdAt: "2022-02-12T22:23:29.000Z",
  updatedAt: "2022-02-12T22:23:29.000Z",
  deletedAt: null
  },
  {
  id: 3,
  email: "jmarkovitch@songshnagu.com",
  firstName: "Catrina",
  lastName: "Bethrico",
  phoneNumber: "(508)-826-4708",
  city: "Denver",
  state: "CO",
  lastOrderPrice: 10,
  lastOrderDate: "2021-09-11",
  createdAt: "2022-02-12T22:23:29.000Z",
  updatedAt: "2022-02-12T22:23:29.000Z",
  deletedAt: null
  }]

function App() {
  return (
    <div className="App">
  
      <BrowserRouter>
        <Routes>
          <Route path='/contact/upload' element={ <CSVUpload/>} />
          <Route element={ <ContactsTable/>}/>
          <Route path="/campaign" element={<CampaignPage/>} />
          <Route path="/createCampaign" element={<CampaignCreation contacts={contacts} />} />
          <Route path="/" element={<LandingPage/>} />
          {/* <Route path="*" element={<Error/>} /> */}
        </Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
