import React from 'react';
import * as fetchService from './services/fetchService.jsx';
import FlightsListItem from "./flightsListItem.jsx";

export default class FlightsList extends React.Component {

    constructor(params) {
        super(params);
        this.state = {
            flights: [],
            editingId: null
        };
    }

    getList(param) {
        fetchService.list({
            departure: param.departure,
            search: param.searchString,
            status: param.status
        }, (err, data) => {
            if (err) {
                console.log('Flights load error :' + err);
                return;
            }
            this.setState({flights: data.reverse()});
        });
    }

    componentDidMount() {
        this.getList(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getList(nextProps);
    }

    setEditingModelId(id) {
        this.setState({editingId: id});
        this.props.setEditing(true);
    }

    unsetEditingModelId(id) {
        if (id === this.state.editingId) {
            this.setState({editingId: null});
            this.props.setEditing(false);
        }
    }

    removeFromFlights() {
        this.state.flights.shift();
        this.setState({flights: this.state.flights});
    }

    handleAdd(newData) {
        if (!(newData.number && ((newData.to && this.props.departure) || (newData.from &&
            !this.props.departure)) && newData.planeModel && newData.time && newData.actualTime
            && newData.status)) {
            this.removeFromFlights();
            return;
        }

        delete newData._id;
        if (!newData.from) {
            newData.from = 'Екатеринбург';
        }
        if (!newData.to) {
            newData.to = 'Екатеринбург';
        }

        fetchService.add(newData, (err, data) => {
            this.state.flights[0] = data;
            this.setState({flights: this.state.flights});
        });
    }

    onDelete(id) {
        this.setState({flights: this.state.flights.filter(flight => flight._id !== id)});
    }

    addButtonHandle() {
        this.state.flights.unshift({_id: 'newFlight'});
        this.setState({flights: this.state.flights});
    }

    render() {
        var flightNodes = this.state.flights.map(flight =>
            <FlightsListItem
                key={flight._id}
                flight={flight}
                onStartEditing={this.setEditingModelId.bind(this)}
                onStopEditing={this.unsetEditingModelId.bind(this)}
                editing={flight._id !== 'newFlight' ? this.state.editingId === flight._id : true}
                departure={this.props.departure}
                onAdding={this.handleAdd.bind(this)}
                onCancelNew={this.removeFromFlights.bind(this)}
                onDelete={this.onDelete.bind(this)}
            />
        );

        return (
            <div className="flight-list-wrap">
                <button className="control-button" onClick={this.addButtonHandle.bind(this)}
                        disabled={this.state.editingId !== null}>
                    Добавить рейс
                </button>

                <table className="flight-list">
                    <thead className="flight-list__head">
                    <tr className="flight-list__head-row">
                        <th className="flight-list__head-column">Рейс</th>
                        <th className="flight-list__head-column">
                            {this.props.departure ? 'Город прилета' : 'Город вылета'}
                        </th>
                        <th className="flight-list__head-column">Тип ВС</th>
                        <th className="flight-list__head-column">Время</th>
                        <th className="flight-list__head-column">Фактическое время</th>
                        <th className="flight-list__head-column">Статус</th>
                        <th className="flight-list__head-column--control">Управление</th>
                    </tr>
                    </thead>
                    <tbody className="flight-list__body">
                    {flightNodes}
                    </tbody>
                </table>
            </div>
        );
    }
}
