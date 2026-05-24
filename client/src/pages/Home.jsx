import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Categories from '../components/Categories'
import FeaturedProducts from '../components/FeaturedProducts'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home