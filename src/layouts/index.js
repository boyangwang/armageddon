import { Typography } from 'antd';
import { Fragment } from 'react';

function BasicLayout(props) {
  return (
    <Fragment>
      <Typography.Title>Armageddon</Typography.Title>
      <Typography.Text>Cutoff 6am. Showing list of </Typography.Text>
      {props.children}
    </Fragment>
  );
}

export default BasicLayout;
