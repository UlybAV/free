console.log('start');

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
