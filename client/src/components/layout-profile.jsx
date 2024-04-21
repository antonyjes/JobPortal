import { LogoImage } from "./logo-image";

export const LayoutProfile = ({children}) => {
  return (
    <div className="min-h-[80vh]">
      <div className="container grid h-[80vh] w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
            <div className="flex flex-col space-y-2 text-center">
              <LogoImage className="mx-auto h-20 w-20" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Editar Perfil
              </h1>
              <p>Cambia los datos que deseas actualizar</p>
            </div>
            <div className="grid gap-6">
                {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
