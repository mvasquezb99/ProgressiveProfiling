export default function ExtraInfoPanel({ job }) {
  return (
    <aside className="w-2/6 h-full p-4 border-l-1 border-gray-200 place-content: space-between;">
      <header className="px-5 border-b-1 border-gray-200">
        <h1 className="text-xl font-bold text-blue-900">{job.name}</h1>
        <h2 className="my-2 text-gray-400">Company‼</h2>
        <button className="my-2 bg-blue-900 py-2 px-8 rounded-3xl text-white">Aplicar</button>
      </header>
      <article className="bg-gray-100 my-4 p-3 rounded-2xl">
        <p className="mb-2 text-gray-600">Hace {job.publicationDate}</p>
        <p className="mb-2 text-gray-600">Experiencia: {job.experience}</p>
        <p className="mb-2 text-gray-600">
          Salario:{' '}
          {Number(job.salary).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
        </p>
        <p className="mb-2 text-gray-600">{job.location}</p>
        <p className="mb-2 text-gray-600">Duración: {job.duration}</p>
        <p className="mb-2 text-gray-600">{job.extra}</p>
      </article>
      <section className="pl-2">
        <h2 className="my-2 text-bold">Descripción</h2>
        <p className="mb-5  text-gray-600">{job.description}</p>

        <h2 className="my-2 text-bold">Beneficios</h2>
        <ul className="list-disc list-inside">
        {job.benefits.map(benefit => {
          return (
            <li className=" text-gray-600" key={benefit}>
              {benefit}
            </li>
          );
        } )}

        </ul>
      </section>
    </aside>
  );
}
