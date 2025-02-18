interface DigiLockerButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const DigiLockerButton = ({
  onClick,
  variant = "primary",
  className = "",
}: DigiLockerButtonProps) => {
  const baseClasses = "inline-flex items-center px-4 py-2 rounded-lg";
  const variantClasses =
    variant === "primary"
      ? "bg-[#0f5288] text-white hover:bg-[#0a3d66]"
      : "border border-blue-600 text-blue-600 hover:bg-blue-50";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIDw7FiQKOeXZgUKEBfa7MRHV6UuPTfTCkA&s"
        alt="DigiLocker"
        className="w-5 h-5 mr-2"
      />
      Fetch from DigiLocker
    </button>
  );
};
