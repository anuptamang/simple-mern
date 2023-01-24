import { Helmet } from 'react-helmet';
import SocialBlock from '../../../components/SocialBlock';
import ContactBanner from '../../../features/ContactBanner';
import ContactForm from '../../../features/ContactForm';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | My App</title>
      </Helmet>
      <ContactBanner />
      <ContactForm />
      <SocialBlock />
    </>
  );
};

export default Contact;
