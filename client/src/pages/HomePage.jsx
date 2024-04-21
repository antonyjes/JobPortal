import { cn } from "@/lib/utils"
import LayoutHome from "./LayoutHome"
import { buttonVariants } from "@/components/ui/button"

const HomePage = () => {
    return(
        <LayoutHome>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Portal de Empleo de la Municipalidad de Huayucachi</h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Crea tu perfil y aplica para los trabajos
                    </p>
                    <div className="space-x-4">
                        <a href="/jobs" className={cn(buttonVariants({size: "lg"}))}>
                            Ver trabajos
                        </a>
                    </div>
                </div>
            </section>
        </LayoutHome>
    )
}

export default HomePage;