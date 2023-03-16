import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './main';
import { Route, Routes } from 'react-router-dom';
import Productpage from './product';
import UploadPage from './upload';
import ImgForm from './components/ImgForm';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <MainPage/>}/>
        <Route path="/detailView/:p_id" element={ <Productpage/>}/>
        <Route path="/upload" element={<UploadPage/>}/>
        <Route path="/imgtest" element={<ImgForm/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
