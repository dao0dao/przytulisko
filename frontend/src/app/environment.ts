import { isDevMode } from '@angular/core';

export const API_LINK = () => {
  if (isDevMode()) {
    return 'http://localhost:3000/api';
  } else {
    return location.toString() + 'api';
  }
};
