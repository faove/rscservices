import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceAssocAll } from '../redux/serviceAssocDuck';

const DashboardTable = () => {

    const [refreshKey, setRefreshKey] = useState(0);
    const serviceAll = useSelector(store => store.service.array)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getServiceAssocAll());
        console.log('llamado a getServiceAssocAll')
        console.log(serviceAll)
      },[refreshKey])


    return (
        <div>
            Dashboard
        </div>
    )
}

export default DashboardTable;