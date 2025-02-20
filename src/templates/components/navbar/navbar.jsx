/* eslint-disable react/prop-types */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowWidth from "../../../services/hooks/windowWidth";

export default function Navbar({ refMenu, refAbout }) {
  const Navigate = useNavigate();
  const location = useLocation();
  const windowWidth = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    if (location.pathname == "/") {
      if (windowWidth < 500) setIsOpen(!isOpen);
      refMenu.current.scrollIntoView({ behavior: "smooth" });
    } else {
      Navigate("/");
    }
  };

  const handleAboutClick = () => {
    if (location.pathname == "/") {
      if (windowWidth < 500) setIsOpen(!isOpen);
      refAbout.current.scrollIntoView({ behavior: "smooth" });
    } else {
      Navigate("/");
    }
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow py-4 px-4 z-20">
        <div className="flex justify-between items-center">
          <h1
            onClick={() => Navigate("/")}
            className="text-2xl font-bold text-green-500 cursor-pointer"
          >
            Warung Jujugan
          </h1>
          {windowWidth > 500 && (
            <div className="flex gap-3">
              <h1
                className="cursor-pointer hover:text-green-500 transition-colors duration-200"
                onClick={handleMenuClick}
              >
                Menu
              </h1>
              <h1
                className="cursor-pointer hover:text-green-500 transition-colors duration-200"
                onClick={handleAboutClick}
              >
                About
              </h1>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <div
              onClick={() => Navigate("/notification")}
              className="w-full h-full max-w-[1.7rem] max-h-[1.7rem] cursor-pointer relative"
            >
              <img src="/assets/images/notification.png" alt="" />
            </div>
            <div
              onClick={() => Navigate("/order")}
              className="w-full h-full max-w-[1.7rem] max-h-[1.7rem] cursor-pointer relative"
            >
              <img src="/assets/images/cart.png" alt="" />
            </div>
            {windowWidth <= 500 && (
              <>
                <span className="border mx-2 min-h-[2rem]"></span>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className=" min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem] flex flex-col justify-between z-50 cursor-pointer"
                >
                  <span
                    className={`min-h-[2px] min-w-full bg-black transition-all duration-300 origin-right ${
                      isOpen
                        ? "-rotate-45 translate-y-[3px]"
                        : "rotate-0 translate-y-0"
                    }`}
                  />
                  <span
                    className={`min-h-[2px] min-w-full bg-black transition-all duration-300 origin-right ${
                      isOpen ? "scale-0" : "scale-100"
                    }`}
                  />
                  <span
                    className={`min-h-[2px] min-w-full bg-black transition-all duration-300 origin-right ${
                      isOpen
                        ? "rotate-45 -translate-y-[2px]"
                        : "rotate-0 translate-y-0"
                    }`}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <section
          className={`absolute h-screen top-0 right-0 min-w-full bg-green-500 z-10 transition-all duration-500 ${
            isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
          }`}
        >
          <div className="flex flex-col w-full h-full justify-center items-center gap-10">
            <h1
              onClick={handleMenuClick}
              className="text-5xl font-bold text-white"
            >
              Menu
            </h1>
            <h1
              onClick={handleAboutClick}
              className="text-5xl font-bold text-white"
            >
              About
            </h1>
          </div>
        </section>
      </nav>
    </>
  );
}
