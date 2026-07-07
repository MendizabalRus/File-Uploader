// react & packages
import { useState } from 'react';
import { Link } from 'react-router';

// style
import style from '../../../style/Sidebar.module.css';

// files

const Sidebar = () => {
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
      console.log(result)

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

  return (
    <section className={style.sidebar}>
      <form className={style.fileWrapper} onSubmit={handleFileSubmit}>
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
            <>
                <span className={style.fileName}>{file.name}</span>
                <button type='submit'>Upload</button>
                {error && <p style={{color: "red"}} >{error}</p>}
                {success && <p style={{color: "green"}} >{success}</p>}
            </>
        )}
      </form>
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
