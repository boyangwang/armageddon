import { Layout, Typography } from 'antd';
import React from 'react';
import styles from './index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { timestampToStr } from '@/utils/utils';
import { findCutoffFromTs } from '@/utils/armageddon';

function BasicLayout(props) {
  const { children } = props;
  const now = Date.now();
  const nowStr = timestampToStr(now);
  const prevStr = findCutoffFromTs(now);

  return (
    <Layout className="layout">
      <Layout.Content style={{ padding: '48px' }}>
        <PageHeaderWrapper>
          <Typography.Title level={1} className={styles.pageTitle}>
            Armageddon
          </Typography.Title>
          <Typography.Paragraph>
            Showing list of commits from now <Typography.Text code>{nowStr}</Typography.Text> back
            to <Typography.Text code>{prevStr}</Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>Cutoff at 08:00 +800 time, 00:00 UTC time</Typography.Paragraph>
        </PageHeaderWrapper>
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default BasicLayout;
