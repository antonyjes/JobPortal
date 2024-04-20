import muniImg from "/muniImg.jpg";

export const LogoImage = ({className}) => {
    return(
        <img src={muniImg} alt="muniImg" className={className} />
    )
}