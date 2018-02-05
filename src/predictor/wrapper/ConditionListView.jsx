import { connect } from 'react-redux';
import { ConditionList } from '../../components';
import { addTemperatureValidate, addPressureValidate, addModelsValidate, addAdditivesValidate } from '../core/actions';

const mapStateToProps = state => ({
  allAdditives: state.allAdditives,
  allModels: state.allModels,
});

const mapDispatchToProps = dispatch => ({
    tempChange: (id, temp) => dispatch(addTemperatureValidate(id, temp)),
    pressChange: (id, press) => dispatch(addPressureValidate(id, press)),
    changeModels: (id, models) => dispatch(addModelsValidate(id, models)),
    changeAdditives: (id, additives) => dispatch(addAdditivesValidate(id, additives)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionList);
