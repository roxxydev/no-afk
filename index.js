'use strict';

const Cron = require('cron');
const Robot = require('robotjs');


let config = {
    interval: '* * * * *',
    shouldMove: true,
    shouldClick: false,
    shouldPress: false
};

let fileConfig = {};
try {
    fileConfig = require('./config.json');
}
catch (e) {
    console.log('No config.json found. Using default values now.');
}

fileConfig = JSON.stringify(fileConfig)
    .replace(/"Y"/g, true)
    .replace(/"N"/g, false);
fileConfig = JSON.parse(fileConfig);

config = Object.assign(config, fileConfig);

let lastMoveIsAdd = true;

const doAction = (shouldMove, shouldClick, shouldType) => {

    if (shouldMove) {

        // This will just move the mouse vertically back and forth by 1px
        if (lastMoveIsAdd) {
            Robot.moveMouse(99, 898);
            lastMoveIsAdd = false;
        }
        else {
            Robot.moveMouse(100, 899);
            lastMoveIsAdd = true;
        }
    }

    if (shouldClick) {
        Robot.mouseClick('left', false);
    }

    if (shouldType) {
        Robot.keyTap('pageup');
    }
};

const cronMoveClickMouse = new Cron.CronJob({
    cronTime: config.interval,
    timeZone: 'Asia/Manila',
    onTick: () => {

        doAction(config.shouldMove, config.shouldClick, config.shouldPress);
    }
});

setTimeout(() => {

    cronMoveClickMouse.start();
}, 4000, 'cron');
