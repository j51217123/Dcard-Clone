const CommentIcon = () => {
  return (
    <svg viewBox='0 0 24 24' focusable='false' role='img'>
      <path
        d='M1.3330000000000002 12a10.667 10.667 0 1021.334 0 10.667 10.667 0 10-21.334 0zM15.5 6.5h-7A3.5 3.5 0 005 10v3.5A3.5 3.5 0 008.5 17H9v1.369a.75.75 0 001.238.57L12.5 17h3a3.5 3.5 0 003.5-3.5V10a3.5 3.5 0 00-3.5-3.5z'
        fill-rule='evenodd'></path>
    </svg>
  );
};

const CommentLikeIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' focusable='false' role='img'>
      <path
        d='M16.5 4A5.49 5.49 0 0012 6.344 5.49 5.49 0 007.5 4 5.5 5.5 0 002 9.5C2 16 12 22 12 22s10-6 10-12.5A5.5 5.5 0 0016.5 4z'
        fill-rule='evenodd'></path>
    </svg>
  );
};

export { CommentIcon, CommentLikeIcon };
