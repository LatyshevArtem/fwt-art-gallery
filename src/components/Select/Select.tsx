import { ChangeEventHandler, FC, useRef } from 'react';
import { useBoolean } from '@hooks/useBoolean';
import cn from 'classnames/bind';
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
  const [isOptionsListOpen, setIsOptionsListOpen] = useBoolean();

  const areOptionsSelected = selectedOptions.length !== 0;

  const removeOption = (option: Option) =>
    selectedOptions.filter((selectedOption) => selectedOption._id !== option._id);

  const removeSelectedOptionLabel = (option: Option) => () =>
    onChangeSelectedOptions(removeOption(option));

  const handleOptionCheckedChange = (option: Option) => {
    const handler: ChangeEventHandler<HTMLInputElement> = (event) => {
      const newSelectedOptions = event.target.checked
        ? [...selectedOptions, option]
        : removeOption(option);
      onChangeSelectedOptions(newSelectedOptions);
    };

    return handler;
  };

  const checkIsCheckboxChecked = (optionId: string) =>
    selectedOptions.findIndex((selectedOption) => selectedOption._id === optionId) !== -1;

  useOutsideClick(selectRef, setIsOptionsListOpen.off);

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
          onClick={setIsOptionsListOpen.toggle}
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
                  onChange={handleOptionCheckedChange(option)}
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
