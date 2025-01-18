import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";


const DashLayout = ({

}) => {


  return (
    <div className="w-screen h-screen flex overflow-hidden ">
      <div className="md:block  left-0  z-30  ">
        <Navbar

        />
      </div>

      <div className="w-full h-full flex flex-col overflow-hidden ">
        
        {/* <div className="h-[70px] md:hidden bg-[#17ACC3]">
          <DasHeader
            burger={burger}
            setBurger={setBurger}
            dispatch={dispatch}
          />
        </div> */}

        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
