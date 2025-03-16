import { useState } from "react";
import {
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CalculatorIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  Bars3Icon,
  ChevronRightIcon,
  RssIcon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  LightBulbIcon,
  FireIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/solid";

// Resource Types
type ResourceType =
  | "all"
  | "guide"
  | "article"
  | "template"
  | "video"
  | "calculator";
type ResourceCategory =
  | "all"
  | "estate-planning"
  | "investment"
  | "tax"
  | "legal"
  | "financial-planning";

// Interface for Resource item
interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  thumbnail?: string;
  author?: string;
  readTime?: string;
  datePublished: string;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  link?: string;
}

const ResourcesPage = () => {
  const [selectedType, setSelectedType] = useState<ResourceType>("all");
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sample resources data
  const resourcesData: Resource[] = [
    {
      id: "1",
      title: "Complete Guide to Estate Planning in India",
      description:
        "Learn about the essentials of estate planning, including wills, trusts, and power of attorney.",
      type: "guide",
      category: "estate-planning",
      author: "Legal Team",
      readTime: "15 min",
      datePublished: "2025-02-15",
      featured: true,
      thumbnail:
        "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "2",
      title: "Understanding Mutual Fund Nominee Rules",
      description:
        "A comprehensive overview of nomination rules for mutual fund investments.",
      type: "article",
      category: "investment",
      author: "Investment Team",
      readTime: "8 min",
      datePublished: "2025-02-10",
      popular: true,
      thumbnail:
        "https://images.unsplash.com/photo-1579532536935-619928decd08?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "3",
      title: "Will Creation Template",
      description: "A legally vetted template to help you draft your own will.",
      type: "template",
      category: "legal",
      datePublished: "2025-01-25",
      new: true,
      thumbnail:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "4",
      title: "Tax Implications of Inheritance",
      description:
        "Understanding the tax aspects of inheritance and estate transfer.",
      type: "article",
      category: "tax",
      author: "Tax Advisory Team",
      readTime: "12 min",
      datePublished: "2025-01-20",
      thumbnail:
        "https://images.unsplash.com/photo-1586486855514-8c633cc6fd62?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "5",
      title: "Estate Planning Calculator",
      description:
        "Calculate the value of your estate and plan distributions to beneficiaries.",
      type: "calculator",
      category: "estate-planning",
      datePublished: "2024-12-15",
      popular: true,
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "6",
      title: "How to Register Multiple Nominees for Your Bank Account",
      description:
        "Step-by-step guide on adding multiple nominees to your bank accounts.",
      type: "guide",
      category: "financial-planning",
      author: "Banking Expert",
      readTime: "10 min",
      datePublished: "2025-03-01",
      new: true,
      thumbnail:
        "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "7",
      title: "Understanding Power of Attorney",
      description:
        "Learn about different types of Power of Attorney and when to use them.",
      type: "video",
      category: "legal",
      readTime: "22 min",
      datePublished: "2025-02-05",
      thumbnail:
        "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "8",
      title: "Digital Assets and Estate Planning",
      description:
        "How to include digital assets like cryptocurrency in your estate plan.",
      type: "article",
      category: "estate-planning",
      author: "Digital Assets Team",
      readTime: "14 min",
      datePublished: "2025-01-10",
      featured: true,
      thumbnail:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "9",
      title: "Succession Certificate Template",
      description:
        "Template for applying for a succession certificate for deceased family members.",
      type: "template",
      category: "legal",
      datePublished: "2024-12-20",
      thumbnail:
        "https://images.unsplash.com/photo-1581553673739-c4906b5d0de8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "10",
      title: "Asset Distribution Calculator",
      description:
        "Plan how your assets will be distributed among your nominees and beneficiaries.",
      type: "calculator",
      category: "financial-planning",
      datePublished: "2024-11-05",
      thumbnail:
        "https://images.unsplash.com/photo-1638913662415-8c5f79b20656?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "11",
      title: "Financial Planning for Senior Citizens",
      description:
        "Special considerations for estate planning when you are above 60.",
      type: "guide",
      category: "financial-planning",
      author: "Retirement Planning Team",
      readTime: "18 min",
      datePublished: "2024-12-10",
      thumbnail:
        "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    },
    {
      id: "12",
      title: "Creating a Trust: Pros and Cons",
      description:
        "Understand when to create a trust instead of relying solely on a will.",
      type: "video",
      category: "estate-planning",
      readTime: "25 min",
      datePublished: "2024-10-15",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661906789703-a25a1e53180e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Filter resources based on selection and search
  const filteredResources = resourcesData.filter((resource) => {
    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesCategory && matchesSearch;
  });

  // Featured resources (for the hero section)
  const featuredResources = resourcesData
    .filter((resource) => resource.featured)
    .slice(0, 3);

  // New resources
  const newResources = resourcesData
    .filter((resource) => resource.new)
    .slice(0, 3);

  // Popular resources
  const popularResources = resourcesData
    .filter((resource) => resource.popular)
    .slice(0, 3);

  // Type icons mapping
  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "guide":
        return <BookOpenIcon className="w-5 h-5" />;
      case "article":
        return <DocumentTextIcon className="w-5 h-5" />;
      case "template":
        return <DocumentCheckIcon className="w-5 h-5" />;
      case "video":
        return <AcademicCapIcon className="w-5 h-5" />;
      case "calculator":
        return <CalculatorIcon className="w-5 h-5" />;
      default:
        return <BookOpenIcon className="w-5 h-5" />;
    }
  };

  // Category color mapping
  const getCategoryColor = (category: ResourceCategory) => {
    switch (category) {
      case "estate-planning":
        return "bg-blue-100 text-blue-800";
      case "investment":
        return "bg-green-100 text-green-800";
      case "tax":
        return "bg-purple-100 text-purple-800";
      case "legal":
        return "bg-red-100 text-red-800";
      case "financial-planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Resource Card Component
  const ResourceCard = ({ resource }: { resource: Resource }) => {
    return (
      <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
        <div className="relative overflow-hidden h-48">
          <img
            src={
              resource.thumbnail ||
              "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800"
            }
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {resource.new && (
            <span className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              New
            </span>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                resource.category
              )}`}
            >
              {resource.category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
            <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
              {getTypeIcon(resource.type)}
              <span className="capitalize">{resource.type}</span>
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-slate-700 transition-colors">
            {resource.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {resource.description}
          </p>

          <div className="mt-auto">
            {resource.author && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-xs text-gray-600">{resource.author}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              {resource.readTime && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {resource.readTime}
                </span>
              )}

              <button className="text-slate-600 hover:text-slate-800 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Resource
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Resource Types Filter
  const resourceTypes = [
    { value: "all", label: "All Types" },
    { value: "guide", label: "Guides" },
    { value: "article", label: "Articles" },
    { value: "template", label: "Templates" },
    { value: "video", label: "Videos" },
    { value: "calculator", label: "Calculators" },
  ];

  // Resource Categories Filter
  const resourceCategories = [
    { value: "all", label: "All Categories" },
    { value: "estate-planning", label: "Estate Planning" },
    { value: "investment", label: "Investment" },
    { value: "tax", label: "Tax" },
    { value: "legal", label: "Legal" },
    { value: "financial-planning", label: "Financial Planning" },
  ];

  // Hero Section Component
  const HeroSection = () => (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white py-12 px-6 md:px-12 rounded-2xl overflow-hidden mb-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_50%)]"></div>
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Estate Planning Resources
        </h1>
        <p className="text-slate-300 max-w-2xl mb-8">
          Access guides, templates, and tools to help you navigate estate
          planning, asset management, and secure your financial legacy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search for resources..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5" />
            Resource Finder
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/15 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                {getTypeIcon(resource.type)}
                <span className="text-sm text-blue-300 capitalize">
                  {resource.type}
                </span>
              </div>
              <h3 className="font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {resource.description}
              </p>
              <div className="flex items-center justify-between">
                {resource.readTime && (
                  <span className="text-xs text-gray-400">
                    {resource.readTime}
                  </span>
                )}
                <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more
                  <ChevronRightIcon className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Newsletter Section Component
  const NewsletterSection = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-100 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:flex-1">
          <div className="flex items-center gap-2 mb-2">
            <RssIcon className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-medium">Stay Updated</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-600 mb-4">
            Get the latest estate planning tips, legal updates, and financial
            insights delivered to your inbox.
          </p>
        </div>
        <div className="md:flex-1 w-full">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ResourceType)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {resourceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as ResourceCategory)
              }
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {resourceCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Bars3Icon className="w-5 h-5 mr-2" />
              More Filters
              <ChevronDownIcon className="w-5 h-5 ml-1" />
            </button>
          </div>

          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Date filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Published
                </label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All time</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last year</option>
                </select>
              </div>

              {/* Format filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All formats</option>
                  <option>PDF</option>
                  <option>Interactive</option>
                  <option>Spreadsheet</option>
                </select>
              </div>

              {/* Level filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complexity Level
                </label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              {/* Sort by filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Newest first</option>
                  <option>Oldest first</option>
                  <option>Most popular</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Resources Section */}
      {newResources.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <LightBulbIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                New Resources
              </h2>
            </div>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View all new resources
              <ChevronRightIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Popular Resources Section */}
      {popularResources.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <FireIcon className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Popular Resources
              </h2>
            </div>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
            >
              View all popular resources
              <ChevronRightIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Subscription */}
      <NewsletterSection />

      {/* All Resources Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              All Resources
            </h2>
          </div>
          <span className="text-gray-500 text-sm">
            {filteredResources.length}{" "}
            {filteredResources.length === 1 ? "resource" : "resources"} found
          </span>
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any resources matching your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Need Help Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800"
              alt="Customer support"
              className="w-full rounded-lg object-cover"
              style={{ height: "220px" }}
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need personalized assistance?
            </h3>
            <p className="text-gray-600 mb-4">
              Our team of financial and legal experts is ready to help you
              navigate your estate planning journey. Schedule a consultation or
              reach out to our support team for personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">
                Schedule a Consultation
              </button>
              <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
