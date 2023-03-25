import './App.css';

//added react router for more pages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

//import the store REDUX
import { Provider } from 'react-redux';
import store from './store'

//import other components e styleDocumets
import { SignupPage } from './components/authPages/SignupPage';
import { LoginPage } from './components/authPages/LoginPage';
import ButtonAppBar from './components/layouts/ButtonAppBar';
import { Footer } from './components/layouts/Footer';
import { HomePage } from './components/HomePage';
import DashBoard from './components/DashBoard';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <ButtonAppBar />
          <Routes className={'page'}>
            <Route exact path='/' element={
              <HomePage />
            } />

            <Route exact path='/login' element={
              <LoginPage />
            } />
            <Route exact path='/signup' element={
              <SignupPage />
            } />
            <Route element={<ProtectedRoutes />}>
              <Route exact path='/dashboard' element={
                <DashBoard />
              } />
              <Route exact path='/profile' element={
                <div> my profile</div>
              } />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
