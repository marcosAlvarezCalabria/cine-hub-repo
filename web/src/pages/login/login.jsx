
import PageLayout from "../../components/layouts/page-layout/page-layout";
import("./login.css")
import backgroundHome from "../../assets/images/background-home3.jpg"
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth.context.jsx";
import { Box, TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';






function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const { doLogin } = useContext(AuthContext)
    const [apiError, setApiError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    async function handleDataSubmit(data) {
        try {
            await doLogin(data);
            navigate("/main");
        } catch (error) {
            if (error.response?.data?.message === "Invalids credentials") {
                setApiError("Invalid email or password. Please try again."); // Establecer el mensaje de error del API
            } else {
                setApiError("An error occurred. Please try again later."); // Otro tipo de error
            }
        }
    }
    const handleShowPassword = ()=> {
        setShowPassword(!showPassword)

    }


    return (
        <PageLayout background={backgroundHome}>
        <div className="d-flex justify-content-center align-items-center p-5" style={{ minHeight: "calc(100vh + 72px)" }}>
            <form onSubmit={handleSubmit(handleDataSubmit)} className="form-container-login p-4 col-10 col-md-8 col-lg-6 col-xl-4">
                {/* email */}
                <div className="mb-3">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            {...register("email", { required: "Email is required" })} 
                            type="email" 
                            className={`form-control ${errors.email ? "is-invalid" : ""}`} 
                            id="input-with-sx" 
                            label="Email" 
                            variant="standard" 
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </Box>
                </div>
    
                {/* password */}
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
                        {apiError && <div className="alert alert-danger mt-3">{apiError}</div>}
                    </Box>
                </div>
    
                <div className="d-flex justify-content-center">
                    <div className="col-8">
                        <button type="submit" className="btn btn-danger  mt-4 mb-2">Sign in</button>
                        <div>
                            <p className="mt-4 text-center">
                                Don't have an account? <NavLink to="/register">Signup</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </PageLayout>
    

    )
}
export default Login;