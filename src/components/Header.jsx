import quizlogo from "../assets/quiz-logo.png";

export default function Header({title}) {
    return (
        <>
            <header>
                <img src={quizlogo} alt="" />
                <h1>{title}</h1>
            </header>
        </>
    );
}