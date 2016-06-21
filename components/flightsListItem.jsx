import React from 'react';
import ReactDOM from 'react-dom';
import * as fetchService from './services/fetchService.jsx';

export default class FlightsListComponent extends React.Component {

    constructor(params) {
        super(params);
        this.state = {
            data: this.filterFields(this.props.flight),
            validity: {
                time: true,
                actualTime: true,
                number: true,
                to: true,
                from: true,
                planeModel: true
            }
        };
        this._validatedFields = ['time', 'actualTime', 'number', 'to', 'from', 'planeModel'];
    }

    startEditing() {
        this.props.onStartEditing(this.props.flight._id);
    }

    stopEditing() {
        this.props.onStopEditing(this.props.flight._id);
    }

    filterFields(obj) {
        return {
            number: obj.number || '',
            to: obj.to || '',
            from: obj.from || '',
            planeModel: obj.planeModel || '',
            time: obj.time || '',
            actualTime: obj.actualTime || '',
            status: obj.status || ''
        }
    }

    onChangeHandler(field, e) {
        if (field === 'time' || field === 'actualTime') {
            var regExp = /^([01]\d|2[0-3]):[0-5]\d ([0-2]\d|3[01])-(0\d|1[0-2])-\d{2}$/;
            this.state.validity[field] = regExp.test(e.target.value);
        } else {
            this.state.validity[field] = e.target.value && e.target.value.trim() !== ''
        }
        this.state.data[field] = e.target.value;
        this.setState(this.state);
    }

    save() {
        this.stopEditing();

        var newData = {
            _id: this.props.flight._id,
            number: this.refs.numberInput.value,
            planeModel: this.refs.planeModelInput.value,
            time: this.refs.timeInput.value,
            actualTime: this.refs.actualTimeInput.value,
            status: this.refs.statusSelect.value
        };

        if (this.props.departure) {
            newData.to = this.refs.toInput.value;
        } else {
            newData.from = this.refs.fromInput.value;
        }

        if (this.props.flight._id === 'newFlight') {
            this.props.onAdding(newData);
        } else {
            if (newData.number &&
                ((newData.to && this.props.departure) || (newData.from && !this.props.departure)) &&
                newData.planeModel &&
                newData.time && newData.actualTime && newData.status) {
                fetchService.edit(newData, (err, data) => {
                    this.setState({data: this.filterFields(data)});
                });
            } else {
                this.setState({
                    data: this.filterFields(this.props.flight)
                });
            }
        }
    }

    cancel() {
        this.stopEditing();
        if (this.props.flight._id === 'newFlight') {
            this.props.onCancelNew();
        }
        this.setState({
            data: this.filterFields(this.props.flight),
            validity: {
                time: true,
                actualTime: true,
                number: true,
                to: true,
                from: true,
                planeModel: true
            }
        });
    }

    remove(id) {
        fetchService.remove(id, (err, data) => {
            this.props.onDelete(id);
        });
    }

    render() {
        var inputStyles = {};
        var viewStyles = {};

        if (this.props.editing) {
            viewStyles.display = 'none';
        } else {
            inputStyles.display = 'none';
        }

        var styles = [];

        this._validatedFields.forEach(validatedField => {
            var style = {};
            Object.assign(style, inputStyles);
            if (!this.state.validity[validatedField]) {
                style.border = '2px solid red';
                style.outlineColor = 'red';
            }
            styles[validatedField] = style;
        });

        var cityFieldName = this.props.departure ? 'to' : 'from';

        return (
            <tr id={this.props.flight._id}
                className='flight-list__body-row'
                style={this.props.style}>
                <td className='flight-list__body-column'>
                    <div className='flight-list__view'
                         style={viewStyles}>{this.state.data.number}</div>
                    <input className='flight-list__edit-input'
                           type='text'
                           maxLength='10'
                           ref={this.props.editing ? 'numberInput' : ''}
                           style={styles.number}
                           value={this.state.data.number}
                           onChange={this.onChangeHandler.bind(this, 'number')}
                    />
                </td>
                <td className='flight-list__body-column'>
                    <div className='flight-list__view'
                         style={viewStyles}>{this.state.data[cityFieldName]}</div>
                    <input className='flight-list__edit-input'
                           type='text'
                           maxLength='30'
                           ref={this.props.editing ? cityFieldName + 'Input' : ''}
                           style={styles[cityFieldName]}
                           value={this.state.data[cityFieldName]}
                           onChange={this.onChangeHandler.bind(this, cityFieldName)}
                    />
                </td>
                <td className='flight-list__body-column'>
                    <div className='flight-list__view'
                         style={viewStyles}>{this.state.data.planeModel}</div>
                    <input className='flight-list__edit-input'
                           type='text'
                           maxLength='20'
                           ref={this.props.editing ? 'planeModelInput' : ''}
                           style={styles.planeModel}
                           value={this.state.data.planeModel}
                           onChange={this.onChangeHandler.bind(this, 'planeModel')}
                    />
                </td>
                <td className='flight-list__body-column'>
                    <div className='flight-list__view' style={viewStyles}>
                        {this.state.data.time}
                    </div>
                    <input className='flight-list__edit-input'
                           type='text'
                           maxLength='14'
                           ref={this.props.editing ? 'timeInput' : ''}
                           style={styles.time}
                           value={this.state.data.time}
                           onChange={this.onChangeHandler.bind(this, 'time')}
                    />
                </td>
                <td className='flight-list__body-column'>
                    <div className='flight-list__view' style={viewStyles}>
                        {this.state.data.actualTime}
                    </div>
                    <input className='flight-list__edit-input'
                           type='text'
                           maxLength='14'
                           ref={this.props.editing ? 'actualTimeInput' : ''}
                           style={styles.actualTime}
                           value={this.state.data.actualTime}
                           onChange={this.onChangeHandler.bind(this, 'actualTime')}
                    />
                </td>
                <td className='flight-list__body-column'>
                    <div className='flight-list__view'
                         style={viewStyles}>{this.state.data.status}</div>
                    <select className='flight-list__edit-input' style={inputStyles}
                            ref={this.props.editing ? 'statusSelect' : ''}>
                        <option selected={this.state.data.status === 'Идет посадка'}
                                value='Идет посадка'>Идет посадка
                        </option>
                        <option selected={this.state.data.status === 'Посадка закончена'}
                                value='Посадка закончена'>Посадка закончена
                        </option>
                        <option selected={this.state.data.status === 'Отменен'} value='Отменен'>
                            Отменен
                        </option>
                        <option selected={this.state.data.status === 'Задерживается'}
                                value='Задерживается'>Задерживается
                        </option>
                        <option selected={this.state.data.status === 'Прибыл'} value='Прибыл'>
                            Прибыл
                        </option>
                        <option selected={this.state.data.status === 'Вылетел'} value='Вылетел'>
                            Вылетел
                        </option>
                    </select>
                </td>
                <td className='flight-list__body-column flight-list__body-column--control'>
                    <div>
                        <div className='flight-list__view' style={viewStyles}>
                            <button className='control-button'
                                    onClick={this.startEditing.bind(this)}>
                                Редактировать
                            </button>
                            <button className='control-button'
                                    onClick={this.remove.bind(this, this.props.flight._id)}>
                                Удалить
                            </button>
                        </div>
                        <div className='flight-list__edit-input' style={inputStyles}>
                            <button className='control-button'
                                    onClick={this.save.bind(this)}
                                    disabled={!this._validatedFields.every(field =>
                                    this.state.validity[field])}>
                                Сохранить
                            </button>
                            <button className='control-button'
                                    onClick={this.cancel.bind(this)}>
                                Отмена
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}
