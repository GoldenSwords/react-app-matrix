import * as React from 'react';
import classnames from 'classnames';
import './index.scss';
interface IProps {
  label?: string;
  checked?: boolean;
  onChange(val: boolean): void;
}

const Checkbox: React.FC<IProps> = (props: IProps) => {
  const { label, checked, onChange } = props;
  return <div className="common-checkbox">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}/>
    <div>{ label }</div>
  </div>;
};

export default Checkbox;
