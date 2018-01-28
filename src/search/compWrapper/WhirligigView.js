import { connect } from 'react-redux';
import { Whirligig } from '../../components';
import { URLS } from '../../config';

const mapStateToProps = () => ({
  buttonURL: [
    { name: 'Index page', url: URLS.INDEX },
    { name: 'Info', url: URLS.INFO },
    { name: 'Hisrory', url: URLS.HISTORY }],
});

export default connect(mapStateToProps)(Whirligig);
