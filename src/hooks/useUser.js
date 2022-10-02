import { useContext } from "react";
import AuthContext from "../componets/globals/AuthProvider";

const useUser = () => {
    return useContext(AuthContext)
}

export default useUser;