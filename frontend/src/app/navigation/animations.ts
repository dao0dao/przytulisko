import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = [
  trigger('container', [
    transition(':enter', [
      style({ opacity: 0 }),
      group([
        query(
          '@elementOne, @elementTwo, @elementThree, @elementFour',
          animateChild()
        ),
        animate('0.25s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
    transition(':leave', [
      group([
        query(
          '@elementOne, @elementTwo, @elementThree, @elementFour',
          animateChild()
        ),
        animate('0.25s ease-in-out', style({ opacity: 0 })),
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
