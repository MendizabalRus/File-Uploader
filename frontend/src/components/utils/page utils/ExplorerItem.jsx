// packages
import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

// style
import style from '../../../style/ExplorerItem.module.css';

//files
import folderSvg from '../../../assets/folder.svg';
import fileSvg from '../../../assets/file.svg';
import settingsSvg from '../../../assets/settings.svg';
import starSvg from '../../../assets/star.svg';
import fullstarSvg from '../../../assets/fullstar.svg';

import Button from './Button.jsx';

import {
  renameItem,
  deleteItem,
  toggleFavorite,
} from '../../../api/ExplorerItemActions.js';

const ExplorerItem = ({ type, item, onDoubleClick }) => {
  const isFolder = type === 'folder';

  const { id, name, owner, createdAt, updatedAt, parentId, size, favorite } =
    item;

  // useState hooks:
  const [isEditing, setIsEditing] = useState(false); // Change the folder's name from text to input.

  const [nameChange, setNameChange] = useState(name); // Save the name of the folder typed in the input (passed folder name prop as default).

  const [isSpecsOpen, setIsSpecsOpen] = useState(false); // Open and close specs window.

  const [isFavorite, setIsFavorite] = useState(favorite); // Toggle an item as favorite

  // useRef hooks:
  const inputRef = useRef(null); // set ref for input.

  // Petition to the server to rename the item.
  const handleRename = async () => {
    try {
      await renameItem(type, id, {
        name: nameChange,
        parentId,
      });

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Close input mode when clicking outside it.
  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleRename();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [isEditing, nameChange]);

  // Petition to the server to delete the item.
  const handleDeleted = async () => {
    try {
      await deleteItem(type, id);

      setIsSpecsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Petition to the server to toggle between favoriting and unfavoriting items.
  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(type, id, isFavorite);

      setIsFavorite((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onDoubleClick={() => {
        onDoubleClick?.();
      }}
      className={style.ExplorerItem}
    >
      <img
        src={isFolder ? folderSvg : fileSvg}
        alt={isFolder ? 'Folder icon' : 'File icon'}
      />
      <div className={style.name}>
        {!isEditing ? (
          <h3 onClick={() => setIsEditing((prev) => !prev)}>{nameChange}</h3>
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
            onClick={() => setIsSpecsOpen((prev) => !prev)}
          />
          <img
            src={isFavorite ? fullstarSvg : starSvg}
            alt="Star icon"
            onClick={handleToggleFavorite}
            className={`${isFavorite ? style.favorite : style.unfavorite}`}
          />
          {/* Items specifications modal */}
          {isSpecsOpen && (
            <div className={style.specsBg}>
              <div className={style.specsWndw}>
                <img
                  src={isFolder ? folderSvg : fileSvg}
                  alt={isFolder ? 'Folder icon' : 'File icon'}
                />
                <h2>{nameChange}</h2>
                <div>
                  <p>Owner: {owner.firstname + ' ' + owner.lastname}</p>
                  {!isFolder && <p>Size (mb): {size}</p>}
                  <p>Creation date: {createdAt}</p>
                  <p>Last update: {updatedAt}</p>
                  <p>Parent ID: {parentId ?? 'none'}</p>
                </div>
                <Button
                  value="Back"
                  onClick={() => setIsSpecsOpen((prev) => !prev)}
                />
                <Button
                  value={isFolder ? 'Delete folder' : 'Delete file'}
                  onClick={handleDeleted}
                />
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
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.object,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    parentId: PropTypes.number,
    size: PropTypes.number,
    favorite: PropTypes.bool,
  }).isRequired,
};

export default ExplorerItem;
