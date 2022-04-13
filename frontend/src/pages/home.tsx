import React, { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { mainListItems } from './listItems';
import { BasicSelect } from '../components/select'
import { RecipeReviewCard } from '../components/card'
import { BasicPagination } from '../components/pagination'
import { Badge, Button, SelectChangeEvent } from '@mui/material';

import { api } from '../services/api'

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const [beers, setBeers] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(0);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChangeCategory = (event: SelectChangeEvent) => {
        const c = event.target.value as string === 'All' ? '' : event.target.value as string

        setPage(1)
        setCategory(c);
    };

    const handleChangePage = (_, page: number) => {
        setPage(page);
    };

    const getCategories = async () => {
        const c = await api.get('/category')

        setCategories(c.data)
    }

    const getBeers = async () => {
        const params: any = {
            category,
        }

        const queryString = Object.keys(params)
            .filter(key => params[key])
            .map(key => `${key}=${params[key]}`)
            .join('&');

        const beers = await api.get(`/beer?page=${page}&limit=10&${queryString}`)

        setTotalPages(Math.ceil(beers.data.totalBeers / limit))

        setBeers(beers.data.beers)
    }

    const getRandomBeers = async () => {
        const beers = await api.get('/beer/random')

        setBeers(beers.data)
    }

    useEffect(() => {
        getCategories()
        getRandomBeers()
    }, [])

    useEffect(() => {
        getBeers()
    }, [category, page])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Home
                        </Typography>
                        <Button variant="contained" color='success' onClick={() => getRandomBeers()}>Random beers</Button>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container flexDirection={'column'} gap={2} spacing={1}>

                            <Grid container flexDirection={'row'} spacing={1}>
                                <Grid item xs={4} sx={3} sm={4} md={4} lg={4} >
                                    <BasicSelect handleChange={handleChangeCategory} items={categories} value={category} label={"Category"} />
                                </Grid>
                            </Grid>

                            <Grid container flexDirection={'row'} spacing={1}>
                                {
                                    beers.map(beer => {
                                        return <Grid item xs={12} sx={12} sm={6} md={4} lg={3} >
                                            <RecipeReviewCard
                                                title={beer.name}
                                                description={beer.description}
                                                website={beer.website}
                                                country={beer.country}
                                            />
                                        </Grid>
                                    })
                                }
                            </Grid>
                            <Grid container justifyContent="center" flexDirection={'row'} spacing={1}>
                                <Grid item xs={4} sx={3} sm={4} md={4} lg={4} >
                                    <BasicPagination count={totalPages} page={page} onChange={handleChangePage} />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export { Dashboard }