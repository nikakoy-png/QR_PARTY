import './App.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import _Route from "./components/_Route";

function App() {
  return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <section className="d-flex h-100 text-center text-black">
                <Header/>
          </section>
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <_Route/>
      </BrowserRouter>
  )
}

export default App;
