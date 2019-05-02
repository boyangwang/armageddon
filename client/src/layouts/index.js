import { Typography } from 'antd';
import React, { Fragment } from 'react';

import './index.less';

function BasicLayout(props) {
  const { children } = props;

  return (
    <Fragment>
      <Typography.Title>Armageddon</Typography.Title>
      <Typography.Text>Cutoff 6am. Showing list of </Typography.Text>
      {children}
    </Fragment>
  );
}

export default BasicLayout;
