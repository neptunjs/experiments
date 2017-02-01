'use strict';

import React, {Component} from 'react';
import ReactTable from 'react-table';
import ParallelCoordinates from 'react-parallel-coordinates';

class ReactTablePC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLine: []
        };

        this.onLineSelected = this.onLineSelected.bind(this);
    }

    onLineSelected (row) {
        this.setState({
            activeLine: [row.properties]
        });
    }

    render () {
        const data = this.props.data;
        const columns = this.props.columns;
        const parData = data.map(this.props.PCMap);
        return (
            <div>
                <ReactTable
                    className="-highlight"
                    data={data}
                    columns={columns}
                    defaultPageSize={4}
                    showPagination={true}
                    onTrClick={this.onLineSelected}
                />
                <ParallelCoordinates
                    width={1200}
                    height={300}
                    dimensions={this.props.dimensions}
                    data={parData}
                    dataHighlighted={this.state.activeLine}
                    colour={color}
                    onBrush_extents={noop}
                    onBrushEnd_extents={noop}
                    onBrushEnd_data={noop}
                    onLineHover={noop}
                />
            </div>
        );
    }
}

const color = () => 'red';

function noop () {};

export default ReactTablePC;