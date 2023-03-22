import { useNavigate } from "react-router-dom";

export function HomePage() {

    const navigate = useNavigate();

    const checkUser =  () => {
        return navigate('/dashboard');
    }


    return (
        <button onClick={checkUser}>
            Test
        </button>
    )
}