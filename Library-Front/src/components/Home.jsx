import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { Hoc } from "../HOC/hoc";


const Home = () => {
  const {data:nbrBook} = useFetch("http://localhost:8080/book");
  const {data:nbrSubs} = useFetch("http://localhost:8080/subscriber");
  const {data:nbrBooked} = useFetch("http://localhost:8080/booking/booked");
  return (
    < >
      <div className="container-fluid">
        <div className="section">
          <div className="row">
            <div className="col-6 col-md-2" />
            <div className="col-6 col-md-8">
              <br /><br />
              <h1 style={{ textAlign: 'center', fontWeight: 400, color: 'rgb(2, 23, 5)' }}>
                Hello and welcome back Admin
              </h1>
              <br /><br />
              <h2 style={{ textAlign: 'center', fontWeight: 300, color: 'rgb(2, 23, 5)' }}>
                Here's some statistics of Vote.ly
              </h2>
            </div>
            <div className="col-6 col-md-2" />
          </div>
          <br />
          <div className="row">
            <div className="col-6 col-md-3" />
            <div className="col-6 col-md-3">
              <div className="card card-stats">
                <div className="card-header card-header-success card-header-icon" style={{ backgroundColor: '#d8f3dc' }}>
                  <div className="card-icon">
                    <i className="nc-icon nc-icon nc-chart-bar-32" />
                  </div>
                  <p className="card-category" style={{ color: 'black' }}>
                    Number of Book
                  </p>
                  <a className="nav-link" href="/book">
                    <h4 className="card-title text-center"><b>{nbrBook&&nbrBook.length}</b> Books</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card card-stats">
                <div className="card-header card-header-success card-header-icon" style={{ backgroundColor: '#d8f3dc' }}>
                  <div className="card-icon">
                    <i className="nc-icon nc-icon nc-chart-pie-35" />
                  </div>
                  <p className="card-category" style={{ color: 'black' }}>
                    Number of Subscriber
                  </p>
                  <a className="nav-link" href="/subscriber">
                    <h4 className="card-title text-center"><b>{nbrSubs&&nbrSubs.length}</b> Subscribers</h4>
                  </a>
                </div>
              </div>
            </div>


            <div className="col-6 col-md-3 mt-5 d-flex justify-content-center align-items-center" />

            <div className="col-6 col-md-12 d-flex justify-content-center align-items-center">
              <div className="card card-stats">
                <div className="card-header card-header-success card-header-icon" style={{ backgroundColor: '#d8f3dc' }}>
                  <div className="card-icon">
                    <i className="nc-icon nc-icon nc-chart-pie-35" />
                  </div>
                  <p className="card-category" style={{ color: 'black' }}>
                    Number of Subscriber
                  </p>
                  <a className="nav-link" href="/subscriber">
                    <h4 className="card-title text-center"><b>{nbrSubs&&nbrSubs.length}</b> </h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* what you looking to do*/}
      <br /><br />
      <div className="container-fluid">
        <div className="section">
          <div className="row">
            <div className="col-6 col-md-3" style={{ textAlign: 'center' }} />
            <div className="col-6 col-md-6" style={{ textAlign: 'center' }}>
              <h2 style={{ textAlign: 'center', fontWeight: 300, color: 'rgb(2, 23, 5)' }}>
                What are you looking to do today?
              </h2>
            </div>
            <div className="col-6 col-md-3" style={{ textAlign: 'center' }} />
          </div>
        </div>
      </div>
      <br />
      <div className="container-fluid">
        <div className="section">
          <div className="row">
            <div className="col-6 col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="box-1">
                <Link to="/category">
                <div className="btnn btn-one">
                  <span>Manage Category</span>
                </div>
                </Link>
              </div>
            </div>
            <div className="col-6 col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="box-1">
                <Link to="/book">
                <div className="btnn btn-one">
                  <span>Manage Book</span>
                </div>
                </Link>
              </div>
            </div>
            <div className="col-6 col-md-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="box-1">
                <Link to="/subscriber">
                <div className="btnn btn-one">
                  <span>Manage Subscribers</span>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* li ta7ti tsakkar el content sakarha ekhir el page*/}
    </>





  );
}

export default Hoc(Home) ;