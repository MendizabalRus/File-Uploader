// react & packages
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// style
import style from '../../style/Home.module.css';

// files
import Folder from '../utils/page utils/Folder.jsx';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();

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
      <div className={style.content}>
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            name={folder.name}
            owner={folder.owner.firstname + ' ' + folder.owner.lastname}
            createdAt={folder.createdAt}
            id={folder.id}
            parentId={folder.parentId}
            onDoubleClick={() => navigate(`/folders/${folder.id}`)}
          />
        ))}
        {files.map((file) => {
          return (<h3 key={file.id}>{file.originalName}</h3>)
        })}
      </div>
    </section>
  );
};
export default Home;
