import React, { Component } from 'react'
import './PageButtonController.css';
import { getNumberOfPages } from '../../../utils';
import { FRONT_PAGE_URL, THEME_KEY, THEMES } from '../../../constants';
import getStoreInstance from '../../../Store';

export class PageButtonController extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageCount: 0,
            pageSelectedColor: '',
            pageUnselectedColor: '',
        }
    }

    async loadNumberOfPages() {
        const pageCount = await getNumberOfPages();
        this.setState({pageCount});
    }

    componentDidMount() {
        this.loadNumberOfPages();

        getStoreInstance().subscribe(THEME_KEY, this.themeChanged.bind(this));
        this.themeChanged(null, null, getStoreInstance().get(THEME_KEY));
    }

    themeChanged(key, oldValue, newValue) {
        const stylingInformation = THEMES[newValue].FRONT.PAGE_SELECTION;

        if (stylingInformation.SELECTED_COLOR) {
            this.setState({pageSelectedColor: stylingInformation.SELECTED_COLOR})
        }
        if (stylingInformation.UNSELECTED_COLOR) {
            this.setState({pageUnselectedColor: stylingInformation.UNSELECTED_COLOR})
        }
    }

    render() {
        const buttons = [];
        for (let i = 0; i < this.state.pageCount; i += 1) {
            buttons.push(
                <a href={`${FRONT_PAGE_URL}${i+1}`}>
                    <div
                        key={`pageButton${i}`}
                        className={"PageButton " + ((this.props.currentPage == (i + 1)) ? 'PageButton--selected' : 'PageButton--unselected')}
                        style={{
                            "backgroundColor": ((this.props.currentPage == (i + 1)) ? this.state.pageSelectedColor : this.state.pageUnselectedColor)
                        }}
                    >
                        {i + 1}
                    </div>
                </a>
            )
        }

        return (
            <div style={{"text-align": "center"}}>
                <div className="PageButtonsContainer">
                    {buttons}
                </div>
            </div>
        )
    }
}

export default PageButtonController
