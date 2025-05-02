import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaGlobeAmericas } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const [user, setUser] = useState(null);
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      navigate("/sign-in");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Navbar className="border-b-0 sticky top-0 bg-gradient-to-r from-primary-800 to-secondary-800 text-white shadow-lg z-40">
      <Link
        to="/"
        className="flex items-center space-x-2"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <FaGlobeAmericas className="text-xl" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary-300 to-secondary-300 bg-clip-text text-transparent">
          GeoConnect
        </span>
      </Link>
      <div className="flex gap-2 md:order-2">
        {/* <Button
          className="w-12 h-10"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun className="text-white" /> : <FaMoon className="text-white" />}
        </Button> */}
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                img="/images/logo.jpg"
                alt="user"
                rounded
              />

            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{user.displayName || "User"}
              </span>
              <span className="block text-sm font-medium truncate">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white">
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            to="/"
            className="text-white/80 hover:text-white"
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/searchCountries"} as={"div"}>
          <Link
            to="/searchCountries"
            className="text-white/80 hover:text-white"
          >
            Explore
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;