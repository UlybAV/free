console.log('start');

class FormatError extends SyntaxError {
  constructor (message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const error = new FormatError('ошибка формат');
console.log(`${error.message}
  ${error.name}
  ${error.stack}
  ${error instanceof SyntaxError}`);
