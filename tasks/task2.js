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