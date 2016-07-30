(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = null;
var isVisualization = false;

X('oscillator').setup([true, true, true, true]);
X('mml').setup({
    'ended': function ended() {
        canvas.classList.add('hidden');
    },
    'error': function error() {
        canvas.classList.add('hidden');
    }
});

try {
    X('oscillator').module('session').setup({
        'tls': true,
        'host': 'x-sound-server.herokuapp.com/',
        'port': '8000',
        'path': '/app/websocket/'
    });
} catch (error) {
    window.alert(error.message);
}

var tweetboxtimeline = document.getElementById('tweet-box-home-timeline');
var tweetbuttons = document.querySelectorAll('.js-tweet-btn');

if (tweetbuttons.length > 0) {
    tweetbuttons[0].addEventListener('click', function () {
        // X('mml').ready(X('oscillator'), [tweetboxtimeline.textContent]).start(0);
        X('mml').ready(X('oscillator'), [tweetboxtimeline.textContent]);
        X('mml').start(0);

        X('oscillator').module('session').start();

        if (isVisualization) {
            canvas.classList.remove('hidden');
        }
    }, false);
}

document.addEventListener('mouseup', function () {
    var selection = window.getSelection();

    if (selection.rangeCount < 1) {
        return;
    }

    var range = selection.getRangeAt(0);

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

var tweetbox = document.querySelector('.tweet-box-extras');

tweetbox.innerHTML = '<canvas></canvas>' + '<select id="select-wave-type"><option value="sine" selected>SINE</option><option value="square">SQUARE</option><option value="sawtooth">SAWTOOTH</option><option value="triangle">TRIANGLE</option></select>' + '<label><input type="checkbox" id="toggle-visualization" />Visualization</label>' + '<label><input type="checkbox" id="toggle-session" />Session</label>';

document.getElementById('select-wave-type').addEventListener('change', function () {
    for (var i = 0, len = X('oscillator').length(); i < len; i++) {
        X('oscillator').get(i).param('type', document.getElementById('select-wave-type').value);
    }
}, false);

document.getElementById('toggle-visualization').addEventListener('click', function () {
    isVisualization = !isVisualization;
});

document.getElementById('toggle-session').addEventListener('click', function () {
    if (X('oscillator').module('session').state()) {
        X('oscillator').module('session').state(false);
    } else {
        X('oscillator').module('session').state(true);
    }
}, false);

canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

canvas.classList.add('hidden');

X('oscillator').module('analyser').domain('time').setup(canvas).state(true).param({
    'interval': 'auto',
    'grid': 'none',
    'text': 'none',
    'top': 0,
    'left': 0,
    'bottom': 0,
    'right': 0
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxTQUFTLElBQWI7QUFDQSxJQUFJLGtCQUFrQixLQUF0Qjs7QUFFQSxFQUFFLFlBQUYsRUFBZ0IsS0FBaEIsQ0FBc0IsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBdEI7QUFDQSxFQUFFLEtBQUYsRUFBUyxLQUFULENBQWU7QUFDWCxhQUFTLGlCQUFNO0FBQ1gsZUFBTyxTQUFQLENBQWlCLEdBQWpCLENBQXFCLFFBQXJCO0FBQ0gsS0FIVTtBQUlYLGFBQVMsaUJBQU07QUFDWCxlQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsUUFBckI7QUFDSDtBQU5VLENBQWY7O0FBU0EsSUFBSTtBQUNBLE1BQUUsWUFBRixFQUFnQixNQUFoQixDQUF1QixTQUF2QixFQUFrQyxLQUFsQyxDQUF3QztBQUNwQyxlQUFRLElBRDRCO0FBRXBDLGdCQUFRLCtCQUY0QjtBQUdwQyxnQkFBUSxNQUg0QjtBQUlwQyxnQkFBUTtBQUo0QixLQUF4QztBQU1ILENBUEQsQ0FPRSxPQUFPLEtBQVAsRUFBYztBQUNaLFdBQU8sS0FBUCxDQUFhLE1BQU0sT0FBbkI7QUFDSDs7QUFFRCxJQUFNLG1CQUFtQixTQUFTLGNBQVQsQ0FBd0IseUJBQXhCLENBQXpCO0FBQ0EsSUFBTSxlQUFtQixTQUFTLGdCQUFULENBQTBCLGVBQTFCLENBQXpCOztBQUVBLElBQUksYUFBYSxNQUFiLEdBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLGlCQUFhLENBQWIsRUFBZ0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDNUM7QUFDQSxVQUFFLEtBQUYsRUFBUyxLQUFULENBQWUsRUFBRSxZQUFGLENBQWYsRUFBZ0MsQ0FBQyxpQkFBaUIsV0FBbEIsQ0FBaEM7QUFDQSxVQUFFLEtBQUYsRUFBUyxLQUFU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TUFIa0U7QUFJOUUsV0FBWSxDQUprRTtBQUs5RSxZQUFZLENBTGtFO0FBTTlFLGNBQVksQ0FOa0U7QUFPOUUsYUFBWTtBQVBrRSxDQUFsRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgY2FudmFzID0gbnVsbDtcbmxldCBpc1Zpc3VhbGl6YXRpb24gPSBmYWxzZTtcblxuWCgnb3NjaWxsYXRvcicpLnNldHVwKFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXSk7XG5YKCdtbWwnKS5zZXR1cCh7XG4gICAgJ2VuZGVkJzogKCkgPT4ge1xuICAgICAgICBjYW52YXMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgfSxcbiAgICAnZXJyb3InOiAoKSA9PiB7XG4gICAgICAgIGNhbnZhcy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG59KTtcblxudHJ5IHtcbiAgICBYKCdvc2NpbGxhdG9yJykubW9kdWxlKCdzZXNzaW9uJykuc2V0dXAoe1xuICAgICAgICAndGxzJyA6IHRydWUsXG4gICAgICAgICdob3N0JzogJ3gtc291bmQtc2VydmVyLmhlcm9rdWFwcC5jb20vJyxcbiAgICAgICAgJ3BvcnQnOiAnODAwMCcsXG4gICAgICAgICdwYXRoJzogJy9hcHAvd2Vic29ja2V0LycsXG4gICAgfSk7XG59IGNhdGNoIChlcnJvcikge1xuICAgIHdpbmRvdy5hbGVydChlcnJvci5tZXNzYWdlKTtcbn1cblxuY29uc3QgdHdlZXRib3h0aW1lbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0d2VldC1ib3gtaG9tZS10aW1lbGluZScpO1xuY29uc3QgdHdlZXRidXR0b25zICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10d2VldC1idG4nKTtcblxuaWYgKHR3ZWV0YnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgdHdlZXRidXR0b25zWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyBYKCdtbWwnKS5yZWFkeShYKCdvc2NpbGxhdG9yJyksIFt0d2VldGJveHRpbWVsaW5lLnRleHRDb250ZW50XSkuc3RhcnQoMCk7XG4gICAgICAgIFgoJ21tbCcpLnJlYWR5KFgoJ29zY2lsbGF0b3InKSwgW3R3ZWV0Ym94dGltZWxpbmUudGV4dENvbnRlbnRdKTtcbiAgICAgICAgWCgnbW1sJykuc3RhcnQoMCk7XG5cbiAgICAgICAgWCgnb3NjaWxsYXRvcicpLm1vZHVsZSgnc2Vzc2lvbicpLnN0YXJ0KCk7XG5cbiAgICAgICAgaWYgKGlzVmlzdWFsaXphdGlvbikge1xuICAgICAgICAgICAgY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSwgZmFsc2UpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG5cbiAgICBYKCdtbWwnKS5yZWFkeShYKCdvc2NpbGxhdG9yJyksIFtyYW5nZS50b1N0cmluZygpXSk7XG5cbiAgICBpZiAoWCgnbW1sJykuZ2V0KCkubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgWCgnbW1sJykuc3RhcnQoMCk7XG5cbiAgICBYKCdvc2NpbGxhdG9yJykubW9kdWxlKCdzZXNzaW9uJykuc3RhcnQoKTtcblxuICAgIGlmIChpc1Zpc3VhbGl6YXRpb24pIHtcbiAgICAgICAgY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cbn0sIGZhbHNlKTtcblxuY29uc3QgdHdlZXRib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHdlZXQtYm94LWV4dHJhcycpO1xuXG50d2VldGJveC5pbm5lckhUTUwgPSAnPGNhbnZhcz48L2NhbnZhcz4nXG4gICAgICAgICAgICAgICAgICAgKyAnPHNlbGVjdCBpZD1cInNlbGVjdC13YXZlLXR5cGVcIj48b3B0aW9uIHZhbHVlPVwic2luZVwiIHNlbGVjdGVkPlNJTkU8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwic3F1YXJlXCI+U1FVQVJFPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT1cInNhd3Rvb3RoXCI+U0FXVE9PVEg8L29wdGlvbj48b3B0aW9uIHZhbHVlPVwidHJpYW5nbGVcIj5UUklBTkdMRTwvb3B0aW9uPjwvc2VsZWN0PidcbiAgICAgICAgICAgICAgICAgICArICc8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwidG9nZ2xlLXZpc3VhbGl6YXRpb25cIiAvPlZpc3VhbGl6YXRpb248L2xhYmVsPidcbiAgICAgICAgICAgICAgICAgICArICc8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwidG9nZ2xlLXNlc3Npb25cIiAvPlNlc3Npb248L2xhYmVsPic7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3Qtd2F2ZS10eXBlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBYKCdvc2NpbGxhdG9yJykubGVuZ3RoKCk7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBYKCdvc2NpbGxhdG9yJykuZ2V0KGkpLnBhcmFtKCd0eXBlJywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdC13YXZlLXR5cGUnKS52YWx1ZSk7XG4gICAgfVxufSwgZmFsc2UpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlLXZpc3VhbGl6YXRpb24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpc1Zpc3VhbGl6YXRpb24gPSAhaXNWaXN1YWxpemF0aW9uO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2dnbGUtc2Vzc2lvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChYKCdvc2NpbGxhdG9yJykubW9kdWxlKCdzZXNzaW9uJykuc3RhdGUoKSkge1xuICAgICAgICBYKCdvc2NpbGxhdG9yJykubW9kdWxlKCdzZXNzaW9uJykuc3RhdGUoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIFgoJ29zY2lsbGF0b3InKS5tb2R1bGUoJ3Nlc3Npb24nKS5zdGF0ZSh0cnVlKTtcbiAgICB9XG59LCBmYWxzZSk7XG5cbmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuXG5jYW52YXMud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuWCgnb3NjaWxsYXRvcicpLm1vZHVsZSgnYW5hbHlzZXInKS5kb21haW4oJ3RpbWUnKS5zZXR1cChjYW52YXMpLnN0YXRlKHRydWUpLnBhcmFtKHtcbiAgICAnaW50ZXJ2YWwnOiAnYXV0bycsXG4gICAgJ2dyaWQnICAgIDogJ25vbmUnLFxuICAgICd0ZXh0JyAgICA6ICdub25lJyxcbiAgICAndG9wJyAgICAgOiAwLFxuICAgICdsZWZ0JyAgICA6IDAsXG4gICAgJ2JvdHRvbScgIDogMCxcbiAgICAncmlnaHQnICAgOiAwXG59KTtcblxuIl19
