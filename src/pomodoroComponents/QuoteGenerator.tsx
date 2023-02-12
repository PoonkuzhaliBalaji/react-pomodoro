import { Input, message } from 'antd';
import { useFormik } from 'formik';
import styles from './quoteGenerator.module.css';
import { useCallback, useState } from 'react';
import { Header } from '../components/Header';
import { quoteGen } from '../constants/textConstants';
import Button from '../components/Button';
import { libraryList } from '../constants/libraryList';
import commonStyles from '../main.module.css';

const { TextArea } = Input;

const QuoteGenerator = () => {
  const [randomQuoteToDisplay, setRandomQuoteToDisplay] = useState<string>(libraryList[0]);

  const formik = useFormik({
    initialValues: {
      quotes: '',
      library: libraryList
    },
    onSubmit: () => {}
  });

  const { handleChange, values, setFieldValue } = formik;
  const { library, quotes } = values;

  const addToLibrary = useCallback(() => {
    if (quotes === '') {
      message.warning('Write a thought to add to the library');
    } else {
      setFieldValue('library', [...library, quotes]);
      message.success('Added to the library !');
      setFieldValue('quotes', '');
    }
  }, [library, quotes]);

  const viewSomeFromLibrary = useCallback(() => {
    const randomQuote = Math.floor(Math.random() * library.length);
    setRandomQuoteToDisplay(library[randomQuote]);
  }, [library, setRandomQuoteToDisplay]);

  return (
    <div className={commonStyles.container}>
      <Header />
      <div className={styles.quoteContainer}>
        <h3>{quoteGen.title}</h3>
        <div className={styles.division}>
          <div style={{ width: '50%' }}>
            <TextArea
              onChange={handleChange('quotes')}
              value={quotes}
              placeholder={quoteGen.quotePlaceholder}
              rows={10}
            />
            <div className={styles.buttonContainer}>
              <Button type="ghost" onClick={addToLibrary}>
                {quoteGen.addToLibraryText}
              </Button>
            </div>
          </div>
          <div style={{ width: '50%', marginLeft: 20 }}>
            <>
              <div className={styles.quoteArea}>{randomQuoteToDisplay}</div>
              <div className={styles.buttonContainer}>
                <Button type="ghost" onClick={viewSomeFromLibrary}>
                  {quoteGen.viewSome}
                </Button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
