import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DBFormModal } from '../../components/index';
import { showModal } from '../core/actions';

const mapStateToProps = state => ({
  visible: state.modal.visible,
  id: state.modal.id,
  structures: state.structures,
  condition: (state.settings && state.settings.condition) || {},
});

const mapDispatchToProps = dispatch => ({
  onOk: (id, data, params, condition) => dispatch({ type: 'MARVIN_MODAL_DISCARD', id, data, params, condition }),
  onCancel: () => dispatch(showModal(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DBFormModal);
