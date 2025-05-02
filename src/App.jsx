import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import FooterComponent from "./components/FooterComponent";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import SearchCountryPage from "./Pages/SearchCountryPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/searchCountries" element={<SearchCountryPage />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
};

export default App;
