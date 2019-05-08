import React, { PureComponent } from 'react';
import { Typography, Card, Col, Button, Checkbox, Icon, Row, Switch } from 'antd';
import StandardTable from '@/components/StandardTable';
import * as u from '@/utils/utils';
import { connect } from 'dva';
import * as R from 'ramda';
import { getCommitLink } from '@/utils/armageddon';

@connect(({ loading }) => ({
  loading: loading.effects['armageddon/fetch'],
}))
class Branch extends PureComponent {
  state = {
    selectedRows: [],
    isHidingReviewed: true,
  };

  onReviewedChange = async (commits) => {
    const { dispatch, repo } = this.props;

    const reviewCommits = commits.map((c) => {
      return {
        hash: c.hash,
        reviewed: !c.reviewed,
        reviewComment: '',
      };
    });

    await dispatch({
      type: 'armageddon/review',
      payload: {
        repo,
        commits: reviewCommits,
      },
    });
  };

  reviewAll = async () => {
    const { branch } = this.props;

    await this.onReviewedChange(branch.commits.filter((c) => !c.reviewed));
  };

  onReviewedChangeForSelectedRows = async (selectedRows) => {
    const { branch } = this.props;

    const commits = selectedRows.map((hash) => branch.commits.find((c) => c.hash === hash));

    await this.onReviewedChange(commits);
  };

  columns = (repo) => [
    {
      title: 'Commit',
      render: (commit) => {
        return <a href={getCommitLink(repo, commit)}>{commit.hash.substring(0, 8)}</a>;
      },
      width: 120,
    },
    {
      className: 'toggle-select',
      title: 'Author',
      dataIndex: 'author',
      width: 180,
    },
    {
      className: 'toggle-select',
      title: 'Time',
      dataIndex: 'timestamp',
      width: 160,
      render: (ts) => u.timestampToStr(ts),
    },
    // {
    //   title: 'Comment',
    //   dataIndex: 'reviewComment',
    // },
    {
      className: 'toggle-select',
      title: 'Message',
      dataIndex: 'message',
    },
    {
      title: 'Reviewed',
      dataIndex: 'reviewed',
      width: 48,
      align: 'right',
      render: (r, commit) => (
        <Checkbox checked={r} onChange={() => this.onReviewedChange([commit])} />
      ),
    },
  ];

  onHideReviewedSwitchChanged = (val) => {
    this.setState({
      isHidingReviewed: val,
    });
  };

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows.map((c) => c.hash),
    });
  };

  handleRowClick = () => (event) => {
    try {
      if (!event.target.matches('.toggle-select')) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.querySelector('.ant-table-selection-column .ant-checkbox-wrapper').click();
    } catch(e) {
      u.log("Error handlerowclick", e);
    }
  };

  render() {
    const { repo, branch } = this.props;
    const { selectedRows, isHidingReviewed } = this.state;

    const list = R.propOr([], 'commits', branch);
    const filteredList = !isHidingReviewed ? list : list.filter((c) => c.reviewed === false);

    return (
      <Card bordered={false}>
        <Row type="flex" gutter={24} justify="start" align="middle" style={{ lineHeight: '48px' }}>
          <Col>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              Branch: {branch.branchName}
            </Typography.Title>
          </Col>
          <Col>
            <Button type="primary" onClick={() => this.reviewAll()} icon="check">
              Review All
            </Button>
          </Col>
          <Col>
            <Button
              icon="fork"
              type="primary"
              disabled={selectedRows.length === 0}
              onClick={() => this.onReviewedChangeForSelectedRows(selectedRows)}
            >
              Toggle Reviewed
            </Button>
          </Col>
          <Col>
            <Button onClick={() => this.handleSelectRows([])}>
              <Icon type="stop" />
              &nbsp;Clear&nbsp;<Typography.Text strong>{selectedRows.length}</Typography.Text>
              &nbsp;Selected Rows
            </Button>
          </Col>
          <Col>
            <Switch
              checkedChildren="Hiding reviewed"
              unCheckedChildren="Showing all"
              defaultChecked
              onChange={this.onHideReviewedSwitchChanged}
            />
          </Col>
        </Row>
        <StandardTable
          selectedRows={selectedRows}
          data={{ list: filteredList, pagination: false }}
          columns={this.columns(repo)}
          onSelectRow={this.handleSelectRows}
          rowKey="hash"
          onRow={(record) => {
            return {
              onClick: this.handleRowClick(record)
            };
          }}
        />
      </Card>
    );
  }
}

export default Branch;
