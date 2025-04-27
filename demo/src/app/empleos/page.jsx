import JobPreview from "@/components/JobPreview";

export default function index(){
    return(
        <section className="w-full flex-grow flex">
            <div id="filter-side-bar" className="w-1/6 h-full p-4 space-y-4 border-r-1 border-gray-200">
                <section className="bg-[#F4F4FA] w-full p-3 rounded-lg">
                    <h2 className="font-semibold text-xl">Filtrar empleos</h2>
                </section>
                <section className="bg-[#F4F4FA] w-full h-76 p-3 rounded-lg space-y-2">
                    <h2 className="font-semibold text-lg">Categoria</h2>
                    <input type="text" placeholder="Busca por categoria" className="appearance-none border-none focus:outline-none w-full bg-gray-50 p-2 rounded-lg pl-3"/>
                </section>
                <section className="bg-[#F4F4FA] w-full p-3 rounded-lg">
                    <h2 className="font-semibold text-lg">Educación</h2>
                </section>
            </div>
            <div id="job-offers" className="flex-grow h-full p-4 overflow-scroll ">
               <JobPreview/>
            </div>
        </section>
    )
}