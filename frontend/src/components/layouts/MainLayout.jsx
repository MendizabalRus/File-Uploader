// react & packages
import { useState } from 'react';
import { Outlet } from 'react-router';

// styles
import style from '../../style/MainLayout.module.css';

// files
import Header from "../utils/page utils/Header.jsx"
import Sidebar from "../utils/page utils/Sidebar.jsx"

const MainLayout = () => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className={style.mainLayout}>
      <Header />
      <div className={style.belowHeader} onClick={}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
