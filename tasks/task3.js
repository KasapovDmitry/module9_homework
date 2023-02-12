// Задание 3.
// Напишите код приложения, интерфейс которого представляет собой input и кнопку...
function startRequest(adr, num, callback) {

    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', `${adr}?limit=${num}`, true);
    
    xhr.onload = function() {
        if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
        } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
            callback(result);
        }
        }
    };
    
    xhr.onerror = function() {
        alert('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
}

// Ищем ноду для вставки результата запроса
    const resultNode = document.querySelector('#result3');
function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);
    
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <div class="card-foto">
                <img
                src="${item.download_url}"
                class="card-image"
                />
            </div>
            <p>${item.author}</p>
        </div>
        `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}

function func3() {
    let inp3 = document.querySelector('.input3');
    let url = 'https://picsum.photos/v2/list';
    if (+inp3.value <= 0 || +inp3.value > 10) {
        endResult.innerHTML = "«число вне диапазона от 1 до 10»";
        inp3.value = '';
    } else {
        startRequest(url, +inp3.value,  displayResult);
        inp3.value = '';
    }

}

document.querySelector('.btn3').onclick = func3;