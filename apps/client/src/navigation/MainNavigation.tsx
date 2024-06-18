import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import DeliveryPointChooser from '../components/DeliveryPointChooser';
import CheckOut from '../screens/CheckOut';

const MainNavigation: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckOut />} />
      <Route path="/delivery-chooser" element={<DeliveryPointChooser />} />
    </Routes>
  );
};

export default MainNavigation;
