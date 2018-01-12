import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Frame from 'frame/Frame';

import 'semantic-ui-css/semantic.min.css';
// require('semantic/dist/semantic.min.js');

import 'semantic/dist/components/dropdown.min.js'

$.ajaxSetup({
    xhrFields: {withCredentials: true}
});

ReactDOM.render(
    <Router>
        <Route path="/" component={Frame}/>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
