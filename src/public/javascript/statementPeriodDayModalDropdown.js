/**
 * Created by stefan.uzunov on 4/21/2016.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {DropdownButton} from 'react-bootstrap'
import {MenuItem} from 'react-bootstrap'

export default class StatementPeriodDayModalDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSubcategory: 'other'
        };
    }

    onDropdownSelect(event, eventKey) {
        this.setState({selectedSubcategory: eventKey});
    }

    render() {
        var displayStyle = this.props.showSubcategoryInput ?
            '' : 'none';
        var styles = {display: displayStyle};
        return (
            <DropdownButton style={styles} title={this.state.selectedSubcategory} key={11}
                            id="statement-period-day-modal-dropdown"
                            onSelect={(event, eventKey) => this.onDropdownSelect(event, eventKey)}>
                {
                    this.props.category ? this.props.category.subcategories
                        .map((subcategory) => {
                            return <MenuItem eventKey={subcategory}
                                             key={subcategory}
                            >{subcategory}</MenuItem>
                        }) : ''
                }
            </DropdownButton>
        )
    }
}