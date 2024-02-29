import LayoutHome from "../LayoutHome"

const LayoutMain = ({children, items}) => {
    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutMain;