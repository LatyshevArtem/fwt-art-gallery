import Header from '@components/layout/Header';
import PaintingsSection from '@components/PaintingsSection';
import Footer from '@components/layout/Footer';
import PageContent from './PageContent';

const paintings = [
  {
    imgSrc: 'https://internship-front.framework.team/images/64761919c25ef9fb3e0cdb95/image.jpg',
    name: 'Jean-Honore Fragonard',
    years: '1732 - 1806',
  },
];

const MainPage = () => {
  return (
    <PageContent>
      <Header />
      <main>
        <PaintingsSection paintings={[...new Array(6)].fill(paintings[0])} />
      </main>
      <Footer />
    </PageContent>
  );
};

export default MainPage;
