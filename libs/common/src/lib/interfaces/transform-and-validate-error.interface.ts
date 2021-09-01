import { ValidationError } from 'class-validator';

export interface TransformAndValidateError extends Error {
  originalErrors: ValidationError[];
}
