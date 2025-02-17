import { Link } from "react-router";

export default function Button({ children, ...props }) {
  return (
    <Link className="w-full" {...props}>
      <button className="mt-4 w-full bg-[#090467] text-white shadow-md" {...props}>
        {children}
      </button>
    </Link>
  );
}
