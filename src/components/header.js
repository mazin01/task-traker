import { useLocation } from "react-router-dom"
import Button from "./button"
const Header = ({onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>task tracker</h1>
            {location.pathname === '/' && (<Button color={showAdd ? '#ad0000ad' : '#00ad00b0'} text={showAdd ? 'Close' : 'Add'} 
            onClick={onAdd}/>)}
        </header>
    )
}

export default Header
