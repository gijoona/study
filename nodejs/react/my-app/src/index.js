import React from 'react'
import ReactDOM from 'react-dom'

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            localeTime: new Date().toLocaleTimeString()
        }
    }

    componentDidMount(){
        this.interval = setInterval(this.setState({
            localeTime: new Date().toLocaleTimeString()
        }), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.localeTime}.</h2>
            </div>
        )
    }
}

ReactDOM.render(
    <Timer />, 
    document.getElementById('root')
);