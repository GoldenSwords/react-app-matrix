import * as React from 'react';
import classnames from 'classnames';
import './index.scss';
interface IProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange(val: boolean): void;
}

const Checkbox: React.FC<IProps> = (props: IProps) => {
  const { label, checked, disabled, onChange } = props;
  return <div className={classnames('common-checkbox', { disabled })}>
    <div className={classnames('checkbox', { checked })} onClick={() => onChange(!checked)}></div>
    <input type="checkbox" checked={checked} readOnly/>
    <div>{ label }</div>
  </div>;
};

export default Checkbox;
