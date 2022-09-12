import React from "react";

class Bands extends React.Component {

    constructor() {
        super();
        this.state = {
            csrf_token: "",
            bands: [],
            bandsInit: [],
            updatedBands: [],
            editable: false,
            numberOfPages: 0,
            currentPage: 1,
            bandsShown: [],
            user: JSON.parse(sessionStorage.getItem("user"))
        }

    }

    setPageShown = () => {
        let startPosition = (this.state.currentPage - 1) * 10;
        let endPosition = startPosition + 10;

        if (endPosition + 1 > this.state.bands.length) {
            endPosition = this.state.bands.length;
        }
        let bandsShown = [];
        for (let i = startPosition; i < endPosition; i++) {
            bandsShown.push(this.state.bands[i]);
        }
        this.setState({ bandsShown: bandsShown });
    }

    componentDidMount() {
        this.props.bandsInit(this);
        this.setToken(this.props.csrf_token);
    }
    
    setToken = (token) => {
        this.setState({csrf_token: token});
    }

    setBandTable(bandsLoad) {
        const initBands = [];
        bandsLoad.map((obj) => {
            initBands.push(Object.assign({}, obj));
        })
        const pagesNo = Math.floor(bandsLoad.length / 10);
        this.setState({ 
            bands: initBands, 
            bandsInit: bandsLoad, 
            numberOfPages: pagesNo 
        }, this.setPageShown);
    }

    setEditable = () => {
        const editable = !this.state.editable;
        this.setState({ editable: editable });
    }

    onInputChange = (event, id) => {
        const fieldname = event.target.getAttribute("fieldname");
        const value = event.target.value;
        this.updateBand(id, fieldname, value);
    }

    updateBand = (id, fieldname, value) => {
        const bands = this.state.bands; // bands is init bands list
        const bandToUpdate = bands.find((band) => { // find a band to update from bands
            return band.Id === id;
        })
        bandToUpdate[fieldname] = value; // update value in bands
        const bandsToUpdate = this.state.updatedBands; // new list for updated only bands
        bandsToUpdate[id] = true; // ste tru if value is updated
        this.setState({ bands: bands, updatedBands: bandsToUpdate }); // bands = new updated bands full list; update bands = "true" list
    }

    onChangeSave = () => {
        let bandsToSave = [];
        let link;
        if (this.props.newBands) {
            bandsToSave = this.state.bands;
            link = "http://localhost:80/08_12_files/addBands.php";
        }
        else {
            for (let i = 0; i < this.state.updatedBands.length; i++) {
                if (this.state.updatedBands[i] === true) {
                    const bandId = i;
                    const band = this.state.bands.find((band) => {
                        return band.Id === bandId;
                    })
                    bandsToSave.push(band);
                }
            }
            link = "http://127.0.0.1:8000/band-update";
        }
        this.updateDB(bandsToSave, link);
    }

    updateDB = (bandsToSave, link) => {
        let self = this;
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("X-CSRF-TOKEN", this.state.csrf_token)

        fetch(link, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({"bands": bandsToSave})
        }).then(function (response) {
            response.json().then((body) => {
                if (self.state.editable) {
                    self.setEditable()
                };
                alert(body);
                const bandsInit = this.state.bands;
                self.setBandTable(bandsInit);
                self.setState({ updatedBands: [] });
            })
        })
    }

    onCancel = () => {
        const bands = this.state.bandsInit;
        this.setBandTable(bands);
        this.setEditable();
    }

    switchPageEvent = (event) => {
        this.switchPage(Number(event.target.innerHTML));
    }

    switchPage = (pageNo) => {
        //this.setState({ currentPage: pageNo });
        this.state.currentPage = pageNo;
        this.setPageShown();
    }

    generatePageItems = () => {
        const pagesArr = [];
        if (this.state.currentPage > 1) {
            pagesArr.push(<li className="page-item" key={"Previous"}><button type="button" className="page-link" onClick={this.previousPage}>Previous page</button></li>)
        }
        for (let i = 1; i <= this.state.numberOfPages; i++) {
            pagesArr.push(<li className="page-item"><button type="button" className="page-link" key={i} onClick={this.switchPageEvent}>{i}</button></li>)
        }
        if (this.state.currentPage < this.state.numberOfPages) {
            pagesArr.push(<li className="page-item" key={"Next"}><button type="button" className="page-link" onClick={this.nextPage}>Next page</button></li>)
        }
        return pagesArr;
    }

    nextPage = () => {
        this.switchPage(++this.state.currentPage);
    }

    previousPage = () => {
        this.switchPage(--this.state.currentPage);
    }

    render() {

        return (
            <div className='pb-3 px-5 m-5'>
                <form method="POST">
                    <input name="_token" hidden value={this.state.csrf_token}></input>
                    {/* {this.state.user.roleID === 1 &&  */}
                    <div>
                        <button className="btn btn-outline-info my-2" type="button" onClick={this.setEditable}>Edit</button>
                        <button className="btn btn-outline-info m-2" type="button" onClick={this.onChangeSave}>Save updates</button>
                        <button className="btn btn-outline-danger my-2" type="button" onClick={this.onCancel}>Cancel updates</button> 
                    </div>
                    {/* } */}

                    <nav>
                        <ul className="pagination my-3">
                            {this.generatePageItems()}
                        </ul>
                    </nav>

                    <table className='table table-hover table-striped table-borderless'>
                        <thead className='table-dark'>
                            <tr>
                                <th><div>Title</div></th>
                                <th>Lead artist</th>
                                <th>Genres</th>
                                <th>Year of foundation</th>
                                <th>Origin</th>
                                <th>Website</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !(this.state.bandsShown === undefined) && this.state.bandsShown.map(band => {
                                    return (
                                        <tr key={band.Id} onChange={(e) => this.onInputChange(e, band.Id)}>
                                            <td>
                                                <div hidden={this.state.editable}>{band.title}</div>
                                                <input hidden={!this.state.editable} defaultValue={band.title} fieldname="title"></input>
                                            </td>
                                            <td>
                                                <div hidden={this.state.editable}>{band.leadArtist}</div>
                                                <input hidden={!this.state.editable} defaultValue={band.leadArtist} fieldname="leadArtist"></input>
                                            </td>
                                            <td>
                                                <div hidden={this.state.editable}>{band.genres}</div>
                                                <input hidden={!this.state.editable} defaultValue={band.genres} fieldname="genres"></input>
                                            </td>
                                            <td>
                                                <div hidden={this.state.editable}>{band.yearFoundation}</div>
                                                <input hidden={!this.state.editable} defaultValue={band.yearFoundation} fieldname="yearFoundation"></input>
                                            </td>
                                            <td>
                                                <div hidden={this.state.editable}>{band.origin}</div>
                                                <input hidden={!this.state.editable} defaultValue={band.origin} fieldname="origin"></input>
                                            </td>
                                            <td>
                                                <div hidden={this.state.editable}>{band.website}</div>
                                                <input hidden={!this.state.editable} defaultValue={band.website} fieldname="website"></input>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default Bands;