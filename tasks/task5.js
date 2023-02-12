// Задание 5.
// Напишите код приложения, интерфейс которого представляет 2 input и кнопку submit...
//  https://picsum.photos/v2/list?page=5&limit=7

let endResult5 = document.getElementById('result5');

function func5() {
    let inp51 = document.querySelector('.input51');
    let inp52 = document.querySelector('.input52');
    let urlBase = ' https://picsum.photos/v2/list';
    if (!validateInput5()) {
        endResult5.innerHTML = "«Одно из чисел вне диапазона от 1 до 10»";
        inp51.value = '';
        inp52.value = '';
    } else {
        let requestURL = formatURL(urlBase);
        startRequest5(requestURL);
        inp51.value = '';
        inp52.value = '';
    }

    function formatURL(str) {
        let url = new URL(str);
        url.searchParams.set("page", inp51.value);
        url.searchParams.set("limit", inp52.value);
        console.log(url);
        return url;
    }

    function startRequest5(url) {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayResult5(data);
            })
    }

    function displayResult5(data) {
        let cards = '';
        // console.log('start cards', cards);
        
        data.forEach(item => {
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
        endResult5.innerHTML = cards;
    }

    function validateInput5() {
        let validated = true;
        if (+inp51.value <= 0 || isNaN(+inp51.value) || +inp51.value > 10) validated = false;
        if (+inp52.value <= 0 || isNaN(+inp52.value) || +inp51.value > 10) validated = false;
        return validated;
    }
}

document.querySelector('.btn5').onclick = func5;
