import { CompositeValidator } from './src/composite';
import { RequiredValidator, MinLengthValidator, EmailValidator } from './src/validators';

// Создаем композитный валидатор для поля Email
const emailFieldValidator = new CompositeValidator<string>()
  .add(new RequiredValidator('Email не может быть пустым'))
  .add(new MinLengthValidator(5, 'Email слишком короткий'))
  .add(new EmailValidator('Введите корректный email (example@domain.com)'));

// Тестируемые значения
const testValues = [
  '',                     // Пустая строка
  'abc',                  // Слишком короткая
  'invalid-email',        // Не email
  'test@example.com',     // Валидный
];

console.log('=== Тестирование библиотеки валидаторов ===\n');

testValues.forEach((value) => {
  const isValid = emailFieldValidator.validate(value);
  const status = isValid ? '✅ OK' : `❌ Ошибка: ${emailFieldValidator.getErrorMessage()}`;
  console.log(`Значение: "${value}" -> ${status}`);
});
