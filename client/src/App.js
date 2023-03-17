import './App.css';

//added react router for more pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import other components e styleDocumets
import { SignupPage } from './components/signup/SignupPage';
import { LoginPage } from './components/login/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes className={'page'}>
          <Route exact path='/' element={
            <div>HOME</div>
          } />

          <Route exact path='/login' element={
            <LoginPage/>
          } />
          <Route exact path='/signup' element={
            <SignupPage/>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
