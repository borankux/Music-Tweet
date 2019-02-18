'use strict';

document.getElementById('form-wave-type').addEventListener('change', event => {
    const form = event.currentTarget;

    let type = '';

    for (let i = 0, len = form.elements.length; i < len; i++) {
        if (form.elements[i].checked) {
            type = form.elements[i].value;
            break;
        }
    }

    chrome.tabs.executeScript(null, {
        'code': `
            for (let i = 0, len = X('oscillator').length(); i < len; i++) {
                X('oscillator').get(i).param('type', '${type}');
            }
        `
    });
}, false);

document.getElementById('toggle-visualization').addEventListener('click', event => {
    chrome.tabs.executeScript(null, {
        'code': `
            if (${event.currentTarget.checked}) {
                canvas.removeAttribute('hidden');
            } else {
                canvas.setAttribute('hidden', '');
            }
        `
    });
}, false);
