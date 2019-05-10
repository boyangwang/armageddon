import { Layout, Typography } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { isAnyCommitUnreviewed } from '@/utils/armageddon';
import chaosStrikeIcon from '@/assets/Chaos-Strike-icon.png';

@connect(({ loading, armageddon }) => ({
  loading: loading.effects['armageddon/fetch'],
  armageddon,
}))
class BasicLayout extends PureComponent {
  render() {
    const { children, armageddon } = this.props;

    return (
      <Layout className="layout">
        <Layout.Content style={{ padding: '48px' }}>
          <PageHeaderWrapper>
            <Typography.Title level={1} className={styles.pageTitle}>
              Armageddon
              <img
                src={chaosStrikeIcon}
                alt="Rampage"
                className={
                  armageddon.repos.some((r) => isAnyCommitUnreviewed(r))
                    ? styles.chaosStrikeIconHidden
                    : styles.chaosStrikeIcon
                }
              />
            </Typography.Title>
          </PageHeaderWrapper>
          {children}
        </Layout.Content>
      </Layout>
    );
  }
}
export default BasicLayout;
