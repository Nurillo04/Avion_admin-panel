import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[60px] bg-[#3c3b41] z-30">
      <div className="container">
        <div className="w-full flex justify-end pr-[20px]">
          <div className="w-[400px] h-[60px] flex justify-between  items-center pl-[20px]">
            <ul className="text-white text-[12px] lg:text-[15px] lg:w-[300px] font-semibold w-[200px] flex justify-between items-center">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/add">Add Products</NavLink>
            </ul>
            {/* <Button className="w-[30px] lg:hidden h-[30px]"><i className='bx bx-menu-alt-left'></i></Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
