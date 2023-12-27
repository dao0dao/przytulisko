import {
  animate,
  animateChild,
  query,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('container', [
    transition(':enter', [
      sequence([
        query(
          '@elementOne, @elementTwo, @elementThree, @elementFour',
          animateChild()
        ),
      ]),
    ]),
    transition(':leave', [
      sequence([
        query(
          '@elementOne, @elementTwo, @elementThree, @elementFour',
          animateChild()
        ),
        animate('0.1s', style({ display: 'none' })),
      ]),
    ]),
  ]),
  trigger('elementOne', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(-100%)' })),
    ]),
  ]),
  trigger('elementTwo', [
    transition(':enter', [
      style({ transform: 'translateY(-200%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(-200%)' })),
    ]),
  ]),
  trigger('elementThree', [
    transition(':enter', [
      style({ transform: 'translateY(-300%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(-300%)' })),
    ]),
  ]),
  trigger('elementFour', [
    transition(':enter', [
      style({ transform: 'translateY(-400%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(0%)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0%)' }),
      animate('0.25s ease-in-out', style({ transform: 'translateY(-400%)' })),
    ]),
  ]),
];
