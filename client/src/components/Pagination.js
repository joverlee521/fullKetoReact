import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Icon, IconButton, Button, withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const styles = {
    container: {
        marginBottom: 10
    },
    chevronBtn: {
        color: orange[900]
    },
    pageBtn: {
        color: orange[900],
        minWidth: 30,
        margin: "0px 10px"
    },
    activeBtn: {
        color: "#fff",
        backgroundColor: orange[700]
    }
};

class Pagination extends Component{
    constructor(props){
        super(props);
        this.state = {
            pages: 0,
            currentPage: 1
        }
    }

    componentDidMount(){
        this.setState({ pages: this.props.pages });
    }

    componentDidUpdate(prevProps){
        if(prevProps.pages !== this.props.pages){
            this.setState({ pages: this.props.pages, currentPage: 1 });
        }
    }

    createPageBtns = () => {
        const { classes } = this.props;
        const pageArray = [];
        for(let i = 0; i < this.state.pages; i++){
            pageArray.push(<Button key={ i + 1 } onClick={ () => this.clickPageNumber(i+1) } className={ classNames(classes.pageBtn, { [classes.activeBtn]: this.state.currentPage === i+1 }) }>{ i + 1 }</Button>);
        }
        return pageArray;
    }

    clickPageNumber = pageNumber => {
        this.props.changePage(pageNumber);
        this.setState({ currentPage: pageNumber });
    }

    clickChevrons = chevron => {
        if(chevron === "previous"){
            const newPage = this.state.currentPage - 1;
            this.props.changePage(newPage);
            this.setState({ currentPage: newPage });
        }
        else if(chevron === "next"){
            const newPage = this.state.currentPage + 1;
            this.props.changePage(newPage);
            this.setState({ currentPage: newPage });
        }
    }
    
    render(){
        const { classes } = this.props;
        return(
            <Grid container className={ classes.container } justify="center" alignItems="center" alignContent="center">
                { this.state.pages > 1 && 
                    <IconButton className={ classes.chevronBtn } onClick={ () => this.clickChevrons("previous") } aria-label="Previous page" disabled={ this.state.currentPage === 1 ? true : false }>
                        <Icon>chevron_left</Icon>
                    </IconButton> 
                }
                { this.createPageBtns() }
                { this.state.pages > 1 && 
                    <IconButton className={ classes.chevronBtn } onClick={ () => this.clickChevrons("next") } aria-label="Previous page" disabled={ this.state.currentPage === this.state.pages ? true : false }>
                        <Icon>chevron_right</Icon>
                    </IconButton> 
                }
            </Grid>
        );
    }
}

Pagination.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pagination);