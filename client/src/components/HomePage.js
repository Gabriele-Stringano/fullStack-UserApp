import { useNavigate } from "react-router-dom";
import MemoCard from "./MemoCard";
import HomeCSS from './modules/HomePage.module.css';

export function HomePage() {

    const navigate = useNavigate();

    const checkUser = () => {
        return navigate('/dashboard');
    }


    return (
        <div className={HomeCSS.container}>
            <h1 className={HomeCSS.title} >Work management tool</h1>
            <p className={HomeCSS.subtitle}>Tool designed to empower teams by providing powerful capabilities for tracking tasks.</p>
            <div className={HomeCSS.cardContainer}>
                <div >
                    <MemoCard title={'Team call'} children={'25/04/2023 10:30 AM'} />
                </div>
                <div>
                    <MemoCard title={'Check Emails'} children={'9:30 AM'} />
                </div>
                <div>
                    <MemoCard title={'DeadLine'} children={'10/08/2023'} />
                </div>
            </div>
            <button onClick={checkUser} className={HomeCSS.button}>
                Enter your dashboard
            </button>
        </div>
    );
}