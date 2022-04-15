import GoodResult from './GoodResult';
import BadResult from './BadResult';

export default function ResultsList({ results }: any) {
  if (results.length) {
    return (
      <div className='results-list'>
        <GoodResult results={results} />
      </div>
    );
  }

  return (
    <div className='results-list'>
      <BadResult />
    </div>
  );
}
