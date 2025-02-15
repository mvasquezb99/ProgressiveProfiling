export default function Card({ rem = 25, children }) {
  return (
    <div className={`bg-[#f4f4fa] flex flex-col items-center w-[${rem}rem] p-8 rounded-xl shadow-lg`}>
      {children}
    </div>
  );
}
