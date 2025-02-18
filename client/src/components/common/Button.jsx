export default function Button({ children, to, ...props}) {
  return (
      <button className="mt-4 w-full bg-[#090467] text-white shadow-md" {...props}>
        {children}
      </button>
  );
}
