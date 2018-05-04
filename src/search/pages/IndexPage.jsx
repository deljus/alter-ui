import React from 'react';
import { connect } from 'react-redux';
import { SearchInput } from '../../components';
import { URLS } from '../../config';

const mapStateToProps = () => ({
  buttonURL: [
    { name: 'Index page', url: URLS.INDEX },
    { name: 'Info', url: URLS.INFO },
    { name: 'Hisrory', url: URLS.HISTORY }],
});

const mapDispatchToProps = dispatch => ({
  drawStructure: () => dispatch({ type: 'DRAW_STRUCTURE' }),
  onSearchFormSubmit: cml => dispatch({ type: 'CREATE_TASK', cml }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
