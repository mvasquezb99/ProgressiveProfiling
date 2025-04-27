

export default function JobPreview({ job }) {
    return (
        <section className="hover:bg-[#F4F4FA] w-full p-3 rounded-lg flex h-30 items-center transition-colors ease-in delay-75">
            <div className="w-1/5 flex items-center space-x-6 pl-3">
                <div className="w-20 h-20 bg-white"></div>
                <h3 className="font-semibold">Desarrollador</h3>
            </div>
            <div className="w-1/5">
                <h3>HOLDING VML SAS</h3>
            </div>
            <div className="w-1/5">
                <h3>Categoria</h3>
            </div>
            <div className="w-1/5">
                <h3>Otra (Bogotá D.C.) - Bogotá, D.C.</h3>
            </div>
            <div className="w-1/5">
                <h3>Término indefinido Salario a convenir, 2 años de experiencia, Técnico, Tecnólogo, Profesional.</h3>
            </div>
        </section>
    )
}