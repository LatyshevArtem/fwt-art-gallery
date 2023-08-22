import { useState, FC } from 'react';
import cn from 'classnames/bind';
import TextButton from '@components/TextButton';
import { ReactComponent as ExpandIcon } from '@assets/icons/expand.svg';
import { getCropText } from './utils/getCropText';
import styles from './TextAccordion.module.scss';

const cx = cn.bind(styles);

interface AccordionProps {
  className?: string;
  isDarkTheme?: boolean;
  textClassName?: string;
  text: string;
  cropTextLength: number;
}

const Accordion: FC<AccordionProps> = ({
  className,
  isDarkTheme,
  textClassName,
  text,
  cropTextLength,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prevState) => !prevState);

  const croppedText = getCropText(text, cropTextLength);
  const outputText = isOpen ? `${croppedText}...` : text;

  return (
    <div className={cx(className, 'text-accordion')}>
      <p
        className={cx(textClassName, 'text-accordion__text', {
          'text-accordion__text--hidden': isOpen,
        })}
      >
        {outputText}
      </p>
      <TextButton
        className={cx('text-accordion__show-more-button', {
          'text-accordion__show-more-button--open': isOpen,
        })}
        isDarkTheme={isDarkTheme}
        isUnderlined
        onClick={toggleIsOpen}
      >
        <span>Read more</span>
        <ExpandIcon className={cx('show-more-button__icon')} />
      </TextButton>
    </div>
  );
};

export default Accordion;
