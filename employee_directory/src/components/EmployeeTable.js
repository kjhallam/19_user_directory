import React from "react";
import API from "../utils/api.js";
import Search from "./Search"; 
import "../styles/employeeTable.css";

//import DateFormat from "dateformat";

class EmployeeTable extends React.Component {
  state = {
    sortList: "",
    results: [],
    search: "",
  };

  componentDidMount() {
    API.searchApi()
      .then((res) => {
        console.log(res);
        this.setState({ results: res.data.results });
        console.log(this.state.results);
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = (e) => {
    if (e.target.name === "search") {
      const searchInput = e.target.value.toLowerCase();
      this.setState({
        search: searchInput,
      });
    }
  };

  sortFirstName = () => {
    const sortEmployees = this.state.results.sort((a,b) => {
      if (b.name.first > a.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
      return 0;
    });

    if (this.state.sortList === "DESC") {
      sortEmployees.reverse();
      this.setState({ sortList: "ASC" });
    } else {
      this.setState({ sortList: "DESC" });
    }
    this.setState({ results: sortEmployees });
  };

  sortLastName = () => {
    const sortEmployees = this.state.results.sort((a, b) => {
      if (b.name.last > a.name.last) {
        return -1;
      }
      if (a.name.last > b.name.last) {
        return 1;
      }
      return 0;
    });
    if (this.state.sortList === "DESC") {
      sortEmployees.reverse();
      this.setState({ sortList: "ASC" });
    } else {
      this.setState({ sortList: "DESC" });
    }
    this.setState({ results: sortEmployees });
  };

  render() {

    return (
      <div className="container">
        <div className="row">
        <Search
          handleInputChange={this.handleInputChange}
          search={this.state.search}
        />
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-responsive text-center table-hover">
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  First Name
                  <span
                    className="down-arrow"
                    onClick={this.sortFirstName}
                  ></span>
                  </th>
                  <th>
                    Last Name
                    <span
                      className="down-arrow"
                      onClick={this.sortLastName}
                    ></span>
                  </th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            {this.state.results &&
              this.state.results.map((item) =>
                item.name.first.toLowerCase().includes(this.state.search) ? (
                  <tbody key={item.login.uuid}>
                    <tr>
                      <td>
                        <img
                          src={item.picture.thumbnail}
                          className="rounded-circle"
                          alt="thumbnail"
                        />
                      </td>
                      <td>{item.name.first}</td>
                      <td>{item.name.last}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      
                    </tr>
                  </tbody>
                ) : item.name.last.toLowerCase().includes(this.state.search) ? (
                  <tbody key={item.login.uuid}>
                    <tr>
                      <td>
                        <img src="rounded-circle" alt="thumbnail" />
                      </td>
                      <td>{item.name.first}</td>
                      <td>{item.name.last}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                     
                    </tr>
                  </tbody>
                ) : null
              )}
          </table>
        </div>
      </div>
    );
  }
}
export default EmployeeTable;
