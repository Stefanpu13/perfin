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
    }

    onDropdownSelect(event, eventKey) {
        this.props.onChangeSelectedSubcategory(eventKey);
    }

    isNotTotalsCategory(subcategory){
        return subcategory !== 'totals';
    }

    render() {
        var displayStyle = this.props.showSubcategoryInput ?
            '' : 'none';
        var styles = {display: displayStyle};
        return (
            <DropdownButton style={styles} title={this.props.selectedSubcategory} key={11}
                            id="statement-period-day-modal-dropdown"
                            onSelect={(event, eventKey) => this.onDropdownSelect(event, eventKey)}>
                {
                    this.props.category ? this.props.category.subcategories
                        .filter(this.isNotTotalsCategory)
                        .map((subcategory) => {
                            return <MenuItem eventKey={subcategory}
                                             key={subcategory}>
                                {subcategory}
                            </MenuItem>
                        }) : ''
                }
            </DropdownButton>
        )
    }
}