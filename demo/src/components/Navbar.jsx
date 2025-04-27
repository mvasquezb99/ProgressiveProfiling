
export default function NavBar() {
    return (
        <nav className="w-full h-22 flex justify-between border-b-1 border-gray-200">
            <section className="w-2/12"></section>
            <section className="w-1/2 p-4 flex justify-center items-center">
                <input type="text" className="appearance-none border-none focus:outline-none w-2/3 bg-[#F4F4FA] h-11 p-2 pl-3 rounded-md text-[#757575] placeholder:text-[#757575]" placeholder="Busca empleo por categoria o educación" />
            </section>
            <section className="w-2/12 flex justify-center items-center space-x-2">
                <a href="" className=" rounded-2xl hover:bg-[#F4F4FA] text-[#002D5A] p-2 px-5 font-semibold">Iniciar sesión</a>
                {/* Add profilers localhost URL */}
                <a href="" className=" rounded-2xl bg-[#9EE4B8] text-[#002D5A] p-2 px-5 font-semibold">Crear cuenta</a>
            </section>
        </nav>
    )
}