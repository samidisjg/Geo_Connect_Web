import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { FaUserPlus, FaGlobeAmericas } from "react-icons/fa";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const { name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Successfully registered!");
      navigate("/sign-in");
    } catch (error) {
      setErrorMsg("Something went wrong with the registration");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
       

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Content */}
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Welcome to <span className="bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">GeoConnect</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Hey, we believe that building a strong connection with the world begins with your participation.
              </p>
              <p className="text-gray-600 text-lg mt-2">
                We are delighted to offer a modern user-friendly service to ensure you have the best experience exploring the globe.
              </p>
            </div>
            
         
            
            <div className="relative">
              <img 
                src="/images/globe.png" 
                alt="World Map" 
                className="w-full h-auto max-w-md rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-secondary-700/90 to-transparent rounded-b-lg">
               
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">
                  Join our community of world explorers
                </p>
              </div>
              
              <form className="space-y-5" onSubmit={onSubmit}>
                <div>
                  <Label value="Full Name" className="text-gray-700 font-medium" />
                  <TextInput
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={onChange}
                    className="mt-1 w-full"
                  />
                </div>
                
                <div>
                  <Label value="Email" className="text-gray-700 font-medium" />
                  <TextInput
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={onChange}
                    className="mt-1 w-full"
                  />
                </div>
                
                <div className="relative">
                  <Label value="Password" className="text-gray-700 font-medium" />
                  <TextInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={onChange}
                    className="mt-1 w-full"
                  />
                  <div className="absolute right-3 top-10 text-gray-500 cursor-pointer">
                    {showPassword ? (
                      <BsFillEyeSlashFill
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    ) : (
                      <BsFillEyeFill
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    )}
                  </div>
                </div>
                
                <div className="pt-1">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium py-2.5"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <Spinner size="sm" />
                        <span className="ml-3">Creating account...</span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center before:border-t before:flex-1 before:border-gray-200 after:border-t after:flex-1 after:border-gray-200">
                  <p className="text-center text-gray-500 font-medium mx-4">OR</p>
                </div>
                
                <OAuth />
                
                {errorMsg && (
                  <Alert className="mt-4 bg-red-50 border-red-200 text-red-600">
                    {errorMsg}
                  </Alert>
                )}
                
                <div className="text-center text-sm mt-4">
                  <span className="text-gray-600">Already have an account?</span>{" "}
                  <Link to="/sign-in" className="text-primary-600 font-medium hover:text-primary-700">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}