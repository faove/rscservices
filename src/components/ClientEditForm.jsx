import React, {Fragment}from 'react'

const ClientEditForm = () => {
    return (
        <Fragment>
            <div>
                <div className="input-group">
                    <span className="input-group-text">First and last name</span>
                    <input type="text" aria-label="First name" className="form-control">
                    <input type="text" aria-label="Last name" className="form-control">
                </div>
            </div>
        </Fragment>
    )
}
export default ClientEditForm;