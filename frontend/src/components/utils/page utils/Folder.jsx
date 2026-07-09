// packages
import { useState } from 'react';

// style
import style from '../../../style/Folder.module.css';

//files
import folderSvg from '../../../assets/folder.svg';
import settingsSvg from '../../../assets/settings.svg';

const Folder = ({ name, owner, createdAt }) => {
  const [input, setInput] = useState(false);
  const [nameChange, setNameChange] = useState(name);

  const handleRename = () => {
    console.log("handleRename")
    /*
    try {
      const response = fetch('http://localhost:8080/api/folders/update');
    } catch (err) {
      console.error(err);
    }
    */
    setInput((prev) => !prev);
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
            onChange={(e) => setNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
            }}
          />
        )}
        <div className={style.buttons}>
            <img src={settingsSvg} alt="Setting icon" />
        </div>
      </div>
    </div>
  );
};
export default Folder;
