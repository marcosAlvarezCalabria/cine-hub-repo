import PageLayout from "../../components/layouts/page-layout/page-layout";
import { Link, useNavigate } from "react-router-dom";
import("./home.css")
import backgroundHome from "../../assets/images/image.jpg"
import AutoPlay from "../../components/auto-play/auto-play";
import AskList from "../../components/ask-list/ask-list";







function Home() {

//   const navigate = useNavigate()
// const  handlePlaceChanged = ( { lat, lng, address }) => {
//   navigate ({
//     pathname: `/maps`,
//     search: `?lat=${lat}&lng=${lng}&address=${address}`
//   })
//  }

  return (

    <PageLayout background={backgroundHome}>
     
      <section className="text-center">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="row justify-content-center">
            <h1 className="big-text col-sm-12 col-md-6">Welcome to CineHub, where every movie tells a story and every story ignites imagination.</h1>
          </div>
          {/* <AutoCompleteInput onPlaceChange={handlePlaceChanged}/> */}
          
          <div className="mb-3">
            <Link to="/main">
              <button className="btn btn-danger btn-custom">Get started </button>
            </Link>
          </div>
        </div>
        <div className="separation-line"></div>
        <div className="d-flex flex-column align-items-center mt-4">
        <h3 className=" text-section-2 col-sm-12 col-md-6">You can comment on your favorite movies</h3>
          <div className="background-slider p-5 container d-flex align-item-center">
         
           <AutoPlay className="align-item-center"/>
          
        </div>
        <div className="background-slider p-5 container d-flex align-item-center">
         
           <AskList className="align-item-center"/>
          
        </div>
        </div>
      </section>
    </PageLayout>



  )
}

export default Home;



