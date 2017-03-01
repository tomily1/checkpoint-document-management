import * as types from './actionTypes';

export function createDocuments(document) {
  return { type: types.CREATE_DOCUMENT, document };
}
