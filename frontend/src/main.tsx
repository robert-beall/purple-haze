import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Flowbite } from 'flowbite-react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import ContentPage from './components/ContentPage';
import HelloPage from './pages/HelloPage';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import PageTitle from './components/PageTitle';

void (async () => {  
  const root = document.getElementById('root');
  
  if (root === null || typeof root === 'undefined') {
    console.error('Page cannot load');
    return;
  }
  
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <Flowbite>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<ContentPage />} >
              <Route path="/first" element={<><PageTitle title="First" /><div>FIRST DAY!</div></>} />
              <Route path="/hello" element={<HelloPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </StrictMode>,
  )  
})();
