import { Outlet } from "react-router-dom"

function Dashboard() {
    return (
        <main className="App">
            <Outlet />
        </main>
    );
}

export default Dashboard