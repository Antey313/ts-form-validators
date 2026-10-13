import { IValidator, IErrorProvider } from './interfaces';

/**
 * Валидатор проверки на пустую строку.
 */
export class RequiredValidator implements IValidator<string>, IErrorProvider {
  private message: string;

  constructor(message: string = 'Поле обязательно для заполнения') {
    this.message = message;
  }

  validate(value: string): boolean {
    return value !== undefined && value !== null && value.trim().length > 0;
  }

  getErrorMessage(): string {
    return this.message;
  }
}

/**
 * Валидатор минимальной длины.
 */
export class MinLengthValidator implements IValidator<string>, IErrorProvider {
  private message: string;
  private minLength: number;

  constructor(minLength: number, message?: string) {
    this.minLength = minLength;
    this.message = message || `Минимальная длина: ${minLength}`;
  }

  validate(value: string): boolean {
    // Если значение пустое, пропускаем (ответственность RequiredValidator)
    if (!value) return true;
    return value.length >= this.minLength;
  }

  getErrorMessage(): string {
    return this.message;
  }
}

/**
 * Валидатор Email.
 */
export class EmailValidator implements IValidator<string>, IErrorProvider {
  private message: string;
  private regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(message: string = 'Некорректный email адрес') {
    this.message = message;
  }

  validate(value: string): boolean {
    if (!value) return true;
    return this.regex.test(value);
  }

  getErrorMessage(): string {
    return this.message;
  }
}
