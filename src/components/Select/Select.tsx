import { ChangeEventHandler, FC, useRef, useState } from 'react';
import cn from 'classnames/bind';
import { pushWithCopy } from '@utils/array';
import { useOutsideClick } from '@hooks/useOutsideClick';
import Label from '@components/Label';
import Checkbox from '@components/Checkbox';
import { ReactComponent as ExpandIcon } from '@assets/icons/expand.svg';
import styles from './Select.module.scss';

const cx = cn.bind(styles);

interface Option {
  _id: string;
  name: string;
}

interface SelectProps {
  className?: string;
  isDarkTheme?: boolean;
  options: Option[];
  selectedOptions: Option[];
  onChangeSelectedOptions: (selectedOptions: Option[]) => void;
}

const Select: FC<SelectProps> = ({
  className,
  isDarkTheme,
  options,
  selectedOptions,
  onChangeSelectedOptions,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false);

  const areOptionsSelected = selectedOptions.length !== 0;

  const closeOptionsList = () => setIsOptionsListOpen(false);
  const toggleIsOptionsListOpen = () => setIsOptionsListOpen((prevState) => !prevState);

  const addOptionWithCopy = (option: Option) => pushWithCopy(selectedOptions, option);
  const removeOptionWithCopy = (option: Option) =>
    selectedOptions.filter((selectedOption) => selectedOption._id !== option._id);

  const removeSelectedOptionLabel = (option: Option) => () => {
    const newSelectedOptions = removeOptionWithCopy(option);
    onChangeSelectedOptions(newSelectedOptions);
  };

  const handleSpecificOptionCheckedChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked, value } = event.target;
    const option = JSON.parse(value) as Option;
    const newSelectedOptions = checked ? addOptionWithCopy(option) : removeOptionWithCopy(option);
    onChangeSelectedOptions(newSelectedOptions);
  };

  const checkIsCheckboxChecked = (optionId: string) =>
    Boolean(selectedOptions.find((selectedOption) => selectedOption._id === optionId));

  useOutsideClick(selectRef, closeOptionsList);

  return (
    <div className={cx(className, 'select', { 'select--dark': isDarkTheme })} ref={selectRef}>
      <div
        className={cx('select__wrapper', {
          'select__wrapper--opened-options-list': isOptionsListOpen,
          'select__wrapper--dark': isDarkTheme,
        })}
      >
        <button
          className={cx('select__toggle-options-list-button')}
          onClick={toggleIsOptionsListOpen}
          type="button"
          aria-label={isOptionsListOpen ? 'Close options list' : 'Open options list'}
        />
        {areOptionsSelected && (
          <ul className={cx('select__selected-options')}>
            {selectedOptions.map((selectedOption) => (
              <li className={cx('select__selected-option')} key={selectedOption._id}>
                <Label
                  isDarkTheme={isDarkTheme}
                  controlLabel={`Remove ${selectedOption.name}`}
                  onControlClick={removeSelectedOptionLabel(selectedOption)}
                >
                  {selectedOption.name}
                </Label>
              </li>
            ))}
          </ul>
        )}
        <ExpandIcon
          className={cx('select__expand-icon', {
            'select__expand-icon--opened-options-list': isOptionsListOpen,
          })}
          aria-hidden
        />
      </div>
      <div className={cx('select__outline')} />
      {isOptionsListOpen && (
        <div
          className={cx('select__options-wrapper', {
            'select__options-wrapper--dark': isDarkTheme,
          })}
        >
          <ul className={cx('select__options')}>
            {options.map((option) => (
              <li key={option._id}>
                <Checkbox
                  className={cx('select__option', { 'select__option--dark': isDarkTheme })}
                  isDarkTheme={isDarkTheme}
                  onChange={handleSpecificOptionCheckedChange}
                  value={JSON.stringify(option)}
                  checked={checkIsCheckboxChecked(option._id)}
                >
                  <span
                    className={cx('select__option-name', {
                      'select__option-name--dark': isDarkTheme,
                    })}
                  >
                    {option.name}
                  </span>
                </Checkbox>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
