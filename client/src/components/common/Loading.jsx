
export default function Loading(){
    return(
        <div className="h-full w-full flex flex-col justify-center items-center text-[#090467] ">
            <i className="fa-solid fa-spinner fa-2xl animate-spin mb-6"></i>
            <small className="text-base font-semibold text-[#090467] leading-snug">Buscando perfiles</small>
        </div>
    )
}

Loading.propTypes = {}