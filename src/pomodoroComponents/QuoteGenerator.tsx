import { Input, message } from 'antd';
import { useFormik } from 'formik';
import styles from './quoteGenerator.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { quoteGen } from '../constants/textConstants';
import Button from '../components/Button';
import commonStyles from '../main.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { TimerContext } from '../components/Timer';
import TimerComponent from './TimerComponent';
import { useIndexedDB } from 'react-indexed-db';

const { TextArea } = Input;

interface QuoteObject {
  id: number;
  quote: string;
}

const QuoteGenerator = () => {
  const [randomQuoteToDisplay, setRandomQuoteToDisplay] = useState<string>('Click on view');
  const navigate = useNavigate();
  const { timer, setInitialTimer } = useContext(TimerContext);

  const db = useIndexedDB('quotes');

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const passedTime = query.get('timer');
  const contantContrationTime = 300; // 5 min * 60
  const timeToRedirect = passedTime ? +passedTime - contantContrationTime : 0;

  useEffect(() => {
    if (timer === 0) {
      setInitialTimer(0);
      navigate(`/completion_percentage`);
      return;
    }
    if (timeToRedirect === timer) {
      navigate(`/working?timer=${timer}`);
    }
  }, [passedTime, contantContrationTime, timeToRedirect, timer]);

  const formik = useFormik({
    initialValues: {
      quotes: '',
    },
    onSubmit: () => {}
  });

  const { handleChange, values, setFieldValue } = formik;
  const { quotes } = values;

  const addToLibrary = useCallback(() => {
    if (quotes === '') {
      message.warning('Write a thought to add to the library');
    } else {
      db.add({ quote: quotes }).then(() => {
        message.success('Added to the library !');
        setFieldValue('quotes', '');
      });
    }
  }, [db, quotes]);


  const viewSomeFromLibrary = useCallback(() => {
    db.getAll().then((quotes: QuoteObject[]) => {
      const randomQuote = Math.floor(Math.random() * quotes.length);
      setRandomQuoteToDisplay(quotes[randomQuote].quote);
    });
  }, [db, setRandomQuoteToDisplay]);

  return (
    <div className={commonStyles.container}>
      <Header />
      <div className={styles.quoteContainer}>
        <TimerComponent timer={timer} />
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
