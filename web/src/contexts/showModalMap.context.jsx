import { createContext,useContext, useState } from "react";

const ShowModalMapContext= createContext();

export function ShowModalMapContextProvider({ children }) {
    const [showModal, setShowModal] = useState(false);

     function toggleModal(){
        setShowModal (!showModal)
    };
    const value = {
        showModal,
        toggleModal
};
return(
     <ShowModalMapContext.Provider value= {value}>{children}</ShowModalMapContext.Provider>
)
};
export const show = () => useContext(ShowModalMapContext)
export default ShowModalMapContext