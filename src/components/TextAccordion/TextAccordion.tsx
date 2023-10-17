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
  showMoreButtonText?: string;
  showLessButtonText?: string;
  text: string;
  cropTextLength: number;
}

const Accordion: FC<AccordionProps> = ({
  className,
  isDarkTheme,
  showMoreButtonText = 'Read more',
  showLessButtonText = 'Read less',
  text,
  cropTextLength,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((prevState) => !prevState);

  const croppedText = getCropText(text, cropTextLength);
  const outputText = isOpen ? text : `${croppedText}...`;

  const buttonOutputText = isOpen ? showLessButtonText : showMoreButtonText;

  return (
    <div className={cx(className, 'text-accordion')}>
      <p
        className={cx({
          'text-accordion__text--dark': isDarkTheme,
          'text-accordion__text--hidden': !isOpen,
        })}
      >
        {outputText}
      </p>
      <TextButton
        className={cx('text-accordion__toggle-button', {
          'text-accordion__toggle-button--less': isOpen,
        })}
        isDarkTheme={isDarkTheme}
        onClick={toggleIsOpen}
        isUnderlined
      >
        <span>{buttonOutputText}</span>
        <ExpandIcon className={cx('text-accordion__toggle-button-icon')} />
      </TextButton>
    </div>
  );
};

export default Accordion;
