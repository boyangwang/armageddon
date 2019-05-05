import React, { PureComponent, Fragment } from 'react';
import * as R from 'ramda';
import { connect } from 'dva';
import Branch from './branch';
import { sortBranches } from '@/utils/armageddon';

@connect(({ loading }) => ({
  loading: loading.effects['armageddon/fetch'],
}))
class Repo extends PureComponent {
  render() {
    const { repo } = this.props;
    const branches = R.propOr([], 'branches', repo);

    return (
      <Fragment>
        {sortBranches(branches).map((b) => (
          <Branch branch={b} repo={repo} key={b.branchName} />
        ))}
      </Fragment>
    );
  }
}

export default Repo;
