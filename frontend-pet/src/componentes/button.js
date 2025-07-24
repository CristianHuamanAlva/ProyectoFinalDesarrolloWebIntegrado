import React from 'react';

const buttonHTML = `
  <a href="#" class="btn btn-lg btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>
`;

function Button() {
  return (
    <div dangerouslySetInnerHTML={{ __html: buttonHTML }} />
  );
}

export default Button;

    