import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Common = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    return {
        dispatch,
        navigate
    }
}
export default Common;