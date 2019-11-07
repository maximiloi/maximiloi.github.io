
// Task 1 ============================================
/* Создайте блок div-1. Добавьте на него событие onclick. При срабатывании события  выводите в out-1 количество срабатываний события. В комментариях опишите результат. */
let out1 = 0;

function t1() {

  out1++;
  document.querySelector('.out-1').innerHTML = `Количество нажатий: ${out1}`;

}

document.querySelector('.div-1').onclick = t1;

// Срабатывает каждый раз даже на телефоне.

// ваше событие здесь!!!

// Task 2 ============================================
/* Создайте блок div-2. Добавьте на него событие ondblclick. При срабатывании события  выводите в out-2 количество срабатываний события. В комментариях опишите результат. */
let out2 = 0;

function t2() {

  out2++;
  document.querySelector('.out-2').innerHTML = `Количество двойных нажатий: ${out2}`;

}

document.querySelector('.div-2').ondblclick = t2;

// ваше событие здесь!!!


// Task 3 ============================================
/*  Создайте блок div-3. Добавьте на него событие onmousemove. При срабатывании события выводите в out-3 количество срабатываний события. В комментариях опишите результат. */

let out3 = 0;

function t3() {

  out3++;
  document.querySelector('.out-3').innerHTML = `mousemove сработало: ${out3} раза`;

}

document.querySelector('.div-3').onmousemove = t3;

// ваше событие здесь!!!


// Task 4 ============================================
/*  Создайте блок div-4. Добавьте на него событие oncontextmenu. При срабатывании события выводите в out-4 количество срабатываний события. В комментариях опишите результат. */

let out4 = 0;

function t4() {

  out4++;
  document.querySelector('.out-4').innerHTML = `context menu сработало: ${out4} раза`;

}

document.querySelector('.div-4').oncontextmenu = t4;

// ваше событие здесь!!!

// Task 5 ============================================
/*   Создайте блок div-5. Добавьте на него событие onmousedown. При срабатывании события выводите в out-5 количество срабатываний события. В комментариях опишите результат. */

let out5 = 0;

function t5() {

  out5++;
  document.querySelector('.out-5').innerHTML = `onmousedown сработало: ${out5} раза`;

}

document.querySelector('.div-5').onmousedown = t5;

// ваше событие здесь!!!

// Task 6 ============================================
/*  Создайте блок div-6. Добавьте на него событие onmouseenter. При срабатывании события выводите в out-6 количество срабатываний события. В комментариях опишите результат. */

let out6 = 0;

function t6() {

  out6++;
  document.querySelector('.out-6').innerHTML = `onmouseenter сработало: ${out6} раза`;

}

document.querySelector('.div-6').onmouseenter = t6;

// ваше событие здесь!!!


// Task 7 ============================================
/*   Создайте блок div-7. Добавьте на него событие onmouseleave. При срабатывании события выводите в out-7 количество срабатываний события. В комментариях опишите результат.*/

let out7 = 0;

function t7() {

  out7++;
  document.querySelector('.out-7').innerHTML = `onmouseleave сработало: ${out7} раза`;

}

document.querySelector('.div-7').onmouseleave = t7;

// ваше событие здесь!!!

// Task 8 ============================================
/*   Создайте блок div-8. Добавьте на него событие onmouseout. При срабатывании события выводите в out-8 количество срабатываний события. В комментариях опишите результат.*/

let out8 = 0;

function t8() {

  out8++;
  document.querySelector('.out-8').innerHTML = `onmouseout сработало: ${out8} раза`;

}

document.querySelector('.div-8').onmouseout = t8;

// ваше событие здесь!!!


// Task 9 ============================================
/* Создайте блок div-9. Добавьте на него событие onmouseover. При срабатывании события выводите в out-9 количество срабатываний события. В комментариях опишите результат. */

let out9 = 0;

function t9() {

  out9++;
  document.querySelector('.out-9').innerHTML = `onmouseover сработало: ${out9} раза`;

}

document.querySelector('.div-9').onmouseover = t9;

// ваше событие здесь!!!


// Task 10 ============================================
/*  Создайте блок div-10. Добавьте на него событие onmouseup. При срабатывании события выводите в out-10 количество срабатываний события. В комментариях опишите результат.*/

let out10 = 0;

function t10() {

  out10++;
  document.querySelector('.out-10').innerHTML = `onmouseup сработало: ${out10} раза`;

}

document.querySelector('.div-10').onmouseup = t10;





