import React, { useEffect } from 'react';
import './styles/main.scss';
// import SmoothScroll from './components/smooth-scroll/SmoothScroll';
import 'animate.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
//slick
import './App.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Terms from './pages/terms/Terms';
import Raffle from './pages/raffle/Raffle';
import useEagerConnect from './hooks/useEagerConnect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEagerConnect()
  useEffect(() => {
    Aos.init({
      duration: 1500,
      offset: 200,
    });
    Aos.refresh();
    document
      .querySelectorAll('img')
      .forEach((img) => img.addEventListener('load', () => Aos.refresh()));
  }, []);
  return (
    <Router>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div className='animate__animated animate__fadeIn animate__slow'>
        <Switch>
        <Route exact path='/' component={Home} />
          <Route exact path='/terms-and-conditions' component={Terms} />
          <Route exact path='/raffle' component={Raffle} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;