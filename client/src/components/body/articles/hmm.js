import { Grid } from '@material-ui/core';
import Categories from './Categories';
import Articles from './Articles'
function hmm() {

    return (
        <>
             <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Articles />
                </Grid>
            </Grid>
        </>
    )
}

export default hmm