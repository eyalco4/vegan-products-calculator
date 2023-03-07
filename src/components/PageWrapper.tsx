import React, { ReactElement } from 'react';
import 'src/components/PageWrapper.css';

interface Props {
  children: ReactElement;
}
function PageWrapper({ children }: Props) {
  return <div className="flex-col page-w">{children}</div>;
}

export default PageWrapper;
