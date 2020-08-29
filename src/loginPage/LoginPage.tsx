import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const LoginPage = ()=>{
    return(
        <div>
        <Jumbotron>
        <h1 className="display-3">Witaj!</h1>
        <p className="text-dark">Zaloguj się, żeby uzyskać dostęp do pełnej funkcjonalności. </p>
        <hr className="my-2 text-dark" />
        <p className="text-dark">W przypadku niemożliwośći zalogowania się skontaktuj się z administratorem twojego systemu.</p>
        </Jumbotron>
        </div>
    );
}

export default LoginPage;