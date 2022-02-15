import CSVUpload from './components/CSVUpload'
import LandingPage from './components/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const darkPalette = {
  palette: {
    mode: "dark",
  },
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={createTheme(darkPalette)}>
          <CssBaseline>
            <Routes>
              <Route path='/contact/upload' element={<CSVUpload />} />
              <Route path='/' element={<LandingPage />} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
