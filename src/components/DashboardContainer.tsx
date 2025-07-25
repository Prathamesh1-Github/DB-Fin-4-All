// DashboardContainer.tsx
import { useState } from 'react';
import { ChildDashboard } from './ChildDashboard';
import { ParentDashboard } from './ParentDashboard';

export default function DashboardContainer() {
    const [balance, setBalance] = useState(1250); // Shared state

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <ChildDashboard balance={balance} setBalance={setBalance} />
            <ParentDashboard balance={balance} setBalance={setBalance} />
        </div>
    );
}
