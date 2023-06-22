import Accordion from '@/components/Accordion';
import React from 'react';
import faq from './faq';

const Faq = () => {
  return (
    <div className='flex flex-col items-center mt-16'>
      <div className='mb-10 text-4xl'>FAQ</div>
      {faq.map((item, i) => {
        return <Accordion title={item.title} content={item.content} key={i} />;
      })}
    </div>
  );
};

export default Faq;
