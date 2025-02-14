import './App.css'
import About from './components/About.jsx'
import BlogClient from './components/BlogClient.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import InfoSection  from './components/InfoSection.jsx'
import Offer from './components/Offer.jsx'
import ShopSection from './components/ShopSection.jsx'
import SliderSection from './components/SliderSection.jsx'
function App() {
  return <>
    <Header/>
    <SliderSection/>
    <ShopSection/>
    <About/>
    <Offer/>
    <BlogClient/>
    <InfoSection/>
    <Footer/>
  </>
}

export default App
