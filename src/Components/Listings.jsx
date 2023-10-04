import React, { useEffect, useState } from 'react';
import axios from 'axios';
// React Leaflet
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet'
import { Icon } from 'leaflet';

// Map icons
import houseIconPng from './Assets/Mapicons/house.png'
import apartmentIconPng from './Assets/Mapicons/apartment.png'
import officeIconPng from './Assets/Mapicons/office.png'

// import Mui
import { Grid, AppBar, Typography, Button, CardContent, CardMedia, CardHeader, Card } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// Assets
import myListings from './Assets/Data/Dummydata';

const Listngs = () => {
    const [allListings, setAllListings] = useState([])
    const [dataIsLoading, setDataIsLoading] = useState(true)
    useEffect(() => {
        const GetAllListings = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/listings/')
                setAllListings(response.data)
                setDataIsLoading(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        GetAllListings()
        return () => {
        }
    }, [])

    const houseIcon = new Icon({
        iconUrl: houseIconPng,
        iconSize: [40, 40]
    });

    const apartmentIcon = new Icon({
        iconUrl: apartmentIconPng,
        iconSize: [40, 40]
    });

    const officeIcon = new Icon({
        iconUrl: officeIconPng,
        iconSize: [40, 40]
    });
    const polyOne = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
    ]

    const polyGon = [
        [51.515, -0.09],
        [51.52, -0.1],
        [51.52, -0.12],
    ]

    if (dataIsLoading === true) {
        return (
            <Grid container justifyContent={"center"} alignItems={"center"} height={"100vh"}>
                <CircularProgress />
            </Grid>
        )
    }
    return (
        <Grid container>
            <Grid item xs={4}>
                {allListings.map((listing) => {
                    return (
                        <Card key={listing.id} sx={{
                            margin: "0.5rem",
                            border: "1px solid black",
                            position: "relative"
                        }}>
                            <CardHeader
                                title={listing.title}
                            />
                            <CardMedia
                                sx={{
                                    paddingRight: '1rem',
                                    paddingLeft: "1rem",
                                    height: "20rem",
                                    width: "30rem",
                                }}
                                component="img"
                                image={listing.picture1}
                                alt={listing.title}
                            />
                            <CardContent>
                                <Typography variant="body2" >
                                    {listing.description.substring(0, 200)}...
                                </Typography>
                            </CardContent>

                            {listing.property_status === "Sale" ? (
                                <Typography sx={{
                                    position: "absolute",
                                    backgroundColor: "green",
                                    zIndex: "1000",
                                    color: "white",
                                    top: "100px",
                                    left: "20px",
                                    padding: "5px"
                                }}>
                                    {listing.listing_type}
                                    ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </Typography>
                            ) : (
                                <Typography sx={{
                                    position: "absolute",
                                    backgroundColor: "green",
                                    zIndex: "1000",
                                    color: "white",
                                    top: "100px",
                                    left: "20px",
                                    padding: "5px"
                                }}>
                                    {listing.listing_type}
                                    ${listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{''} / {listing.rental_frequency}
                                </Typography>
                            )}
                            {/* <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions> */}
                        </Card>
                    )
                })}
            </Grid>
            <Grid item xs={8} sx={{ marginTop: "0.5rem" }}>
                <AppBar position='sticky'>
                    <div style={{ height: "100vh" }}>
                        <MapContainer center={[51.505, -0.09]} zoom={16} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmasdfp.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* <Polyline positions={polyOne} weight={10} color='green' />
                            <Polygon positions={polyGon} /> */}
                            {allListings.map((listing) => {
                                function IconDisplay() {
                                    if (listing.listing_type === "House") {
                                        return houseIcon
                                    } else if (listing.listing_type === "Apartment") {
                                        return apartmentIcon
                                    } else if (listing.listing_type === "Office") {
                                        return officeIcon
                                    }
                                }
                                return (
                                    <Marker key={listing.id} icon={IconDisplay()} position={[listing.latitude, listing.longitude]}>
                                        <Popup>
                                            <Typography variant='h5'>{listing.title}</Typography>
                                            <img src={listing.picture1} style={{ height: "14rem", width: "18rem" }} alt='icons' />
                                            <Typography variant='body1'>{listing.description.substring(0, 150)}</Typography>
                                            <Button variant='contained' fullWidth >Details</Button>
                                        </Popup>
                                    </Marker>
                                )
                            })}
                        </MapContainer>
                    </div>
                </AppBar>
            </Grid>
        </Grid>

    )
}
export default Listngs