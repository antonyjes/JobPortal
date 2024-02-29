import LayoutHome from "../LayoutHome"

const LayoutMain = ({items, children}) => {
    return(
        <LayoutHome items={items} isAuth={true}>
            {children}
        </LayoutHome>
    )
}

export default LayoutMain;