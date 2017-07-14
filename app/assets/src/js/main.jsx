import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

class Main extends React.Component {
    componentDidMount() {
        fetch('/api/timetable.json').then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json);
        });
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a>
                                <span className="navbar-brand">TIF 2017 MyTT</span>
                            </a>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Main />,
        document.getElementById('main')
    );
});
