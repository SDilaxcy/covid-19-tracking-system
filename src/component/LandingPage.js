import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import EnhancedTable from './ui/Tabel';
import { Alert } from 'antd';
import VC from './assets/vc.png';
import { isAuthenticated } from '../auth';
import {
  getAllVaccine,
  getAllapplyVaccine,
  deleteApplyVaccines,
} from './core/apiCors';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '12em',
    height: '10em',
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.UIOrnage,
    height: 50,
    width: 225,
    fontSize: '1.25em',
    marginTop: '5em',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  message: {
    border: `2px solid ${theme.palette.common.UIBlue}`,
    marginTop: '5em',
    borderRadius: 5,
  },
  specialText: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '1.5rem',
    color: theme.palette.common.UIOrnage,
  },
  revolutionCard: {
    width: '15em',
    height: '12em',
    marginBottom: '3em',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [vaccines, setVaccines] = useState([]);
  const [applyVaccine, setApplyVaccine] = useState([]);

  const [addError, setAddError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const { data } = isAuthenticated();

  const loadVaccines = () => {
    getAllVaccine().then((data) => {
      if (data.message) {
        console.log(data.message);
      } else {
        setVaccines(data.data.vaccine);
      }
    });
  };

  const loadApplyVaccines = () => {
    getAllapplyVaccine().then((data) => {
      if (data.message) {
        console.log(data.message);
      } else {
        setApplyVaccine(data.data.applyVaccine);
      }
    });
  };

  useEffect(() => {
    loadVaccines();
    loadApplyVaccines();
  }, []);

  const deleteApplyVaccine = (id, token) => {
    deleteApplyVaccines(id, token).then((data) => {
      if (data.message) {
        console.log(data.error);
      } else {
        loadApplyVaccines();
        setAddError(true);
        setDeleteMessage('delete vaccine Success');
        setTimeout(() => {
          setAddError(false);
          setDeleteMessage('');
        }, 2000);
      }
    });
  };

  return (
    <Grid container direction='column'>
      <Grid
        item
        container
        direction='column'
        alignItems='left'
        justifyContent='space-around'
      >
        <Grid item style={{ marginLeft: '2em', marginTop: '-1em' }}>
          <Typography variant='subtitle2'>
            Welcome {data.user.firstname}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={matchesMD ? 'column' : 'row'}
        alignItems='center'
        justifyContent='space-around'
      >
        {vaccines.length !== 0 &&
          vaccines.map((data, index) => {
            if (index < 5) {
              return (
                <Grid
                  key={index}
                  item
                  style={{
                    marginTop: '2em',
                    marginLeft: matchesMD ? 0 : '5em',
                  }}
                >
                  <Grid
                    container
                    style={{ height: '4em', marginBottom: '5em' }}
                    justify='center'
                    alignItems='center'
                  >
                    <Card className={classes.revolutionCard}>
                      <CardContent>
                        <Grid
                          container
                          direction='column'
                          alignItems='center'
                          style={{ textAlign: 'center' }}
                        >
                          <Grid item style={{ width: '4em' }}>
                            <img
                              alt='vaccine'
                              src={VC}
                              style={{ height: '100%', width: '100%' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant='h4' gutterBottom>
                              {data.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='subtitle1'>
                              {data.quantity}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              );
            }
          })}
      </Grid>
      <Grid item justify='center' alignItems='center' style={{ margin: '5em' }}>
        {addError && <Alert message={deleteMessage} type='success' />}
        <EnhancedTable
          applyVaccine={applyVaccine}
          deleteApplyVaccine={deleteApplyVaccine}
        />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
