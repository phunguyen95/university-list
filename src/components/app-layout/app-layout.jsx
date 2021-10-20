import React from 'react'
import {node} from 'prop-types';
import css from './app-layout.scss'
export default function AppLayout({children}) {
    return (
        <div className="rootLayout">
            <div className="backgroundImage" />
            <div className="layout">{children}</div>
        </div>
    )
}
AppLayout.propTypes = {
    children:node.isRequired,
}