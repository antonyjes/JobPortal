import { Command } from "lucide-react"

export const HomeFooter = () => {
    return(
        <footer>
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Command />
                    <p className="text-center text-sm leading-loose md:text-left">
                        Construido con{" "}
                        <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">shadcn</a>
                        . Subido en{" "}
                        <a href="https://vercel.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                            Vercel
                        </a>
                        . Ilustraciones por{" "}
                        <a href="https://popsy.co" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                            Popsy
                        </a>
                        . El código fuente se encuentra disponible en{" "}
                        <a href="https://github.com/antonyjes" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                            Github
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    )
}