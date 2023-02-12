// Задание 1.
// написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

// Создание экземпляра класса DOMParser.
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// Получение всех "student"
const newStudent = xmlDOM.querySelectorAll("student");

// Создаем "технический" массив
const newArray = [];
// Функция-парсер получает данные каждого элемента / переводит в объект / добавляет в массив
function createStudentData(student, id) {
    // получает данные каждого элемента
    const newId = id;
    const nameStudent = student.querySelector("name");
    const firstStudent = nameStudent.querySelector("first");
    const secondStudent = nameStudent.querySelector("second");
    const ageStudent = student.querySelector("age");
    const profStudent = student.querySelector("prof");
    const langStudent = nameStudent.getAttribute('lang');
    // переводит в объект
    const result1 = {
        id: newId,
        name: firstStudent.textContent + ' ' + secondStudent.textContent,
        age: Number(ageStudent.textContent),
        prof: profStudent.textContent,
        lang: langStudent,
    };
    // добавляет в массив
    newArray.push(result1);
}

// Перебираем всех "student"
newStudent.forEach( (element, index) => {
    createStudentData(element, index);
});

// Создаем JS-объект и выводить его в консоль.
const newList1 = {
    list: newArray,
};
console.log(newList1);

// Выводим как текст на экран
function func1() {
    let endResult = document.getElementById('result1');
    endResult.innerHTML =  JSON.stringify(newList1);
}
document.querySelector('.btn1').onclick = func1;

// Задание 2.
// Написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

/* Этап 1. Подготовка данных */
// JSON, который мы будем парсить
const jsonString = `
{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;
/* Этап 2. Получение данных */
const data2 = JSON.parse(jsonString);
const list2 = data2.list;
// Создаем "технический" массив
const newArray2 = [];

// !!! Этого можно было и не делать. Просто добавил id и перевел age в number !!!
// Простое решение
// console.log(data2);
function createPersonData(person, id) {
    let result2 = {
        id: id,
        name: person.name,
        age: Number(person.age),
        prof: person.prof,
    };
    // добавляет в массив
    newArray2.push(result2);
}
// Перебираем "list"
list2.forEach( (element, index) => {
    createPersonData(element, index);
});
// Создаем JS-объект и выводить его в консоль.
const newList2 = {
    list: newArray2,
};
console.log(newList2);
// Выводим как текст на экран
function func2() {
    let endResult = document.getElementById('result2');
    endResult.innerHTML =  JSON.stringify(newList2);
}
document.querySelector('.btn2').onclick = func2;

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
            <div class="card-foto">
                <img
                src="${img}"
                class="card-image"
                />
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






