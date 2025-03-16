// src/pages/EstatePlanning/LegalFramework.tsx
import React from "react";
import {
  BookOpenIcon,
  ScaleIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { InfoAlert } from "../../components/etstate-planning/InfoAlert";

const LegalFramework: React.FC = () => {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Legal Framework for Estate Planning in India
        </h2>
        <p className="text-gray-600 mb-6">
          Estate planning in India is governed by various laws that differ based
          on religion, type of assets, and specific circumstances. Understanding
          these laws is essential for creating an effective estate plan.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Succession Laws by Religion
        </h3>
        <div className="space-y-4 mb-8">
          <SuccessionLawCard
            title="Hindu Succession Act, 1956"
            applicableTo="Hindus, Buddhists, Jains, and Sikhs"
            keyPoints={[
              "Equal rights for sons and daughters in ancestral property since 2005 amendment",
              "Class I heirs (spouse, children, mother) have priority",
              "Testamentary succession (through Will) overrides intestate succession",
              "Special provisions for Hindu Undivided Family (HUF) property",
            ]}
          />

          <SuccessionLawCard
            title="Muslim Personal Law (Shariat) Application Act, 1937"
            applicableTo="Muslims (with distinct rules for Sunni and Shia sects)"
            keyPoints={[
              "Muslims can dispose of only one-third of property through Will",
              "Remaining two-thirds distributed according to Shariat",
              "Different shares prescribed for different heirs",
              "Male heirs generally receive twice the share of female heirs",
            ]}
          />

          <SuccessionLawCard
            title="Indian Succession Act, 1925"
            applicableTo="Christians, Parsis, and those married under Special Marriage Act"
            keyPoints={[
              "For Christians: Spouse entitled to one-third and children to two-thirds if no Will",
              "For Parsis: Complex distribution system among relatives",
              "Detailed provisions for testamentary succession (Wills)",
              "Rules for obtaining probate and letters of administration",
            ]}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Key Legislation Affecting Estate Planning
        </h3>
        <div className="space-y-4 mb-8">
          <LegislationCard
            title="Transfer of Property Act, 1882"
            description="Governs transfer of property between living persons (inter vivos). Relevant sections include rules for gift deeds, settlement deeds, and transfer of immovable property which are important estate planning tools."
          />

          <LegislationCard
            title="Registration Act, 1908"
            description="Requires registration of certain documents like property transfers. While Will registration is optional, it is highly recommended for stronger legal validity and to prevent tampering or forgery."
          />

          <LegislationCard
            title="Banking Regulation Act & RBI Guidelines"
            description="Governs nomination facilities for bank accounts and lockers. The nominee receives the deposits upon the account holder's death as a trustee and must distribute to legal heirs as per succession laws."
          />

          <LegislationCard
            title="Companies Act, 2013 & SEBI Regulations"
            description="Contains provisions for nomination of shares and securities. SEBI regulations provide detailed procedures for transmission of securities to nominees and legal heirs."
          />

          <LegislationCard
            title="Insurance Act, 1938"
            description="Section 39 governs nomination in insurance policies. Unlike bank accounts, insurance nominees are beneficial owners and not mere trustees, as confirmed by Supreme Court judgments."
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Taxation Aspects of Estate Planning
        </h3>
        <Card hasPadding>
          <div className="space-y-5">
            <div>
              <div className="flex items-center mb-2">
                <CurrencyRupeeIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">
                  No Inheritance Tax
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                India currently does not impose an inheritance tax or estate
                tax. Assets inherited through succession or Will are not taxable
                in the hands of the recipient.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <CurrencyRupeeIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Capital Gains Tax</h4>
              </div>
              <p className="text-sm text-gray-600">
                When inherited property is sold, capital gains tax applies. The
                cost basis is the cost at which the original owner acquired it,
                and holding period includes the period of ownership of the
                deceased.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <CurrencyRupeeIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">
                  Gift Tax Implications
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                While there's no specific gift tax, gifts exceeding ₹50,000 are
                taxable in the hands of the recipient under "Income from Other
                Sources" except when received from relatives as defined under
                the Income Tax Act.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <CurrencyRupeeIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Stamp Duty</h4>
              </div>
              <p className="text-sm text-gray-600">
                Transfer of immovable property through gift deed or settlement
                deed attracts stamp duty as per state laws. Property
                transmission through Will has minimal stamp duty implications
                during probate.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-6">
          <InfoAlert type="legal" title="Stay Updated on Legal Changes">
            <p>The legal landscape for estate planning in India is evolving:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Recent Supreme Court judgments have clarified the role of
                nominees
              </li>
              <li>
                The Hindu Succession (Amendment) Act, 2005 gave equal rights to
                daughters
              </li>
              <li>Digital asset succession laws are still developing</li>
            </ul>
            <p className="mt-2">
              Our platform regularly updates legal information to help you keep
              your estate plan compliant with current laws.
            </p>
          </InfoAlert>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          Landmark Court Judgments
        </h3>
        <div className="space-y-4 mb-6">
          <CourtCaseCard
            title="Aruna Oswal v. Pankaj Oswal (2020)"
            court="Supreme Court"
            summary="Clarified that nomination in shares and securities doesn't override the laws of succession. 
                    Nominees hold assets as trustees for the legal heirs."
          />

          <CourtCaseCard
            title="Sarbati Devi v. Usha Devi (1984)"
            court="Supreme Court"
            summary="Established that a nominee under Section 39 of the Insurance Act is merely a trustee and 
                    not the beneficial owner of the insurance proceeds."
          />

          <CourtCaseCard
            title="Danamma v. Amar (2018)"
            court="Supreme Court"
            summary="Confirmed that daughters have equal coparcenary rights in ancestral property under Hindu law, 
                    even if born before the 2005 amendment to the Hindu Succession Act."
          />

          <CourtCaseCard
            title="Prakash v. Phulavati (2016)"
            court="Supreme Court"
            summary="Clarified that the 2005 amendment to the Hindu Succession Act giving daughters equal rights 
                    applies only if both the daughter and her father were alive on September 9, 2005."
          />
        </div>

        <div className="bg-blue-50 p-6 rounded-lg mt-8">
          <div className="flex items-center mb-4">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">
              Get Legal Document Templates
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Access our library of legally-vetted document templates specifically
            crafted for Indian estate planning:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-white p-3 rounded border border-gray-200">
              <h4 className="font-medium text-gray-900">Will Templates</h4>
              <p className="text-sm text-gray-500">
                Simple and comprehensive formats
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <h4 className="font-medium text-gray-900">Power of Attorney</h4>
              <p className="text-sm text-gray-500">
                General and specific versions
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <h4 className="font-medium text-gray-900">Nomination Forms</h4>
              <p className="text-sm text-gray-500">
                For various financial assets
              </p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <h4 className="font-medium text-gray-900">Trust Deeds</h4>
              <p className="text-sm text-gray-500">
                For family and charitable trusts
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            isFullWidth
            onClick={() => console.log("Access templates clicked")}
          >
            Access Templates
          </Button>
        </div>
      </div>
    </div>
  );
};

interface SuccessionLawCardProps {
  title: string;
  applicableTo: string;
  keyPoints: string[];
}

const SuccessionLawCard: React.FC<SuccessionLawCardProps> = ({
  title,
  applicableTo,
  keyPoints,
}) => {
  return (
    <Card hasShadow hasBorder>
      <div className="p-5">
        <div className="flex items-start">
          <BookOpenIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 mb-3">
              Applicable to: {applicableTo}
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              {keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface LegislationCardProps {
  title: string;
  description: string;
}

const LegislationCard: React.FC<LegislationCardProps> = ({
  title,
  description,
}) => {
  return (
    <Card hasShadow hasBorder>
      <div className="p-5">
        <div className="flex items-start">
          <ScaleIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface CourtCaseCardProps {
  title: string;
  court: string;
  summary: string;
}

const CourtCaseCard: React.FC<CourtCaseCardProps> = ({
  title,
  court,
  summary,
}) => {
  return (
    <Card hasShadow hasBorder>
      <div className="p-5">
        <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-blue-600 uppercase font-semibold mb-2">
          {court}
        </p>
        <p className="text-sm text-gray-600">{summary}</p>
      </div>
    </Card>
  );
};

export default LegalFramework;
