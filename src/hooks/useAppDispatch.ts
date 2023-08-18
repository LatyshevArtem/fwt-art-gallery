import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };
