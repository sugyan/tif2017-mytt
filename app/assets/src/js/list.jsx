import React from 'react';
import { connect } from 'react-redux';

import { filterToggleCheckbox, filterChangeKeyword } from './redux/actions';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.days = [
            { label: '8/4(金)', key: '08-04' },
            { label: '8/5(土)', key: '08-05' },
            { label: '8/6(日)', key: '08-06' }
        ];
        this.stages = [
            { label: 'HOT STAGE',            key: '#FA3D56' },
            { label: 'DOLL FACTORY',         key: '#FF88B4' },
            { label: 'SKY STAGE',            key: '#39CDFE' },
            { label: 'SMILE GARDEN',         key: '#B1DD00' },
            { label: 'FESTIVAL STAGE',       key: '#FFDF33' },
            { label: 'DREAM STAGE',          key: '#00C858' },
            { label: 'INFO CENTRE',          key: '#FB3CA6' },
            { label: 'HEAT GARAGE',          key: '#FF783B' },
            { label: 'フジさんのヨコ STAGE', key: '#51D3F8' }
        ];
    }
    render() {
        const days = this.days.map((e, i) => {
            return (
                <label key={i} className="checkbox-inline">
                    <input
                        type="checkbox"
                        checked={this.props.day[e.key]}
                        onChange={() => this.props.dispatch(filterToggleCheckbox(e.key))} />
                    {e.label}
                </label>
            );
        });
        const stages = this.stages.map((e, i) => {
            return (
                <label key={i} className="checkbox-inline" style={{ marginLeft: '0px', marginRight: '10px' }}>
                    <input
                        type="checkbox"
                        checked={this.props.stage[e.key]}
                        onChange={() => this.props.dispatch(filterToggleCheckbox(e.key))} />
                    {e.label}
                </label>
            );
        });
        return (
            <form className="form-horizontal" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">日付</label>
                    <div className="col-sm-10">{days}</div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">ステージ</label>
                    <div className="col-sm-10">{stages}</div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">出演者名</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="text"
                            value={this.props.keyword}
                            onChange={(e) => this.props.dispatch(filterChangeKeyword(e.target.value))} />
                    </div>
                </div>
            </form>
        );
    }
}
const FilterForm = connect(
    (state) => state.filter
)(Form);

class Row extends React.Component {
    render() {
        let content = this.props.item.artist;
        if (this.props.item.detail !== 'null') {
            content += ` (${this.props.item.detail.replace(/<br>/g, ', ')})`;
        }
        return (
            <tr>
                <td style={{ whiteSpace: 'nowrap' }}>
                    <div className="checkbox" style={{ marginTop: 0, marginBottom: 0 }}>
                        <label>
                            <input
                                id={this.props.item.id}
                                type="checkbox"
                                /* checked={this.props.selected[item.id] ? true : false}
                                onChange={(e) => this.props.dispatch(selectItem(item.id, e.target.checked))} */
                            />
                            {this.props.item.start.format('M/D(ddd) HH:mm')} - {this.props.item.end.format('HH:mm')}
                        </label>
                    </div>
                </td>
                <td style={{ backgroundColor: this.props.item.color, padding: '4px', width: '100%' }}>
                    <label
                        style={{
                            backgroundColor: '#ffffff', padding: '4px', borderRadius: '4px',
                            display: 'block', marginBottom: 'initial', fontWeight: 'normal', cursor: 'pointer'
                        }}
                        htmlFor={this.props.item.id} >
                        <small>{this.props.item.stage}</small>
                        <br />
                        <strong>{content}</strong>
                    </label>
                </td>
            </tr>
        );
    }
}
class Table extends React.Component {
    render() {
        const rows = this.props.items.map((item, i) => {
            return <Row key={i} item={item} />;
        });
        return (
            <table className="table">
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class List extends React.Component {
    render() {
        const regexp = this.props.filter.keyword ? new RegExp(this.props.filter.keyword, 'i') : null;
        const items = this.props.timetable.items.filter((item) => {
            if (! this.props.filter.day[item.day]) {
                return false;
            }
            if (! this.props.filter.stage[item.color]) {
                return false;
            }
            if (regexp && ! item.artist.match(regexp)) {
                return false;
            }
            return true;
        });
        return (
            <div>
                <FilterForm />
                <hr />
                <p>全{items.length}件</p>
                <Table items={items} selected={this.props.timetable.selected} />
            </div>
        );
    }
}
export default connect(
    (state) => state
)(List);