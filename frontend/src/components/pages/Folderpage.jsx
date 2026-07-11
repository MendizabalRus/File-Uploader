// Packages
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router';

// Style

// Files
import Folder from '../utils/page utils/Folder.jsx';

const FolderPage = () => {
  const { folderId } = useParams();

  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getContent = async () => {
      const response = await fetch(
        `http://localhost:8080/api/folders/${folderId}`,
        {
          credentials: 'include',
        },
      );

      const data = await response.json();

      setFolders(data.folders);
      setFiles(data.files);
    };
    getContent();
  }, [folderId]);

  console.log(files)

  return (
    <div>
      {folders.map((folder) => {
        return (
          <Folder
            key={folder.id}
            name={folder.name}
            owner={folder.owner.firstname + ' ' + folder.owner.lastname}
            createdAt={folder.createdAt}
            id={folder.id}
            parentId={folder.parentId}
            onDoubleClick={() => navigate(`/folders/${folder.id}`)}
          />
        );
      })}
      {files.map((file) => {
        return <h3 key={file.id}>{file.originalName}</h3>
      })}
    </div>
  );
};
export default FolderPage;
