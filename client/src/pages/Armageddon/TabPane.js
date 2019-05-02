import { Tabs } from 'antd';
import Repo from '@/components/Armageddon/repo';
import React from 'react';

const TabPane = ({ repo, ...props }) => {
  return (
    <Tabs.TabPane
      forceRender
      key={repo.repoName}
      {...props}
    >
      <Repo repo={repo} />
    </Tabs.TabPane>
  );
};

export default TabPane;
