// Packages
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Style
import style from '../../style/Explorer.module.css';

// Files
import ExplorerItem from '../utils/page utils/ExplorerItem';

import leftArrow from "../../assets/leftArrow.svg"

import { getFolder, getFavorites } from '../../api/ExplorerActions';

const Explorer = ({ mode }) => {
  // useState hooks
  const [currentFolder, setCurrentFolder] = useState(null); // Save the current folder.
  const [folders, setFolders] = useState([]); // Save the folders fetched from the API in the folders state hook.
  const [files, setFiles] = useState([]); // Save the folders fetched from the API in the files state hook.

  // useParams hook
  const { folderId } = useParams(); // Get the route id.

  // useNavigate hook
  const navigate = useNavigate();

  // Fetch folders (and it's items) from the API.
  useEffect(() => {
    const fetchData = async () => {
      const id = folderId ?? 'root';
      try {
        const data =
          mode === 'favorites' ? await getFavorites() : await getFolder(id);

        console.log(data);

        setFolders(data.folders);
        setFiles(data.files);
        setCurrentFolder(data.folder);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [mode, folderId]);

  return (
    <div className={style.Explorer}>
      {currentFolder ? (
        <div onClick={() => navigate(-1)} className={style.returnBtn}>
          <img src={leftArrow} alt="Left arrow icon" />
          <h2>{currentFolder.name}</h2>
        </div>
      ) : (
        <h2 className={style.root}>Root</h2>
      )}
      <section className={style.explorerItems}>
        <section className={style.section}>
          <h2 className={style.sectionHeader}>Folders</h2>
          <div className={style.sectionItems}>
            {folders.map((folder) => {
              return (
                <ExplorerItem
                  key={folder.id}
                  type="folder"
                  item={folder}
                  onDoubleClick={() => navigate(`/folders/${folder.id}`)}
                  onDelete={(id) =>
                    setFolders((prev) =>
                      prev.filter((folder) => folder.id !== id),
                    )
                  }
                />
              );
            })}
          </div>
        </section>
        <section className={style.section}>
          <h2 className={style.sectionHeader}>Files</h2>
          <div className={style.sectionItems}>
            {files.map((file) => {
              return (
                <ExplorerItem
                  key={file.id}
                  type="file"
                  item={file}
                  onDelete={(id) =>
                    setFiles((prev) => prev.filter((file) => file.id !== id))
                  }
                />
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
};
export default Explorer;
