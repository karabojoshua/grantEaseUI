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
                    <h3>Site Activity</h3>
                    <small>Jan 21/2024 - Now</small>
                    <p className="card-title">364 Visits per day</p>
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
                            <h3>Total Active Fund Managers</h3>
                            <big>75</big>
                        </article>
                        <article className="card">
                            <section className='icon-area' style={{backgroundColor: theme.palette.primary.main}}>
                                <i><CurrencyExchangeIcon /></i>
                            </section>

                            <h3>Total Active Applicants</h3>
                            <big>1 425</big>
                        </article>
                    </section>
                    <article className="card" style={{height: '11rem'}}>
                        <h3>Active Admins</h3>
                        <p className='card-big-text'>Platform Admins</p>
                        <big>15</big>
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
                <article className="stacked-cards card-group" style={{backgroundColor: theme.palette.primary.main, borderColor: theme.palette.secondary.light}}>
                    <section>
                        <h3>Total Active Users</h3>
                        <big>89</big>
                    </section>
                    <section style={{borderTop: '4px solid', borderBottom: '4px solid', borderColor: '#fffcf1'}}>
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