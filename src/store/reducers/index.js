import { combineReducers } from 'redux';

import { createMovie } from './createMovie';
/*import { createGenre } from './createGenre';
import { createChoice } from './createChoice';
import { createTheBest } from './createTheBest';
import { createResult } from './createResult';*/
import { createDetail } from './createDetail';
/**
 * 
  createGenre: createGenre,
  createChoice: createChoice,
  createTheBest: createTheBest,
  createResult: createResult,
 */

export const Reducers = combineReducers({
  createMovie: createMovie,
  createDetail: createDetail
});
