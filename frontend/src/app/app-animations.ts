import { trigger, transition, style, animate } from '@angular/animations';

export const appAnimations = [
  trigger('infoModal', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-50%) scale(0.2)' }),
      animate(
        '0.25s ease-in-out',
        style({ opacity: 1, transform: 'translateX(-50%)  scale(1)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '0.25s ease-in-out',
        style({ opacity: 0, transform: 'translateX(-50%) scale(0.2)' })
      ),
    ]),
  ]),
];
