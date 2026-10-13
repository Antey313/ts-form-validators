import { IValidator, IErrorProvider } from './interfaces';

/**
 * Композитный валидатор, объединяющий несколько валидаторов в цепочку.
 * Принцип LSP: Он реализует тот же интерфейс IValidator, что и его компоненты.
 */
export class CompositeValidator<T = any> implements IValidator<T>, IErrorProvider {
  private validators: Array<IValidator<T> & Partial<IErrorProvider>> = [];
  private lastError: string = '';

  /**
   * Добавляет валидатор в цепочку.
   */
  add(validator: IValidator<T> & Partial<IErrorProvider>): this {
    this.validators.push(validator);
    return this;
  }

  /**
   * Запускает все валидаторы по порядку.
   * Если хотя бы один не пройден, возвращает false и сохраняет ошибку.
   */
  validate(value: T): boolean {
    this.lastError = '';
    
    for (const validator of this.validators) {
      if (!validator.validate(value)) {
        // Если валидатор умеет возвращать ошибку, сохраняем её
        if (validator.getErrorMessage) {
          this.lastError = validator.getErrorMessage();
        } else {
          this.lastError = 'Ошибка валидации';
        }
        return false;
      }
    }
    return true;
  }

  getErrorMessage(): string {
    return this.lastError;
  }
}
