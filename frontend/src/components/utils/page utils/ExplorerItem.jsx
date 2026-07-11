// packages
import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

// style
import style from '../../../style/ExplorerItem.module.css';

//files
import folderSvg from '../../../assets/folder.svg';
import fileSvg from '../../../assets/file.svg';
import settingsSvg from '../../../assets/settings.svg';

import Button from './Button.jsx';

const ExplorerItem = ({
  type,
  name,
  owner,
  createdAt,
  id,
  parentId,
  onClick,
  onDoubleClick,
}) => {
  // useState hooks
  const [input, setInput] = useState(false); // Change the folder's name from text to input.

  const [nameChange, setNameChange] = useState(name); // Save the name of the folder typed in the input (passed folder name prop as default).

  const [specs, setSpecs] = useState(false); // Open and close specs window.

  // useRef hooks
  const inputRef = useRef(null); // set ref for input

  const isFolder = type === 'folder';

  // Endpoints
  const updateEndpoint = isFolder
    ? `http://localhost:8080/api/folders/update/folder${id}`
    : `http://localhost:8080/api/files/update${id}`;

  const deleteEndpoint = isFolder
    ? `http://localhost:8080/api/folders/delete/folder${id}`
    : `http://localhost:8080/api/files/delete/${id}`;

  // Petition to the server to rename the item
  const handleRename = async () => {
    try {
      const response = await fetch(updateEndpoint, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameChange,
          parentId,
        }),
      });
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

  // Petition to the server to delete the item.
  const handleDeleted = async () => {
    console.log('handle deleted');
    try {
      const response = await fetch(
        deleteEndpoint,
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
    <div
      onClick={onClick}
      className={style.Folder}
      onDoubleClick={() => {
        if (!input) {
          onDoubleClick();
        }
      }}
    >
      <img
        src={isFolder ? folderSvg : fileSvg}
        alt={isFolder ? 'Folder icon' : 'File icon'}
      />
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
                <div>
                  <p>Owner: {owner}</p>
                  <p>Creation Date: {createdAt}</p>
                </div>
                <Button
                  value="Back"
                  onClick={() => setSpecs((prev) => !prev)}
                />
                <Button value={isFolder ? "Delete folder" : "Delete file"} onClick={handleDeleted} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ExplorerItem.propTypes = {
  type: PropTypes.oneOf(['folder', 'file']).isRequired,
  name: PropTypes.string.isRequired,
};

export default ExplorerItem;
