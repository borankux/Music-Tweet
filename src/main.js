let canvas = null;
let isVisualization = false;

X('oscillator').setup([true, true, true, true]);
X('mml').setup({
    'ended': () => {
        canvas.classList.add('hidden');
    },
    'error': () => {
        canvas.classList.add('hidden');
    }
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
        // X('mml').ready(X('oscillator'), [tweetboxtimeline.textContent]).start(0);
        X('mml').ready(X('oscillator'), [tweetboxtimeline.textContent]);
        X('mml').start(0);

        X('oscillator').module('session').start();

        if (isVisualization) {
            canvas.classList.remove('hidden');
        }
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

    if (isVisualization) {
        canvas.classList.remove('hidden');
    }
}, false);

const tweetbox = document.querySelector('.tweet-box-extras');

tweetbox.innerHTML = '<canvas></canvas>'
                   + '<select id="select-wave-type"><option value="sine" selected>SINE</option><option value="square">SQUARE</option><option value="sawtooth">SAWTOOTH</option><option value="triangle">TRIANGLE</option></select>'
                   + '<label><input type="checkbox" id="toggle-visualization" />Visualization</label>'
                   + '<label><input type="checkbox" id="toggle-session" />Session</label>';

document.getElementById('select-wave-type').addEventListener('change', () => {
    for (let i = 0, len = X('oscillator').length(); i < len; i++) {
        X('oscillator').get(i).param('type', document.getElementById('select-wave-type').value);
    }
}, false);

document.getElementById('toggle-visualization').addEventListener('click', () => {
    isVisualization = !isVisualization;
});

document.getElementById('toggle-session').addEventListener('click', () => {
    if (X('oscillator').module('session').state()) {
        X('oscillator').module('session').state(false);
    } else {
        X('oscillator').module('session').state(true);
    }
}, false);

canvas = document.querySelector('canvas');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

canvas.classList.add('hidden');

X('oscillator').module('analyser').domain('time').setup(canvas).state(true).param({
    'interval': 'auto',
    'grid'    : 'none',
    'text'    : 'none',
    'top'     : 0,
    'left'    : 0,
    'bottom'  : 0,
    'right'   : 0
});

