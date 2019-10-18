import React from 'react';

export default function DefaultComponent({ greeting }) {
  return <div>{greeting}</div>;
}
DefaultComponent.someStatic = 'test';

export function ComponentTwo({ greeting }) {
  return <div>{greeting}</div>;
}

export function ComponentThree({ greeting, name = 'you' }) {
  return (
    <div>
      {greeting}, {name}!
    </div>
  );
}

export class ClassComponent {
  render() {
    return <div>{this.props.greeting}</div>;
  }
}

export function nonComponentFunc(greeting = '') {
  return `${greeting} I work too`.trim();
}
