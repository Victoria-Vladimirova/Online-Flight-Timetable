import React from 'react';
import ReactDOM from 'react-dom';
import FlightsList from './flightsList.jsx';
import * as fetchService from './services/fetchService.jsx';

export default class Timetable extends React.Component {

    constructor(params) {
        super(params);
        this.state = {
            departure: true,
            searchString: '',
            status: '',
            editing: false
        };
        this.timeout = null;
    }

    onTabClick(param) {
        this.refs.search.value = '';
        this.setState({departure: param});
    }

    onStatusChange(e) {
        if (!this.state.editing) {
            this.setState({status: e.target.value});
        }
    }

    onChangeHandler() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({searchString: this.refs.search.value});
        }, 500);
    }

    setEditing(editing) {
        this.setState({editing: editing});
    }

    render() {
        return (
            <div className='timetable'>
                <input id='tab1' type='radio' name='tabs' className='timetable__tab-input'
                       defaultChecked disabled={this.state.editing}
                       onClick={this.onTabClick.bind(this, true)}/>
                <label htmlFor='tab1' className='timetable__tab-label'>
                    <i className='fa fa-plane' aria-hidden='true'></i>
                    Вылет
                </label>
                <input id='tab2' type='radio' name='tabs' className='timetable__tab-input'
                       disabled={this.state.editing} onClick={this.onTabClick.bind(this, false)}/>
                <label htmlFor='tab2' className='timetable__tab-label'>
                    <i className='fa fa-plane fa-plane--rotate' aria-hidden='true'></i>
                    Прилет
                </label>

                <section className='timetable__content'>
                    <div className='search-panel'>
                        <div className='search-panel__search-field-wrap'>
                            <label htmlFor='search'>
                                <i className='fa fa-search' aria-hidden='true'></i>
                            </label>
                            <input id='search'
                                   className='search-panel__search-field'
                                   ref='search'
                                   type='search'
                                   autocomplete='off'
                                   placeholder='Поиск по городу'
                                   disabled={this.state.editing}
                                   onChange={this.onChangeHandler.bind(this)}/>
                        </div>

                        <div className='search-panel__status-wrap'>
                            <div className='search-panel__status'>Статус
                                <div className='search-panel__status-dropdown-content'>
                                    <a value='Идет посадка'
                                       className='search-panel__status-item'
                                       onClick={this.onStatusChange.bind(this)}>Идет посадка</a>
                                    <a value='Посадка закончена'
                                       className='search-panel__status-item'
                                       onClick={this.onStatusChange.bind(this)}>
                                        Посадка закончена
                                    </a>
                                    <a value='Отменен' className='search-panel__status-item'
                                       onClick={this.onStatusChange.bind(this)}>Отменен</a>
                                    <a value='Задерживается'
                                       className='search-panel__status-item'
                                       onClick={this.onStatusChange.bind(this)}>Задерживается</a>
                                    <a value='Прибыл' className='search-panel__status-item'
                                       onClick={this.onStatusChange.bind(this)}>Прибыл</a>
                                    <a value='Вылетел' className='search-panel__status-item'
                                       onClick={this.onStatusChange.bind(this)}>Вылетел</a>
                                    <a value='' className='search-panel__status-item
                                    search-panel__status-item--all'
                                       onClick={this.onStatusChange.bind(this)}>Все</a>
                                </div>
                                <i className='fa fa-angle-down' aria-hidden='true'></i>
                            </div>
                        </div>
                    </div>

                    <FlightsList departure={this.state.departure}
                                 searchString={this.state.searchString}
                                 status={this.state.status}
                                 setEditing={this.setEditing.bind(this)}/>
                </section>
            </div>
        );
    }
}

ReactDOM.render(
    <Timetable />,
    document.getElementsByClassName('timetable-wrap')[0]
);
