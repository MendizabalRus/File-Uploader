// Packages
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Style
import style from '../../style/Explorer.module.css';

// Files
import ExplorerItem from '../utils/page utils/ExplorerItem';

const Explorer = () => {
  // useState hooks
  const [folders, setFolders] = useState([]); // Save the folders fetched from the API in the folders state hook.
  const [files, setFiles] = useState([]); // Save the folders fetched from the API in the files state hook.

  // useParams hook
  const { folderId } = useParams(); // Get the route id.

  // useNavigate hook
  const navigate = useNavigate();

  const currentFolderId = folderId ? parseInt(folderId, 10) : null;

  // Fetch folders (and it's items) from the API.
  useEffect(() => {
    const getExplorerItems = async () => {
      const endpoint = currentFolderId === null ? 'root' : currentFolderId;
      const response = await fetch(
        `http://localhost:8080/api/folders/${endpoint}`,
        {
          credentials: 'include',
        },
      );

      const data = await response.json();

      setFolders(data.folders);
      setFiles(data.files);
    };

    getExplorerItems();
  }, [currentFolderId]);

  return (
    <div className={style.Explorer}>
      <section className={style.section}>
        <h2 className={style.sectionHeader}>Folders</h2>
        <div className={style.sectionItems}>
          {folders.map((folder) => {
            return (
              <ExplorerItem
                key={folder.id}
                type="folder"
                name={folder.name}
                owner={folder.owner.firstname + " " + folder.owner.lastname}
                onDoubleClick={() => navigate(`/folders/${folder.id}`)}
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
                name={file.originalName}
                owner={file.owner.firstname + " " + file.owner.lastname}
                size={file.size}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
export default Explorer;
