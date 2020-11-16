import React from 'react';
import CustomLoader from './CustomLoader';
import Notify from './Notify';

interface Props {
  loading: boolean;
  error: any;
}

function Geolocation({ loading, error }: Props) {
  return (
    <>
      {loading && (
        <Notify>
          <CustomLoader />
        </Notify>
      )}
      {error && <Notify>{error}</Notify>}
    </>
  );
}

export default Geolocation;
