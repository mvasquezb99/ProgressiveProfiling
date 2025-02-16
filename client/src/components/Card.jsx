export default function Card({ rem = 25, children }) {
  return (
    <div
      className={`bg-[#f4f4fa] flex flex-col items-center p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      style={{ width: `${rem}rem` }}
    >
      {children}
    </div>
  );
}
