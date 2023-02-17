import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Register';
import Login from './Components/Login';
import NotFound from './Components/NotFound';
import Homee from './Components/Homee';
import Edit from './Components/Edit'
import Account from './Components/Account'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/home" element={<Homee />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/edit/*" element={<Edit />} />
          <Route  path="*" element={<NotFound />}/>
          
      </Routes>
    </>
  );
}


export default App;
