import React, { ReactElement, useEffect } from 'react';
import 'src/components/PageWrapper.css';
import { isiOS, isSafari } from 'src/common/utils';

interface Props {
  children: ReactElement;
}
function PageWrapper({ children }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`flex-col page-w ${isiOS() || isSafari() ? 'ios-w' : 'android-w'}`}>
      {children}
    </div>
  );
}

export default PageWrapper;
