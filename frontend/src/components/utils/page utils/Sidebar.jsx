// react & packages
import { Link } from "react-router";

// style
import style from "../../../style/Sidebar.module.css";

// files

const Sidebar = () => {
    return(
        <section className={style.sidebar}>
            <Link to="/">All</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/shared">Shared</Link>
        </section>
    );
}
export default Sidebar;