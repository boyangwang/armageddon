import React, { PureComponent } from 'react';
import { Typography, Card, Col, Button, Checkbox, Icon, Row } from 'antd';
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
      title: 'Author',
      dataIndex: 'author',
      width: 180,
    },
    {
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

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows.map((c) => c.hash),
    });
  };

  render() {
    const { repo, branch } = this.props;
    const { selectedRows } = this.state;

    return (
      <Card bordered={false}>
        <Row type="flex" gutter={24} justify="start" align="middle" style={{ lineHeight: '48px' }}>
          <Col>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              Branch: {branch.branchName}
            </Typography.Title>
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
        </Row>
        <StandardTable
          selectedRows={selectedRows}
          data={{ list: R.propOr([], 'commits', branch), pagination: false }}
          columns={this.columns(repo)}
          onSelectRow={this.handleSelectRows}
          rowKey="hash"
        />
      </Card>
    );
  }
}

export default Branch;
