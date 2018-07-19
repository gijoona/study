import React from 'react'
import ReactDOM from 'react-dom'

// const name = 'Josh Perez';
// const element = <h1>Hello, {name}</h1>

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
}

function getGreeting(user) {
    if(user){
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

// const element = (
//     <h1>
//         Hello, {formatName(user)}!
//     </h1>
// )

const element = getGreeting(user);

// 아래의 element1, element2, element3은 동일한 element를 생성한다.
const element1 = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);

const element2 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);

const element3 = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world!'
    }
};

ReactDOM.render(
    element,
    document.getElementById('root')
)