import { Layout, Typography } from 'antd';
import React from 'react';

import styles from './index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

function BasicLayout(props) {
  const { children } = props;

  return (
    <Layout className="layout">
      <Layout.Content style={{ padding: '48px' }}>
        <PageHeaderWrapper>
          <Typography.Title level={1} className={styles.pageTitle}>Armageddon</Typography.Title>
          <Typography.Text>Cutoff 6am. Showing list of </Typography.Text>
        </PageHeaderWrapper>
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default BasicLayout;
