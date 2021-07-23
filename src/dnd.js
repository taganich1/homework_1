/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector("#homework-container");

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const newDiv = document.createElement("div");
    let width = (Math.random() * 100 + 50).toFixed();
    let height = (Math.random() * 100 + 50).toFixed();
    let color = "#" + Math.round(0xffffff * Math.random()).toString(16);
    let positionTop = Math.floor(Math.random() * 100);
    let positionLeft = Math.floor(Math.random() * 100);

    newDiv.style.width = width + "px";
    newDiv.style.height = height + "px";
    newDiv.style.backgroundColor = color;
    newDiv.style.position = "absolute";
    newDiv.style.left = positionLeft + "px";
    newDiv.style.top = positionTop + "px";

    newDiv.classList.add("draggable-div");

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener("mousedown", function (e) {
        let coords = getCoords(target);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        target.style.position = "absolute";
        moveAt(e);

        target.style.zIndex = 1000; // над другими элементами

        function moveAt(e) {
            target.style.left = e.pageX - shiftX + "px";
            target.style.top = e.pageY - shiftY + "px";
        }

        document.addEventListener("mousemove", function (e) {
            moveAt(e);
        });

        target.addEventListener("mouseup", function () {
            document.onmousemove = null;
            target.onmouseup = null;
        });
    });

    target.addEventListener("dragstart", function () {
        return false;
    });

    function getCoords(elem) {
        // кроме IE8-
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
        };
    }
}

let addDivButton = homeworkContainer.querySelector("#addDiv");

addDivButton.addEventListener("click", function () {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
