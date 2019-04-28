import { Typography } from 'antd';

import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <Typography.Title>Armageddon</Typography.Title>
      <Typography.Text>Cutoff 6am. Showing list of </Typography.Text>
      {props.children}
    </div>
  );
}

export default BasicLayout;
