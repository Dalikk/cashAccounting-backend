import { body } from 'express-validator';

export const operationCreateValidation = [
  body(
    'type',
    'Неверный тип операции. Допустимые типы: cash, credit, mobileBank.',
  ).matches(new RegExp(`^cash$|^credit$|^mobileBank$`)),
  body('value', 'Требуется число').isNumeric(),
];
