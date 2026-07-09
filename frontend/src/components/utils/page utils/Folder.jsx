// packages

// style
import style from "../../../style/Folder.module.css"

//files
import folderSvg from "../../../assets/folder.svg"

const Folder = ({ name, owner, createdAt}) => {
    return(
        <div className={style.Folder}>
            <img src={folderSvg} alt="Folder icon" />
            <div className={style.text}>   
                <h3>{name}</h3>
                <div className={style.specs}>
                    <div>
                        <p>Owner:</p>
                        <p>{owner}</p>
                    </div>
                    <div>
                        <p>Creation date:</p>
                        <p>{createdAt.split("").slice(0, 10)} {createdAt.split("").slice(12, createdAt.length - 8)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Folder;