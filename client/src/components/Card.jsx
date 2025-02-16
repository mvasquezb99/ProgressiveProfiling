export default function Card({ rem , children }) {
  return (
    <div
      className={`bg-[#f4f4fa] flex flex-col items-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      style={ rem && { width: `${rem}rem` }}
    >
      {children}
    </div>
  );
}
