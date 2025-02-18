import { useState } from "react";
import WelcomeCard from "../../components/home/welcomeComponent";

import { useAuth } from "../../hooks/useAuth";
import LinkAssetsSection from "../../components/link-assets";

function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      {showWelcome && (
        <WelcomeCard
          userName={user!.name}
          userRole="Financial Administrator"
          companyName="FinCare Solutions"
          onDismiss={() => setShowWelcome(false)}
        />
      )}

      <LinkAssetsSection />
    </div>
  );
}

export default Home;
