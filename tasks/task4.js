// Задание 4.
// Напишите код приложения, интерфейс которого представляет 2 input и кнопку submit...
// https://picsum.photos/150/200
let endResult4 = document.getElementById('result4');

function func4() {
    let inp41 = document.querySelector('.input41');
    let inp42 = document.querySelector('.input42');
    let url = 'https://picsum.photos/';
    if (!validateInput()) {
        endResult4.innerHTML = "«Одно из чисел вне диапазона от 100 до 300»";
        inp41.value = '';
        inp42.value = '';
    } else {
        let fetchURL = url + `${inp41.value}/${inp42.value}`;
        startRequest(fetchURL);
        inp41.value = '';
        inp42.value = '';
    }

    function startRequest(url) {
        fetch(url)
            .then(response => {
                displayResult4(response.url);
            })
    }

    function displayResult4(img) {
        endResult4.innerHTML = `
        <div class="card">
            <div class="card-foto">
                <img
                src="${img}"
                class="card-image"
                />
            </div>
        </div>
        `;
    }

    function validateInput() {
        let validated = true;
        if (inp41.value === "" || isNaN(+inp41.value)) validated = false;
        if (inp42.value === "" || isNaN(+inp42.value)) validated = false;
        return validated;
    }
}

document.querySelector('.btn4').onclick = func4;