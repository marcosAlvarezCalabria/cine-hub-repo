
import { useState,useEffect, useContext } from "react";
import "./page-layout.css"
import ShowModalMapContext from "../../../contexts/showModalMap.context";



function PageLayout({ children, background , className}) {
const [ isBackground, setIsBackground ] = useState("false") ;
const { showModal} = useContext(ShowModalMapContext);
console.log(showModal)
useEffect (() => {
  if(background){
    setIsBackground(true)
  } else {
    setIsBackground(false)
  }

},[])

 
  return (
    <>
   

      <div className={className} style={{opacity: "0.9", minHeight: "calc(100vh + 72px)", backgroundImage: `url(${background})`, backgroundSize: 'cover', }}>{children}
      </div>

    </>


  )
}
export default PageLayout;
