import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store.plantList );

    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({
            type:'GET_PLANTS'
        })
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <h3>{JSON.stringify(reduxState)}</h3>
        </div>
    );
}

export default PlantList;
