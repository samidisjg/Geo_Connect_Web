import { Footer } from "flowbite-react"
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs"
import { FaGlobeAmericas } from "react-icons/fa"
import { Link } from "react-router-dom"

const FooterComponent = () => {
  return (
    <Footer container className="bg-gradient-to-r from-primary-800 to-secondary-800 text-white border-t-0 shadow-lg py-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white mr-2">
              <FaGlobeAmericas className="text-lg" />
            </div>
            <Link to='/' className="text-lg font-bold bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
              GeoConnect
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link to="/about" className="text-white/80 hover:text-white text-sm">About</Link>
            <Link to="/services" className="text-white/80 hover:text-white text-sm">Services</Link>
            <Link to="/contact" className="text-white/80 hover:text-white text-sm">Contact</Link>
            <Link to="/privacy" className="text-white/80 hover:text-white text-sm">Privacy</Link>
            <Link to="/terms" className="text-white/80 hover:text-white text-sm">Terms</Link>
          </div>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <Footer.Icon href="#" icon={BsFacebook} className="text-white/80 hover:text-white" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-white/80 hover:text-white" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-white/80 hover:text-white" />
            <Footer.Icon href="#" icon={BsLinkedin} className="text-white/80 hover:text-white" />
          </div>
        </div>
        
        <Footer.Divider className="my-4 border-white/20"/>
        
        <div className="text-center text-white/70 text-sm">
          <Footer.Copyright href="#" by="GeoConnect" year={new Date().getFullYear()} />
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent