import PageLayout from "../../components/layouts/page-layout/page-layout";
import("./register.css");
import { useForm } from "react-hook-form";
import backgroundRegister from "../../assets/images/img2.jpg"
import { createUser } from "../../services/api.services";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Box, TextField, Select, MenuItem, colors} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';



function Register() {


    const { register, setError, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const latitude = useRef(0);
    const longitude = useRef(0);
    const [showPassword, setShowPassword] = useState(false)


    useEffect(() => {
        navigator.geolocation?.getCurrentPosition((position) => {
            latitude.current = position.coords.latitude;
            longitude.current = position.coords.longitude;
        })
    }, [])



    async function handleDataSubmit(data) {
        try {
            await createUser({
                ...data,
                location: {
                    type: "Point",
                    coordinates: [latitude.current ?? 0, longitude.current ?? 0]
                }
            });
            navigate("/login");
        } catch (error) {
            if (error.response?.data?.errors) {
                const { errors } = error.response.data;
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
        <PageLayout className="row justify-content-center" background={backgroundRegister}>
           
           <div className=" d-flex row flex-column align-items-center justify-content-center p-5 m-5" style={{ minHeight: '100vh' }}>
    <h1 style={{ color: "white", textAlign: "center" }}>
        Join our community and start your journey today. Sign up now to access exclusive content and exciting features.
    </h1>
    
    <div className="row d-flex justify-content-center ">
        <div className="row d-flex justify-content-center col-sm-10 col-md-6 ">
            
            <div className="card  rounded-3 p-4">
                <h4>Registration Info</h4>
                <form onSubmit={handleSubmit(handleDataSubmit)}>
                    {/* Name */}
                    <div className="mb-3">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                {...register("name", { required: "Name is required" })} 
                                type="text" 
                                className={`form-control ${errors.name ? "is-invalid" : ""}`} 
                                id="input-with-sx" 
                                label="Name" 
                                variant="standard" 
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </Box>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                {...register("email", { required: "Email is required" })} 
                                type="email" 
                                className={`form-control ${errors.email ? "is-invalid" : ""}`} 
                                id="input-with-sx1" 
                                label="Email" 
                                variant="standard" 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </Box>
                    </div>

                    {/* BirthDate */}
                    <div className="mb-3">
                        <DateRangeRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            {...register("birthDate", { required: "BirthDate is required" })} 
                            type="date" 
                            variant="standard" 
                            className={`form-control ${errors.birthDate ? "is-invalid" : ""}`} 
                        />
                        {errors.birthDate && <div className="invalid-feedback">{errors.birthDate.message}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <i role="button" onClick={handleShowPassword}>
                                {showPassword ? <Visibility sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> : <VisibilityOff sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
                            </i>
                            <TextField 
                                {...register("password", { required: "Password is required" })} 
                                type={showPassword ? 'text' : 'password'} 
                                className={`form-control ${errors.password ? "is-invalid" : ""}`} 
                                id="input-with-sx1" 
                                label="Password" 
                                variant="standard" 
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                        </Box>
                    </div>

                    {/* Genre */}
                    <div className="mb-3">
                        <MovieFilterIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Genre"
                            variant="standard"
                            {...register("genre")} 
                            className={`form-control ${errors.genre ? "is-invalid" : ""}`}
                        >
                            <MenuItem value="action">Action</MenuItem>
                            <MenuItem value="adventure">Adventure</MenuItem>
                            <MenuItem value="animation">Animation</MenuItem>
                            <MenuItem value="comedy">Comedy</MenuItem>
                            <MenuItem value="crime">Crime</MenuItem>
                            <MenuItem value="documentary">Documentary</MenuItem>
                            <MenuItem value="drama">Drama</MenuItem>
                            <MenuItem value="family">Family</MenuItem>
                            <MenuItem value="fantasy">Fantasy</MenuItem>
                            <MenuItem value="history">History</MenuItem>
                            <MenuItem value="horror">Horror</MenuItem>
                            <MenuItem value="mystery">Mystery</MenuItem>
                            <MenuItem value="science fiction">Science Fiction</MenuItem>
                            <MenuItem value="tv movie">TV Movie</MenuItem>
                            <MenuItem value="suspense">Suspense</MenuItem>
                            <MenuItem value="western">Western</MenuItem>
                        </Select>
                        {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger mt-4">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


             
           








        </PageLayout>

    )
}

export default Register;

