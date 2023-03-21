import { useNavigate } from "react-router-dom";

export function HomePage() {

    const navigate = useNavigate();

    const checkUser = async (event) => {
        try {
            const res = await fetch("/api/checkAuth", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data.result.error)
            checkResult(data);
        } catch (err) {
            console.log(err);
        }
    }

    const checkResult = (data) => {
        if(data.result.error){
            return navigate('/login');
        }else{
            return navigate('/dashboard');
        }
    }

    return (
        <button onClick={checkUser}>
            Test
        </button>
    )
}