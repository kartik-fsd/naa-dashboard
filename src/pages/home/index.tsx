// src/pages/home/index.tsx
import { useState } from "react";
import WelcomeCard from "../../components/home/welcomeComponent";
import { useAuth } from "../../hooks/useAuth";
import LinkAssetsSection from "../../components/link-assets";
import LinkedAssets from "../../components/link-assets/LinkedAssets";
import { mockAssets } from "../../lib/assetsMockup";
import { useLinkedAssets } from "../../hooks/useLinkedAssets";

function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user } = useAuth();

  // Get linked assets status to determine what to show
  const { linkedAssets } = useLinkedAssets(mockAssets);

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

      {/* Show linked assets if any exist */}
      {linkedAssets.length > 0 && <LinkedAssets showManagement={true} />}

      {/* Always show the link assets section */}
      <LinkAssetsSection />
    </div>
  );
}

export default Home;
