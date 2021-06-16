const HamMenuIcon = () => {
  return (
    <svg viewBox='0 0 24 24' focusable='false' width='24' height='24' role='img' aria-hidden='true'>
      <path
        fill='#fff'
        d='M21 7.5H3a1 1 0 01-1-1v-1a1 1 0 011-1h18a1 1 0 011 1v1a1 1 0 01-1 1zm1 5v-1a1 1 0 00-1-1H3a1 1 0 00-1 1v1a1 1 0 001 1h18a1 1 0 001-1zm0 6v-1a1 1 0 00-1-1H3a1 1 0 00-1 1v1a1 1 0 001 1h18a1 1 0 001-1z'
        data-name='ic_menu'></path>
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg viewBox='0 0 28 28' focusable='false' role='img' aria-hidden='true'>
      <path d='M22.9 21.2l-4.5-4.5A7.5 7.5 0 1017 18l4.5 4.5a.5.5 0 00.8 0l.5-.5a.5.5 0 000-.8zm-10.4-3.5a5.6 5.6 0 115.6-5.6 5.6 5.6 0 01-5.6 5.6z'></path>
    </svg>
  );
};

const PostIcon = () => {
  return (
    <svg viewBox='0 0 24 24' focusable='false' role='img' aria-hidden='true'>
      <path d='M21 4.4l-1.4-1.3a2 2 0 00-2.8 0l-1.3 1.3 4 4.1L21 7.2a2 2 0 000-2.8zM3.8 16l-1.4 5.5L8 20.1 18.2 10l-4-4.1L3.8 16z'></path>
    </svg>
  );
};

const FriendIcon = () => {
  return (
    <svg viewBox='0 0 24 24' focusable='false' role='img' aria-hidden='true'>
      <path d='M19 3h-9a2 2 0 00-1.85 1.26L3.47 5.51a2 2 0 00-1.41 2.45l3.36 12.56A2 2 0 007.36 22a1.99 1.99 0 00.52-.07l3.48-.93H19a2 2 0 002-2V5a2 2 0 00-2-2zM7.85 19.87a.5.5 0 01-.61-.35L4.13 7.92a.5.5 0 01.35-.6L8 6.36V19a2 2 0 00.16.79z'></path>
    </svg>
  );
};

const EMailBoxIcon = () => {
  return (
    <svg viewBox='0 0 24 24' focusable='false' role='img' aria-hidden='true'>
      <path d='M20 4H4a2 2 0 00-2 2v1l10 5 10-5V6a2 2 0 00-2-2z'></path>
      <path d='M2 9v9a2 2 0 002 2h16a2 2 0 002-2V9l-10 5z'></path>
    </svg>
  );
};

const ProfileIcon = () => {
  return (
    <svg viewBox='0 0 24 24' focusable='false' role='img' aria-hidden='true'>
      <path d='M17.83 21.5H6.17a1.66 1.66 0 01-1.67-1.65v-1.24a5.81 5.81 0 015.83-5.78h3.34a5.81 5.81 0 015.83 5.78v1.24a1.66 1.66 0 01-1.67 1.65zM16.58 7A4.58 4.58 0 1112 2.5 4.57 4.57 0 0116.58 7z'></path>
    </svg>
  );
};

const LogOutIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      // enable-background='new 0 0 24 24'
      height='24px'
      viewBox='0 0 24 24'
      width='24px'
      fill='#FFFFFF'>
      <g>
        <path d='M0,0h24v24H0V0z' fill='none' />
      </g>
      <g>
        <path d='M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z' />
      </g>
    </svg>
  );
};

export { HamMenuIcon, SearchIcon, PostIcon, FriendIcon, EMailBoxIcon, ProfileIcon, LogOutIcon };
