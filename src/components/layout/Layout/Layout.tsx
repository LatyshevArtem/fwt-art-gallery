import { FC, PropsWithChildren } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface LayoutProps extends PropsWithChildren {
  className?: string;
}

const Layout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
