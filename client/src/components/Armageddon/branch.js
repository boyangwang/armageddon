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

  onReviewedChange = commits => {
    const { dispatch, repo } = this.props;
    dispatch({
      type: 'armageddon/review',
      payload: {
        repo,
        commits,
      },
    });
  };

  columns = repo => [
    {
      title: 'Commit',
      render: commit => {
        return <a href={getCommitLink(repo, commit)}>{commit.hash.substring(0, 8)}</a>;
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Message',
      dataIndex: 'message',
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      sorter: true,
      align: 'right',
      render: ts => u.timestampToStr(ts),
    },
    {
      title: 'Reviewed',
      dataIndex: 'reviewed',
      render: (r, commit) => (
        <Checkbox checked={r} onChange={() => this.onReviewedChange([commit])} />
      ),
    },
  ];

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
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
              onClick={() => this.onReviewedChange(selectedRows)}
            >
              Toggle reviewed
            </Button>
          </Col>
          <Col>
            <Button onClick={this.cleanSelectedKeys}>
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
