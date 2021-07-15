/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let result = initial || array[0];

    for (let i = initial ? 0 : 1; i < array.length; i++) {
        let value = array[i];

        result = fn(result, value, i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let result = [];

    for (let key of Object.keys(obj)) {
        result.push(key.toUpperCase());
    }

    return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    if ((from === undefined && to === undefined) || (from === 0 && to === 0)) {
        return array;
    }
    const result = [];

    let __from = from;
    let __to = to;

    if (from === undefined) {
        __from = 0;
    }

    if (__from < 0) {
        __from = 0;
    }

    if (__from >= array.length) {
        return [];
    }
    if (to === undefined) {
        __to = array.length;
    }

    if (to < 0) {
        __to = array.length + to;
    }

    if (to > array.length) {
        __to = array.length;
    }

    for (let pos = __from; pos < __to; pos++) {
        result.push(array[pos]);
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    const handler = {
        set: function (obj, property, value) {
            return (obj[property] = value * value);
        },
    };

    return new Proxy(obj, handler);
}

export { forEach, map, reduce, upperProps, slice, createProxy };
