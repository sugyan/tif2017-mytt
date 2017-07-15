import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import 'whatwg-fetch';

import { generateResult } from './redux/actions';

class Result extends React.Component {
    componentDidMount() {
        this.props.dispatch(generateResult(null));
        if (Object.keys(this.props.timetable.selected).length === 0) {
            return;
        }
        fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: Object.keys(this.props.timetable.selected)
            })
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.props.dispatch(generateResult(json.result));
        });
    }
    handleClickTweetButton() {
        fetch('/api/tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: Object.keys(this.props.timetable.selected)
            })
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.props.history.push('/result/' + json.key);
            const url = 'https://twitter.com/intent/tweet?hashtags=TIF2017_MyTT'
              + '&text=' + encodeURIComponent(`俺のタイテ ${json.url}`)
              + '&url=' + encodeURIComponent(window.location.href)
              + '&hashtags=TIF2017_MyTT';
            window.open(url, '_blank');
        });
    }
    render() {
        const result = this.props.timetable.result
            ? <img src={this.props.timetable.result} style={{ maxWidth: '100%' }} />
            : <div>画像を生成しています...</div>;
        return (
            <div>
                <div>{result}</div>
                <hr />
                <div className="pull-left">
                    <button className="btn btn-default" onClick={() => this.props.history.push('/')}>
                        選び直す
                    </button>
                </div>
                <div className="pull-right">
                    <button className="btn btn-primary" onClick={this.handleClickTweetButton.bind(this)}>
                        Tweetする
                    </button>
                </div>
            </div>
        );
    }
}
export default connect(
    (state) => {
        return {
            timetable: state.timetable
        };
    }
)(withRouter(Result));
