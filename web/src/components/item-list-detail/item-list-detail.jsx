import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth.context";
import { Avatar, Rating, Button } from "@mui/material";
import "./item-list-detail.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, useTheme } from '@mui/material/styles';

function ItemListDetail({ comment, handleDeleteComment }) {
    const [showButtonDelete, setShowButtonDelete] = useState(false);
    const { user } = useContext(AuthContext);
    const theme = useTheme();

    useEffect(() => {
        if (comment.author?.id === user.id) {
            setShowButtonDelete(true);
        } else {
            setShowButtonDelete(false);
        }
    }, [comment.author?.id, user.id]);

    return (
        <li className="list-item list-group-item list-group-item-dark">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="avatar me-2">
                        <Avatar>{comment?.author?.name?.charAt(0)}</Avatar>
                    </div>
                    <div className="name-author">
                        <p className="mb-0">{comment.author.name}</p>
                    </div>
                </div>
                <div className="div-rating">
                    <Rating name="read-only" value={comment.rating} readOnly />
                </div>
                {showButtonDelete && (
                    <Button
                        color="warning"
                        onClick={() => handleDeleteComment(comment._id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '0.7rem',
                                padding: '4px 8px',
                            },
                            [theme.breakpoints.up('sm')]: {
                                fontSize: '0.875rem',
                                padding: '6px 12px',
                            },
                        }}
                    >
                        Delete
                    </Button>
                )}
            </div>
            <div className="div-comment-text ms-5 mt-2">
                {comment.text}
            </div>
        </li>
    );
}

export default ItemListDetail;
