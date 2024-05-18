
import { useContext, useState } from "react";
import PageLayout from "../../components/layouts/page-layout/page-layout";
import AuthContext from "../../contexts/auth.context";
import { updateUser } from "../../services/api.services";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, TextField, Select, MenuItem, responsiveFontSizes} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import "./edit-profile.css"


function EditProfile() {
    const { register, setError, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const { user, fetchProfile } = useContext(AuthContext)

    

    async function handleDataSubmit(data) {
        try {
            await updateUser(data)
            await fetchProfile()
            navigate("/profile")
            
        } catch (error) {
            if (error.response?.data.errors) {
                const { errors } = error.response.data
                Object.keys(errors).forEach((fieldWithError) => {
                    setError(fieldWithError, { message: errors[fieldWithError].message })

                })
            }


        }
    }


    
    const handleShowPassword = () => {
        setShowPassword(!showPassword)

    }

    return (
        <PageLayout>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "0vh" }}>
    <div className="title d-flex justify-content-center mt-2" style={{ backgroundColor: "", minHeight: "20vh" }}>
    </div>

    <div style={{ backgroundColor: "black", minHeight: "20vh" }} className="d-flex row justify-content-center">

        <div className="div-form d-flex row justify-content-center">
            <div className="title-ajustes d-flex justify-content-center">
                <h1 className="mt-2 align-items-center">Ajustes</h1>
            </div>
            <div></div>
            <form onSubmit={handleSubmit(handleDataSubmit)} className="form-container m row justify-content-center col-md-4">
                {/* Name */}
                <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField sx={{ width: '100%', maxWidth: '400px' }}  defaultValue={user?.name} {...register("name", { required: "Name is required" })} type="text" className={` ${errors.name ? "is-invalid" : ""}`} id="input-with-sx" label="Name" variant="standard" />
                    {errors.name ? (<div className="invalid-feedback">{errors.name.message} </div>) : ""}
                </Box>

                {/* Email */}
                <div >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{ width: '100%', maxWidth: '400px' }} defaultValue={user?.email} {...register("email", { required: "Email is required" })} type="email" className={`mb-2  ${errors.email ? "is-invalid" : ""}`} id="input-with-sx1" label="Email" variant="standard" />
                        {errors.email ? (<div className="invalid-feedback">{errors.email.message} </div>) : ""}
                    </Box>
                </div>

                {/* BirthDate */}
                <div className="mt-2">
                    <DateRangeRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField sx={{ width: '80%', maxWidth: '400px' }} {...register("birthDate", { required: "BirthDate is required" })} type="date" variant="standard" className={` ${errors.birthDate ? "is-invalid" : ""}`} ></TextField>
                    {errors.birthDate ? (<div className="invalid-feedback">{errors.birthDate.message} </div>) : ""}
                </div>

                {/* Password */}
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <i role="button" onClick={handleShowPassword}>{showPassword ? <Visibility sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> : <VisibilityOff sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} </i>
                        <TextField sx={{ width: '100%', maxWidth: '400px' }} {...register("password", { required: "Password is required" })} type={showPassword ? 'text' : 'password'} className={`${errors.password ? "is-invalid" : ""}`} id="input-with-sx1" label="Password" variant="standard" />
                        {errors.password ? (<div className="invalid-feedback">{errors.password.message} </div>) : ""}
                    </Box>
                </div>
                <div>
                    <MovieFilterIcon sx={{ color: 'action.active', mr: 1, my: 1 }}></MovieFilterIcon>
                    <Select
                        sx={{ width: '80%', maxWidth: '300px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="BirthDay"
                        variant="standard"
                        defaultValue={user?.genre}
                        {...register("genre")} className={`mb-2 ${errors.genre ? "is-invalid" : ""}`} aria-label="Default select example"
                    >
                        <MenuItem value="action">Action</MenuItem>
                        <MenuItem value="adventure">Adventure</MenuItem>
                        <MenuItem value="animation">Animation</MenuItem>
                        <MenuItem value="comedy">Comedy</MenuItem>
                        <MenuItem value="crime">Crime</MenuItem>
                        <MenuItem value="documentary">Documentary</MenuItem>
                        <MenuItem value="drama">Drama</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="fantasy"></MenuItem>
                        <MenuItem value="history">History</MenuItem>
                        <MenuItem value="horror">Horror</MenuItem>
                        <MenuItem value="mystery">Mystery</MenuItem>
                        <MenuItem value="science fiction">Science Fiction</MenuItem>
                        <MenuItem value="tv movie">TV Movie</MenuItem>
                        <MenuItem value="suspense">Suspense</MenuItem>
                        <MenuItem value="western">Western</MenuItem>
                    </Select>
                    {errors.genre ? (<div className="invalid-feedback">{errors.genre.message} </div>) : ""}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn col-4 btn-danger mt-5 btn-block mb-2">Sign in</button>
                </div>
            </form>
        </div>
    </div>
</div>

        </PageLayout>

    )
}

export default EditProfile;