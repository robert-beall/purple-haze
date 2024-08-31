import { PrimeReactProvider } from 'primereact/api'
import Tailwind from 'primereact/passthrough/tailwind';
import './App.css'
import 'primereact/resources/themes/tailwind-light/theme.css'

function App() {
  return (
    <>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <div className="App">PURPLE HAZE FRONTEND PLACEHOLDER</div>
      </PrimeReactProvider>
    </>
  )
}

export default App
