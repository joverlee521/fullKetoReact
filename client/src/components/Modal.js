import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal, Paper, Grid, Icon, IconButton, Button, Typography, withStyles } from "@material-ui/core";
import { deepOrange, green, indigo } from "@material-ui/core/colors";

const styles = theme => ({
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    modalContent: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "75%",
        padding: "30px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "center",
        "&:focus": {
            outline: "none"
        },
        [theme.breakpoints.up("md")]: {
            width: "50%"
        }
    },
    closeBtn: { 
        fontSize: "0.8em",
        position: "absolute",
        top: 0,
        right: 0,
        "&:hover": {
            backgroundColor: "inherit"
        }
    },
    modalMessage: {
        padding: 10
    },
    modalBtn: {
        margin: 5, 
        padding: 0,
        width: "30%",
        color: "#fff",
        [theme.breakpoints.up("sm")]: {
            padding: 5
        }
    },
    btnContainer: {
        padding: "20px 0px",

    },
    firstBtn: {
        backgroundColor: deepOrange[600],
        "&:hover": {
            backgroundColor: deepOrange[900]
        }
    },
    secondBtn: {
        backgroundColor: green[600],
        "&:hover": {
            backgroundColor: green[900]
        }
    },
    bigCloseBtn: {
        backgroundColor: indigo[600],
        "&:hover": {
            backgroundColor: indigo[900]
        }
    }
});

class MyModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount(){
        this.setState({ open: this.props.open });
    }

    componentDidUpdate(prevProps){
        if(prevProps.open !== this.props.open){
            this.setState({ open: this.props.open });
        }
    }

    closeModal = () =>{
        this.setState({ open: false }, () => {
            if(this.props.close){
                this.props.close();
            }
        });
    }

    render(){
        const { classes, title, message, closeBtn } = this.props;
        return(
            <Modal open={ this.state.open } onClose={ this.closeModal } BackdropProps={{ className: classes.backdrop }}>
                <Paper className={ classes.modalContent }>
                    <Grid container item justify="center">
                        <Typography variant="h5" gutterBottom>{ title }</Typography>
                        <IconButton onClick={ this.closeModal } className={ classes.closeBtn }>
                            <Icon>clear</Icon>
                        </IconButton>
                    </Grid>
                    <Grid item className={ classes.modalMessage }>
                        <Typography variant="h6">{ message }</Typography>
                    </Grid> 
                    <Grid container item justify="space-evenly" className={ classes.btnContainer }>
                        { this.props.firstBtn && <Button variant="contained" className={ classNames(classes.modalBtn, classes.firstBtn) } onClick={ this.props.firstFunc }>{ this.props.firstBtn }</Button>}
                        { this.props.secondBtn && <Button variant="contained" className={ classNames(classes.modalBtn, classes.secondBtn) } onClick={ this.props.secondFunc }>{ this.props.secondBtn }</Button>}
                        <Button variant="contained" color="secondary" className={ classNames(classes.modalBtn, classes.bigCloseBtn) } onClick={ this.closeModal }>{ closeBtn }</Button>
                    </Grid>
                </Paper>
            </Modal>
        )
    }
}

MyModal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyModal);