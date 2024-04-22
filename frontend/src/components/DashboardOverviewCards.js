import React from 'react';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook from Material-UI
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import BasicLineChart from "./LineGraph";
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';


export default function DashboardOverviewCards() {
    const theme = useTheme();
    return (
        <article className="card-area">
            <section className="card-row">
                <article className="card graph-card">
                    <h3>Total Available Funding</h3>
                    <small>Jan 21/2024 - Now</small>
                    <p className="card-title">4 426</p>
                    <section className="graph-area">
                        <BasicLineChart />
                    </section>
                </article>
                <article className="card-group">
                    <section style={{direction: 'flex', display: 'flex'}}>
                        <article className="card">
                            <section className='icon-area' style={{backgroundColor: theme.palette.primary.main}}>
                                <i> <PriceChangeIcon/> </i>
                                </section>
                            <h3>Available Funding</h3>
                            <big>R356k</big>
                        </article>
                        <article className="card">
                            <section className='icon-area' style={{backgroundColor: theme.palette.primary.main}}>
                                <i><CurrencyExchangeIcon /></i>
                            </section>

                            <h3>Funded</h3>
                            <big>R756k</big>
                        </article>
                    </section>
                    <article className="card">
                        <h3>Active Admins</h3>
                        <p className='card-big-text'>Platform Admins</p>
                        <AvatarGroup total={24} component={'section'} style={{justifyContent: 'center'}}>
                            <Avatar component={'i'}
                                sx={{ bgcolor: theme.palette.primary.main }}
                                alt="Samy Sharp"
                                src="/broken-image.jpg"
                            />
                            <Avatar component={'i'}
                                sx={{ bgcolor: deepOrange[500] }}
                                alt="Lemy Sharp"
                                src="/broken-image.jpg"
                            />
                            <Avatar component={'i'}
                                sx={{ bgcolor: deepOrange[500] }}
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                            />
                            <Avatar component={'i'}
                                sx={{ bgcolor: deepOrange[500] }}
                                alt="Nemy Sharp"
                                src="/broken-image.jpg"
                            />                            
                        </AvatarGroup>
                    </article>
                </article>
                <article className="stacked-cards card-group" style={{backgroundColor: theme.palette.secondary.light, borderColor: theme.palette.secondary.light}}>
                    <section>
                        <h3>Today's Received Applications</h3>
                        <big>89</big>
                    </section>
                    <section style={{borderTop: '1px solid', borderBottom: '1px solid', borderColor: theme.palette.secondary.main}}>
                        <h3>Total Role Change Requests</h3>
                        <big>21</big>
                    </section>
                    <section>
                        <h3>Unattended Reports</h3>
                        <big>64</big>
                    </section>
                </article>
            </section>
        </article>
    );
}