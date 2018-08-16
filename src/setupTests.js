import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// This is to configure the adaptor corresponding to the version of React used
// installed along with Enzyme

configure({ adapter: new Adapter() });
