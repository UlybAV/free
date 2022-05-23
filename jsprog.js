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

let f = debounce(() => console.log('alert'), 1000);

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => f(4), 1100); // выполняется
setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
