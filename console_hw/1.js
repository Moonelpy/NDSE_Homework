#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const currentDate = new Date();

yargs(hideBin(process.argv))
    .command(
        'current',
        'Текущая дата и время',
        function (argv) {
            if (!argv.year && !argv.day && !argv.month) {
                console.log(currentDate.toISOString());
            }

            else if (argv.year) {
                console.log(currentDate.getFullYear());
            }

            else if (argv.month) {
                console.log(currentDate.getMonth());
            }

            else if (argv.day) {
                console.log(currentDate.getDate());
            }
        })
    .command(
        'add',
        'Получить дату в будущем',
        function (argv) {
            if (!argv.year && !argv.day && !argv.month) {
                console.log('Укажите период для добавления');
            }

            else if (argv.year) {
                console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() + argv.year)).toISOString());
            }

            else if (argv.month) {
                console.log(new Date(currentDate.setMonth(currentDate.getMonth() + argv.month)).toISOString());
            }

            else if (argv.day) {
                console.log(new Date(currentDate.setDate(currentDate.getDate() + argv.day)).toISOString());
            }
        })
    .command(
        'sub',
        'Получить дату в прошлом ',
        function (argv) {
            if (!argv.year && !argv.day && !argv.month) {
                console.log('Укажите период для добавления');
            }

            else if (argv.year) {
                console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() - argv.year)).toISOString());
            }

            else if (argv.month) {
                console.log(new Date(currentDate.setMonth(currentDate.getMonth() - argv.month)).toISOString());
            }

            else if (argv.day) {
                console.log(new Date(currentDate.setDate(currentDate.getDate() - argv.day)).toISOString());
            }
        })
    .option('year', {
        alias: 'y',
        type: 'Date',
        description: 'текущий год'
    })
    .option('month', {
        alias: 'm',
        type: 'Date',
        description: 'текущий месяц',
    })
    .option('day', {
        alias: 'd',
        type: 'Date',
        description: 'текущий день',
    }).argv;
