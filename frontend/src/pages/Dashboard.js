import PrimarySearchAppBar  from "../components/AppBar";
import DashboardTabs from "../components/DashboardTabs";

function Dashboard() {
  return (
    <div>
        <PrimarySearchAppBar />
        <main>
            <section className="banner-area">
                <h2>Admin Dashboard</h2>
                <p>Welcome back!</p>
            </section>
            <DashboardTabs />
        </main>
        
    </div>
  );
}

export default Dashboard;