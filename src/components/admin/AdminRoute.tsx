
import { useEffect, useState } from 'react';
import { ContractDataAnalysis } from './ContractDataAnalysis';
import { Loader2 } from 'lucide-react';

export function AdminRoute() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Simple authorization check - in a real application, you'd want to use proper authentication
    const checkAuthorization = () => {
      // For demo purposes, we'll check for a URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const hasAccess = urlParams.get('access') === 'admin';
      setIsAuthorized(hasAccess);
    };
    
    checkAuthorization();
  }, []);
  
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (isAuthorized === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Toegang geweigerd</h1>
        <p className="text-center text-gray-600">
          Je hebt geen toestemming om deze pagina te bekijken.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <ContractDataAnalysis />
    </div>
  );
}
