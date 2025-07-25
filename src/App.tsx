// import React, { useState } from 'react';
// import { Toaster } from '@/components/ui/toaster';
// import { ChildDashboard } from '@/components/ChildDashboard';
// import { ParentDashboard } from '@/components/ParentDashboard';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Users, Baby } from 'lucide-react';

// function App() {
//   const [userType, setUserType] = useState<'child' | 'parent' | null>(null);

//   if (!userType) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 w-screen ">
//         <Card className="p-8 max-w-md w-full text-center space-y-6">
//           <h1 className="text-3xl font-bold text-gray-900">MoneyWise Kids</h1>
//           <p className="text-gray-600">Learn, Save, and Grow with Money!</p>
          
//           <div className="space-y-4">
//             <Button 
//               onClick={() => setUserType('child')} 
//               className="w-full h-16 text-lg"
//               variant="default"
//             >
//               <Baby className="mr-2 h-6 w-6" />
//               I'm a Kid (10-18 years)
//             </Button>
            
//             <Button 
//               onClick={() => setUserType('parent')} 
//               className="w-full h-16 text-lg"
//               variant="outline"
//             >
//               <Users className="mr-2 h-6 w-6" />
//               I'm a Parent
//             </Button>
//           </div>
//         </Card>
//         <Toaster />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="fixed top-4 right-4 z-50">
//         <Button 
//           onClick={() => setUserType(null)} 
//           variant="outline" 
//           size="sm"
//         >
//           Switch User
//         </Button>
//       </div>
      
//       {userType === 'child' ? <ChildDashboard /> : <ParentDashboard />}
//       <Toaster />
//     </div>
//   );
// }

// export default App;






import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { ChildDashboard } from '@/components/ChildDashboard';
import { ParentDashboard } from '@/components/ParentDashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Baby } from 'lucide-react';

function App() {
  const [userType, setUserType] = useState<'child' | 'parent' | null>(null);
  const [balance, setBalance] = useState(1250); // Shared state here

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 w-screen">
        <Card className="p-8 max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">MoneyWise Kids</h1>
          <p className="text-gray-600">Learn, Save, and Grow with Money!</p>

          <div className="space-y-4">
            <Button 
              onClick={() => setUserType('child')} 
              className="w-full h-16 text-lg"
              variant="default"
            >
              <Baby className="mr-2 h-6 w-6" />
              I'm a Kid (10–18 years)
            </Button>

            <Button 
              onClick={() => setUserType('parent')} 
              className="w-full h-16 text-lg"
              variant="outline"
            >
              <Users className="mr-2 h-6 w-6" />
              I'm a Parent
            </Button>
          </div>
        </Card>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={() => setUserType(null)} 
          variant="outline" 
          size="sm"
        >
          Switch User
        </Button>
      </div>

      {/* Pass balance and setBalance to both dashboards */}
      {userType === 'child' 
        ? <ChildDashboard balance={balance} setBalance={setBalance} />
        : <ParentDashboard balance={balance} setBalance={setBalance} />
      }

      <Toaster />
    </div>
  );
}

export default App;
