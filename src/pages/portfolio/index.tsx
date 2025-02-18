import React, { useCallback, useMemo } from "react";
import {
  BriefcaseIcon,
  UserIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNominee } from "../../hooks/useNomine";
import { Link } from "react-router-dom";

export interface Nominee {
  id: string;
  fullName: string;
  relationship: string;
  relationshipOther?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  identificationType?: string;
  identificationNumber?: string;
  lastUpdated?: string;
}

// Enhanced Status Badge Component
const StatusBadge: React.FC<{ status: string; count: number }> = ({
  status,
  count,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "complete":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          icon: <ShieldCheckIcon className="h-5 w-5 text-green-500" />,
        };
      case "partial":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          icon: <DocumentIcon className="h-5 w-5 text-yellow-500" />,
        };
      default:
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className={`${styles.bg} p-6 rounded-lg`}>
        <div className="flex items-center gap-2 mb-2">
          {styles.icon}
          <h3 className={`text-sm font-medium ${styles.text}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </h3>
        </div>
        <div className="flex items-baseline">
          <span className={`text-2xl font-semibold ${styles.text}`}>
            {count}
          </span>
          <span className="ml-2 text-sm text-gray-600">nominees</span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Verification Checklist
const VerificationChecklist: React.FC<{ nominee: Nominee }> = ({ nominee }) => {
  const checklistItems = useMemo(
    () => [
      {
        key: "identificationType",
        label: "ID Verification",
        icon: IdentificationIcon,
      },
      { key: "address", label: "Address Verification", icon: MapPinIcon },
      { key: "email", label: "Email Verification", icon: EnvelopeIcon },
      { key: "phoneNumber", label: "Phone Verification", icon: PhoneIcon },
    ],
    []
  );

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <h4 className="text-sm font-medium text-gray-900 mb-3">
        Verification Status
      </h4>
      <div className="space-y-3">
        {checklistItems.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            {nominee[key as keyof Nominee] ? (
              <ShieldCheckIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Legal Actions
const LegalActions: React.FC<{ nominee: Nominee }> = () => (
  <div className="mt-4 pt-4 border-t border-gray-100">
    <h4 className="text-sm font-medium text-gray-900 mb-3">Legal Actions</h4>
    <div className="flex flex-wrap gap-2">
      <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
        <IdentificationIcon className="h-4 w-4 mr-2" />
        Verify ID
      </button>
      <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
        <MapPinIcon className="h-4 w-4 mr-2" />
        Verify Address
      </button>
      <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
        <DocumentIcon className="h-4 w-4 mr-2" />
        Generate Report
      </button>
    </div>
  </div>
);

// Dropdown Menu Component
const DropdownMenu: React.FC<{
  children: React.ReactNode;
  items: {
    label: string;
    icon: React.ComponentType;
    onClick: () => void;
    className?: string;
  }[];
}> = ({ children, items }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        {children}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center ${
                  item.className || "text-gray-700"
                }`}
              >
                <span className="h-4 w-4 mr-2" aria-hidden="true">
                  <Icon />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Enhanced Nominee Card
