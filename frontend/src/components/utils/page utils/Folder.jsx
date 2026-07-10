// packages
import { useState, useEffect, useRef } from 'react';

// style
import style from '../../../style/Folder.module.css';

//files
import folderSvg from '../../../assets/folder.svg';
import settingsSvg from '../../../assets/settings.svg';

import Button from './Button.jsx';

const Folder = ({ name, owner, createdAt, id, parentId }) => {
  // Change the folder's name from text to input.
  const [input, setInput] = useState(false);
  // Save the name of the folder typed in the input (passed folder name prop as default).
  const [nameChange, setNameChange] = useState(name);
  // Open and close specs window.
  const [specs, setSpecs] = useState(false);
  // set ref for input
  const inputRef = useRef(null);

  // Petition to the server to rename the folder
  const handleRename = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/folders/update/folder${id}`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nameChange,
            parentId,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }

    setInput((prev) => !prev);
  };

  // Close input mode when clicking outside it
  useEffect(() => {
    if (!input) return;

    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleRename();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [input, nameChange]);

  // Petition to the server to delete the folder.
  const handleDeleted = async () => {
    console.log('handle deleted');
    try {
      const response = await fetch(
        `http://localhost:8080/api/folders/delete/folder${id}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        },
      );

      const result = await response.text();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    setSpecs((prev) => !prev);
  };

  return (
    <div className={style.Folder}>
      <img src={folderSvg} alt="Folder icon" />
      <div className={style.text}>
        {!input ? (
          <h3 onClick={() => setInput((prev) => !prev)}>{nameChange}</h3>
        ) : (
          <input
            type="text"
            value={nameChange}
            ref={inputRef}
            onChange={(e) => setNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename(e);
            }}
          />
        )}
        <div className={style.buttons}>
          <img
            src={settingsSvg}
            alt="Setting icon"
            onClick={() => setSpecs((prev) => !prev)}
          />
          {specs && (
            <div className={style.specsBg}>
              <div className={style.specsWndw}>
                <h2>{name}</h2>
                <p>Owner: {owner}</p>
                <p>Creation Date: {createdAt}</p>
                <Button
                  value="Back"
                  onClick={() => setSpecs((prev) => !prev)}
                />
                <Button value="Delete folder" onClick={handleDeleted} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Folder;
