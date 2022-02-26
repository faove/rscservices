import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceAssocAll } from '../redux/serviceAssocDuck';

const DashboardTable = () => {

    const [refreshKey, setRefreshKey] = useState(0);
    const serviceAll = useSelector(store => store.service.array)

    const dispatch = useDispatch()


    useEffect(() => {
        console.log(process.env)
        console.log(process.env.APP_LOCALHOST_URL);
        console.log(process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PROD_MODE);
        dispatch(getServiceAssocAll());
        console.log('llamado a getServiceAssocAll')
        console.log(serviceAll)
      },[refreshKey])


    return (
        <div>
            Dashboard
            {process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PROD_MODE}
        </div>
    )
}

export default DashboardTable;