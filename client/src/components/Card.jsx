export default function Card({ children }) {
  return <div className="bg-[#f4f4fa] flex flex-col items-center p-15 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">{children}</div>;
}
