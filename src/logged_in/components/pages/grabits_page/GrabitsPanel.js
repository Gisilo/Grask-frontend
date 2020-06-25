import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import GrabitCard from '../../GrabitCard';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { GET_ALL_GRABITS_QUERY } from '../../../../common/costants/queries'
import NewGrabitCard from "../../NewGrabitCard";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles({
    root: {
        marginTop: 20,
        paddingLeft: "20px",
        paddingRight: "20px",
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 30,
        bottom: 30,
        left: 'auto',
        position: 'fixed',
    }
});

export function GrabitsPanel(props) {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_ALL_GRABITS_QUERY);

    if (loading) return <LinearProgress color="secondary" />
    if (error) return `Error! ${error.message}`;

    return (
        <>
        <Grid container justify="center" className={classes.root}>
            {/*<Grid item xs={12} sm={6} md={3}>*/}
            {/*    <NewGrabitCard*/}
            {/*        createTab={props.createTab}*/}
            {/*    />*/}
            {/*</Grid>*/}
            {
                data.allGrabits.edges.map(
                    (item, i) => {
                        const node = item.node;
                        return (
                            <Grid key={node.id} item xs={12} sm={6} md={3}>
                                <GrabitCard
                                    grabitID={node.id}
                                    grabitName={node.nameProject}
                                    description={node.description}
                                    updateDate={node.updateDate}
                                    createTab={props.createTab}
                                />
                            </Grid>
                        );
                    })
            }
        </Grid>
        <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={() => console.log("floating action button clicked")}
        >
            <AddIcon />
        </Fab>
        </>
    );
}