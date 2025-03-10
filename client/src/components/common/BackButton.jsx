export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-gray-500  text-left hover:cursor-pointer hover:scale-130 "
    >
      <i className="fa-solid fa-arrow-left text-black"></i>
    </button>
  );
}
