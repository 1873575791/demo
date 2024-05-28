import React from 'react'

class Dom extends React.Component {

    constructor() {
        super();
        console.log(this);
    }
    componentDidMount() {
        // console.log(this);
    }
    render() {
        return <div>dom</div>
    }
}

export default Dom;