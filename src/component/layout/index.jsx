import React from 'react';

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';

import './theme.css';
import './index.scss';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * 像这种需要将router的几个属性传入children有两种方法：
     * 1、{ this.props.children && React.cloneElement(this.props.children, {额外的props})}
     * 2、redux
     */
    render() {
        return (
            <div id="wrapper">
                <NavTop {...this.props} />
                <NavSide />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;