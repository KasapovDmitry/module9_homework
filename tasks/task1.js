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