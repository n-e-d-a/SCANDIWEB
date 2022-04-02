import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import EachProduct from './pages/EachProduct';
import ShoppingCart from './pages/ShoppingCart';
import {AppContainer} from "./components/Container.style"
import { GlobalStyle } from './styles/GlobalStyles.style';



function App() {
  return (
    <AppContainer>
      <GlobalStyle />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path="/product" element={<EachProduct />}></Route>
          <Route exact path="/shoppingcart" element={<ShoppingCart />}></Route>
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
