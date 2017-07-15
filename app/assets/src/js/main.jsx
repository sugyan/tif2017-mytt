import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import moment from 'moment';
import 'moment/locale/ja';
import 'whatwg-fetch';

import List from './list';
import reducers from './redux/reducers';
import { updateTimeTable } from './redux/actions';

class Main extends React.Component {
    componentDidMount() {
        fetch('/api/timetable.json').then((res) => {
            return res.json();
        }).then((json) => {
            this.props.fetchTimeTable(json.map((e) => {
                e.start = moment(e.start * 1000);
                e.end   = moment(e.end   * 1000);
                e.day   = e.start.format('MM-DD');
                return e;
            }));
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
                    <List />
                </div>
            </div>
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const App = connect(
        undefined,
        (dispatch) => {
            return {
                fetchTimeTable: (data) => {
                    dispatch(updateTimeTable(data));
                }
            };
        }
    )(Main);
    ReactDOM.render(
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>,
        document.getElementById('main')
    );
});
