document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    const options = {
        eventType : 'keydown',
        keyStrokeDelay : 1000
    }

    keyMapper([updateBackground, updateUI], options);

});

function keyMapper(callbackList, options) {

    const eventType = options && options.eventType || 'keydown';
    const keyStrokeDelay = options && options.keyStrokeDelay || 1000;

    let state = {
        buffer: [],
        lastKeyTime: Date.now()
    };
    
    document.addEventListener(eventType, event => {
        
        const key = event.key.toLowerCase();
        const currentTime = Date.now();
        let buffer = [];
        
        if (currentTime - state.lastKeyTime > keyStrokeDelay) {
            buffer = [key];
        } else {
            buffer = [...state.buffer, key];
        }

        state = {buffer: buffer, lastKeyTime: currentTime};

        callbackList.forEach(callback => callback(buffer));
        
    });
}

function updateBackground(keySequence) {

    const container = document.querySelector('#background');
    container.style.backgroundImage = `url(images/${keySequence.join('')}.jpg)`;

}

function updateUI(keySequence) {
    const userInput = keySequence.join('');
    const keySequences = {
        'idfa': 'All weapons and ammo',
        'idkfa': 'All weapons and ammo and keys',
        'idbeholds': 'Beserk pack',
        'idclev31': 'Bonus level'
    };

    const userInputDisplay = document.querySelector('#user_input');
    userInputDisplay.textContent = userInput;

    const cheatMessage = document.querySelector('#cheat_message');
    cheatMessage.textContent = keySequences[userInput] || 'nothing';
}

