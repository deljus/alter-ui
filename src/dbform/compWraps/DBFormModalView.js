import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DBFormModal } from '../../components';
import { showModal } from '../core/actions';

const mapStateToProps = state => ({
  visible: state.modal.visible,
  id: state.modal.id,
  structures: state.structures,
});

const mapDispatchToProps = dispatch => ({
  onOk: () => dispatch({ type: 'MARVIN_MODAL_DISCARD' }),
  onCancel: () => dispatch(showModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DBFormModal);
