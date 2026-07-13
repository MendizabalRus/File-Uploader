// Packages
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

// Style
import style from '../../style/Explorer.module.css';

// Files
import ExplorerItem from '../utils/page utils/ExplorerItem';

import { getFolder, getFavorites } from '../../api/ExplorerActions';

const Explorer = ({ mode }) => {
  // useState hooks
  const [folders, setFolders] = useState([]); // Save the folders fetched from the API in the folders state hook.
  const [files, setFiles] = useState([]); // Save the folders fetched from the API in the files state hook.

  // useParams hook
  const { folderId } = useParams(); // Get the route id.

  // useNavigate hook
  const navigate = useNavigate();

  // Fetch folders (and it's items) from the API.
  useEffect(() => {
    const fetchData = async () => {
      const id = folderId ?? "root";
      try {
        const data =
          mode === 'favorites' ? await getFavorites() : await getFolder(id);

        setFolders(data.folders);
        setFiles(data.files);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [mode, folderId]);

  console.log(files)

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
                item={folder}
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
            return <ExplorerItem key={file.id} type="file" item={file} />;
          })}
        </div>
      </section>
    </div>
  );
};
export default Explorer;
