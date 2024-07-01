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
// import App from './App';

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
            <Route path="/" element={<ContentPage />} >
              <Route path="/first" element={<div>FIRST DAY!</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </StrictMode>,
  )  
})();
