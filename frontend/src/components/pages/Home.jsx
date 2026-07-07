// react & packages

// style
import style from '../../style/Home.module.css';

// files

const Home = () => {

    // FETCH ALL THE FILES WHERE USER = LOGGED IN USER
        //USER THE FILES DATA TO FILL ARCHIVE TO .MAP AND CREATE ARCHIVE COMPONENTS

  return (
    <section className={style.home}>
      <h1>Recent archives</h1>
      <Archive />
    </section>
  );
};
export default Home;

const Archive = () => {
  return (
    <div className={style.archive}>
      <p>name</p>
      <p>author</p>
      <p>creation date</p>
    </div>
  );
};
