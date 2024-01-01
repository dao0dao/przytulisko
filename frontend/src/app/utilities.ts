import { isDevMode } from '@angular/core';

export const svgLink = 'assets/vectors.svg#';

export const apiLink = () => {
  if (isDevMode()) {
    return 'http://localhost:3000/api/';
  } else {
    return window.location.origin + '/api/';
  }
};
