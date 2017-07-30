'use strict';

const canvas = document.createElement('canvas');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

canvas.setAttribute('id', 'canvas');
canvas.setAttribute('hidden', '');

document.body.appendChild(canvas);

X('oscillator').setup([true, true, true, true]);

X('mml').setup({
    'ended': () => {
        canvas.setAttribute('hidden', '');
    },
    'error': () => {
        canvas.setAttribute('hidden', '');
    }
});

X('oscillator').module('analyser').domain('time').setup(canvas).state(true).param({
    'interval': 'auto',
    'wave'    : '#7ac4f7',
    'grid'    : 'none',
    'text'    : 'none',
    'top'     : 0,
    'left'    : 0,
    'bottom'  : 0,
    'right'   : 0
});

try {
    X('oscillator').module('session').setup({
        'tls' : true,
        'host': 'x-sound-server.herokuapp.com/',
        'port': '8000',
        'path': '/app/websocket/',
    });
} catch (error) {
    window.alert(error.message);
}

const tweetboxtimeline = document.getElementById('tweet-box-home-timeline');
const tweetbuttons     = document.querySelectorAll('.js-tweet-btn');

if (tweetbuttons.length > 0) {
    tweetbuttons[0].addEventListener('click', () => {
        X('mml').ready(X('oscillator'), [tweetboxtimeline.textContent]).start(0);
        X('oscillator').module('session').start();
    }, false);
}

document.addEventListener('mouseup', () => {
    const selection = window.getSelection();

    if (selection.rangeCount < 1) {
        return;
    }

    const range = selection.getRangeAt(0);

    X('mml').ready(X('oscillator'), [range.toString()]);

    if (X('mml').get().length < 1) {
        return;
    }

    X('mml').start(0);

    X('oscillator').module('session').start();
}, false);
