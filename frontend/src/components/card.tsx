import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Container, Grid, Link } from '@mui/material';

const getInitials = (name: string) => {

    if(!name) return 'A'

    const parts = name.split(" ")

    if (parts.length == 1) {
        return `${parts[0][0][0]}`
    }

    return `${parts[0][0][0]}${parts.slice(-1)[0][0]}`
}

interface ICard {
    title: string;
    description: string;
    website: string;
    country: string;
}

function RecipeReviewCard({ title, description, website, country }: ICard) {

    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], fontSize: 12 }} aria-label="recipe">
                        {getInitials(title)}
                    </Avatar>
                }
                title={title}
                action={
                    <Link title={website ? 'Open website' : 'No website'} href={website} color="inherit" target={'_blank'}>
                        <IconButton disabled={!website} aria-label="open website">
                            <OpenInBrowserIcon />
                        </IconButton>
                    </Link>
                }
            />
            <CardContent>
                <Container maxWidth="lg" sx={{ m: -1 }}>
                    <Grid container lexDirection={'column'} gap={1} spacing={1}>
                        <Grid item xs={12}> 
                            <LocationOnIcon color='inherit'/> {country}
                            {/* <Typography variant="body2" color="text.secondary">{country}</Typography> */}
                        </Grid>
                        <Grid item xs={12}> 
                            <Typography variant="body2" color="text.secondary">{description || 'No description.'}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    );
}

export { RecipeReviewCard }
