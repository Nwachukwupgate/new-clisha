import card from '../../../json/cards.json';

function ListOfProducts() {
  return (
    <div className="row m-0 mt-5 ">
      {card &&
        card.card4.map((item, index) => (
          <div
            className="card maincard last-card mt-4 bg-white shadow text-center p-2 pt-5 mx-auto col-lg-6 "
            key={index}
            data-aos="zoom-in"
            data-aos-duration="1000"
            // data-aos-delay="600"
          >
            <img className={`card-img m-auto img-getters mb-3  `} src={item.img} alt="" />

            <div className="card-body">
              <a href="/" className="text-success  text-decoration-underline ">
                View More
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListOfProducts;
