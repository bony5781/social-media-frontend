import './closeFriend.css'
import { Link } from 'react-router-dom';

function CloseFriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <li className="sidebarFriend">
            <Link to={"/profile/" + user.username} style={{ textDecoration: "none" }}>
                <img src={user.profilePicture ? user.profilePicture : PF+'/person/noAvatar.png'} alt="" className="sidebarFriendImg" />
            </Link>
                <span className="sidebarFriendName">{user.username}</span>
            </li>
        </>
    )
}

export default CloseFriend