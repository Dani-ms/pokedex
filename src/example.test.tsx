import { ReactNode } from "react";
import { render, fireEvent } from '@testing-library/react';

function Button(props: { className?: string, onClick?: () => void, children: ReactNode }) {
  return <button className={props.className} onClick={props.onClick}>{props.children}</button>
}

describe('Button component', () => {
  it('renders with correct text content', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('applies custom class name when provided', () => {
    const { container } = render(<Button className="custom-button">Click me</Button>);
    expect(container.firstChild).toHaveClass('custom-button');
  });
});