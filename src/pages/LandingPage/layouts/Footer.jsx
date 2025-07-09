import { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { openInNewTab } from "../../../utils/functions/functions";
import paypal from "../../../assets/Icons/paypal.svg";
import visa from "../../../assets/Icons/visa.svg";
import mastercard from "../../../assets/Icons/mastercard.svg";
import express from "../../../assets/Icons/express.svg";

function Footer() {
  const { t, i18n } = useTranslation();
  const email = process.env.REACT_APP_EMAIL;
  const number = process.env.REACT_APP_PHONE_NUMBER;

  const [selectedLang, setSelectedLang] = useState('EN');

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tooltip = new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  const languages = useMemo(() => [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'French' },
    { code: 'DE', name: 'German' },
    { code: 'ES', name: 'Spanish' },
    { code: 'IT', name: 'Italian' },
    { code: 'ZH', name: 'Chinese' },
    { code: 'PT', name: 'Portuguese' },
  ], []);

  const getUserLanguage = useCallback(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toUpperCase();
    return languages.find(lang => lang.code === langCode) ? langCode : 'EN';
  }, [languages]);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    const userLang = storedLang || getUserLanguage();
    setSelectedLang(userLang);
    i18n.changeLanguage(userLang);
  }, [getUserLanguage, i18n]);


  const handleChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };


  const paymentGateways = [
    { img: paypal, altText: "Pay securely using PayPal" },
    { img: visa, altText: "Visa payment option" },
    { img: mastercard, altText: "MasterCard payment option" },
    { img: express, altText: "American Express payment option" },
  ];

  return (
    <footer>
      <div className="container pt-5">
        <div className="row m-0">
          <div className="col-lg-5">
            <img src="images/Group 2311.png" alt="" />
            <select
              className="form-select w-auto"
              value={selectedLang}
              onChange={handleChange}
              style={{ 
                backgroundColor: 'inherit',
                color: 'white',
                border: 'none',
                boxShadow: 'none', 
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.code}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row m-0 mt-4">
          <div className="col-md-4 ">
            <img src="logo2.png" id="navbar-brand" alt="" className="mb-3" />

            <p>
              <small>
              {t("footer.description")} <br />
              </small>
            </p>
            <p className="fw-bold" style={{ fontSize: '18px' }}>{t("footer.get_in_touch")}</p>

            <div className="d-inline">
              <img src="images/Vector (1).png" className="ml-3" alt="" data-toggle="tooltip" title="Coming Soon" />
              <img src="images/Vector (2).png" className="ml-3" alt="" data-toggle="tooltip" title="Coming Soon" />
              <img src="images/Vector (3).png" className="ml-3" alt=""  data-toggle="tooltip" title="Coming Soon"/>
              <img src="images/Vector (4).png" className="ml-3" alt=""  data-toggle="tooltip" title="Coming Soon"/>
            </div>
          </div>
          <div className="col-md-4">
            <p className="fw-bold" style={{ fontSize: '24px' }}>{t("footer.contact_info")}</p>
            <h6>
              <i className="fa fa-envelope" aria-hidden="true" /> {t("footer.email")}
            </h6>
            <a href={`mailto:${email}`} className="text-white">
              <small>{email}</small>
            </a>

            <div className="mt-3">
              <h6>
                <i className="fa fa-phone" aria-hidden="true" /> {t("footer.phone")}
              </h6>
              <a href={`tel:${number}`} className="text-white">
                <small>{number}</small>
              </a>
            </div>

            <div className="mt-3">
              <h6>
                <i className="fa fa-map-marker" aria-hidden="true" /> {t("footer.address")}
              </h6>
              <p>
              <small>
                VQualis Limited, Grand Industrial Building, Office 7/F <br />
                159-165 Wo Yi Hop Road Kwai Chung, Hongkong. <br />
              </small>
            </p>
            </div>
          </div>
          <div className="col-md-4 ">
            <h6>
              <i className="fa fa-globe" aria-hidden="true" /> {t("footer.secure_payment")}
            </h6>

            <p className="p-0">{t("footer.payment_description")}</p>

            <div className="d-flex flex-wrap gap-4">
              {paymentGateways.map(({ img, altText }, index) => (
                <div
                  key={index}
                  className="p-2 rounded-lg"
                  aria-label={altText}
                >
                  <img src={img} alt={altText} width={60} height={40} className="m-0" />
                </div>
              ))}
            </div>

            <a
              href="https://clisha.me/signup"
              className="btn registration-btn fw-semibold w-100 mt-4"
              style={{ maxWidth: '60%' }}
              aria-label="Sign up to Clisha"
              title="Sign up to Clisha"
            >
              {t("footer.become_member")}
            </a>
          </div>

          <div className="col-lg-7 p-0">
            <ul className="footer-list2 text-center text-lg-left link  p-0">
              {/* <li onClick={() => openInNewTab("https://vqualis.com/privacy-policy/")}>Privacy</li>
              <li onClick={() => openInNewTab("https://vqualis.com/terms-of-service/")}>
                Terms of Service
              </li> */}
              {/* <li>Affiliation</li>
              <li>Reward Program</li>
              <li>Support Center</li> */}
            </ul>
          </div>

        </div>
      </div>
      <hr className="border-secondary" />
      <div className="container row m-0 d-flex justify-content-between align-items-center p-1">
        <div className="col-md-6 text-center mb-2 mb-md-0">
          <div className="col-12  text-center  small mt-2">
          <span>© {new Date().getFullYear()} {t("footer.rights")}</span>
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
          <ul className="list-unstyled d-flex gap-3 mb-0">
            <li onClick={() => openInNewTab("https://vqualis.com/privacy-policy/")} className="mx-2 link">{t("footer.privacy")}</li>
            <li onClick={() => openInNewTab("https://vqualis.com/terms-of-service/")} className="mx-2 link">
              {t("footer.terms")}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
