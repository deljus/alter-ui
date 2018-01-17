import { connect } from 'react-redux';
import { Error } from '../../components';
import { succsessRequest } from '../core/actions';

const mapStateToProps = state => ({
  visible: state.request.error,
  message: state.request.errorText,
  lastAction: state.request.lastActions,
});

const mergeProps = (stateProps, dispatchProps) => {
  const { lastAction } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    refreshBtn: () => dispatch(lastAction),
    cancelBtn: () => dispatch(succsessRequest()),
  };
};

export default connect(mapStateToProps, null, mergeProps)(Error);
