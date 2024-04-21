import BasicLineChart from "./LineGraph";

export default function DashboardOverviewCards() {
    return (
        <article className="card-area">
            <section className="card-row">
                <article className="card">
                    <h3>Total Available Funding</h3>
                    <small>Jan 21/2024 - Now</small>
                    <p>4 426</p>
                    <section className="graph-area">
                        <BasicLineChart />
                    </section>
                </article>
                <article className="card-group">
                    <section style={{direction: 'flex'}}>
                        <article className="card">
                            <h3>Available Funding</h3>
                            <p>R356 083</p>
                        </article>
                        <article className="card">
                            <h3>Funded</h3>
                            <p>R756 083</p>
                        </article>
                        <article className="card">
                            <h3>Active Admins</h3>
                            <p>avatars</p>
                        </article>
                        <article>
                            
                        </article>
                    </section>
                </article>
            </section>
        </article>
    );
}