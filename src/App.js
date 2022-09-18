import{BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import ComponentNotFound from './Components/ComponentNotFound';
import Home from './Components/Home';
import Photos from './Components/Photos';
import './index.css'

function App() {
  return (
    <>
    <Router>
      <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/photos/:id' element={<Photos/>}/>
          <Route path='*' element={<ComponentNotFound/>}/>
        </Routes>
      </section>
    </Router>
    </>
  );
}

export default App;
