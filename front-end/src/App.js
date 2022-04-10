import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import EachProduct from './pages/EachProduct';
import ShoppingCart from './pages/ShoppingCart';
import {AppContainer} from "./components/Container.style"
import { GlobalStyle } from './styles/GlobalStyles.style';
import { WebContext } from './context/webcontext';
import { useContext } from 'react';


function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"}  element={<Home />}></Route>
          <Route exact path={"/all"}  element={<Home />}></Route>
          <Route exact path={"/clothes"}  element={<Home />}></Route>
          <Route exact path={"/tech"}  element={<Home />}></Route>
          <Route exact path="/product" element={<EachProduct />}></Route>
          <Route exact path="/shoppingcart" element={<ShoppingCart />}></Route>
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
