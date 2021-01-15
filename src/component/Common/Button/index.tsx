import * as React from 'react';
import classnames from 'classnames';
import './index.scss';
interface IProps {
  label?: string;
  disabled?: boolean;
  onClick(): void;
}

const Button: React.FC<IProps> = (props: IProps) => {
  const { label, disabled, onClick } = props;
  return <div className={classnames('common-button', { disabled })} onClick={onClick}>
    <button>{ label }</button>
  </div>;
};

export default Button;
