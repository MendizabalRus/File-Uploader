// react & packages
import { Outlet } from 'react-router';

// styles
import style from '../style/MainLayout.module.css';

// files
import Header from "./Header.jsx"
import Sidebar from "./Sidebar.jsx"

const MainLayout = () => {
  return (
    <div className={style.MainLayout}>
      <Header />
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default MainLayout;
