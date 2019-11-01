
// Task 1 ============================================
/* Создайте блок div-1. Добавьте на него событие touchstart. Выведите в out-1 слово touch если событие сработает. */

function t1() {

  document.querySelector('.out-1').innerHTML += `touch `;
}

document.querySelector('.div-1').addEventListener('touchstart', t1);
// ваше событие здесь!!!

// Task 2 ============================================
/* Создайте блок div-2. Добавьте на него событие touchstart. Выведите в out-2 число срабатываний события. */

let counter1 = 0;

function t2() {

  counter1++;
  document.querySelector('.out-2').innerHTML = `Событие сработало: ${counter1}`;
}

document.querySelector('.div-2').addEventListener('touchstart', t2);
// ваше событие здесь!!!


// Task 3 ============================================
/*  Создайте блок div-3_1 и div-3_2. Добавьте на них событие touchstart. Выведите в out-3 номер блока 1 или 2 на котором сработало событие. */

function t3(event) {

  document.querySelector('.out-3').innerHTML = `Событие сработало в ${event.target.innerHTML} блоке`;
}

document.querySelector('.div-3_1').addEventListener('touchstart', t3);
document.querySelector('.div-3_2').addEventListener('touchstart', t3);
// ваше событие здесь!!!


// Task 4 ============================================
/*  Создайте блок div-4. И кнопку b-4. При нажатии кнопки - добавляйте событие ontouchstart на блок div-4. При событии происходит вывод текста touch в out-4.  */

function t4() {

  document.querySelector('.div-4').ontouchstart = function () {
    document.querySelector('.out-4').innerHTML += `touch `;
  }
}

document.querySelector('.b-4').onclick = t4;
// ваше событие здесь!!!

// Task 5 ============================================
/*  Дана кнопка b-5. При ее нажатии очищайте событие ontouchstart на блоке div-4. */

function t5() {

  document.querySelector('.div-4').ontouchstart = null;
}

document.querySelector('.b-5').onclick = t5;
// ваше событие здесь!!!

// Task 6 ============================================
/*  Добавьте событие ontouchend на div-4. При его срабатывании выведите в out-6 слово touchend. */

function t6() {

  document.querySelector('.div-4').ontouchend = function () {
    document.querySelector('.out-6').innerHTML += `touchend `;
  }
}

t6();
// ваше событие здесь!!!


// Task 7 ============================================
/*  Дан блок div-7. Добавьте событие touch, при срабатывании которого окрашивайте блок в красный цвет. */

function t7(event) {

  document.querySelector('.div-7').style.backgroundColor = 'red';
}

document.querySelector('.div-7').addEventListener('touchstart', t7);
// ваше событие здесь!!!

// Task 8 ============================================
/*  Дан блок div-8. Добавьте на него событие touch, которое при срабатывании окрашивает блок случаным цветом из массива a8=[red, green, blue, orange, pink, yellow] */


function t8() {

  const a8 = ['red', 'green', 'blue', 'orange', 'pink', 'yellow'];

  let color = a8[Math.floor(a8.length * Math.random())];
  document.querySelector('.div-8').style.backgroundColor = color;
}

document.querySelector('.div-8').addEventListener('touchstart', t8);
// ваше событие здесь!!!


// Task 9 ============================================
/* Дан блок div-9. Добавьте событие ontouch. Выводите количество одновременных касаний в out-9. */

function t9(event) {

  document.querySelector('.out-9').innerHTML = `Количество косаний: ${event.touches.length}`;
}

document.querySelector('.div-9').ontouchstart = t9;
// ваше событие здесь!!!


// Task 10 ============================================
/*  Дан блок div-10. Добавьте на него событие touchmove. При срабатывании события - увеличивайте его ширину на 1. */

let width10 = 100;

function t10() {

  document.querySelector('.div-10').style.width = width10 + 'px';
  width10++;
}

document.querySelector('.div-10').addEventListener('touchmove', t10);
// ваше событие здесь!!!

// Task 11 ============================================
/*  Дан блок div-11. Добавьте на него событие touch. При срабатывании выводите радиус события radiusX, radiusY. */

function t11(event) {

  document.querySelector('.out-11').innerHTML = `Радиус события radiusX: ${event.touches.item(0).radiusX} <br>`;
  document.querySelector('.out-11').innerHTML += `Радиус события radiusY: ${event.touches.item(0).radiusY}`;
}

document.querySelector('.div-11').addEventListener('touchstart', t11);

// ваше событие здесь!!!

// Task 12 ============================================
/*  Мини проект. Ознакомьтесь с версткой в задании 12. Добавьте touch события так, чтобы при клике на img-12-min картинка появлялась в блоке div-12-max. Если нажимается кнопка prev - то появляется изображение идущее перед текущим. Если нажимается кнопка next - то после текущего. Выбор изображений зациклен.  Изображение, которое сейчас дублируется в большом блоке должно выделяться классом .active-img. Добавьте кнопку reset для сброса состояния, когда выводится первое изображение. Все изображения и начальное состояние - выводится из массива a = [1.png, 2.png, 3.png, 4.png, 5.png, 6.png] - изображения находятся в папке img.
Усложните задачу - подумайте как в массиве сохранить информацию текст, которая будет выводиться если картинка активна. Сам текст можно сохранять в data-text при отрисовке изображения.
    Источник иконок https://www.iconfinder.com/iconsets/unigrid-phantom-halloween
*/

// const a = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

// let item = document.querySelectorAll(`.img-12-min`);

// console.log(item);

// for (let i = 0; i < item.length; i++) {

//   // console.log(item[i]);

//   item[i].onclick = function () {

//     console.log(item[i]);
//     // this.classList.add = 'active-img';
//   }
// }




// function t12() {

// }

// ваше событие здесь!!!


