import React from 'react';
import ReactDOM from 'react-dom';
import Demo1 from './demo1';

function Main() {
  return (
    <div className="content">
      <Demo1 ></Demo1>
    </div>
  );
}


ReactDOM.render(<Main />, document.querySelector('.container'));
