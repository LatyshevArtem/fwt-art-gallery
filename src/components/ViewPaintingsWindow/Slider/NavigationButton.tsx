import { FC } from 'react';

interface NavigationButtonProps {
  className: string;
  text: string;
}

const NavigationButton: FC<NavigationButtonProps> = ({ className, text }) => {
  return (
    <button className={className}>
      <span className="visually-hidden">{text}</span>
    </button>
  );
};

export default NavigationButton;
