import React from 'react'
import {Link} from 'react-router-dom'
import './error-view.scss';
export default function ErrorView() {
    return (
        <section className="section is-medium notfound">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column has-text-centered">
              <h1 className="title">404 Page Not Found</h1>
              <p className="subtitle">An unexpected error has occurred..</p>
              <Link className="button" to ="/">Visit Homepage</Link>
            </div>
            <div className="column has-text-centered">
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/404.2.png" />
            </div>
          </div>
        </div>
      </section>
    )
}
