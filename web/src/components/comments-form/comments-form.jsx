import { useForm, Controller } from "react-hook-form";
import { createComment } from "../../services/api.services";
import { Button, Rating } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

function CommentsForm({ movie, handleComments }) {
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    async function handleDataSubmit(data) {
        const movieId = movie.id;
        try {
            await createComment(data, movieId);
            handleComments();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit(handleDataSubmit)}>
                <div className="container my-5 py-5 text-body">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4 col-lg-8 col-xl-6">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="d-flex flex-start w-100">
                                        <div className="w-100 ">
                                            <div className="d-flex justify-content-between ">
                                            <div className="add-comment d-flex">
                                                <h5 className="">Add a comment and </h5>
                                            </div>
                                            <div className="rating">
                                            <Controller
                                                    name="rating"
                                                    control={control}
                                                    defaultValue={-1}
                                                    render={({ field }) => (
                                                        <Rating
                                                            {...field}
                                                            name="rating"
                                                            onChange={(event, value) => field.onChange(value)}
                                                        />
                                                    )}
                                                />

                                            </div>

                                            </div>
                                            
                                            
                                            <div className="form-outline">
                                                {errors.rating && <span className="text-danger">{errors.rating.message}</span>}

                                                <textarea
                                                    {...register("text", { required: "Comment is required" })}
                                                    className={`form-control ${errors.text ? "is-invalid" : ""}`}
                                                    rows="4"
                                                ></textarea>
                                                {errors.text && <span className="text-danger">{errors.text.message}</span>}
                                                <label className="form-label" htmlFor="text">Comment your experience</label>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3">
                                                
                                                <Button  type="submit" variant="outlined" endIcon={<SendIcon/>} >Send </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default CommentsForm;
