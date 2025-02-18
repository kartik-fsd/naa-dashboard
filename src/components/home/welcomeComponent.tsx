import { useState, useRef, useEffect } from "react";
import {
  UserGroupIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  ChartPieIcon,
  ArchiveBoxIcon,
  ReceiptRefundIcon,
  FlagIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import {
  BellIcon,
  ChevronRightIcon,
  LightBulbIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";

interface WelcomeProps {
  userName: string;
  companyName: string;
  userRole: string;
  onDismiss: () => void;
}

function WelcomeCard({
  userName,
  companyName,
  userRole,
  onDismiss,
}: WelcomeProps) {
  // Ref and state to track scroll position of the features container
  const featuresRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const quickActions = [
    {
      title: "Link Accounts",
      icon: LinkIcon,
      description: "Link your all your assets",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Add Nominee",
      icon: UserGroupIcon,
      description: "Add or manage team members",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Create a Will",
      icon: NewspaperIcon,
      description: "Start your estate planning",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const keyFeatures = [
    {
      title: "Nominee Management",
      description: "Securely add and manage nominees for your assets.",
      icon: UserPlusIcon,
      tag: "Security",
    },
    {
      title: "Estate Planning Tools",
      description:
        "Create and manage your Will, Power of Attorney, and Trusts.",
      icon: ClipboardDocumentCheckIcon,
      tag: "Planning",
    },
    {
      title: "Portfolio Overview",
      description:
        "Get a consolidated view of your entire financial portfolio.",
      icon: ChartPieIcon,
      tag: "Investments",
    },
    {
      title: "Document Vault",
      description: "Securely store and access important financial documents.",
      icon: ArchiveBoxIcon,
      tag: "Resources",
    },
    {
      title: "Personalized Insights",
      description: "Receive insights tailored to your financial situation.",
      icon: LightBulbIcon,
      tag: "Analytics",
    },
    {
      title: "Goal Tracking",
      description: "Set financial goals and monitor your progress.",
      icon: FlagIcon,
      tag: "Planning",
    },
    {
      title: "Transaction History",
      description: "View and manage your transaction records.",
      icon: ReceiptRefundIcon,
      tag: "Activity",
    },
    {
      title: "Alerts & Notifications",
      description: "Stay informed with timely alerts and notifications",
      icon: BellIcon,
      tag: "Updates",
    },
  ];

  // Update state based on scroll position
  const handleScroll = () => {
    if (featuresRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = featuresRef.current;
      setAtStart(scrollLeft === 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  // Ensure we update scroll state on mount
  useEffect(() => {
    handleScroll();
  }, []);

  // Function to scroll the features container by a fixed offset
  const scrollFeatures = (offset: number) => {
    if (featuresRef.current) {
      featuresRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="relative rounded-2xl bg-white overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 25%),
                               radial-gradient(circle at 98% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 25%)`,
              }}
            ></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-20"></div>
          </div>

          {/* Header Content */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400">
                  Welcome to {companyName}
                </span>
                <h1 className="mt-4 text-4xl font-semibold text-white">
                  Hello, {userName}
                </h1>
                <p className="mt-2 text-gray-400">
                  Let's get started with setting up your account and exploring
                  key features.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                  <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-300">{userRole}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="group relative flex items-center space-x-4 rounded-xl 
                           bg-white/5 p-4 backdrop-blur-sm transition-all duration-200 
                           hover:bg-white/10"
                >
                  <div
                    className={`flex-shrink-0 rounded-lg ${action.bgColor} p-3`}
                  >
                    <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 truncate">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-500 group-hover:text-gray-300 
                                transform group-hover:translate-x-1 transition-all"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-8 py-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Key Features &amp; Tools
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollFeatures(-320)}
                disabled={atStart}
                className={`p-2 rounded-lg border ${
                  atStart
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollFeatures(320)}
                disabled={atEnd}
                className={`p-2 rounded-lg border ${
                  atEnd
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Carousel */}
          <div
            ref={featuresRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth lg-hide-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              touchAction: "pan-x",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative min-w-[300px] rounded-xl border border-gray-200 p-6 
                           hover:border-gray-300 transition-all duration-200 hover:shadow-sm 
                           cursor-pointer scroll-snap-align-start"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                    <feature.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <span
                    className="text-xs font-medium text-gray-500 px-2 py-1 rounded-full 
                               bg-gray-50 group-hover:bg-gray-100"
                  >
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
                <div
                  className="absolute bottom-6 right-6 opacity-0 transform translate-x-2 
                             group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Need help getting started? View our{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                documentation
              </button>{" "}
              or{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                contact support
              </button>
            </p>
            <button
              onClick={onDismiss}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
