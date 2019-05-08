import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'dotenv/config';

Enzyme.configure({ adapter: new Adapter() });
