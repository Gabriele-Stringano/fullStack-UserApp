import './App.css';

//added react router for more pages
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import { useLocation } from 'react-router-dom';

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
import { UserProfile } from './components/UserProfile';

function App() {

  // check if the current route is the SignupPage/LoginPage
  const location = useLocation();
  const hideFooter = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <Provider store={store}>
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
              <UserProfile />
            } />
          </Route>
        </Routes>
        {hideFooter
          ? <></>
          : <Footer />}
      </div>
    </Provider>
  );
}

export default App;
