import i18n from 'src/i18n';
import * as React from 'react';
import Button from 'src/component/Common/Button';

import './index.scss';

interface IProps {
  onCheck(): void;
}

const TreeTool: React.FC<IProps> = (props: IProps) => {
  const { onCheck } = props;
  return <div>
    <Button label={i18n('jurisdiction.toggleCheckbox')} onClick={onCheck}/>
  </div>;
};

export default TreeTool;
