// react & packages
import { useState, useEffect } from 'react';

// style
import style from '../../style/Home.module.css';

// files

const Home = () => {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])

  useEffect(() => {
    const content = async () => {
      const response = await fetch('http://localhost:8080/api/folders/root', {
        credentials: 'include',
      });

      const data = await response.json();

      setFolders(data.folders);
      setFiles(data.files);
    };

    content();
  }, []);

  return (
    <section className={style.home}>
      <h1>Recent archives</h1>
      <li>
        {folders.map((folder) => (
          <ul key={folder.id}>
            <p>{folder.name}</p>
          </ul>
        ))}
      </li>
    </section>
  );
};
export default Home;