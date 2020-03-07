import {SET_FOOTER} from '../types';

export const setFooter = type => {
  return {
    type: SET_FOOTER,
    payload: type
  };
};