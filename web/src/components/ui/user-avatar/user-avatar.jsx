import {Avatar, Stack} from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../../contexts/auth.context';

function UserAvatar({ width, height, fontSize, }){
    const { user } = useContext(AuthContext)
    const initial = user?.name?.charAt(0)?.toUpperCase() || "?"

    return(
       <Stack ><Avatar sx={{ width:{width} ,height: {height}, backgroundColor:"red", fontSize:{fontSize}}}>{initial}</Avatar></Stack>
    )
}

export default UserAvatar;
