/* ==================================================
     Enhanced Empty State Component
  ================================================== */

import {
  CheckCircleIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

interface EnhancedEmptyStateProps {
  onAddNominee: () => void;
}

export const EnhancedEmptyState: React.FC<EnhancedEmptyStateProps> = ({
  onAddNominee,
}) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
      <div className="relative p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-6 transform transition-transform hover:scale-110 duration-300">
          <UsersIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          No Nominees Added Yet
        </h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Start by adding your first nominee. This helps ensure your assets are
          transferred according to your wishes.
        </p>
        <button
          onClick={onAddNominee}
          className="inline-flex items-center px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Add Your First Nominee
        </button>

        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 border border-slate-200 hover:border-slate-300 transition-colors duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              Smooth Asset Transfer
            </h4>
            <p className="text-slate-600 text-sm">
              Ensures your assets are transferred efficiently to your chosen
              beneficiaries with minimal legal complications.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 hover:border-slate-300 transition-colors duration-300">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ShieldCheckIcon className="w-6 h-6 text-slate-800" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              Legal Protection
            </h4>
            <p className="text-slate-600 text-sm">
              Secure peace of mind knowing your assets will be handled according
              to your wishes and legal requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 bg-slate-50 p-6 rounded-b-xl border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span>Your nominee data is encrypted and securely stored</span>
          </div>
        </div>
      </div>
    </div>
  );
};
