import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination, setOrigin } from '../slices/navSlice';

const useSwapper = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const [from, setFrom] = useState(origin);
  const [to, setTo] = useState(destination);
  const data = () => {
    setFrom(origin);
    setTo(destination);
    const temp = from;
    dispatch(setOrigin(to));
    dispatch(setDestination(temp));
  };

  return {
    from,
    to,
    data,
  };
};

export default useSwapper;
