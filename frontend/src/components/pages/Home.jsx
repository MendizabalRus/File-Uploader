// react & packages
import { useState, useEffect } from 'react';

// style
import style from '../../style/Home.module.css';

// files
import Folder from "../utils/page utils/Folder.jsx"

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

  console.log(folders)

  return (
    <section className={style.home}>
      <h1>Recent archives</h1>
      <div className={style.content}>
        {folders.map((folder) => (
          <Folder key={folder.id} name={folder.name} owner={folder.owner} createdAt={folder.createdAt} />
        ))}
      </div>
    </section>
  );
};
export default Home;