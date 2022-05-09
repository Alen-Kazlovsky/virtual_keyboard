//const { count } = require('console');

const Keyboard = {
    elements: {
        main: null,
        screen: null,
        header: null,
        input: null,
        keysContainer: null,
        keys: [],
        footer: null
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false,
        alt: false,
        lang: ''
    },

    init() {

        this.initLang();

        this.elements.main = document.createElement('div');

        this.elements.screen = document.createElement('div');

        this.elements.screen = document.createElement('div');
        this.elements.header = document.createElement('div');
        this.elements.input = document.createElement('textarea');
        this.elements.keysContainer = document.createElement('div');
        this.elements.footer = document.createElement('div');


        this.elements.main.classList.add('tablet');
        this.elements.screen.classList.add('tablet__screen');
        this.elements.header.classList.add('header');
        this.elements.input.classList.add('tablet__input');
        this.elements.keysContainer.classList.add('tablet__keyboard', 'keyboard');
        this.elements.footer.classList.add('footer');


        this.elements.header.appendChild(this.createHeader());
        this.elements.footer.appendChild(this.footerCreate());
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

        this.elements.main.appendChild(this.elements.screen);
        this.elements.screen.appendChild(this.elements.header);
        this.elements.screen.appendChild(this.elements.input);
        this.elements.screen.appendChild(this.elements.keysContainer);
        this.elements.screen.appendChild(this.elements.footer);
        document.body.appendChild(this.elements.main);

        this.open(this.elements.input.value, (currentValue) => {
            this.elements.input.value = currentValue;
        });




        window.addEventListener('keydown', (evt) => {
            this.elements.keys.forEach((key) => {
                if (evt.code === key.dataset.code && evt.code !== 'ShiftLeft' && evt.code !== 'ShiftRight') {
                    key.classList.add('keyboard__key--down-key');
                    key.click();
                    setTimeout(() => key.classList.remove('keyboard__key--down-key'), 200);
                }
            });

            if (evt.code === 'ShiftLeft' || evt.code === 'ShiftRight') {
                if (evt.code === 'ShiftLeft') {
                    this.elements.keys[41].classList.add('keyboard__key--option-key');
                } else {
                    this.elements.keys[52].classList.add('keyboard__key--option-key');
                }
                this.toggleShift();
            }

            if (evt.code === 'AltLeft' || evt.code === 'AltRight') {
                this.properties.alt = true;
                this.elements.keys[55].classList.toggle('keyboard__key--option-key');
            }

            if (evt.code === 'AltRight') {
                this.properties.alt = true;
                this.elements.keys[57].classList.toggle('keyboard__key--option-key');
            }

            if (evt.code === 'ControlLeft' && this.properties.alt === true) {
                this.toggleLang();
                console.log('switch_lang');
            }


        });

        window.addEventListener('keyup', (evt) => {
            if (evt.code === 'ShiftLeft' || evt.code === 'ShiftRight') {
                if (evt.code === 'ShiftLeft') {
                    this.elements.keys[41].classList.remove('keyboard__key--option-key');
                } else {
                    this.elements.keys[52].classList.remove('keyboard__key--option-key');
                }
                this.toggleShift();
            }
            if (evt.code === 'AltLeft') {
                this.properties.alt = false;
                this.elements.keys[55].classList.toggle('keyboard__key--option-key');
            }
            if (evt.code === 'AltRight') {
                this.properties.alt = false;
                this.elements.keys[57].classList.toggle('keyboard__key--option-key');
            }


        });
    },


    createHeader() {
        let teg = document.createElement('p');
        teg.innerHTML = 'Виртуальная клавиатура';
        return teg;
    },

    footerCreate() {
        let teg = document.createElement('p');
        teg.innerHTML = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левый Atl + левый Ctrl';
        return teg;
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const currentLang = (this.properties.lang === 'eng') ? this.keys.engLower : this.keys.rusLower;

        currentLang.forEach((key, index) => {
            const keyElement = document.createElement('button');

            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');
            keyElement.dataset.code = this.keys.code[index];

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--backspace');

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'tab':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--tab');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '    ';
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'capslock':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--capslock');

                    keyElement.addEventListener('click', () => {
                        this.toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
                    });
                    break;

                case 'return':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'shift-left':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--shift');

                    keyElement.addEventListener('mousedown', () => {
                        this.toggleShift();
                    });
                    keyElement.addEventListener('mouseup', () => {
                        if (this.properties.shift) {
                            this.toggleShift();
                        }
                    });

                    break;

                case 'shift-right':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--shift');

                    keyElement.addEventListener('mousedown', () => {
                        this.toggleShift();
                    });
                    keyElement.addEventListener('mouseup', () => {
                        this.toggleShift();
                    });

                    break;

                case 'ctrl':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--ctrl');
                    keyElement.textContent = 'ctrl';
                    break;

                case 'alt-left':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--alt');
                    keyElement.textContent = 'alt';
                    break;

                case 'alt-right':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--alt');
                    keyElement.textContent = 'alt';
                    break;

                case 'cmd-left':
                    keyElement.classList.add('keyboard__key--option', 'keyboard__key--cmd');
                    break;


                case 'space':
                    keyElement.classList.add('keyboard__key--space');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'left':
                    keyElement.classList.add('keyboard__key-arrow', 'keyboard__key-arrow--left');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '←';
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'up':
                    keyElement.classList.add('keyboard__key-arrow', 'keyboard__key-arrow--up');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '↑';
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'down':
                    keyElement.classList.add('keyboard__key-arrow', 'keyboard__key-arrow--down');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '↓';
                        this.triggerEvent('oninput');
                    });
                    break;

                case 'rigth':
                    keyElement.classList.add('keyboard__key-arrow', 'keyboard__key-arrow--right');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '→';
                        this.triggerEvent('oninput');
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        if (this.properties.lang === 'eng') {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        } else {
                            this.properties.value += this.properties.capsLock ? this.keys.rusLower[index].toUpperCase() : this.keys.rusLower[index].toLowerCase();
                        }
                        this.triggerEvent('oninput');

                    });
                    break;
            }
            fragment.appendChild(keyElement);
        });
        return fragment;
    },

    triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] === 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        this.elements.keys.forEach((key) => {
            if (!key.classList.contains('keyboard__key--option')) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        });
    },

    toggleShift() {
        this.properties.shift = !this.properties.shift;

        this.elements.keys.forEach((key, index) => {
            if (!key.classList.contains('keyboard__key--option')) {
                if (!this.properties.capsLock) {
                    key.textContent = this.properties.shift ? this.keys.engUpper[index] : this.keys.engLower[index];
                } else {
                    key.textContent = this.properties.shift ? this.keys.engUpper[index].toUpperCase() : this.keys.engLower[index].toUpperCase();
                }
            }
        });
    },


    toggleLang() {
        this.properties.lang = this.properties.lang === 'eng' ? 'rus' : 'eng';
        window.localStorage.setItem('lang', this.properties.lang);

        this.elements.keys.forEach((key, index) => {
            if (!key.classList.contains('keyboard__key--option')) {
                key.textContent = (this.properties.lang === 'eng') ? this.keys.engLower[index] : this.keys.rusLower[index];
            }
        });
    },

    initLang() {
        if (window.localStorage.getItem('lang')) {
            this.properties.lang = window.localStorage.getItem('lang');
        }
    },

    keys: {
        code: [
            'IntlBackslash', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
            'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
            'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
            'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
            'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'
        ],

        engLower: [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/',
            'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'return',
            'shift-left', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift-right',
            'ctrl', 'cmd-left', 'alt-left', 'space', 'alt-right', 'ctrl', 'left', 'up', 'down', 'rigth'
        ],

        engUpper: [
            '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
            'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
            'capslock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'return',
            'shift-left', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift-right',
            'ctrl', 'cmd-left', 'alt-left', 'space', 'alt-right', 'ctrl', 'left', 'up', 'down', 'rigth'
        ],

        rusLower: [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/',
            'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'return',
            'shift-left', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift-right',
            'ctrl', 'cmd-left', 'alt-left', 'space', 'alt-right', 'ctrl', 'left', 'up', 'down', 'rigth'
        ],

        rusUpper: [
            'Ё', '!', '"', '№', '%', ':', ',', '.', ';', '(', ')', '_', '+', 'backspace',
            'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Ё',
            'capslock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'return',
            'shift-left', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '?', 'shift-right',
            'ctrl', 'cmd-left', 'alt-left', 'space', 'alt-right', 'ctrl', 'left', 'up', 'down', 'rigth'
        ]
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue;
        this.eventHandlers.oninput = oninput;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
});
