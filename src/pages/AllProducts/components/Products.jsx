import ListOfProducts from './listOfProducts';

function Products() {
  return (
    <div className="products_marketing">
      <div className="productdropdown ">
        <div className="span-input  d-md-inline">
          <button className="btn">Products</button>
          <select name="" id="">
            <option>Digital Marketing</option>
            <option>Digital Marketing</option>
            <option>Digital Marketing</option>
          </select>
        </div>

        <div className="d-none d-md-inline float-right textBg">
          <i className="fa fa-angle-left btn btn-lg" aria-hidden="true" />
          <i className="fa fa-angle-right btn btn-lg" aria-hidden="true" />
        </div>
      </div>

      <ListOfProducts />
    </div>
  );
}

export default Products;
