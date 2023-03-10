import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';
import { format } from "timeago.js"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

function Post({ post }) {

    const [like, setLike] = useState(post.like.length);
    const [isLiked, setisLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setisLiked(post.like.includes(currentUser._id));
    }, [currentUser._id, post.like])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axiosInstance.get(`/users/?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUsers();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axiosInstance.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1);
        setisLiked(!isLiked);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"}
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post