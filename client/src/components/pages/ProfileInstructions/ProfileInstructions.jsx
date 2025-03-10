import Card from "../../layout/Card";
import CardTitle from "../../common/CardTitle";
import Button from "../../common/Button";
import PropTypes from 'prop-types';

export default function ProfileInstructions({nextStep}) {
    return (
        <Card step={1}>
            <section className="flex flex-col justify-between h-[30rem]">
                <div className="w-[20rem] h-fit text-black">
                    <CardTitle title={"¡Descubre tu perfil ideal! 🎯"} />
                    <p className="text-base text-gray-700 leading-snug mt-2">
                        A continuación, verás una serie de perfiles con diferentes características. Tu tarea es simple: <strong>desliza a la derecha si te identificas con ese perfil</strong>, o <strong>desliza a la izquierda si no es lo tuyo</strong>.
                    </p>
                    <p className="text-base text-gray-700 leading-snug mt-2">
                        Tambien puedes <strong>deslizar hacia arriba </strong> si ese perfil que te aparece te define completamente 🎉
                    </p>
                </div>
                <div className="w-[20rem] h-fit text-black">
                    <small className="text-sm text-gray-700 leading-snug">
                        * Debes de elegir <strong>almenos 7 perfiles</strong>, pero si quieres puedes continuar explorandolos.
                    </small>
                    <Button onClick={() => nextStep(3)}>
                        Iniciar
                    </Button>
                </div>
            </section>
        </Card>
    )
}

ProfileInstructions.propTypes = {
  nextStep: PropTypes.func,
}