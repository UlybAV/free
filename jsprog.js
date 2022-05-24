console.log('start');
/*
function work (a, b) {
  console.log('Func result = ', a + b); // произвольная функция или метод
}

function spy (func) {
  function wrap (...args) {
    wrap.cache.push(args);
    console.log('args = ', args);
    console.log('cache = ', wrap.cache);
    console.log('func = ', func);
    // const result = func(args[0], args[1]);
    return func.apply(this, args);
  }
  wrap.cache = [];

  return wrap;
}

work = spy(work);

work(1, 2); // 3
work(4, 5, 9, 10); // 9

console.log(work.cache);

for (const args of work.cache) {
  console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}
*/

// Декоратор для задержки вызова функции.
// Decorator for call delay function.

/*
function f (x) {
  console.log(x);
}

function delay (func, delay) {
  return function (...args) { setTimeout(() => func.apply(this, args), delay); };
}
// создаём обёртки
const f1000 = delay(f, 1000);
const f1500 = delay(f, 1500);

f1000('test 1000 ms'); // показывает "test" после 1000 мс
f1500('test 1500 ms'); // показывает "test" после 1500 мс
*/

// Ограничение последующих вызовов по интервалу времени.
// Limitations next calls by time interval.

/* Здесь не нравится, что при каждой попытке вызова проверяется условие
  Here i do not like, that here every try call, check condition.

function debounce (func, delay) {
  let prevCallTime;
  console.log(`First prevCallTime = ${prevCallTime}
    func = ${func}
    delay = ${delay}`);
  return function () {
    if (!prevCallTime || Date.now() > prevCallTime + delay) {
      prevCallTime = Date.now();
      console.log('prevCallTime = ', prevCallTime);
      func();
    }
  };
}
*/

/*
function debounce (func, interval) {
  let isClosed = false;

  console.log(`First isClosed = ${isClosed}
    func = ${func}
    Base interval = ${interval}`);

  return function () {
    if (isClosed) return;
    isClosed = true;
    console.log(`Base interval = ${interval}`);
    func();
    setTimeout( () => { isClosed = false; }, interval);
  };
}

const f = debounce( () => console.log('alert'), 1000 );

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => f(4), 1100); // выполняется
setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
*/

// Тормозящий декоратор.
// Throthling decorator.

function f(a) {
  console.log(a);
}

function throttle(func, interval) {
  console.log('interval = ', interval);
  let isClosedInterval = false;
  let stackFunc = function () {};
  return function (num) {
    console.log('arguments = ', arguments);
    if (isClosedInterval) {
      console.log('isClosed = ', isClosedInterval);
      stackFunc = func(num);
      return;
    }
    isClosedInterval = true;
    console.log('num = ', num);
    func(num);
    setTimeout( () => { isClosedInterval = false; }, interval);
  };
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
