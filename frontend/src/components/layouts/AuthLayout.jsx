//react & packages
import { Outlet } from 'react-router';

//styles
import '../../style/AuthLayout.module.css';

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default AuthLayout;