const NomineeCard: React.FC<{
  nominee: Nominee;
  onEdit: (nominee: Nominee) => void;
  onDelete: (id: string) => void;
}> = ({ nominee, onEdit, onDelete }) => {
  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {nominee.avatarUrl ? (
              <img
                src={nominee.avatarUrl}
                alt={nominee.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">{nominee.fullName}</h3>
              <p className="text-sm text-gray-500">
                {nominee.relationshipOther || nominee.relationship}
              </p>
            </div>
          </div>

          <DropdownMenu
            items={[
              {
                label: "Edit",
                icon: PencilIcon,
                onClick: () => onEdit(nominee),
              },
              {
                label: "Delete",
                icon: TrashIcon,
                onClick: () => onDelete(nominee.id),
                className: "text-red-600 hover:bg-red-50",
              },
            ]}
          >
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </DropdownMenu>
        </div>

        <div className="space-y-4 text-sm">
          {nominee.dateOfBirth && (
            <div className="text-gray-500">
              Born: {formatDate(nominee.dateOfBirth)}
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <PhoneIcon className="h-4 w-4" />
              {nominee.phoneNumber}
            </div>

            {nominee.email && (
              <div className="flex items-center gap-2 text-gray-600">
                <EnvelopeIcon className="h-4 w-4" />
                {nominee.email}
              </div>
            )}

            {nominee.address && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="h-4 w-4" />
                {nominee.address}
              </div>
            )}
          </div>

          {(nominee.identificationType || nominee.identificationNumber) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <IdentificationIcon className="h-4 w-4" />
                <span>
                  {nominee.identificationType}: {nominee.identificationNumber}
                </span>
              </div>
            </div>
          )}

          <VerificationChecklist nominee={nominee} />
          <LegalActions nominee={nominee} />
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton
const NomineeCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-10 w-10 rounded-full bg-gray-200" />
      <div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
    </div>
  </div>
);

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action?: string;
}> = ({ title, value, subtitle, icon: Icon, action }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      {action && (
        <button className="text-sm text-slate-600 hover:text-slate-700 font-medium">
          {action}
        </button>
      )}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      {subtitle && <span className="text-sm text-gray-600">{subtitle}</span>}
    </div>
  </div>
);

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const {
    state: { nominees, isLoading, error },
    deleteNominee,
  } = useNominee();

  const handleEditNominee = useCallback((nominee: Nominee) => {
    console.log("Edit nominee:", nominee);
  }, []);

  const handleDeleteNominee = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this nominee?")) {
        try {
          await deleteNominee(id);
        } catch (error) {
          console.error("Failed to delete nominee:", error);
        }
      }
    },
    [deleteNominee]
  );

  const stats = useMemo(() => {
    return nominees.reduce((acc, nominee) => {
      const checks = {
        hasId: !!nominee.identificationNumber,
        hasContact: !!nominee.phoneNumber,
        hasEmail: !!nominee.email,
        hasAddress: !!nominee.address,
      };

      const status = Object.values(checks).every(Boolean)
        ? "complete"
        : Object.values(checks).some(Boolean)
        ? "partial"
        : "incomplete";

      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [nominees]);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-700">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <BriefcaseIcon className="h-7 w-7" />
              Nominee Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your nominees and their verification status
            </p>
          </div>
          <Link
            to={"/nominees"}
            className="inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            <UserIcon className="h-4 w-4 mr-2" />
            Add Nominee
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatusBadge status="complete" count={stats.complete || 0} />
        <StatusBadge status="partial" count={stats.partial || 0} />
        <StatusBadge status="incomplete" count={stats.incomplete || 0} />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Nominees"
          value={nominees.length}
          subtitle="Registered nominees"
          icon={UserIcon}
        />
        <StatsCard
          title="Email Verified"
          value={nominees.filter((n) => n.email).length}
          subtitle="With valid email"
          icon={EnvelopeIcon}
        />
        <StatsCard
          title="ID Verified"
          value={nominees.filter((n) => n.identificationNumber).length}
          subtitle="With valid ID"
          icon={IdentificationIcon}
        />
        <StatsCard
          title="Last Updated"
          value="2 hours ago"
          icon={ArrowPathIcon}
          action="Sync Now"
        />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Registered Nominees
          </h2>
          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
              <DocumentIcon className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <NomineeCardSkeleton />
              <NomineeCardSkeleton />
              <NomineeCardSkeleton />
            </>
          ) : nominees.length > 0 ? (
            nominees.map((nominee) => (
              <NomineeCard
                key={nominee.id}
                nominee={nominee}
                onEdit={handleEditNominee}
                onDelete={handleDeleteNominee}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow-sm p-12">
                <div className="text-center">
                  <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    No nominees
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first nominee
                  </p>
                  <div className="mt-6">
                    <Link
                      to={"/nominees"}
                      className="inline-flex items-center px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Add Nominee
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ArrowPathIcon className="h-4 w-4" />
            <span>Last synced: January 15, 2025, 14:30</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
