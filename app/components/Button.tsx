import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  target?: string;
  rel?: string;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  size = "md",
  target,
  rel,
  className = "",
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-code-blue text-white hover:bg-blue-600 focus:ring-blue-500";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
  };
  
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} target={target} rel={rel}>
        <button className={buttonClasses}>
          {children}
        </button>
      </Link>
    );
  }
  
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}
