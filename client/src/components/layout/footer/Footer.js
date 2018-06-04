import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';
import facebook from '../../../assets/logos/facebook.svg';
import instagram from '../../../assets/logos/instagram.svg';
import twitter from '../../../assets/logos/twitter.svg';

export default () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-6 links_contact">
            <ul>
              <li>
                <Link to="#"> Disclaimer </Link>{' '}
              </li>
              <li>
                <Link to="#"> Cookiepolicy </Link>{' '}
              </li>
              <li>
                <Link to="#"> Privacy </Link>{' '}
              </li>
              <li>
                <Link to="#"> GDPR </Link>{' '}
              </li>
            </ul>
          </div>
          <div className="col-6 links_social">
            <ul>
              <li>
                <Link to="https://www.facebook.com/">
                  {' '}
                  <img src={facebook} alt="facebook-icon" className="icon" />
                </Link>{' '}
              </li>
              <li>
                <Link to="https://www.instagram.com/">
                  {' '}
                  <img src={instagram} alt="instagram-icon" className="icon" />
                </Link>{' '}
              </li>
              <li>
                <Link to="https://www.twitter.com/">
                  {' '}
                  <img src={twitter} alt="twitter-icon" className="icon" />
                </Link>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
