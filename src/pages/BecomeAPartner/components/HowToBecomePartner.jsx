function HowToBecomePartner() {
  return (
    <div className="HowToBecomePartner container">
      <h1>How to Become Our Partner</h1>
      <p className="col-md-8 mx-auto">
        Nam id mi sollicitudin magna dictum pellentesque non ac purus. Etiam leo nibh, finibus eget
        porttitor sit amet, consequat ac lacus. Quisque ornare, arcu quis lacinia hendrerit,
      </p>

      <form>
        <div className="row m-0">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="company_name"
              id=""
              aria-describedby="helpId"
              placeholder="Company Name"
            />
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              id=""
              aria-describedby="helpId"
              placeholder="Name"
            />
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
        </div>

        <div className="row m-0">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="company_name"
              id=""
              aria-describedby="helpId"
              placeholder="Email"
            />
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="name"
              id=""
              aria-describedby="helpId"
              placeholder="Phone no"
            />
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
        </div>

        <div className="row m-0">
          <div className="form-group col-md-6">
            <select
              className="form-control"
              name="company_name"
              id=""
              aria-describedby="helpId"
              placeholder=""
            >
              <option value="">Industry</option>
              <option value="">Fintech</option>
              <option value="">Social Media</option>
              <option value="">School</option>
              <option value="">Church</option>
            </select>
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
          <div className="form-group col-md-6">
            <select
              className="form-control"
              name="company_name"
              id=""
              aria-describedby="helpId"
              placeholder=""
            >
              <option value="" selected>
                Digital Marketing Experience
              </option>
              <option value="">Fintech</option>
              <option value="">Social Media</option>
              <option value="">School</option>
              <option value="">Church</option>
            </select>
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
        </div>

        <div className="row m-0">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              name="company_name"
              id=""
              aria-describedby="helpId"
              placeholder="Url"
            />
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
          <div className="form-group col-md-6">
            <select
              className="form-control"
              name="company_name"
              id=""
              aria-describedby="helpId"
              placeholder=""
            >
              <option value="" selected>
                How to know about Clisha
              </option>
              <option value="">Fintech</option>
              <option value="">Social Media</option>
              <option value="">School</option>
              <option value="">Church</option>
            </select>
            <small id="helpId" className="form-text text-danger d-none">
              Help text
            </small>
          </div>
        </div>

        <div className="row m-0">
          <div className="form-group col-12 mt-2">
            <button className="btn btn-warning w-100">Become A Publisher</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HowToBecomePartner;
