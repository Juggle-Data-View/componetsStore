import day from 'dayjs';
import numeral from 'numeral';

const getFormatter = (formatter: string) => {
  try {
    if (typeof formatter === 'function') {
      return formatter;
    }
    // const formatterFunc: any = ''; //eslint-disable-line
    const formatterFunc = new Function(`try{ return ${formatter}} catch(error){console.log(error); throw ''}`); //eslint-disable-line
    if (typeof formatterFunc !== 'function') {
      return formatter;
    }
    return (data: any) => formatterFunc()(data, { day, numeral });
  } catch (error) {
    if (error instanceof Error) {console.log(error)}
  }
};

export default getFormatter;
