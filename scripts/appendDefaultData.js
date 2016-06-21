var Flight = require('../models/flight.js');

var data = [
    {
        number: 'U6 202',
        planeModel: 'A-320',
        from: 'Екатеринбург',
        to: 'Анапа',
        time: new Date(2016, 5, 21, 8, 0),
        actualTime: new Date(2016, 5, 9, 8, 10),
        status: 'Вылетел'
    },
    {
        number: 'SU 017',
        planeModel: 'A-321',
        from: 'Екатеринбург',
        to: 'Москва',
        time: new Date(2016, 5, 21, 9, 14),
        actualTime: new Date(2016, 5, 9, 9, 14),
        status: 'Вылетел'
    },
    {
        number: 'UT 111',
        planeModel: 'AT-72-5',
        from: 'Екатеринбург',
        to: 'Сургут',
        time: new Date(2016, 5, 21, 10, 15),
        actualTime: new Date(2016, 5, 21, 10, 10),
        status: 'Посадка закончена'
    },
    {
        number: 'U6 210',
        planeModel: 'A-320',
        from: 'Екатеринбург',
        to: 'Краснодар',
        time: new Date(2016, 5, 18, 11, 0),
        actualTime: new Date(2016, 5, 18, 11, 0),
        status: 'Отменен'
    },
    {
        number: 'Y7 67',
        planeModel: 'AT-45',
        from: 'Екатеринбург',
        to: 'Омск',
        time: new Date(2016, 5, 18, 11, 30),
        actualTime: new Date(2016, 5, 18, 11, 30),
        status: 'Задерживается'
    },
    {
        number: 'U6 262',
        planeModel: 'A-319',
        from: 'Москва',
        to: 'Екатеринбург',
        time: new Date(2016, 5, 18, 7, 20),
        actualTime: new Date(2016, 5, 18, 7, 20),
        status: 'Прибыл'
    },
    {
        number: 'U6 841',
        planeModel: 'A-320',
        from: 'Копенгаген',
        to: 'Екатеринбург',
        time: new Date(2016, 5, 18, 8, 40),
        actualTime: new Date(2016, 5, 18, 8, 40),
        status: 'Посадка закончена'
    },
    {
        number: 'KC 272',
        planeModel: 'EMB-190',
        from: 'Астана',
        to: 'Екатеринбург',
        time: new Date(2016, 5, 18, 8, 55),
        actualTime: new Date(2016, 5, 18, 9, 0),
        status: 'Посадка закончена'
    },
    {
        number: 'U6 873',
        planeModel: 'A-320',
        from: 'Бангкок',
        to: 'Екатеринбург',
        time: new Date(2016, 5, 18, 9, 20),
        actualTime: new Date(2016, 5, 18, 9, 20),
        status: 'Вылетел'
    },
    {
        number: 'AF 4894',
        planeModel: 'A-320',
        from: 'Москва',
        to: 'Екатеринбург',
        time: new Date(2016, 5, 18, 10, 5),
        actualTime: new Date(2016, 5, 18, 10, 15),
        status: 'Отменен'
    }
];

module.exports = function () {
    Flight.count({}, function (err, count) {
        if (!count) {
            data.forEach(function (item) {
                new Flight(item).save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            })
        }
    })
};
