import {Link} from 'react-router-dom';
function Header(){
    return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to = "/dashboard" className="nav-link active" aria-current="page" >Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/feature" className="nav-link" href="#">Features</Link>
        </li>
        <li className="nav-item">
          <Link to="/sign-in" className="nav-link">Sign-in</Link>
        </li>
        <li className="nav-item">
          <Link to="/sign-up" className="nav-link">Sign-up</Link>
        </li>
        <li className="nav-item">
          <Link to="/category" className="nav-link">Category</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
}
export default Header;