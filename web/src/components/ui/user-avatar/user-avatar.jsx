import {Avatar, Stack} from '@mui/material';
import { useContext, useState } from 'react';
import AuthContext from '../../../contexts/auth.context';

function UserAvatar({ width, height, fontSize, }){
    const { user } = useContext(AuthContext)
   
       
    
    

    return(
       <Stack ><Avatar sx={{ width:{width} ,height: {height}, backgroundColor:"red", fontSize:{fontSize}}}>{user?.name.charAt(0)}</Avatar></Stack>
    )
}

export default UserAvatar;