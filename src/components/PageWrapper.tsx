import React, { ReactElement, useEffect } from 'react';
import 'src/components/PageWrapper.css';

interface Props {
  children: ReactElement;
}
function PageWrapper({ children }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex-col page-w">{children}</div>;
}

export default PageWrapper;
