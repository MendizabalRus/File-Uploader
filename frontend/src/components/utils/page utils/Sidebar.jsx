// react & packages

// style
import style from "../../../style/Sidebar.module.css";

// files

const Sidebar = () => {
    return(
        <section className={style.sidebar}>
            <button>All</button>
            <button>Favorites</button>
            <button>Shared</button>
        </section>
    );
}
export default Sidebar;