// react & packages
import { useState } from 'react';
import { Link } from 'react-router';

// style
import style from '../../../style/Sidebar.module.css';

// files
import folderSvg from '../../../assets/folder.svg';
import Button from './Button.jsx';

const Sidebar = () => {
  const [newDropdown, setNewDropdown] = useState(false);
  const [newFolder, setNewFolder] = useState(false);
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/files/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        setError(result.error || 'Upload failed');
        return;
      }

      setSuccess(`Uploaded ${result.file.originalName}`);
      setFile(null);
    } catch (err) {
      console.error(err);
      setError('Something went wrong...');
    }
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name")
    }

    console.log(data)
    try {
      const response = await fetch('http://localhost:8080/api/folders/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Folder creation failed');
      }

      setNewFolder((prev) => !prev);
    } catch (err) {
      console.error(err);
      setError('Something went wrong creating the folder...');
    }
  };

  return (
    <section className={style.sidebar}>
      <div className={`${style.newDropdown} ${newDropdown ? style.show : null }`}>
        <Button value="New" onClick={() => setNewDropdown((prev) => !prev)} />
        {newDropdown && (
          <div className={style.newDropdown}>
              <hr />
            <Button value="New Folder" onClick={() => setNewFolder((prev) => !prev)} />
            {newFolder && (
              <div className={style.createFolder}>
                <div className={style.createFolderWindow}>
                  <img src={folderSvg} alt="Folder icon" />
                  <form onSubmit={handleCreateFolder}>
                    <input type="text" placeholder="name" name="name" required />
                    <button type="submit">Create</button>
                  </form>
                  <Button value="Cancel" onClick={() => setNewFolder((prev) => !prev)} />
                </div>
              </div>
            )}
            <form className={style.fileForm} onSubmit={handleFileSubmit}>
              <label htmlFor="fileUpload" className={style.fileInputLabel}>
                Upload File
              </label>
              <input
                type="file"
                id="fileUpload"
                name="file"
                onChange={handleFileChange}
                className={style.fileInput}
              />
              {file && (
                <div>
                  <span className={style.fileName}>{file.name}</span>
                  <button type="submit">Upload</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
      <hr />
      <Link to="/" className={style.link}>
        All
      </Link>
      <Link to="/favorites" className={style.link}>
        Favorites
      </Link>
      <Link to="/shared" className={style.link}>
        Shared
      </Link>
    </section>
  );
};
export default Sidebar;
