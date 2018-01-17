import { connect } from 'react-redux';
import { modal as modalAction } from '../core/actions';
import { MarvinEditor } from '../../components';

const mapStateToProps = state => ({
  modal: state.modal,
});

const mergeProps = (stateProps, dispatchProps) => {
  const { modal } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    onCancel: () => dispatch(modalAction(false)),
    onOk: () => dispatch({ type: modal.typeAction }),
  };
};

export default connect(mapStateToProps, null, mergeProps)(MarvinEditor);
