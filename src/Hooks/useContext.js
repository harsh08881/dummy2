import { createContext, useContext } from "react";

const UserContext = createContext({
    name:"harsh",
    email: "mg@gmail.com",
})



export default UserContext;